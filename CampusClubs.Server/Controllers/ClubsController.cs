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
}
