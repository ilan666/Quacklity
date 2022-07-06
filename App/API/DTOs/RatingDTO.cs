using System;

namespace API.DTOs
{
    public class RatingDTO
    {
        public int UserId { get; set; }
        
        public int WhiskeyId { get; set; }
        
        public double Rate { get; set; }
        
        
    }
}