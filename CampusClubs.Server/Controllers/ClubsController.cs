using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CampusClubs.Server.Data; 
using CampusClubs.Server.Models;

namespace CampusClubs.Server.Controllers;

[ApiController]
[Route("api/clubs")]
public class ClubsController : ControllerBase
{
    private readonly AppDBContext _db;

    public ClubsController(AppDBContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clubs = await _db.Clubs
            .Select(c => new
            {
                c.ID,
                c.Name,
                c.Description,
                c.Direction,
                c.ContactInfo
            })
            .ToListAsync();

        return Ok(clubs);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var club = await _db.Clubs.FindAsync(id);
        if (club == null) return NotFound("Клуб не найден");

        return Ok(new
        {
            club.ID,
            club.Name,
            club.Description,
            club.Direction,
            club.ContactInfo,
            Questions = new[] {
                new { id = 1, text = "Почему вы хотите вступить в наш клуб?" },
                new { id = 2, text = "Какой у вас есть релевантный опыт?" }
            }
        });
    }
    [HttpGet("{userId}/clubs/{clubId}/status")]
    public async Task<IActionResult> GetClubStatus(int userId, int clubId)
    {
        try
        {
            var member = await _db.ClubMembers
                .FirstOrDefaultAsync(m => m.UserID == userId && m.ClubID == clubId);

            if (member != null)
            {
                var role = await _db.Roles.FindAsync(member.RoleID);
                string roleName = role?.Name ?? "Member";
                return Ok(new { status = roleName == "President" ? "leader" : "member" });
            }

            var hasApplication = await _db.Applications
                .AnyAsync(a => a.UserID == userId && a.ClubID == clubId &&
                              (a.Status == "Submitted" || a.Status == "Reviewing" || a.Status == "Interview"));

            if (hasApplication)
            {
                return Ok(new { status = "applicant" });
            }

            return Ok(new { status = "guest" });
        }
        catch
        {
            return Ok(new { status = "guest" });
        }
    }
}
