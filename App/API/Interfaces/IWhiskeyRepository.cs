using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IWhiskeyRepository
    {
        Task<Whiskey> GetSingleWhiskeyAsync(int id);

         Task<PagedList<WhiskeyDTO>> GetAllWhiskeysAsync(PaginationParams paginationParams);

         Task<PagedList<WhiskeyDTO>> GetSortedWhiskeysAsync(PaginationParams paginationParams, string[] types);

         Task<List<WhiskeyDTO>> GetTopRatedWhiskeysAsync();

         Task<List<WhiskeyDTO>> GetUserRatedWhiskey(int userID);
    }
}