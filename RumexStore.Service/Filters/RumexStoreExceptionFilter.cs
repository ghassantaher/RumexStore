using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.Exceptions;

namespace RumexStore.Service.Filters
{
    public class RumexStoreExceptionFilter : ExceptionFilterAttribute
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public RumexStoreExceptionFilter(
            IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public override void OnException(ExceptionContext context)
        {
            bool isDevelopment = _hostingEnvironment.IsDevelopment();
            var ex = context.Exception;
            string? stackTrace = isDevelopment ? context.Exception.StackTrace : string.Empty;
            string message = ex.Message;
            string error = string.Empty;
            IActionResult actionResult;
            switch (ex)
            {
                //case RumexStoreInvalidQuantityException iqe:
                //    //Returns a 400
                //    error = "Invalid quantity request.";
                //    actionResult = new BadRequestObjectResult(new { Error = error, Message = message, StackTrace = stackTrace });
                //    break;
                case DbUpdateConcurrencyException ce:
                    //Returns a 400
                    error = "Concurrency Issue.";
                    actionResult = new BadRequestObjectResult(new { Error = error, Message = message, StackTrace = stackTrace });
                    break;
                case RumexStoreInvalidProductException ipe:
                    //Returns a 400
                    error = "Invalid Product Id.";
                    actionResult = new BadRequestObjectResult(new { Error = error, Message = message, StackTrace = stackTrace });
                    break;
                //case RumexStoreInvalidCustomerException ice:
                //    //Returns a 400
                //    error = "Invalid Customer Id.";
                //    actionResult = new BadRequestObjectResult(new { Error = error, Message = message, StackTrace = stackTrace });
                //    break;
                default:
                    error = "General Error.";
                    actionResult = new ObjectResult(new { Error = error, Message = message, StackTrace = stackTrace })
                    {
                        StatusCode = 500
                    };
                    break;
            }
            //context.ExceptionHandled = true;
            context.Result = actionResult;
        }
    }
}
