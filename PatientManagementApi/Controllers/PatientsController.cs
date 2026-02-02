using Microsoft.AspNetCore.Mvc;
namespace PatientManagementApi.Controllers;
using Microsoft.EntityFrameworkCore;
using PatientManagementApi.Data;
using PatientManagementApi.Models;
using System.Reflection.Metadata;

[ApiController]
[Route("api/[controller]")]
public class PatientsController(PracticeContext context) : ControllerBase
{
    private readonly PracticeContext _context = context;

    [HttpPost]
    public async Task<ActionResult<Patient>> CreatePatient(Patient patient)
    {
        if (string.IsNullOrEmpty(patient.FullName)) return BadRequest("Name is required.");

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Patient>> GetPatient(int id)
    {
        var patient = await _context.Patients
            .Include(p => p.Appointments)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (patient == null) return NotFound();

        return patient;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<Patient>>> GetPatients()
    {
        return await _context.Patients.Include(p => p.Appointments).ToListAsync();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(int id)
    {
        var patient = await _context.Patients.FindAsync(id);

        if (patient == null) return NotFound(); 
        
        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync(); 

        return NoContent(); 
    }
}
