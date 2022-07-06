using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        Task<OrderDTO> ConfirmOrder(Cart cart, string payment);

        Task<List<OrderDTO>> GetUserOrdersAsync(int userID);

        Task<OrderDTO> GetUserOrder(string id);
    }
}