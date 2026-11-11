namespace CampusClubs.Server.DTOs
{
    public class CreateApplicationDTO
    {
        public int UserID { get; set; }
        public int ClubID { get; set; }
        public List<AnswerDTO> Answers { get; set; } = new();
    }
}
