using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICartRepository
    {
        Task<CartItem> GetCartItemAsync(int id , int cartID);

        void AddItem(CartItem item);

        Task<bool> SaveAllAsync();

        Task<Cart> GetCartAsync(int id);

        Task<List<CartItem>> GetCartItemsAsync(int cartID);

        void AddNewCart(Cart cart);

        void RemoveItem(CartItem item);

        Task<CartItem> GetCartItemWhiskeyAsync(int productID, int cartID);
    }
}