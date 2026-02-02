namespace PatientManagementApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; } 
        public DateTime AppointmentDateTime { get; set; }
        public string Dentist { get; set; } = string.Empty;
        public string Treatment { get; set; } = string.Empty;
    }
}
