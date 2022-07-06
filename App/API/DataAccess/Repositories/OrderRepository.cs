using System;
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

namespace API.DataAccess
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrderRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<OrderDTO> ConfirmOrder(Cart cart, string payment)
        {
            var cartItems = await _context.ShoppingCartItems
            .Include(x => x.Whiskey)
            .Where(i => i.CartID == cart.Id)
            .ToListAsync();

            var order = new Order
            {
                Id = System.Guid.NewGuid().ToString(),
                AppUser = cart.AppUser,
                AppUserId = cart.AppUserID,
                OrderDate = DateTime.Now,
                PayedWith = payment,
                Address = $"{cart.AppUser.Country}, {cart.AppUser.City}, {cart.AppUser.HomeAddress}",
            };

            await _context.Orders.AddAsync(order);

            foreach (var item in cartItems)
            {
                var orderItem = new OrderedItem{
                    OrderID = order.Id,
                    DateAdded = item.DateAdded,
                    Whiskey = item.Whiskey,
                    Quantity = item.Quantity,
                    Price = item.Price
                };

                await _context.OrderedItems.AddAsync(orderItem);
                order.Items.Add(orderItem);
            }

            _context.Carts.Remove(cart);

            return _mapper.Map<OrderDTO>(order);
        }

        public async Task<List<OrderDTO>> GetUserOrdersAsync(int userID)
        {
            var orders = await _context.Orders
            .Include(x => x.Items)
            .Where(order => order.AppUserId == userID)
            .ProjectTo<OrderDTO>(_mapper.ConfigurationProvider)
            .OrderByDescending(x => x.OrderDate)
            .ToListAsync();

            return orders;
        }

        public async Task<OrderDTO> GetUserOrder(string id)
        {
            var order = await _context.Orders
            .Include(x => x.Items)
            .SingleOrDefaultAsync(order => order.Id == id);

            var OrderItems = await GetOrderItemsAsync(order);

            foreach (var item in OrderItems)
            {
                order.Items.Add(item);
            }

            return _mapper.Map<OrderDTO>(order);
        }

        private async Task<List<OrderedItem>> GetOrderItemsAsync(Order order)
        {
            return await _context.OrderedItems
            .Include(x => x.Whiskey)
            .Where(details => details.OrderID == order.Id)
            .ToListAsync();
        }
    }
}