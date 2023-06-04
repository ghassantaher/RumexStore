using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Repos.Base;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Repos
{
    public class ProductRepo : RepoBase<Product>, IProductRepo
    {
        public ProductRepo(StoreDbContext context) : base(context)
        {
        }

        internal ProductRepo(DbContextOptions<StoreDbContext> options) : base(options)
        {
        }

        public override IEnumerable<Product> GetAll() => base.GetAll(x => x.Details.ModelName);

        public IList<Product> Search(string searchString)
            => Table.Where(p => EF.Functions.Like(p.Details.Description, $"%{searchString}%")
                                || EF.Functions.Like(p.Details.ModelName, $"%{searchString}%"))
                .Include(p => p.CategoryNavigation)
                .OrderBy(x => x.Details.ModelName)
                .ToList();

        public IList<Product> GetProductsForCategory(int id)
            => Table.Where(p => p.CategoryId == id)
                .Include(p => p.CategoryNavigation)
                .OrderBy(x => x.Details.ModelName)
                .ToList();

        public IList<Product> GetFeaturedWithCategoryName()
            => Table.Where(p => p.IsFeatured)
                .Include(p => p.CategoryNavigation)
                .OrderBy(x => x.Details.ModelName)
                .ToList();
        public async Task<ApiResult<Product>> GetAllWithCategoryName(int pageIndex = 0, int pageSize = 10)
            => await ApiResult<Product>.CreateAsync(Table, pageIndex, pageSize);

        public Product? GetOneWithCategoryName(int id)
            => Table.Where(p => p.Id == id)
                .Include(p => p.CategoryNavigation)
                .FirstOrDefault();
    }
}
