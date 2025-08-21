import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css"

const GetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

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
    <div class="container">
      <table class="responsive-table">
        <caption>DASHBOARD</caption>
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
        <tbody>{customers.map((customer, index) => {
          <tr>
            <th scope="row">{customer.index}</th>
            <td data-title="Released">{customer.name}</td>
            <td data-title="Studio">{customer.email}</td>
            <td data-title="Worldwide Gross" >{customer.address}</td>
            <td data-title="Domestic Gross" >{customer.phone}</td>
          </tr>
        })}


        </tbody>
      </table>
    </div>
  );
};

export default GetCustomers;
