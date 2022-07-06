using System;

namespace API.DTOs
{
    public class OrderedItemDTO
    {
        public int ID { get; set; }
        
        public string OrderID { get; set; }

        public DateTime DateAdded { get; set; }
        
        public WhiskeyDTO Whiskey { get; set; }
        
        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}