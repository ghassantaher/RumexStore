using Microsoft.EntityFrameworkCore;
using RumexStore.Dal.EfStructures;
using RumexStore.Dal.Repos.Interfaces;
using RumexStore.Dal.Repos;
using RumexStore.Service.Filters;
using RumexStore.Dal.Initialization;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(config =>
{
    config.Filters.Add(new RumexStoreExceptionFilter(builder.Environment));
})
    .AddJsonOptions(x=>x.JsonSerializerOptions.ReferenceHandler=ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var allowedOrigins = builder.Configuration
   .GetSection("Allowed-Origins")
   .GetChildren()
   .Select(x => x.Value)
   .ToArray();
builder.Services.AddCors(options =>
options.AddPolicy(name: "CorsPolicy",
cfg => {
    cfg.AllowAnyHeader();
    cfg.AllowAnyMethod();
    cfg.WithOrigins(allowedOrigins);
}));

builder.Services.AddDbContext<StoreDbContext>(opts => {
    opts.UseSqlServer(
        builder.Configuration.GetConnectionString("RumexStoreConnection")
    //builder.Configuration["ConnectionStrings:RumexStoreConnection"]
    );
});
builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapMethods("/api/heartbeat", new[] { "HEAD" }, () => Results.Ok());
app.MapGet("/api/heartbeat-get", () => Results.Ok());
app.MapGet("/api/heartbeat-db", async (ICategoryRepo repo) =>
{
    var exists = await repo.CanConnectAsync();
    return Results.Ok();
    //var count = await repo.GetAllCountAsync();
    //if (count > 0) return Results.Ok();
    //else return Results.NotFound();
});
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    SampleDataInitializer.InitializeData(app);
};

app.Run();
