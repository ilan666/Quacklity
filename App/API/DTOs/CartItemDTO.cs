using System;
using API.Entities;

namespace API.DTOs
{
    public class CartItemDTO
    {
        public int ID { get; set; }
        
        public int CartID { get; set; }

        public DateTime DateAdded { get; set; }
        
        public WhiskeyDTO Whiskey { get; set; }
    
        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}