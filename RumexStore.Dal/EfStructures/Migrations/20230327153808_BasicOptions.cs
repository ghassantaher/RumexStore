using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RumexStore.Dal.EfStructures.Migrations
{
    public partial class BasicOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Details_ProductColors",
                schema: "Store",
                table: "Products",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Details_ProductImages",
                schema: "Store",
                table: "Products",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Details_ProductSizes",
                schema: "Store",
                table: "Products",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Details_ProductColors",
                schema: "Store",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Details_ProductImages",
                schema: "Store",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Details_ProductSizes",
                schema: "Store",
                table: "Products");
        }
    }
}
