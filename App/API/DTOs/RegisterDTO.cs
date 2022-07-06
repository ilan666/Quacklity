using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string Nickname { get; set; }
        
        [Required] 
        [StringLength(30, MinimumLength = 5, ErrorMessage = "You must specify password between 5 - 30 characters!")]
        public string Password { get; set; }
        
        [Required]
        public DateTime DateOfBirth { get; set; }
        // Gender
        // Favorite drinks
    }
}