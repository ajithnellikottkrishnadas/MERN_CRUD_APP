import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import User from "./getUser/User";
import UpdateUser from "./updateuser/UpdateUser";
import {Toaster} from "react-hot-toast"
import Home from "./home/Home";


function App() {

  const route= createBrowserRouter([
    {
      path:"/user",
      element:<User />
    },{
      path:"/add",
      element: <AddUser />
    },
    {
      path:"/update/:id",
      element:<UpdateUser />
    },
    {
      path:"/",
      element:<Home />

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
  