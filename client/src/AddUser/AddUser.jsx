import React, { useState } from 'react';
import "./addUser.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const AddUser = () => {


    const userInitialState = {
        name: "",
        email: "",
        address: ""
    }
    const [user, setUser] = useState(userInitialState);
    const navigate = useNavigate();

    const inputhandler = (e) => {
        const { name, value } = e.target;
        console.log(user);
        
        setUser({ ...user, [name]: value });

    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post("http://localhost:8000/api/userCreate", user);
            toast.success("user added succesfully");
            navigate("/");
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <div className='addUser'>
            <form className='addUserForm' onSubmit={submitForm}>
                <Link to="/" type="button" className="btn btn-secondary">
                    <i className="fa-solid fa-backward"></i>Back
                </Link>
                <h3>Add New User</h3>

                <div className='inputGroup'>
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={inputhandler}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete='off'
                        placeholder='Enter your name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email:</label>
                    <input
                        onChange={inputhandler}
                        type="text"
                        name="email"
                        id="email"
                        autoComplete='off'
                        placeholder='Enter your email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="address">Address:</label>
                    <input
                        onChange={inputhandler}
                        type="text"
                        name="address"
                        id="address"
                        autoComplete='off'
                        placeholder='Enter your address' />
                </div>
                <div className='inputGroup'>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUser
