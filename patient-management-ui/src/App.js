import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import PatientForm from './components/PatientForm';
import PatientDetails from './components/PatientDetails';
import AppointmentForm from './components/AppointmentForm';
import Modal from './components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [view, setView] = useState('list'); 
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [patients, setPatients] = useState([]); 

  const API_BASE_URL = 'http://localhost:5130/api'; 

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/patients/all`);
      setPatients(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const refreshPatientData = async (patientId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients/${patientId}`);
      setSelectedPatient(response.data);
      fetchPatients();
    } catch (error) {
      toast.error(error);
    }
  };

  const deletePatient = async (patientId) => {
    try {
        // Match the standard [HttpDelete("{id}")] route
        await axios.delete(`${API_BASE_URL}/patients/${patientId}`); 
        toast.success("Deleted successfully");
        fetchPatients();
    } catch (error) {
        // If you get a 405 here, it means the URL is wrong
        toast.error("Server refused the delete method on this URL");
    }
  };

  const handlePatientSubmit = async (patientData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/patients`, patientData);
      setSelectedPatient(response.data);
      setIsPatientModalOpen(false);
      setView('details');
      fetchPatients();
      toast.success("Patient created successfully!");
    } catch (error) {
      toast.error("Failed to create patient. Please check the required fields.");
    }
  };

  const handleAppointmentSubmit = async (appointmentData) => {
    try {
      await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
      await refreshPatientData(appointmentData.patientId);
      setIsAppointmentModalOpen(false);
      toast.success("Appointment scheduled!");
    } catch (error) {
      // If the backend returns BadRequest("message"), axios puts it here:
      const serverMessage = error.response?.data;
      toast.error(serverMessage || "Slot unavailable. Please pick a different time.");
    }
  };

  return (
    <div className="container">
      {/* --- DASHBOARD VIEW --- */}
      {view === 'list' && (
        <>
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <h1>Clinic Management</h1>
            <button onClick={() => setIsPatientModalOpen(true)}>+ Create New Patient</button>
          </header>

          <div className="patient-table-container">
          <table className="patient-table">
            <thead>
              <tr>
                <th className="avatar-cell"></th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td className="avatar-cell">
                    <img 
                      src={p.photo || 'https://via.placeholder.com/40'} 
                      alt={p.fullName} 
                      className="patient-avatar" 
                    />
                  </td>
                  <td style={{ fontWeight: '500' }}>{p.fullName}</td>
                  <td>{p.address}</td>
                  <td>
                    <button 
                      className="btn-view" 
                      onClick={() => { setSelectedPatient(p); setView('details'); }}
                    >
                      View Profile
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => {
                        deletePatient(p.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {view === 'details' && selectedPatient && (
        <>
          <button onClick={() => setView('list')}>← Back to List</button>
          <PatientDetails 
            patient={selectedPatient} 
            onAddAppointment={() => setIsAppointmentModalOpen(true)} 
          />
        </>
      )}

      {isPatientModalOpen && (
        <Modal title="New Patient" onClose={() => setIsPatientModalOpen(false)}>
          <PatientForm 
            onSubmit={handlePatientSubmit} 
            onCancel={() => setIsPatientModalOpen(false)} 
          />
        </Modal>
      )}

      {isAppointmentModalOpen && (
        <Modal title="Schedule Appointment" onClose={() => setIsAppointmentModalOpen(false)}>
          <AppointmentForm 
            patientId={selectedPatient.id}
            onSubmit={handleAppointmentSubmit}
            onCancel={() => setIsAppointmentModalOpen(false)}
          />
        </Modal>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar/>
    </div>
  );
};

export default App;