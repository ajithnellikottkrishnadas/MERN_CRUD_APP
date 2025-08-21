import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCustomer from "./AddCustomer/AddCustomer.jsx";
import GetCustomer from "./getuser/getCustomer.jsx";
import Login from "./home/Login.jsx"
import Register from "./home/Register.jsx";
import UpdateCustomer from "./updateuser/UpdateCustomer.jsx";
import {Toaster} from "react-hot-toast"



function App() {

  const route= createBrowserRouter([
    {
      path:"/",
      element:<Login />
    },{
      path:"/addCustomer",
      element: <AddCustomer />
    },
    {
      path:"/update/:id",
      element:<UpdateCustomer />
    },{
      path:"/customer",
      element:<GetCustomer />
    },{
      path:"/register",
      element:<Register />
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
  