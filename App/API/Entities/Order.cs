using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Order
    {
        public string Id { get; set; }

        public AppUser AppUser { get; set; }
        
        public int AppUserId { get; set; }
        
        public DateTime OrderDate { get; set; }
        
        public string PayedWith { get; set; }
        
        public string Address { get; set; }
        
        public ICollection<OrderedItem> Items { get; set; }
    }
}