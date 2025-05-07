import { useEffect, useState } from "react";

function App() {
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [donorForm, setDonorForm] = useState({
    name: "",
    age: "",
    bloodType: "",
    lastDonationDate: "",
    contactInfo: "",
    address: "",
    healthStatus: ""
  });

  const [patientForm, setPatientForm] = useState({
    Name: "",
    Age: "",
    BloodType: "",
    ContactInfo: "",
    HospitalID: "",
    EmergencyStatus: false
  });

  const fetchDonors = async () => {
    const res = await fetch("http://localhost:3036/donors");
    const data = await res.json();
    setDonors(data);
  };

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:3036/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchDonors();
    fetchPatients();
  }, []);

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3036/add-donor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donorForm)
    });
    const data = await res.json();
    alert(data.message);
    fetchDonors();
    setDonorForm({
      name: "",
      age: "",
      bloodType: "",
      lastDonationDate: "",
      contactInfo: "",
      address: "",
      healthStatus: ""
    });
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3036/add-patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientForm)
    });
    const data = await res.json();
    alert(data.message);
    fetchPatients();
    setPatientForm({
      Name: "",
      Age: "",
      BloodType: "",
      ContactInfo: "",
      HospitalID: "",
      EmergencyStatus: false
    });
  };

  const formStyle = {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const labelStyle = {
    fontWeight: "bold",
    marginTop: "10px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  };

  const thStyle = {
    backgroundColor: "#e63946",
    color: "white",
    padding: "10px"
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ color: "#e63946", textAlign: "center", marginBottom: "30px" }}>Blood Bank Management System</h1>

      {/* Donor Form */}
      <div style={formStyle}>
        <h2 style={{ color: "#e63946" }}>Add Donor</h2>
        <form onSubmit={handleDonorSubmit}>
          <input style={inputStyle} type="text" placeholder="Name" value={donorForm.name} onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })} required />
          <input style={inputStyle} type="number" placeholder="Age" value={donorForm.age} onChange={(e) => setDonorForm({ ...donorForm, age: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Blood Type" value={donorForm.bloodType} onChange={(e) => setDonorForm({ ...donorForm, bloodType: e.target.value })} required />
          <input style={inputStyle} type="date" placeholder="Last Donation Date" value={donorForm.lastDonationDate} onChange={(e) => setDonorForm({ ...donorForm, lastDonationDate: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Contact Info" value={donorForm.contactInfo} onChange={(e) => setDonorForm({ ...donorForm, contactInfo: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Address" value={donorForm.address} onChange={(e) => setDonorForm({ ...donorForm, address: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Health Status" value={donorForm.healthStatus} onChange={(e) => setDonorForm({ ...donorForm, healthStatus: e.target.value })} required />
          <button style={{ ...inputStyle, backgroundColor: "#e63946", color: "white", cursor: "pointer" }} type="submit">Add Donor</button>
        </form>
      </div>

      {/* Patient Form */}
      <div style={formStyle}>
        <h2 style={{ color: "#e63946" }}>Add Patient</h2>
        <form onSubmit={handlePatientSubmit}>
          <input style={inputStyle} type="text" placeholder="Name" value={patientForm.Name} onChange={(e) => setPatientForm({ ...patientForm, Name: e.target.value })} required />
          <input style={inputStyle} type="number" placeholder="Age" value={patientForm.Age} onChange={(e) => setPatientForm({ ...patientForm, Age: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Blood Type" value={patientForm.BloodType} onChange={(e) => setPatientForm({ ...patientForm, BloodType: e.target.value })} required />
          <input style={inputStyle} type="text" placeholder="Contact Info" value={patientForm.ContactInfo} onChange={(e) => setPatientForm({ ...patientForm, ContactInfo: e.target.value })} required />
          <input style={inputStyle} type="number" placeholder="Hospital ID" value={patientForm.HospitalID} onChange={(e) => setPatientForm({ ...patientForm, HospitalID: e.target.value })} required />
          <label style={labelStyle}>
            Emergency?
            <input type="checkbox" checked={patientForm.EmergencyStatus} onChange={(e) => setPatientForm({ ...patientForm, EmergencyStatus: e.target.checked })} />
          </label>
          <button style={{ ...inputStyle, backgroundColor: "#e63946", color: "white", cursor: "pointer" }} type="submit">Add Patient</button>
        </form>
      </div>

      {/* Donor Table */}
      <h2 style={{ color: "#e63946", marginTop: "40px" }}>Donors</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Blood Type</th>
            <th style={thStyle}>Last Donation</th>
            <th style={thStyle}>Contact</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Health</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{donor.Name}</td>
              <td style={tdStyle}>{donor.Age}</td>
              <td style={tdStyle}>{donor.BloodType}</td>
              <td style={tdStyle}>{donor.LastDonationDate}</td>
              <td style={tdStyle}>{donor.ContactInfo}</td>
              <td style={tdStyle}>{donor.Address}</td>
              <td style={tdStyle}>{donor.HealthStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Patient Table */}
      <h2 style={{ color: "#e63946", marginTop: "40px" }}>Patients</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Blood Type</th>
            <th style={thStyle}>Contact</th>
            <th style={thStyle}>Hospital ID</th>
            <th style={thStyle}>Emergency</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{patient.Name}</td>
              <td style={tdStyle}>{patient.Age}</td>
              <td style={tdStyle}>{patient.BloodType}</td>
              <td style={tdStyle}>{patient.ContactInfo}</td>
              <td style={tdStyle}>{patient.HospitalID}</td>
              <td style={tdStyle}>{patient.EmergencyStatus ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
