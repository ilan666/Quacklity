using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeaders(this HttpResponse response,
                                                int currentPage,
                                                int itemsPerPage,
                                                int totalItems,
                                                int totalPages)
        {
            var paginationHeaders = new PaginationHeaders(currentPage, itemsPerPage, totalItems, totalPages);

            var options = new JsonSerializerOptions{
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeaders, options));

            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}