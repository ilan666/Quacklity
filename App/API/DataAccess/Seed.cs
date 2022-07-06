using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public static class Seed
    {
        public static async Task SeedWhiskey(DataContext context)
        {
            if(await context.Whiskeys.AnyAsync()) return;

            var whiskeyData = await File.ReadAllTextAsync("DataAccess/WhiskeySeedData.JSON");

            var whiskeys = JsonSerializer.Deserialize<List<Whiskey>>(whiskeyData);

            foreach (var whiskey in whiskeys)
            {
                Random random = new Random();

                int FiveStarsResponses = random.Next(1, 400);
                int FourStarsResponses = random.Next(1, 400);
                int ThreeStarsResponses = random.Next(1, 200);
                int TwoStarsResponses = random.Next(1, 200);
                int OneStarResponses = random.Next(1, 200);

                int RatingCalc = FiveStarsResponses*5 + FourStarsResponses*4 + ThreeStarsResponses*3 + TwoStarsResponses*2 + OneStarResponses;
                int RatingResponses = FiveStarsResponses + FourStarsResponses + ThreeStarsResponses + TwoStarsResponses + OneStarResponses;

                whiskey.Quantity = random.Next(5, 50);
                whiskey.Rating_Count = RatingResponses;
                whiskey.Rating = RatingCalc / RatingResponses;
                

                context.Whiskeys.Add(whiskey);
            }

            await context.SaveChangesAsync();
        }
    }
}