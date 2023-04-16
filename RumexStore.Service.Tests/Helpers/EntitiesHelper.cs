using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Service.Tests.Helpers
{
    public class EntitiesHelper
    {
        public static void AddProducts(StoreDbContext context,int categoryId, int productStartId, int productEndId, bool isFeatured=false)
        {
            context.Add(
                new Category
                {
                    Id = categoryId,
                    CategoryName = $"cat-{categoryId}",
                    TimeStamp = Array.Empty<byte>(),
                    Products = new List<Product>()
                });
            for (int i = productStartId; i <= productEndId; i++)
            {
                context.Add(new Product()
                {
                    Id = i,
                    CategoryId = categoryId,
                    Details = new Models.Entities.Base.ProductDetails
                    {
                        ModelName = $"Product title-{i}",
                        Description = $"Product description {i}",
                        ModelNumber = $"Product number {i}"
                    },
                    CurrentPrice = i,
                    IsFeatured=isFeatured,
                    TimeStamp = Array.Empty<byte>()
                });
            }
            context.SaveChanges();
        }
        public static void ClearProducts(StoreDbContext context)
        {
            context.Database.EnsureDeleted();
        }

    }
}
