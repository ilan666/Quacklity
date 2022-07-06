using System;

namespace API.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        
        public AppUser User { get; set; }
        public int UserId { get; set; }
        
        public Whiskey Whiskey { get; set; }
        public int WhiskeyId { get; set; }

        public double Rate { get; set; }
        
        
    }
}