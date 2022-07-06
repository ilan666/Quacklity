using API.Entities;
using API.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options) { }
        public DbSet<AppUser> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Whiskey> Whiskeys { get; set; }

        public DbSet<CartItem> ShoppingCartItems { get; set; }

        public DbSet<Cart> Carts { get; set; }
        
        public DbSet<Rating> Ratings { get; set; }

        public DbSet<Style> Styles { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderedItem> OrderedItems { get; set; }
    }
}