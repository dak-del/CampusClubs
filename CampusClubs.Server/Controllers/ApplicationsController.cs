using Microsoft.AspNetCore.Mvc;
using CampusClubs.Server.Data;
using CampusClubs.Server.Models;
using CampusClubs.Server.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CampusClubs.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDBContext _db;
        public ApplicationsController(AppDBContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromBody] CreateApplicationDTO dto)
        {
            var app = new Application
            {
                UserID = dto.UserID,
                ClubID = dto.ClubID,
                Status = "Подано",
                Answers = dto.Answers.Select(a => new ApplicationAnswer { Question = a.Question, Answer = a.Answer }).ToList()
            };
            _db.Applications.Add(app);
            await _db.SaveChangesAsync();
            return Ok(new { id = app.ID, status = app.Status, message = "Заявка успешно подана" });
        }

        [HttpGet("user/{userID}")]
        public async Task<IActionResult> GetUserApplications(int userID)
        {
            var apps = await _db.Applications
                .Where(a => a.UserID == userID)
        .Select(a => new
        {
            a.ID,
            ClubName = a.Club != null ? a.Club.Name : "Неизвестно",
            a.Status,
            a.CreatedAt,
            Comment = _db.ApplicationHistories
                .Where(h => h.ApplicationID == a.ID)
                .OrderByDescending(h => h.ChangedAt)
                .Select(h => h.Comment)
                .FirstOrDefault()
        })
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync();
            return Ok(apps);
        }
        [HttpGet("ID")]
        public async Task<IActionResult> GetByID(int id) 
        {
            var club = await _db.Clubs.FindAsync(id);
            if (club == null) return NotFound();
            return Ok(new
            {
                club.ID, club.Name, club.Description, club.Direction, club.ContactInfo,

            });
        }
    }
}
