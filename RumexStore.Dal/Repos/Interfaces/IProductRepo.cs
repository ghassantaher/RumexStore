using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Repos.Base;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Repos.Interfaces
{
    public interface IProductRepo : IRepo<Product>
    {
        IList<Product> Search(string searchString);
        IList<Product> GetProductsForCategory(int id);
        IList<Product> GetFeaturedWithCategoryName();
        Task<ApiResult<Product>> GetAllWithCategoryName(int pageIndex = 0, int pageSize = 10, string? sortColumn = null, string? sortOrder = null, string? filterColumn = null, string? filterQuery = null);
        Product? GetOneWithCategoryName(int id);

    }
}
