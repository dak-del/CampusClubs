namespace CampusClubs.Server.Models
{
    public class ClubMember
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int ClubID { get; set; }
        public int RoleID { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.Now;
    }
}
