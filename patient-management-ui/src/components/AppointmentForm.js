import { useState } from 'react';

const TREATMENTS = [
  { id: 'cleaning', name: 'Cleaning', duration: '30 mins' },
  { id: 'filling', name: 'Filling', duration: '60 mins' },
  { id: 'extraction', name: 'Extraction', duration: '45 mins' },
  { id: 'checkup', name: 'Check-up', duration: '15 mins' }
];

const DENTISTS = ['Dr. Smith', 'Dr. Jones', 'Dr. Taylor'];

const AppointmentForm = ({ patientId, onSubmit, onCancel }) => {
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [dentist, setDentist] = useState('');
  const [treatment, setTreatment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!appointmentDateTime || !dentist || !treatment) {
      setError('Please fill out all fields.');
      return;
    }

    const appointmentData = {
      patientId: patientId,
      appointmentDateTime,
      dentist,
      treatment
    };

    onSubmit(appointmentData);
  };

  return (
    <div className="form-container">
      <h2>Schedule Appointment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date and Time:</label>
          <input 
            type="datetime-local" 
            value={appointmentDateTime}
            onChange={(e) => setAppointmentDateTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Dentist:</label>
          <select value={dentist} onChange={(e) => setDentist(e.target.value)}>
            <option value="">Select a Dentist</option>
            {DENTISTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Treatment:</label>
          <select value={treatment} onChange={(e) => setTreatment(e.target.value)}>
            <option value="">Select Treatment</option>
            {TREATMENTS.map(t => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.duration})
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">Add Appointment</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;