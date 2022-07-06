using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MemberDTO
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string PhotoUrl { get; set; }
        
        public string Nickname { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime LastActive { get; set; }
        
        public string City { get; set; }
        
        public string Country { get; set; }
        
        public string Description { get; set; }
        
        public string Email { get; set; }

        public string Website { get; set; }

        public int Ratings { get; set; }
        
        public int Orders { get; set; }
        
        public string HomeAddress { get; set; }
        
        
    }
}