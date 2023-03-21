using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Models.Entities;

namespace RumexStore.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepo _repo;

        public CategoryController(ICategoryRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Get all categories.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Categories
        /// </remarks>
        /// <returns>List of all categories</returns>
        /// <response code="200">Returns categories.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet(Name = "GetAllCategories")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public ActionResult<IList<Category>> Get()
        {
            IEnumerable<Category> categories = _repo.GetAll().ToList();
            //var newCategories=categories.Prepend(new Category { Id = 10008, Products = null, CategoryName = "Featured 8" });
            //newCategories = newCategories.Prepend(new Category { Id = 10007, Products = null, CategoryName = "Featured 7" });
            //newCategories = newCategories.Prepend(new Category { Id = 10006, Products = null, CategoryName = "Featured 6" });
            //newCategories = newCategories.Prepend(new Category { Id = 10005, Products = null, CategoryName = "Featured 5" });
            //newCategories = newCategories.Prepend(new Category { Id = 10004, Products = null, CategoryName = "Featured 4" });
            //newCategories = newCategories.Prepend(new Category { Id = 10003, Products = null, CategoryName = "Featured 3" });
            //newCategories = newCategories.Prepend(new Category { Id = 10002, Products = null, CategoryName = "Featured 2" });
            //newCategories = newCategories.Prepend(new Category { Id = 10001, Products = null, CategoryName = "Featured 1" });
            //newCategories = newCategories.Append(new Category { Id = 10011, Products = null, CategoryName = "Privacy-policy" });
            //newCategories = newCategories.Append(new Category { Id = 10012, Products = null, CategoryName = "All Departments" });
            return Ok(categories);
        }

        /// <summary>
        /// Gets a single category.
        /// </summary>
        /// <param name="id">Primary Key of the category to retrieve</param>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Categories/5
        /// </remarks>
        /// <returns>Single Category</returns>
        /// <response code="200">Returns single Category.</response>
        /// <response code="404">Returned when Category with specific id doesn't exist.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet("{id}", Name = "GetCategory")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<Category> Get(int id)
        {
            var item = _repo.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        /// <summary>
        /// Gets all product for a single category.
        /// </summary>
        /// <param name="categoryId">Primary Key of the category to retrieve</param>
        /// <remarks>
        /// Sample request:
        ///     GET /api/Categories/5/products
        /// </remarks>
        /// <returns>List of all products in a category</returns>
        /// <response code="200">Returns all products for a single category.</response>
        /// <response code="500">Returned when there was an error in the repo.</response>
        [HttpGet("{categoryId}/products", Name = "GetCategoryProducts")]
        [Produces("application/json")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public ActionResult<IList<Product>> GetProductsForCategory([FromServices] IProductRepo productRepo, int categoryId)
            => productRepo.GetProductsForCategory(categoryId).ToList();
    }
}
