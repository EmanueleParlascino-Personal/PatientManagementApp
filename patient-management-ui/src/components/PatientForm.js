import{ useState } from 'react';

const PatientForm = ({ onSubmit, onCancel }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This converts the image file to a base64 string
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    const patientData = {
      fullName,
      address,
      photo
    };

    onSubmit(patientData);
  };

  return (
    <div className="form-container">
      <h2>Create New Patient</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter address"
          />
        </div>

        <div className="form-group">
          <label>Photo:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;