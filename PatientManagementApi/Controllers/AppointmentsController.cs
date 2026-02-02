namespace PatientManagementApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientManagementApi.Data;
using PatientManagementApi.Models;


[ApiController]
[Route("api/[controller]")]
public class AppointmentsController(PracticeContext context) : ControllerBase
{
    private readonly PracticeContext _context = context;

    [HttpPost]
    public async Task<ActionResult<Appointment>> PostAppointment(Appointment newAppt)
    {
        var durations = new Dictionary<string, int>
        {
            { "Cleaning", 30 },
            { "Filling", 60 },
            { "Extraction", 45 },
            { "Check-up", 15 }
        };

        int newDuration = durations.GetValueOrDefault(newAppt.Treatment, 30);
        DateTime newStart = newAppt.AppointmentDateTime;
        DateTime newEnd = newStart.AddMinutes(newDuration);

        var conflict = await _context.Appointments
            .FirstOrDefaultAsync(a =>
                (a.Dentist == newAppt.Dentist || a.PatientId == newAppt.PatientId) &&
                newStart < a.AppointmentDateTime.AddMinutes(
                    a.Treatment == "Filling" ? 60 :
                    a.Treatment == "Extraction" ? 45 :
                    a.Treatment == "Check-up" ? 15 : 30) &&
                newEnd > a.AppointmentDateTime);

        if (conflict != null)
        {
            string reason = conflict.Dentist == newAppt.Dentist
                ? $"Dr. {newAppt.Dentist} is already booked."
                : "This patient already has an appointment at this time.";

            return BadRequest(reason);
        }

        _context.Appointments.Add(newAppt);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAppointment", new { id = newAppt.Id }, newAppt);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointment(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null) return NotFound();
        return appointment;
    }

    [HttpGet("{patientId}")]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments(int patientId)
    {
        return await _context.Appointments
            .Where(a => a.PatientId == patientId)
            .ToListAsync();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Patient>> DeleteAppointment(int id)
    {
        var appointment = await _context.Patients
            .FirstOrDefaultAsync(p => p.Id == id);

        if (appointment == null) return NotFound();

        _context.Patients.Remove(appointment);
        await context.SaveChangesAsync();
        return NotFound();
    }
}