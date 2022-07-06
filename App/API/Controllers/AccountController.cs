using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DataAccess;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly ITokenService _token;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService token, IMapper mapper)
        {
            _mapper = mapper;
            _token = token;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users
            .Include(x => x.Photo)
            .SingleOrDefaultAsync(u => u.Email == loginDTO.Email.ToLower());

            if(user == null) return Unauthorized("Invalid email");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (var i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDTO
            {
                Username = user.FirstName + " " + user.LastName,
                Email = user.Email,
                Nickname = user.Nickname,
                Token = _token.CreateToken(user),
                PhotoUrl = user.Photo?.Url
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {
            using var hmac = new HMACSHA512();

            if (await UserExists(registerDto.Email)) return BadRequest("User already exists");

            var user = _mapper.Map<AppUser>(registerDto);

            user.FirstName = registerDto.FirstName;
            user.LastName = registerDto.LastName;
            user.Email = registerDto.Email.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;
            user.Nickname = registerDto.Nickname;

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new UserDTO 
            {
                Username = user.FirstName + " " + user.LastName,
                Email = user.Email,
                Nickname = registerDto.Nickname,
                Token = _token.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email.ToLower());
        }
    }
}