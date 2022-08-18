using Microsoft.EntityFrameworkCore;
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
    public class CategoryRepo : RepoBase<Category>, ICategoryRepo
    {
        public CategoryRepo(StoreDbContext context) : base(context)
        {
        }

        internal CategoryRepo(DbContextOptions<StoreDbContext> options) : base(options)
        {
        }
        public override IEnumerable<Category> GetAll() => base.GetAll(x => x.CategoryName);


    }
}
