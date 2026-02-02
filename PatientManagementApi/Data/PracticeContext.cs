using Microsoft.EntityFrameworkCore;
using PatientManagementApi.Models;

namespace PatientManagementApi.Data
{
    public class PracticeContext(DbContextOptions<PracticeContext> options) : DbContext(options)
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
    }
}
