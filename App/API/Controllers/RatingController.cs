using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class RatingController : BaseAPIController
    {
        private readonly IRatingRepository _rateRepo;
        private readonly IMapper _mapper;
        public RatingController(IRatingRepository rateRepo, IMapper mapper)
        {
            _mapper = mapper;
            _rateRepo = rateRepo;
        }

        [HttpPut]
        public async Task<ActionResult> AddRating(RatingDTO ratingDTO)
        {
            var mappedRating = _mapper.Map<Rating>(ratingDTO);

            _rateRepo.AddRating(mappedRating);

            if(await _rateRepo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Rating system failure");
        }

        [HttpDelete("remove-rate/{whiskeyID}")]
        public async Task<ActionResult> RemoveRating(int whiskeyID)
        {
            var userRates = await _rateRepo.getUserRates(User.GetUserId());

            foreach (var item in userRates)
            {
                if(item.WhiskeyId == whiskeyID)
                {
                    _rateRepo.RemoveRating(item);
                    if(await _rateRepo.SaveAllAsync())
            {
                return NoContent();
            }
                }
            }

            if(await _rateRepo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Rating system failure");
        }

        [HttpGet]
        public async Task<ActionResult<List<RatingDTO>>> getUserRates()
        {
            var userId = User.GetUserId();

            var data = await _rateRepo.getUserRates(userId);

            return Ok(data);
        }
    }
}