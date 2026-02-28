import React, { useEffect, useState } from "react";
import axios from "axios";

// ===== CONFIG =====
const API_BASE = "https://promotionbackend-2.onrender.com/api/employees";


function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: null,
    employeeName: "",
    department: "",
    currentRole: "",
    currentLocation: "",
    leavingLocation: "",
    leavingDate: "",
    joiningDate: "",
    newRole: "",
    newJoiningDate: "",
    yearsOfExperience: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  // ===== READ =====
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_BASE);
      setEmployees(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // ===== FORM HANDLING =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== CREATE =====
  const createEmployee = async () => {
    await axios.post(API_BASE, form);
    fetchEmployees();
    resetForm();
  };

  // ===== UPDATE =====
  const updateEmployee = async () => {
    await axios.put(`${API_BASE}/${form.id}`, form);
    fetchEmployees();
    resetForm();
  };

  // ===== DELETE =====
  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this record?") ) return;
    await axios.delete(`${API_BASE}/${id}`);
    fetchEmployees();
  };

  const editEmployee = (emp) => {
    setForm(emp);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      id: null,
      employeeName: "",
      department: "",
      currentRole: "",
      currentLocation: "",
      leavingLocation: "",
      leavingDate: "",
      joiningDate: "",
      newRole: "",
      newJoiningDate: "",
      yearsOfExperience: ""
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Promotion & Transfer Management</h1>

      {/* ===== FORM ===== */}
      <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 30 }}>
        <h3>{isEditing ? "Update Record" : "Add Record"}</h3>

        <input name="employeeName" placeholder="Employee Name" value={form.employeeName} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="currentRole" placeholder="Current Role" value={form.currentRole} onChange={handleChange} />
        <input name="currentLocation" placeholder="Current Location" value={form.currentLocation} onChange={handleChange} />
        <input name="leavingLocation" placeholder="Leaving Location" value={form.leavingLocation} onChange={handleChange} />
        <input type="date" name="leavingDate" value={form.leavingDate} onChange={handleChange} />
        <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} />
        <input name="newRole" placeholder="New Role" value={form.newRole} onChange={handleChange} />
        <input type="date" name="newJoiningDate" value={form.newJoiningDate} onChange={handleChange} />
        <input name="yearsOfExperience" placeholder="Years of Experience" value={form.yearsOfExperience} onChange={handleChange} />

        {isEditing ? (
          <button onClick={updateEmployee}>Update</button>
        ) : (
          <button onClick={createEmployee}>Create</button>
        )}
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* ===== TABLE ===== */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Current Role</th>
            <th>Current Location</th>
            <th>Leaving Location</th>
            <th>Leaving Date</th>
            <th>Joining Date</th>
            <th>New Role</th>
            <th>New Joining Date</th>
            <th>Years of Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeName}</td>
              <td>{emp.department}</td>
              <td>{emp.currentRole}</td>
              <td>{emp.currentLocation}</td>
              <td>{emp.leavingLocation}</td>
              <td>{emp.leavingDate}</td>
              <td>{emp.joiningDate}</td>
              <td>{emp.newRole}</td>
              <td>{emp.newJoiningDate}</td>
              <td>{emp.yearsOfExperience}</td>
              <td>
                <button onClick={() => editEmployee(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
