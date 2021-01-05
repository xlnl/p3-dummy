import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"

// component
import FormGroup from "./common/FormGroup";
import ButtonSpinner from "./common/ButtonSpinner"

// helper
// refactor to log in after signing up
// refactor to handle loading after signing up
import { register } from '../services/auth.service'
import { resMessage } from '../utilities/functions.utilities'

// Function given to react-validator
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// function that validates usernames
const vusername = (value) => {
    if(value.length < 3 || value.length >= 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        )
    }
}

// function that validates passwords 
const vpassword = (value) => {
    if(value.length < 6 || value.length >= 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        )
    }
}

// function that validates email (using validator to see if it's in the right format) 
const validEmail = (value) => {
    if(!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                The email must be valid.
            </div>
        )
    }
}


const SignUp = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // Stores the username in our username state
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  // Stores the email in our email state
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  // Stores the password in our password state
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    //Prevent message clear them out
    setMessage("")
    setSuccessful(false)

    // Validates all the fields
    form.current.validateAll();

    // Validator stores errors and we can check if error exist
    if(checkBtn.current.context._errors.length === 0){
        register(username, email, password).then(
            (response) => {
                setMessage(response.data.message)
                setSuccessful(true)
                setTimeout(() => {
                    props.history.push("/login")
                }, 1000)
            },
            (error) => {
                setMessage(resMessage(error))
                setSuccessful(false)
            }
        )
    }
  };
  
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSignUp} ref={form}>

          <FormGroup text="username">
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required, vusername]}
            />
          </FormGroup>

          <FormGroup text="email">
            <Input
              type="text"
              className="form-control"
              name="username"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </FormGroup>
        
          <FormGroup text="password">
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required, vpassword]}
            />
          </FormGroup>

          <ButtonSpinner text="Sign Up"/>

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
