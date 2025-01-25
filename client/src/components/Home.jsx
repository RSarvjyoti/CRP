import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [referral, setReferral] = useState({
    name: "",
    email: "",
    experience: "",
    resume: null,
    status: "New",
  });
  const [referrals, setReferrals] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/referrals");
        setReferrals(response.data);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };
    fetchReferrals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferral((prevReferral) => ({
      ...prevReferral,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setReferral((prevReferral) => ({
      ...prevReferral,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", referral.name);
    formData.append("email", referral.email);
    formData.append("experience", referral.experience);
    formData.append("resume", referral.resume);
    formData.append("status", referral.status);
  
    console.log(...formData); // Check if the resume file is included
    
    try {
      await axios.post("http://localhost:8080/referrals", formData);
      setMessage("Referral created successfully");
      setReferral({ name: "", email: "", experience: "", resume: null, status: "New" });
  
      const response = await axios.get("http://localhost:8080/referrals");
      setReferrals(response.data);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage("Failed to create referral.");
      console.error(error);
    }
  };  

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/referrals/${id}`, { status });
      setMessage("Referral status updated successfully");
      const response = await axios.get("http://localhost:8080/api/referrals");
      setReferrals(response.data);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage("Failed to update status.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-4">Referral </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={referral.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={referral.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            value={referral.experience}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Status</label>
          <select
            name="status"
            value={referral.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="New">New</option>
            <option value="Evaluated">Evaluated</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Create Referral
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-4 rounded-md text-white ${message.includes("Failed") ? "bg-red-500" : "bg-green-500"}`}
        >
          {message}
        </div>
      )}

      <h2 className="text-3xl font-semibold mt-6 mb-4">Referral List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {referrals.map((ref) => (
          <div
            key={ref._id}
            className="p-4 border border-gray-300 rounded-md shadow-sm space-y-2"
          >
            <h3 className="font-semibold text-xl">{ref.name}</h3>
            <p>Email: {ref.email}</p>
            <p>Experience: {ref.experience}</p>
            <p>Status: {ref.status}</p>

            <div className="space-x-2">
              <button
                onClick={() => handleStatusChange(ref._id, "Evaluated")}
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Mark as Evaluated
              </button>
              <button
                onClick={() => handleStatusChange(ref._id, "Hired")}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Mark as Hired
              </button>
              <button
                onClick={() => handleStatusChange(ref._id, "Rejected")}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Mark as Rejected
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;