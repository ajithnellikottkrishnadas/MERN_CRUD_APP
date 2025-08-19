import React, { useEffect, useRef } from "react";
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

  return (
    <div className="navigation">
      <ul ref={ulRef}>
        <li className="list active">
          <span className="icon">
            <ion-icon name="home-outline"></ion-icon>
          </span>
          <span className="text">Home</span>
        </li>
        <li className="list">
          <span className="icon">
            <ion-icon name="log-in-outline"></ion-icon>
          </span>
          <span className="text">Login</span>
        </li>
        <li className="list">
          <span className="icon">
            <ion-icon name="person-add-outline"></ion-icon>
          </span>
          <span className="text">Register</span>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default Home;
