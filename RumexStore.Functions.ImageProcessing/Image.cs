using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace RumexStore.Functions.ImageProcessing
{
    public class Image
    {
        private readonly ILogger<Image> _logger;
        private readonly IConfiguration _configuration;

        public Image(ILogger<Image> log, IConfiguration dIConfiguration)
        {
            _logger = log;
            this._configuration = dIConfiguration;
        }

        [FunctionName("Image")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "imagePath" })]
        [OpenApiParameter(name: "imagePath", In = ParameterLocation.Query, Required = true, Type = typeof(string), Description = "The **Image Path** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request - Image.");

            string imagePath = req.Query["imagePath"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            imagePath = imagePath ?? data?.imagePath;
            if(string.IsNullOrWhiteSpace(imagePath)) {
                return new BadRequestObjectResult("Please pass an image path in the request body json");
            }

            string connString = _configuration["ConnectionStrings:AzureStorageConnectionString"];
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connString);
            CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference("images");
            CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(imagePath);

            using (MemoryStream ms = new MemoryStream())
            {
                await cloudBlockBlob.DownloadToStreamAsync(ms);
                return new FileContentResult(ms.ToArray(), "image/jpeg");
            }
        }
    }
}

