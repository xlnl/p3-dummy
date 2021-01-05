import { Button } from "reactstrap";
import React from "react"
import logo from "../css/Petflix_Logo-01.png"

// landing page for more info about Petflix
const Landing = () => {
    return (
        <div className="container">
            <img src={logo} alt="Logo" className="logo"/>
            <h2>Join a community dedicated for pet lovers.</h2>
            <Button href="/signup">Sign Up</Button>
        </div>
    )
};
  
export default Landing;
