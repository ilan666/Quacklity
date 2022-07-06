using API.DTOs;
using API.Entities;
using AutoMapper;
using API.Extensions;
using API.Entities.Products;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDTO, AppUser>()
            .ForMember(dest => dest.Email,
                        opt => {
                            opt.MapFrom(src => src.Email.ToLower());
                        });

            CreateMap<AppUser, MemberDTO>()
            .ForMember(dest => dest.PhotoUrl,
                        opt => {
                            opt.MapFrom(src => src.Photo.Url);
                        })
            .ForMember(dest => dest.Age,
                        opt => {
                            opt.MapFrom(src => src.DateOfBirth.AgeCalculator());
                        })
            .ForMember(dest => dest.Ratings,
                        opt => {
                            opt.MapFrom(src => src.Ratings.Count);
                        })
            .ForMember(dest => dest.Orders,
                        opt => {
                            opt.MapFrom(src => src.Cart.CartItems.Count);
                        })
            .ForMember(dest => dest.Orders,
                            opt => {
                                opt.MapFrom(src => src.Orders.Count);
                            });

            CreateMap<Photo, PhotoDTO>();

            CreateMap<MemberUpdateDTO, AppUser>();

            CreateMap<Cart, CartDTO>()
            .ForMember(dest => dest.NumberOfItems,
                        opt => {
                            opt.MapFrom(src => src.CartItems.ProductsCount());
                        })
            .ForMember(dest => dest.TotalPrice,
                        opt => {
                            opt.MapFrom(src => src.CartItems.ProductsPriceCount());
                        });

            CreateMap<CartItem, CartItemDTO>();
                        
            CreateMap<Whiskey, WhiskeyDTO>();

            CreateMap<RatingDTO, Rating>();

            CreateMap<Style, StyleDTO>();

            CreateMap<OrderedItem ,OrderedItemDTO>();

            CreateMap<Order, OrderDTO>()
            .ForMember(dest => dest.Items,
                        opt => {
                            opt.MapFrom(src => src.Items);
                        })
            .ForMember(dest => dest.TotalPrice,
                        opt => {
                            opt.MapFrom(src => src.Items.OrderPriceCount());
                        });
        }
    }
}