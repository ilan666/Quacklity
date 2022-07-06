using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IRatingRepository
    {
        void AddRating(Rating rating);

        void RemoveRating(Rating rating);

        Task<List<Rating>> getUserRates(int userID);

        Task<bool> SaveAllAsync();
    }
}