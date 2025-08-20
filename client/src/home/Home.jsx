import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const ulRef = useRef(null);

  const setActive = (e) => {
    document.querySelectorAll(".list").forEach((list) => {
      list.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  useEffect(() => {
    const ul = ulRef.current;

    ul?.childNodes.forEach((li) => {
      if (li.nodeName === "LI") {
        li.addEventListener("click", setActive);
      }
    });


    return () => {
      ul?.childNodes.forEach((li) => {
        if (li.nodeName === "LI") {
          li.removeEventListener("click", setActive);
        }
      });
    };
  }, []);
  const navigate= useNavigate()

  const [currentState, setState]=useState(0);
  function setStateFn(currentState){
    setState(currentState);
    console.log(currentState);
    
  }

  const handleClick=()=>{
     if (currentState === 1) navigate("/Login");
    if (currentState === 2) navigate("/Register");
  }


  return (

    <div className="homeContainer">
      <h1 >Welcome to My App</h1>


    <div className="navigation">
      <div>
        <ul ref={ulRef}>
          <li 
          className={`list ${currentState === 1 ? "active" : ""}`}
          onClick={()=>setStateFn(0)}
          >
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="text">Home</span>
          </li>
          <li 
          className="list"
          onClick={()=> setStateFn(1)}>
            <span className="icon">
              <ion-icon name="log-in-outline"></ion-icon>
            </span>
            <span className="text">Login</span>
          </li>
          <li 
          className={`list ${currentState === 2 ? "active" : ""}`}
          onClick={()=> setStateFn(2)}
          >
            <span className="icon">
              <ion-icon name="person-add-outline"></ion-icon>
            </span>
            <span className="text">Register</span>
          </li>
          <div className="indicator" onClick={handleClick}></div>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Home;
