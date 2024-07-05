using RumexStore.Dal.EfStructures;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Dal.Tests.Helpers
{
    public static class EFHelper
    {
        public static Category CreateACategory(this StoreDbContext context, string name)
        {
            var category = new Category { CategoryName = name };
            context.Categories.Add(category);
            context.SaveChanges();
            return category;
        }
    }
}
