using System.Collections.Generic;
using API.Entities;

namespace API.Extensions
{
    public static class CartDataExtension
    {
        public static int ProductsCount(this ICollection<CartItem> items)
        {
            int count = 0;

            foreach (var item in items)
            {
                count += item.Quantity;
            }

            return count;
        }

        public static double ProductsPriceCount(this ICollection<CartItem> items)
        {
            double price = 0;

            foreach (var item in items)
            {
                price += item.Price * item.Quantity;
            }

            return price;
        }

        public static double OrderPriceCount(this ICollection<OrderedItem> items)
        {
            double price = 0;

            foreach (var item in items)
            {
                price += item.Price * item.Quantity;
            }

            return price;
        }
    }
}