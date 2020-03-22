using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using HelloWorldData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace HelloWorldData.Controllers
{
    //api/Folders
    [Route("api/[controller]")]
    public class FoldersController : Controller
    {
        // Root Node
        DTONode objDTONode;

        private readonly IHostingEnvironment _hostEnvironment;

        public FoldersController(IHostingEnvironment hostEnvironment)
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

        // api/Folders/SystemFolders
        #region public DTONode SystemFolders()
        [HttpGet("[action]")]
        public DTONode SystemFolders()
        {
            objDTONode = new DTONode();

            objDTONode.label = "TreeRoot";
            objDTONode.data = "TreeRoot";
            objDTONode.expandedIcon = "fa-folder-open";
            objDTONode.collapsedIcon = "fa-folder";
            objDTONode.children = new List<DTONode>();

            if (Directory.Exists(_hostEnvironment.WebRootPath))
            {
                DTONode objNewDTONode = new DTONode();

                objNewDTONode.label = "[Root]";
                objNewDTONode.data = @"\";
                objNewDTONode.expandedIcon = "fa-folder-open";
                objNewDTONode.collapsedIcon = "fa-folder";
                objNewDTONode.children = new List<DTONode>();

                objDTONode.children.Add(objNewDTONode);

                // Get Folders
                ProcessDirectory(_hostEnvironment.WebRootPath, 0);
            }

            return objDTONode;
        }
        #endregion

        // api/Folders/Post
        [HttpPost]
        #region public IActionResult Post([FromBody]string DirectoryPath)
        public IActionResult Post([FromBody]string DirectoryPath)
        {
            // Fix DirectoryPath
            if(DirectoryPath.IndexOf("\\\\") == 0)
            {
                // Four slashes indicattes this is the root
                // The slashes need to be removed to make the Path.Combine work
                DirectoryPath = DirectoryPath.Replace("\\\\", "");
            }
            // Create path
            string NewPath = Path.Combine(_hostEnvironment.WebRootPath, DirectoryPath);
            if (!Directory.Exists(NewPath))
            {
                Directory.CreateDirectory(NewPath);
            }

            return Ok();
        }
        #endregion

        // Utility

        #region public void ProcessDirectory(string targetDirectory)
        // Process the directory, recurse on any directories 
        // that are found
        public void ProcessDirectory(string targetDirectory, int paramNumberOfDots)
        {
            paramNumberOfDots++;
            string WebRootPath = _hostEnvironment.WebRootPath + @"\";
            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                // The directory label should only contain the name of the directory
                string subdirectoryLabel = FixDirectoryName(subdirectory);

                DTONode objNewDTONode = new DTONode();
                
                objNewDTONode.data = subdirectory.Replace(WebRootPath, "");
                objNewDTONode.expandedIcon = "fa-folder-open";
                objNewDTONode.collapsedIcon = "fa-folder";
                objNewDTONode.children = new List<DTONode>();

                // Update the label to add dots in front of the name
                objNewDTONode.label = $"{AddDots(paramNumberOfDots)}{subdirectoryLabel}";

                objDTONode.children.Add(objNewDTONode);
                
                ProcessDirectory(subdirectory, paramNumberOfDots);
            }
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

            if (intParentPosition > 0)
            {
                intParentPosition++;
                subdirectoryLabel =
                    subdirectoryLabel.Substring(intParentPosition,
                    (subdirectoryLabel.Length - intParentPosition));
            }

            return subdirectoryLabel;
        }
        #endregion

        #region AddDots
        private static string AddDots(int intDots)
        {
            String strDots = "";
            for (int i = 0; i < intDots; i++)
            {
                strDots += ". ";
            }
            return strDots;
        }
        #endregion
    }
}
