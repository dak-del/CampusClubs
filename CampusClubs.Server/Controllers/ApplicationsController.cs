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
            var existingApplication = await _db.Applications
        .FirstOrDefaultAsync(a =>
            a.UserID == dto.UserID &&
            a.ClubID == dto.ClubID &&
            (a.Status == "Submitted" || a.Status == "Reviewing" || a.Status == "Interview")
        );

            if (existingApplication != null)
            {
                return BadRequest(new
                {
                    message = "Вы уже подали заявку в этот клуб. Дождитесь рассмотрения.",
                    existingApplicationId = existingApplication.ID,
                    status = existingApplication.Status
                });
            }

            var isAlreadyMember = await _db.ClubMembers // Если OrganizationMembers, замените
        .AnyAsync(m => m.UserID == dto.UserID && m.ClubID == dto.ClubID);

            if (isAlreadyMember)
            {
                return BadRequest(new
                {
                    message = "Вы уже являетесь участником этого клуба."
                });
            }

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
            a.ClubID,
            OrganizationName = _db.Clubs
                .Where(c => c.ID == a.ClubID)
                .Select(c => c.Name)
                .FirstOrDefault() ?? "Неизвестно",
            a.Status,
            a.CreatedAt,
            Comment = (string)null
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
