using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities.Products;

namespace API.Entities
{
    public class Whiskey
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int Age { get; set; }
        
        public string Bottler { get; set; }
        
        public string Type { get; set; }
        
        public string PhotoUrl { get; set; }
        
        public double Price { get; set; }
        
        public string Region { get; set; }
        
        public float Rating { get; set; }
        
        public int Rating_Count { get; set; }
        
        public string Cask_Type { get; set; }

        [NotMapped]
        public string[] Characteristics { get; set; }
        
        public string Colouring { get; set; }
        
        public string Age_Statement { get; set; }
        
        public double Proof { get; set; }

        public Style Style { get; set; }
        
        public int Quantity { get; set; }

        public double CurrentUserRating { get; set; }
        
        public DateTime DateRated { get; set; }
    }
}