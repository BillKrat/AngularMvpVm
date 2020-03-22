using HelloWorldData.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace HelloWorldData.Controllers
{
    //api/Files
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public FilesController(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;

            // Set WebRootPath to wwwroot\Files directiry
            _hostEnvironment.WebRootPath =
                System.IO.Path.Combine(
                    Directory.GetCurrentDirectory(),
                    @"wwwroot\Files");

            // Create wwwroot\Files directory if needed
            if (!Directory.Exists(_hostEnvironment.WebRootPath))
            {
                DirectoryInfo di =
                    Directory.CreateDirectory(_hostEnvironment.WebRootPath);
            }
        }

        #region // api/Files/SystemFiles  GET 
        [HttpGet("[action]")]
        public DTONode SystemFiles()
        {
            // Create Root Node
            DTONode objDTONode = new DTONode();

            if (Directory.Exists(_hostEnvironment.WebRootPath))
            {               
                objDTONode.label = "Root";
                objDTONode.data = "Root";
                objDTONode.expandedIcon = "fa-folder-open";
                objDTONode.collapsedIcon = "fa-folder";
                objDTONode.children = new List<DTONode>();

                // Get Files
                ProcessDirectory(_hostEnvironment.WebRootPath, ref objDTONode);
            }

            return objDTONode;
        }
        #endregion

        #region // api/Files/JsonFile  GET
        [HttpGet("[action]")]
        public string JsonFile()
        {
            try
            {
                var file = GetMockFileData(); 
                var content = JObject.Parse(file);
                return content.ToString();
            }
            catch(Exception ex)
            {
                var data = new JObject();
                data.Add("Error", ex.Message);
                return data.ToString();
            }
        }
        #endregion

        #region // api/Files/DeleteFiles  POST
        [HttpPost]
        public IActionResult Post([FromBody]DTONode paramDTONode)
        {
            // Loop through each node
            foreach (DTONode objDTONode in paramDTONode.children)
            {
                if(objDTONode.expandedIcon == "fa-folder-open")
                {
                    // This is a folder
                    DeleteFolder(objDTONode);
                }
                else
                {
                    // This is a file
                    DeleteFile(objDTONode);
                }
            }

            return Ok();
        }
        #endregion

        // Utility

        #region private void DeleteFile(DTONode objDTONode)
        private void DeleteFile(DTONode objDTONode)
        {
            try
            {
                // Create path
                string FullPath = Path.Combine(_hostEnvironment.WebRootPath, objDTONode.data);
                if (System.IO.File.Exists(FullPath))
                {
                    System.IO.File.Delete(FullPath);
                }
            }
            catch
            {
                // Do nothing 
            }
        }
        #endregion

        #region private void DeleteFolder(DTONode objDTONode)
        private void DeleteFolder(DTONode objDTONode)
        {
            try
            {
                // Create path
                string FullPath = Path.Combine(_hostEnvironment.WebRootPath, objDTONode.data);
                if (Directory.Exists(FullPath))
                {
                    Directory.Delete(FullPath, true);
                }
            }
            catch
            {
                // Do nothing 
            }
        }
        #endregion

        #region private void ProcessDirectory(string targetDirectory, ref DTONode paramDTONode)
        // Process all files in the directory passed in, recurse on any directories 
        // that are found, and process the files they contain.
        private void ProcessDirectory(string targetDirectory, ref DTONode paramDTONode)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                ProcessFile(fileName, ref paramDTONode);
            }

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                string WebRootPath = _hostEnvironment.WebRootPath + @"\";

                // The directory label should only contain the name of the directory
                string subdirectoryLabel = FixDirectoryName(subdirectory);

                DTONode objDTONode = new DTONode();
                objDTONode.label = subdirectoryLabel;
                objDTONode.data = subdirectory.Replace(WebRootPath, ""); 
                objDTONode.expandedIcon = "fa-folder-open";
                objDTONode.collapsedIcon = "fa-folder";
                objDTONode.children = new List<DTONode>();
                objDTONode.type = "folder";

                paramDTONode.children.Add(objDTONode);

                ProcessDirectory(subdirectory, ref objDTONode);
            }
        }
        #endregion

        #region private void ProcessFile(string path, ref DTONode paramDTONode)
        // Insert logic for processing found files here.
        private void ProcessFile(string path, ref DTONode paramDTONode)
        {
            string WebRootPath = _hostEnvironment.WebRootPath + @"\";
            string FileName = Path.GetFileName(path);
            string FilePath = path;

            DTONode objDTONode = new DTONode();
            objDTONode.label = FileName;
            objDTONode.data = FilePath.Replace(WebRootPath, "");
            objDTONode.expandedIcon = "fa-file";
            objDTONode.collapsedIcon = "fa-file";
            objDTONode.type = "file";

            paramDTONode.children.Add(objDTONode);
        }
        #endregion

        #region private string FixDirectoryName(string subdirectory)
        private string FixDirectoryName(string subdirectory)
        {
            string subdirectoryLabel = subdirectory;

            // Create a subdirectory label that does not include the path Root
            int intRootPosition = _hostEnvironment.WebRootPath.Count() + 1;
            subdirectoryLabel =
                subdirectory.Substring(intRootPosition,
                (subdirectory.Length - intRootPosition));

            // Create a subdirectory label that does not include the parent
            int intParentPosition = subdirectoryLabel.LastIndexOf(@"\");

            if(intParentPosition > 0)
            {
                intParentPosition++;
                subdirectoryLabel =
                    subdirectoryLabel.Substring(intParentPosition,
                    (subdirectoryLabel.Length - intParentPosition));
            }

            return subdirectoryLabel;
        } 
        #endregion

        private string GetMockFileData()
        {
            return @"{
	""data"": [
		{
			""label"": ""Documents"",
			""data"": ""Documents Folder"",
			""expandedIcon"": ""pi pi-folder-open"",
			""collapsedIcon"": ""pi pi-folder"",
			""children"": [
				{
					""label"": ""Work"",
					""data"": ""Work Folder"",
					""expandedIcon"": ""pi pi-folder-open"",
					""collapsedIcon"": ""pi pi-folder"",
					""children"": [
						{
							""label"": ""Expenses.doc"",
							""icon"": ""pi pi-file"",
							""data"": ""Expenses Document""
						},
						{
							""label"": ""Resume.doc"",
							""icon"": ""pi pi-file"",
							""data"": ""Resume Document""
						}
					]
				},
				{
					""label"": ""Home"",
					""data"": ""Home Folder"",
					""expandedIcon"": ""pi pi-folder-open"",
					""collapsedIcon"": ""pi pi-folder"",
					""children"": [
						{
							""label"": ""Invoices.txt"",
							""icon"": ""pi pi-file"",
							""data"": ""Invoices for this month""
						}
					]
				}
			]
		},
		{
			""label"": ""Pictures"",
			""data"": ""Pictures Folder"",
			""expandedIcon"": ""pi pi-folder-open"",
			""collapsedIcon"": ""pi pi-folder"",
			""children"": [
				{
					""label"": ""barcelona.jpg"",
					""icon"": ""pi pi-image"",
					""data"": ""Barcelona Photo""
				},
				{
					""label"": ""logo.jpg"",
					""icon"": ""pi pi-file"",
					""data"": ""PrimeFaces Logo""
				},
				{
					""label"": ""primeui.png"",
					""icon"": ""pi pi-image"",
					""data"": ""PrimeUI Logo""
				}
			]
		},
		{
			""label"": ""Movies"",
			""data"": ""Movies Folder"",
			""expandedIcon"": ""pi pi-folder-open"",
			""collapsedIcon"": ""pi pi-folder"",
			""children"": [
				{
					""label"": ""Al Pacino"",
					""data"": ""Pacino Movies"",
					""children"": [
						{
							""label"": ""Scarface"",
							""icon"": ""pi pi-video"",
							""data"": ""Scarface Movie""
						},
						{
							""label"": ""Serpico"",
							""icon"": ""pi pi-file-video"",
							""data"": ""Serpico Movie""
						}
					]
				},
				{
					""label"": ""Robert De Niro"",
					""data"": ""De Niro Movies"",
					""children"": [
						{
							""label"": ""Goodfellas"",
							""icon"": ""pi pi-video"",
							""data"": ""Goodfellas Movie""
						},
						{
							""label"": ""Untouchables"",
							""icon"": ""pi pi-video"",
							""data"": ""Untouchables Movie""
						}
					]
				}
			]
		}
	]
}";
        }
    }
}
