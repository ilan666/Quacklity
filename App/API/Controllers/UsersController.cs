using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interface;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseAPIController
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepo, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepo = userRepo;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepo.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            _mapper.Map(memberUpdateDTO, user);

            _userRepo.Update(user);

            if(await _userRepo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to update data");
        }

        [HttpGet("{email}", Name = "GetUser")]
        public async Task<ActionResult<MemberDTO>> GetUser(string email)
        {
            return await _userRepo.GetMemberAsync(email);
        }

        [HttpPost("upload-photo")]
        public async Task<ActionResult<PhotoDTO>> UploadPhoto(IFormFile file)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepo.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            var result = await _photoService.UploadPhotoAsync(file);

            if(result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicID = result.PublicId
            };

            user.Photo = photo;

            if(await _userRepo.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { email = user.Email }, _mapper.Map<PhotoDTO>(photo));
            }

            return BadRequest("Failed to upload photo");
        }
    }
}