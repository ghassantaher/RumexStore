using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Models.Entities;

namespace RumexStore.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo _repo;

        public ProductController(IProductRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Gets a single product with category name.
        /// </summary>
        /// <param name="id">Primary Key of the product to retrieve</param>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Product/5
        /// </remarks>
        /// <returns>Single Product</returns>
        /// <response code="200">Returns single Product.</response>
        /// <response code="404">Returned when Product with specific id doesn't exist.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet("{id}", Name = "GetProduct")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<Product> Get(int id)
        {
            var item = _repo.GetOneWithCategoryName(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        /// <summary>
        /// Get all featured Products with Category Name.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///     GET /api/featured
        /// </remarks>
        /// <returns>List of all featured Products with Category Name.</returns>
        /// <response code="200">Returns featured Products.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet("featured", Name = "GetFeaturedProducts")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public ActionResult<IList<Product>> GetFeatured()
          => Ok(_repo.GetFeaturedWithCategoryName().ToList());


        ///// <summary>
        ///// Get all Products with Category Name.
        ///// </summary>
        ///// <remarks>
        ///// Sample request:
        /////     GET /api/products/all
        ///// </remarks>
        ///// <returns>List of all Products with Category Name.</returns>
        ///// <response code="200">Returns all Products.</response>
        ///// <response code="500">Returned when there was an error in the repo.</response>
        //[HttpGet("all", Name = "GetAllProducts")]
        //[Produces("application/json")]
        //[ProducesResponseType(200)]
        //[ProducesResponseType(500)]
        //public ActionResult<IList<Product>> GetAllProducts()
        //  => Ok(_repo.GetAllProducts().ToList());

        /// <summary>
        /// Get all products.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Products
        /// </remarks>
        /// <returns>List of all products</returns>
        /// <response code="200">Returns products.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet(Name = "GetAllProducts")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public ActionResult<IList<Product>> Get()
        {
            IEnumerable<Product> products = _repo.GetallWithCategoryName().ToList();
            return Ok(products);
        }

    }
}
