using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CampusClubs.Server.Data; // Проверьте ваш namespace
using CampusClubs.Server.Models;

namespace CampusClubs.Server.Controllers;

[ApiController]
[Route("api/clubs")] // <-- Явно указываем маршрут, чтобы избежать путаницы
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
}
