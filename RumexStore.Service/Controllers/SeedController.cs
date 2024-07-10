using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Information;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using RumexStore.Dal.EfStructures;
using RumexStore.Models.Entities;
using RumexStore.Models.Entities.Base;
using System;
using System.Diagnostics.Metrics;
using System.Dynamic;
using System.Security;
using Product = RumexStore.Models.Entities.Product;

namespace RumexStore.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly StoreDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<SeedController> _logger;

        public SeedController(
            StoreDbContext context,
            IWebHostEnvironment env,
            ILogger<SeedController> logger)
        {
            _context = context;
            _env = env;
            _logger=logger;
        }
        [HttpGet]
        public async Task<ActionResult> Import()
        {
            // prevents non-development environments from running this method
            if (!_env.IsDevelopment())
                throw new SecurityException("Not allowed");

            var path = System.IO.Path.Combine(
                _env.ContentRootPath,
                "Data/Source/products.xlsx");

            using var stream = System.IO.File.OpenRead(path);
            using var excelPackage = new ExcelPackage(stream);

            // get the first worksheet 
            var worksheet = excelPackage.Workbook.Worksheets[0];

            // define how many rows we want to process 
            var nEndRow = worksheet.Dimension.End.Row;

            // initialize the record counters 
            var numberOfCategoriesAdded = 0;
            var numberOfProductsAdded = 0;

            // create a lookup dictionary 
            // containing all the categories already existing 
            // into the Database (it will be empty on first run).
            var categoriesByName = _context.Categories
                .AsNoTracking()
                .ToDictionary(x => x.CategoryName, StringComparer.OrdinalIgnoreCase);

            // iterates through all rows, skipping the first one 
            for (int nRow = 2; nRow <= nEndRow; nRow++)
            {
                var row = worksheet.Cells[
                    nRow, 1, nRow, worksheet.Dimension.End.Column];
                if (!AcceptedSKU(nRow, row)) continue;
                string? categoryName = GetFirstCategoryName(nRow, row);
                if (string.IsNullOrEmpty(categoryName)) continue;

                // skip this category if it already exists in the database
                if (categoriesByName.ContainsKey(categoryName))
                    continue;

                // create the Category entity and fill it with xlsx data 
                var category = new Category
                {
                    CategoryName = categoryName,
                };

                //add the new category to the DB context 
                await _context.Categories.AddAsync(category);

                // store the category in our lookup to retrieve its Id later on
                categoriesByName.Add(categoryName, category);

                // increment the counter 
                numberOfCategoriesAdded++;
            }

            //save all the categories into the Database 
            if (numberOfCategoriesAdded > 0)
                await _context.SaveChangesAsync();

            // create a lookup dictionary
            // containing all the products already existing 
            // into the Database (it will be empty on first run). 
            var products = _context.Products
                .AsNoTracking()
                .ToDictionary(x => (
                    ModelName: x.Details.ModelName,
                    CurrentPrice: x.CurrentPrice,
                    ModelNumber: x.Details.ModelNumber,
                    CategoryId: x.CategoryId));

            // iterates through all rows, skipping the first one 
            for (int nRow = 2; nRow <= nEndRow; nRow++)
            {
                var row = worksheet.Cells[
                    nRow, 1, nRow, worksheet.Dimension.End.Column];

                if (!AcceptedSKU(nRow, row)) continue;
                var modelName = row[nRow, 7].GetValue<string>();
                var currentPrice = row[nRow, 14].GetValue<decimal>();
                var modelNumber = row[nRow, 1].GetValue<string>();
                string? categoryName = GetFirstCategoryName(nRow, row);
                if (string.IsNullOrEmpty(categoryName)) continue;
                string? base_image = row[nRow, 22].GetValue<string>();
                string? thumbnail_image = row[nRow, 26].GetValue<string>();
                string? images = row[nRow, 70].GetValue<string>();
                string? sizes = row[nRow, 71].GetValue<string>();
                string? colors = row[nRow, 72].GetValue<string>();
                var description = row[nRow, 8].GetValue<string>();
                var unitsInStock = row[nRow, 46].GetValue<int>();

                // retrieve category Id by categoryName
                var categoryId = categoriesByName[categoryName].Id;

                // skip this product if it already exists in the database
                if (products.ContainsKey((
                    ModelName: modelName,
                    CurrentPrice: currentPrice,
                    ModelNumber: modelNumber,
                    CategoryId: categoryId)))
                    continue;

                // create the Product entity and fill it with xlsx data 
                var product = new Product
                {
                    Details = new ProductDetails
                    {
                        ProductImage = base_image ?? "",
                        ProductImages = images ?? "",
                        ProductImageThumb = thumbnail_image ?? "",
                        ProductImageLarge = base_image ?? "",
                        ProductSizes= sizes ?? "",
                        ProductColors= colors ?? "",
                        ModelName = modelName,
                        Description = description,
                        ModelNumber = modelNumber,
                    },
                    CurrentPrice = currentPrice,
                    UnitsInStock = unitsInStock,
                    IsFeatured = getWeightedRandomNumber(0.2),
                    CategoryId = categoryId
                };

                //add the new product to the DB context 
                _context.Products.Add(product);

                // increment the counter 
                numberOfProductsAdded++;
            }

            // save all the products into the Database 
            if (numberOfProductsAdded > 0)
            {
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch(Exception ex)
                { var msg=ex.ToString();}
            }

            return new JsonResult(new
            {
                Products = numberOfProductsAdded,
                Categories = numberOfCategoriesAdded
            });
        }

        private bool getWeightedRandomNumber(double weight)
        {
            Random random = new Random();
            if (random.NextDouble() < weight)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private static string? GetFirstCategoryName(int nRow, ExcelRange row)
        {
            var categoryNames = row[nRow, 5].GetValue<string>();
            var firstFullCategory = categoryNames.Split(',').FirstOrDefault();
            var categoryName = firstFullCategory?.Split('/').LastOrDefault();
            return categoryName;
        }
        private static string? GetImages(int nRow, ExcelRange row)
        {
            var images = row[nRow, 29].GetValue<string>();
            images = String.Join(",", images.Split(',').Skip(1).ToArray());
            var length = images.Length;
            while (length > 150)
            {
                var newImages = images.Split(',');
                newImages = newImages.SkipLast(1).ToArray();
                images = String.Join(",", newImages);
                length = images.Length;
                //images= images.Split(',')
            }
            return images;
        }
        private static string? GetFirstImage(int nRow, ExcelRange row)
        {
            var images = row[nRow, 29].GetValue<string>();
            var firstImage = images.Split(',').FirstOrDefault();
            return firstImage;
        }

        private static bool AcceptedSKU(int nRow, ExcelRange row)
        {
            var sKU = row[nRow, 1].GetValue<string>();
            if (string.IsNullOrEmpty(sKU)) return false;
            var lastTwoChars = sKU.Substring(sKU.Length - 2);
            if (string.IsNullOrEmpty(lastTwoChars)) return false;
            if (!Char.IsDigit(lastTwoChars, 0)) return false;
            if (!Char.IsDigit(lastTwoChars, 1)) return false;
            return true;
        }
    }
}
