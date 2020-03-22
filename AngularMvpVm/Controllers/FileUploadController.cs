using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AngularMvpVm.Controllers
{
    [ApiController] // *2020
    [Route("[controller]")]
    public class UploadFileController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        [HttpPost]
        [Route("/UploadFiles")]
        public IActionResult UploadFile(ICollection<IFormFile> files)
        {
            _logger.LogDebug($"Get() retrieving data");

            // Retrieve data from Form
            var form = Request.Form;
            // Retrieve SelectedFolder
            string SelectedFolder = form["selectedFolder"].First();
            _logger.LogDebug("$Selected Folder: {SelectedFolder}");

            // Process all Files
            foreach (var file in form.Files)
            {
                // Process file
                using (var readStream = file.OpenReadStream())
                {
                    var filename = ContentDispositionHeaderValue
                                            .Parse(file.ContentDisposition)
                                            .FileName.ToString();
                    //.Trim('"');
                    //filename = _hostEnvironment.WebRootPath + $@"\{SelectedFolder}\{filename}";
                    ////Save file to harddrive
                    filename = @$"c:\temp\UploadFile\{SelectedFolder}\{filename}";
                    using (FileStream fs = System.IO.File.Create(filename))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
            }
            return Ok(0);           
        }

    }
}
