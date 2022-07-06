using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using API.DTOs;
using AutoMapper;

namespace API.DataAccess
{
    public class CartRepository : ICartRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CartRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<CartItem> GetCartItemAsync(int productID, int cartID)
        {
            return await _context.ShoppingCartItems.Where(c => c.CartID == cartID)
            .SingleOrDefaultAsync(x => x.ID == productID);
        }

        public async Task<CartItem> GetCartItemWhiskeyAsync(int productID, int cartID)
        {
            return await _context.ShoppingCartItems.Where(c => c.CartID == cartID)
            .SingleOrDefaultAsync(x => x.Whiskey.Id == productID);
        }

        public async void AddItem(CartItem item)
        {
            await _context.ShoppingCartItems.AddAsync(item);
        }

        public void RemoveItem(CartItem item)
        {
            _context.ShoppingCartItems.Remove(item);
        }

        public async Task<Cart> GetCartAsync(int userID)
        {
            return await _context.Carts.SingleOrDefaultAsync(c => c.AppUserID == userID);
        }

        public async void AddNewCart(Cart cart)
        {
            await _context.Carts.AddAsync(cart);

            await SaveAllAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<CartItem>> GetCartItemsAsync(int cartID)
        {
            return await _context.ShoppingCartItems
            .Include(x => x.Whiskey)
            .Where(i => i.CartID == cartID)
            .ToListAsync();
        }
    }
}