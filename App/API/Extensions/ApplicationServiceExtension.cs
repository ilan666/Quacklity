using API.DataAccess;
using API.DataAccess.Repositories;
using API.Helpers;
using API.Interface;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlite(config.GetConnectionString("DefaultConnection")));

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IWhiskeyRepository, WhiskeyRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IRatingRepository, RatingRepository>();
            
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            return services;
        }
    }
}