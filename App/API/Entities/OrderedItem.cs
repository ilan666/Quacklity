using System;

namespace API.Entities
{
    public class OrderedItem
    {
        public int ID { get; set; }
        
        public string OrderID { get; set; }

        public DateTime DateAdded { get; set; }
        
        public Whiskey Whiskey { get; set; }
        
        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}