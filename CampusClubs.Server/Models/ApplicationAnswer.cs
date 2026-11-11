namespace CampusClubs.Server.Models
{
    public class ApplicationAnswer
    {
        public int ID { get; set; }
        public int ApplicationID { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}
