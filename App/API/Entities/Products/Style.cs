namespace API.Entities.Products
{
    public class Style
    {
        public int Id { get; set; }

        public Whiskey Whiskey { get; set; }
        
        public int WhiskeyId { get; set; }

        public int Body { get; set; }
        
        public int Richness { get; set; }
        
        public int Smoke { get; set; }
        
        public int Sweetness { get; set; }
    }
}