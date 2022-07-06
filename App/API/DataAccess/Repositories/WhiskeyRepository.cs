using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess.Repositories
{
    public class WhiskeyRepository : IWhiskeyRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WhiskeyRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Whiskey> GetSingleWhiskeyAsync(int id)
        {
            var whiskey = await _context.Whiskeys
                                                .Include(x => x.Style)
                                                .SingleOrDefaultAsync(b => b.Id == id);

            return whiskey;
        }

        public async Task<PagedList<WhiskeyDTO>> GetAllWhiskeysAsync(PaginationParams paginationParams)
        {
            var data = _context.Whiskeys.Include(x => x.Style).AsQueryable();

            return await PagedList<WhiskeyDTO>.CreateAsync
            (
                data.ProjectTo<WhiskeyDTO>(_mapper.ConfigurationProvider).AsNoTracking(),
                paginationParams.PageNumber,
                paginationParams.PageSize
            );
        }

        public async Task<PagedList<WhiskeyDTO>> GetSortedWhiskeysAsync(PaginationParams paginationParams, string[] types)
        {
            // this need to be fixed

            var data = _context.Whiskeys.AsQueryable();

            return await PagedList<WhiskeyDTO>.CreateAsync
            (
                data.ProjectTo<WhiskeyDTO>(_mapper.ConfigurationProvider).AsNoTracking(),
                paginationParams.PageNumber,
                paginationParams.PageSize
            );
        }

        public async Task<List<WhiskeyDTO>> GetTopRatedWhiskeysAsync()
        {
            return await _context.Whiskeys.OrderByDescending(b => b.Rating_Count)
                                          .Take(3)
                                          .Include(x => x.Style)
                                          .ProjectTo<WhiskeyDTO>(_mapper.ConfigurationProvider)
                                          .OrderByDescending(b => b.Rating_Count)
                                          .ToListAsync();
        }

        public async Task<List<WhiskeyDTO>> GetUserRatedWhiskey(int userID)
        {
            var userRates = await _context.Ratings.Where(u => u.UserId == userID).ToListAsync();

            var whiskeys = new List<WhiskeyDTO>();
            
            foreach (var rate in userRates)
            {
                var whiskey = await _context.Whiskeys.SingleOrDefaultAsync(b => b.Id == rate.WhiskeyId);

                whiskeys.Add(_mapper.Map<WhiskeyDTO>(whiskey));
            }

            return whiskeys;
        }
    }
}