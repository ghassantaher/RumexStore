using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace RumexStore.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private IWebHostEnvironment _environment;
        private readonly ILogger<ImagesController> _logger;
        public ImagesController(IWebHostEnvironment environment, ILogger<ImagesController> logger)
        {
            _environment = environment;
            _logger=logger;
        }
        /// <summary>
        /// Gets a single image.
        /// </summary>
        /// <param name="fileUrl">String to search the image path.</param>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Seach/persuade%20anyone
        /// </remarks>
        /// <returns>Single Category</returns>
        /// <response code="200">Returns matching products.</response>
        /// <response code="204">Returned when no content in the response</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        //[HttpGet("{fileUrl}", Name = "Image")]
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(500)]
        public IActionResult Get([FromQuery] string fileUrl)
        {
            string webRootPath = this._environment.WebRootPath;
            var folderName = @"Images/";
            string newPath = Path.Combine(webRootPath, folderName,fileUrl);
           if (!System.IO.File.Exists(newPath))
                return NotFound();
            return PhysicalFile(newPath, GetContentType(newPath));
            //return PhysicalFile(newPath, "image/jpeg");
        }
        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string? contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }
    }
}
