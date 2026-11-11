namespace CampusClubs.Server.Models
{
    public class User
    {
        public int ID { get; set; }
        public string FullName {  get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
