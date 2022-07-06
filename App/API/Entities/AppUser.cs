using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }
        
        public byte[] PasswordHash { get; set; }
        
        public byte[] PasswordSalt { get; set; }

        public string HomeAddress { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        
        public string Nickname { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime LastActive { get; set; } = DateTime.Now;
        
        public string City { get; set; }
        
        public string Country { get; set; }
        
        public Photo Photo { get; set; }

        public string Description { get; set; }
        
        public string Email { get; set; }

        public string Website { get; set; }

        public Cart Cart { get; set; }
        
        public ICollection<Rating> Ratings { get; set; }
        
        public ICollection<Order> Orders { get; set; }
    }
}