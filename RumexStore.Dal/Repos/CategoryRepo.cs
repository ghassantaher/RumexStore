using Microsoft.ApplicationInsights;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<Category> _logger;
        private readonly TelemetryClient _telemetryClient;
        public CategoryRepo(StoreDbContext context, ILogger<Category> logger, TelemetryClient telemetryClient) : base(context)
        {
            _logger = logger;
            _telemetryClient = telemetryClient;
        }

        internal CategoryRepo(DbContextOptions<StoreDbContext> options) : base(options)
        {
        }
        //public override IEnumerable<Category> GetAll() => base.GetAll(x => x.CategoryName);
        public override IEnumerable<Category> GetAll()
        {
            _logger.LogWarning("GetAll - Warning");
            _logger.LogInformation("GetAll - Information");
            _logger.LogDebug("GetAll - Debug");
            _logger.LogTrace("GetAll - Trace");
            _telemetryClient.TrackEvent("GetAll - EventTracked");
            return base.GetAll(x => x.CategoryName);
        }


    }
}
