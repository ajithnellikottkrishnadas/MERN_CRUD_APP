import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css"
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const GetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token"); // saved after login
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/customers/customerGet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers. Please try again.");
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container">

      <div className="buttonStyle" style={{ marginBottom: "1em", textAlign: "right" }}>
        <h3>DASHBOARD</h3>

        <Button
          variant="contained"
          to="/addCustomer"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/addCustomer")}
        >
          Add Customer
        </Button>
      </div>
      <table className="responsive-table">

        <thead>

          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>

          </tr>
        </thead>
        <tfoot>

        </tfoot>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={customer._id || index}>
                <th scope="row">{index + 1}</th>
                <td data-title="Name">{customer.name}</td>
                <td data-title="Email">{customer.email}</td>
                <td data-title="Address">{customer.address}</td>
                <td data-title="Phone">
                  <div className="iconDes">
                    <div>{customer.phone} </div>
                    <div>
                      <button
                        className="boton-elegante"
                        // onClick={() => handleEdit(customer._id)}
                      >
                        <EditIcon />
                      </button>

                      <button
                        className="boton-elegante second"
                        // onClick={() => handleDelete(customer._id)}
                      >
                        <DeleteIcon /></button>
                    </div>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetCustomers;
