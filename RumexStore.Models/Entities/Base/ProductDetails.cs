using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RumexStore.Models.Entities.Base
{
    [Owned]
    public class ProductDetails
    {
        [MaxLength(3800)] public string Description { get; set; } = string.Empty;
        [MaxLength(50)] public string ModelNumber { get; set; } = string.Empty;
        [MaxLength(50)] public string ModelName { get; set; } = string.Empty;
        [MaxLength(150)] public string ProductImage { get; set; } = string.Empty;
        [MaxLength(150)] public string ProductImageLarge { get; set; } = string.Empty;
        [MaxLength(150)] public string ProductImageThumb { get; set; } = string.Empty;
    }
}
