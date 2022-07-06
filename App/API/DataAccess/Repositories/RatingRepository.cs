using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class RatingRepository : IRatingRepository
    {
        private readonly DataContext _context;
        public RatingRepository(DataContext context)
        {
            _context = context;

        }
        public void AddRating(Rating rating)
        {
            if(_context.Ratings.Any(rate => rate.UserId == rating.UserId && rate.WhiskeyId == rating.WhiskeyId))
            {
                RemoveRating(rating);
            }
            
            _context.Ratings.Add(rating);

            var ratedWhiskey = _context.Whiskeys.Find(rating.WhiskeyId);

            ratedWhiskey.Rating_Count++;
            ratedWhiskey.CurrentUserRating = rating.Rate;
            ratedWhiskey.DateRated = DateTime.Now;
        }

        public void RemoveRating(Rating rating)
        {
            if(!_context.Ratings.Any(rate => rate.UserId == rating.UserId && rate.WhiskeyId == rating.WhiskeyId))
            {
                return;
            }

            var existingRate = _context.Ratings.SingleOrDefault(r => r.UserId == rating.UserId && r.WhiskeyId == rating.WhiskeyId);

            var ratedWhiskey = _context.Whiskeys.Find(existingRate.WhiskeyId);

            ratedWhiskey.Rating_Count--;
            ratedWhiskey.CurrentUserRating = 0;
            ratedWhiskey.DateRated = DateTime.MinValue;

            _context.Ratings.Remove(existingRate);
        }

        public async Task<List<Rating>> getUserRates(int userID)
        {
            return await _context.Ratings.Where(u => u.UserId == userID).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}