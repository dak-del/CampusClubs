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
                Status = "Подано"
            };
            _db.Applications.Add(app);
            await _db.SaveChangesAsync();
            return Ok(new {id = app.ID, status = app.Status, message = "Заявка успешно подана"});
        }

        [HttpGet("user/{userID}")]
        public async Task<IActionResult> GetUserApplications(int userID)
        {
            var apps = await _db.Applications
                .Include(a => a.ClubID)
                .Where(a => a.UserID == userID)
                .Select(a => new
                {
                    a.ID,
                    ClubName = _db.Clubs.FirstOrDefault(c => c.ID == a.ClubID)!.Name,
                    a.Status,
                    a.CreatedAt
                })
                .ToListAsync();
            return Ok(apps);
        }
    }
}
