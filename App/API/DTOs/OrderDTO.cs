using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class OrderDTO
    {
        public string Id { get; set; }
        
        public int MemberID { get; set; }
        
        public DateTime OrderDate { get; set; }
        
        public string PayedWith { get; set; }
        
        public string Address { get; set; }
        
        public ICollection<OrderedItemDTO> Items { get; set; }

        public double TotalPrice { get; set; }
        
        
    }
}