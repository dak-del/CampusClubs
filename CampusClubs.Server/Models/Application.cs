namespace CampusClubs.Server.Models
{
    public class Application
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int ClubID { get; set; }
        public string Status { get; set; } = "Подано"; // Значения: Подано, собеседование, собеседование, принято, отклонено 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
