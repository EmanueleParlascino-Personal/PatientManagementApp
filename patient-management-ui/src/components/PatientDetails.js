const PatientDetails = ({ patient, onAddAppointment }) => {
  if (!patient) return <p>Loading patient details...</p>;

  return (
    <div className="details-container">
      <section className="patient-profile">
        <h1>Patient Profile</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {patient.photo && (
            <img 
              src={patient.photo} 
              alt={patient.fullName} 
              style={{ width: '150px', borderRadius: '8px' }} 
            />
          )}
          <div>
            <p><strong>Full Name:</strong> {patient.fullName}</p>
            <p><strong>Address:</strong> {patient.address}</p>
          </div>
        </div>
      </section>

      <hr />
      <section className="appointments-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Appointments</h2>
          <button 
            onClick={onAddAppointment} 
            style={{ fontSize: '20px', padding: '5px 15px', cursor: 'pointer' }}
          >
            +
          </button> 
        </div>

        {patient.appointments && patient.appointments.length > 0 ? (
          <table border="1" style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Treatment</th>
                <th>Dentist</th>
              </tr>
            </thead>
            <tbody>
              {patient.appointments.map((app, index) => (
                <tr key={index}>
                  <td>{new Date(app.appointmentDateTime).toLocaleString()}</td>
                  <td>{app.treatment}</td>
                  <td>{app.dentist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments scheduled yet.</p>
        )}
      </section>
    </div>
  );
};

export default PatientDetails;