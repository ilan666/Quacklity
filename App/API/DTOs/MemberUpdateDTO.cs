using API.Entities;

namespace API.DTOs
{
    public class MemberUpdateDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Nickname { get; set; }

        public string Description { get; set; }

        public string Website { get; set; }
        
        public string Email { get; set; }

        public string Country { get; set; }
        
        public string City { get; set; }
        
        public string Name { get; set; }
        
        public string HomeAddress { get; set; }
        
        
    }
}