using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CampusClubs.Server.Data;

namespace CampusClubs.Server.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly AppDBContext _db;

    public UsersController(AppDBContext db)
    {
        _db = db;
    }

    [HttpGet("{userId}/memberships")]
    public async Task<IActionResult> GetMemberships(int userId)
    {
        try
        {
            var memberships = await _db.ClubMembers
                .Where(m => m.UserID == userId)
                .Select(m => new
                {
                    m.ID,
                    m.ClubID,
                    ClubName = _db.Clubs
                        .Where(o => o.ID == m.ClubID)
                        .Select(o => o.Name)
                        .FirstOrDefault() ?? "Неизвестно",
                    RoleName = _db.Roles
                        .Where(r => r.ID == m.RoleID)
                        .Select(r => r.Name)
                        .FirstOrDefault() ?? "Участник",
                    m.JoinedAt
                })
                .ToListAsync();

            return Ok(memberships);
        }
        catch (Exception ex)
        {
            
            return Ok(new List<object>());
        }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return NotFound(new { message = "Пользователь не найден" });

        return Ok(new
        {
            user.ID,
            user.FullName,
            user.Email
        });
    }
}
