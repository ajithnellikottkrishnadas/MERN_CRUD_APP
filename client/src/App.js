import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import User from "../src/getuser/User";
import UpdateUser from "./updateuser/UpdateUser";
import {Toaster} from "react-hot-toast"


function App() {

  const route= createBrowserRouter([
    {
      path:"/",
      element:<User />
    },{
      path:"/add",
      element: <AddUser />
    },
    {
      path:"/update/:id",
      element:<UpdateUser />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false}/>
    </div>
  );
}

export default App;




 /*  rafce to get  this
  import React from 'react'
  
  const App = () => {
    return (
      <div>
        
      </div>
    )
  }
  
  export default App */
  