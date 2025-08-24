import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      await axios.post("http://localhost:8000/api/customers/customerCreate", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/customer");
    } catch (err) {
      console.error("Error adding customer:", err);
      setError(err.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={2} align="center">
        Add New Customer
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/customer")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCustomer;
