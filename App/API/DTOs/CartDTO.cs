using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CartDTO
    {
        public int ID { get; set; }
        
        public ICollection<CartItemDTO> CartItems { get; set; }

        public int NumberOfItems { get; set; }

        public DateTime DateCreated { get; set; }
        
        public double TotalPrice { get; set; }
    }
}