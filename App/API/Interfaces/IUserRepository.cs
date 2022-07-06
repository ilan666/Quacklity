using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
         void Update(AppUser user);

         Task<bool> SaveAllAsync();

         Task<AppUser> GetUserByIdAsync(int id);

         Task<AppUser> GetUserByEmailAsync(string email);

         Task<MemberDTO> GetMemberAsync(string username);
    }
}