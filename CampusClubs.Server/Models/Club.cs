namespace CampusClubs.Server.Models
{
    public class Club
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Direction { get; set; } = string.Empty;
        public string ContactInfo {  get; set; } = string.Empty;
    }
}
