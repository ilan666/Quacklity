using System;
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
    public class OrdersController : BaseAPIController
    {
        private readonly IUserRepository _userRepository;
        private readonly IWhiskeyRepository _whiskeyRepository;
        private readonly IMapper _mapper;
        private readonly ICartRepository _cartRepository;
        private readonly IOrderRepository _orderRepository;
        public OrdersController(IUserRepository userRepository, IWhiskeyRepository whiskeyRepository, IMapper mapper, ICartRepository cartRepository, IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _mapper = mapper;
            _whiskeyRepository = whiskeyRepository;
            _userRepository = userRepository;
        }

        [HttpPut("add/{id}")]
        public async Task<ActionResult> AddToCart(int id)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            var whiskey = await _whiskeyRepository.GetSingleWhiskeyAsync(id);

            var currentUserCart = await _cartRepository.GetCartAsync(user.Id);

            if (currentUserCart == null)
            {
                currentUserCart = new Cart
                {
                    AppUser = user,
                    DateCreated = DateTime.Now,
                };

                _cartRepository.AddNewCart(currentUserCart);

                if (await _cartRepository.SaveAllAsync())
                {
                    return NoContent();
                }
            }

            var currentWhiskey = await _cartRepository.GetCartItemWhiskeyAsync(id, currentUserCart.Id);

            if (currentWhiskey == null)
            {
                var product = new CartItem
                {
                    Quantity = 1,
                    DateAdded = DateTime.Now,
                    CartID = currentUserCart.Id,
                    Whiskey = whiskey,
                    Price = whiskey.Price
                };

                _cartRepository.AddItem(product);
                currentUserCart.CartItems.Add(product);

                if (await _cartRepository.SaveAllAsync())
                {
                    return NoContent();
                }
            }
            else
            {
                currentWhiskey.Quantity++;
            }

            if (await _cartRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Couldn't add item to the cart");
        }

        [HttpPut("decrease/{id}")]
        public async Task<ActionResult> DecreaseItemQuantity(int id)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            var currentUserCart = await _cartRepository.GetCartAsync(user.Id);
            var currentWhiskey = await _cartRepository.GetCartItemAsync(id, currentUserCart.Id);

            if(currentWhiskey.Quantity > 1)
            {
                currentWhiskey.Quantity--;
            }
            else
            {
                await RemoveFromCart(currentWhiskey.ID);
            }
            if(await _cartRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to decrease item quantity");
        }

        [HttpPut("increase/{id}")]
        public async Task<ActionResult> IncreaseItemQuantity(int id)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            var currentUserCart = await _cartRepository.GetCartAsync(user.Id);
            var currentWhiskey = await _cartRepository.GetCartItemAsync(id, currentUserCart.Id);

            currentWhiskey.Quantity++;

            if(await _cartRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to increase item quantity");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFromCart(int id)
        {
            var userEmail = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(userEmail);

            if(user == null)
            {
                return Unauthorized();
            }

            var currentUserCart = await _cartRepository.GetCartAsync(user.Id);
            var currentWhiskey = await _cartRepository.GetCartItemAsync(id, currentUserCart.Id);

            _cartRepository.RemoveItem(currentWhiskey);

            if(await _cartRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to remove item from cart");
        }

        [HttpGet("carts/{userId}")]
        public async Task<ActionResult<Cart>> GetCart(int userId)
        {
            var foundCart = await _cartRepository.GetCartAsync(userId);

            if (foundCart == null) return null;

            var cartItems = await _cartRepository.GetCartItemsAsync(foundCart.Id);

            foreach (var item in cartItems)
            {
                foundCart.CartItems.Add(item);
            }

            return Ok(_mapper.Map<CartDTO>(foundCart));
        }

        [HttpPut("checkout")]
        public async Task<ActionResult<OrderDTO>> Checkout()
        {
            var email = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(email);

            if(user == null)
            {
                return Unauthorized();
            }

            var cart = await _cartRepository.GetCartAsync(user.Id);

            if(cart == null)
            {
                return BadRequest("No cart to proccess");
            }

            if(cart.AppUser.Country == null || cart.AppUser.City == null || cart.AppUser.HomeAddress == null)
            {
                return BadRequest("One or more billing data fields is missing");
            }

            var order = await _orderRepository.ConfirmOrder(cart, "Temporary payment");

            if(await _userRepository.SaveAllAsync())
            {
                return Ok(order);
            }

            return BadRequest("Failed to confirm order");
        }

        [HttpGet("Orders")]
        public async Task<ActionResult<List<OrderDTO>>> GetUserOrders()
        {
            string email = User.GetEmail();
            var user = await _userRepository.GetUserByEmailAsync(email);

            if(user == null)
            {
                return Unauthorized();
            }

            var orders = await _orderRepository.GetUserOrdersAsync(user.Id);

            if(orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetUserOrder(string id)
        {
            var order = await _orderRepository.GetUserOrder(id);

            if(order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
    }
}