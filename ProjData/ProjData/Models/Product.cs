﻿namespace ProjData.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal SalesPrice { get; set; }
        public decimal MRP { get; set; }
        public int CategoryId { get; set; }
    }
}
