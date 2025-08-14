import { useEffect, useState } from "react";
import "./User.css"
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
      setUser(
        (prevUser) => prevUser.filter((user) => user._id !== userId)
      )
      toast.success("user deleted succesfully")

    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }



  return (
    <div className='userTable'>

      <Link to="/add" type="button" className="btn btn-primary" >
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

      {users.length === 0 ? (
        <div className="nodata">
          <h3>No data to display</h3>
          <p>Add new user</p>
        </div>
      )
      
      :
      
      (<table className='table table-bordered'>
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
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionButtons">
                  <div className="buttonDes">
                    <Link to={"/update/" + user._id} type="button" className="btn btn-info">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Link>

                    <button onClick={() => deleteUser(user._id)} type="button" className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>)
          })}
        </tbody>
      </table>)}


    </div>
  )
}

export default User;
