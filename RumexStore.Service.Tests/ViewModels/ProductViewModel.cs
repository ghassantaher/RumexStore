using RumexStore.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Service.Tests.ViewModels
{
    public class ProductViewModel : Product
    {
        public new string? CategoryName { get; set; }
    }
}
