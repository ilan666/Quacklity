using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public async Task<MemberDTO> GetMemberAsync(string email)
        {
            return await _context.Users.Where(m => m.Email.ToLower() == email.ToLower())
            .Include(r => r.Ratings)
            .Include(o => o.Orders)
            .Include(c => c.Cart)
            .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users.Include(x => x.Photo).SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry<AppUser>(user).State = EntityState.Modified;
        }
    }
}