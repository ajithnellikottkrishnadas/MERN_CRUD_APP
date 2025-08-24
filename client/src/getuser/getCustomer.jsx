import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css"
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";


const GetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/")
          return;
        }

        const res = await axios.get("http://localhost:8000/api/customers/customerGet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers(res.data);
      } catch (err) {
        console.error("Failed to fetch customers. Please try again.", err);
        toast.error(err.response?.data?.message)
      }
    };

    fetchCustomers();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  }

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }
      await axios.delete(`http://localhost:8000/api/customers/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Customer deleted successfully");
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));

    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.response?.data?.message || "Failed to delete customer");
    }
  }

  return (
    <div className="container">

      <div className="buttonStyle" >

        <div>        
          <h3>DASHBOARD</h3>
          <Button
            className="addButton"
            variant="contained"
            to="/addCustomer"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => navigate("/addCustomer")}
          >
            Add Customer
          </Button></div>
        <div >
          <Button

            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
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
                        className="boton-elegante first"
                        to="/"
                        onClick={() => handleEdit(customer._id)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="boton-elegante second"
                        onClick={() => handleDelete(customer._id)}
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
