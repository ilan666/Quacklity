using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WhiskeyController : BaseAPIController
    {
        private readonly IWhiskeyRepository _whiskeyRepository;

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public WhiskeyController(IWhiskeyRepository whiskeyRepository, IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _whiskeyRepository = whiskeyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<WhiskeyDTO>>> GetWhiskeyListData([FromQuery] PaginationParams paginationParams) //Pagination
        {
            var data = await _whiskeyRepository.GetAllWhiskeysAsync(paginationParams);
            Response.AddPaginationHeaders(
                data.CurrentPage,
                data.PageSize,
                data.TotalCount,
                data.TotalPages
            );

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WhiskeyDTO>> GetWhiskeyData(int id)
        {
            var whiskey = await _whiskeyRepository.GetSingleWhiskeyAsync(id);

            return Ok(_mapper.Map<WhiskeyDTO>(whiskey));
        }

        [HttpGet("top")]
        public async Task<ActionResult<List<WhiskeyDTO>>> GetTopRated()
        {
            var data = await _whiskeyRepository.GetTopRatedWhiskeysAsync();

            return Ok(data);
        }

        [HttpPost("types")]
        public async Task<ActionResult<PagedList<WhiskeyDTO>>> GetSortedWhiskeyData([FromQuery] PaginationParams paginationParams, string[] types)
        {
            // Filtering feature: Currently not working

            var data = await _whiskeyRepository.GetSortedWhiskeysAsync(paginationParams, types);
            Response.AddPaginationHeaders(
                data.CurrentPage,
                data.PageSize,
                data.TotalCount,
                data.TotalPages
            );

            return Ok(data);
        }

        [Authorize]
        [HttpGet("user-rates")]
        public async Task<ActionResult<List<WhiskeyDTO>>> GetUserRatedWhiskey()
        {
            var userID = User.GetUserId();

            var data = await _whiskeyRepository.GetUserRatedWhiskey(userID);

            return Ok(data);
        }
    }
}