namespace CampusClubs.Server.Models
{
    public class ApplicationHistory
    {
        public int ID { get; set; }

        public int ApplicationID { get; set; }
        public Application Application { get; set; } = null!;

        public string Status { get; set; } = string.Empty;
        public string? Comment { get; set; } 
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    }
}
