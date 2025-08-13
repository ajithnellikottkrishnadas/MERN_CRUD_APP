import { useEffect, useState } from "react";
import "./User.css"
import axios from "axios";
import { Link } from "react-router-dom";

function User() {


  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get("http://localhost:8000/api/userGet");
        setUser(response.data);
 
      } catch (error) {
        console.log("error while fetch data", error);
      }
    };
    fetchData();
  }, [])



  return (
    <div className='userTable'>

      <Link to="/add" type="button" className="btn btn-primary" >
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'> S.no</th>
            <th scope='col'>Name</th>
            <th scope='col'> Email</th>
            <th scope='col'> Address</th>
            <th scope='col'> Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionButtons">
                    <div className="buttonDes">
                    <Link to={"/update/"+user._id} type="button" className="btn btn-info">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Link>

                    <Link to="/delete" type="button" className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                </div>
                  </td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User;
