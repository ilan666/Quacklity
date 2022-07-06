using System;

namespace API.Entities
{
    public class CartItem
    {
        public int ID { get; set; }
        
        public int CartID { get; set; }

        public DateTime DateAdded { get; set; }
        
        public Whiskey Whiskey { get; set; }
        
        public int Quantity { get; set; }

        public double Price { get; set; }
        
        
    }
}