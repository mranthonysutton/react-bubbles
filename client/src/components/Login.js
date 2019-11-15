import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom"
import AxiosWithAuth from "../utils/AxiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // Sets state for the login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
    isLoggedIn: false
  });

  // sets isLoggedIn to true if the sessionStorage token is valid
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginCredentials({...loginCredentials, isLoggedIn: true});
    } else {
      setLoginCredentials({...loginCredentials, isLoggedIn: false});
    }
  }, [loginCredentials.isLoggedIn])

  // sets login credentials while the user types in their username & password
  const handleChange = event => {
    setLoginCredentials({...loginCredentials, [event.target.name]: event.target.value})
  };

  // Sets the response token to the authorization header, and then redirects the user to the Bubbles page.
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(loginCredentials);
    AxiosWithAuth().post('/api/login', loginCredentials).then(response => {
      const {data} = response;
      sessionStorage.setItem('token', data.payload);
      setLoginCredentials({...loginCredentials, isLoggedIn: true});
      props.history.push('/bubbles');
    }).catch(error => console.log(error));
  };

  // If the login credentials.isLoggedIn is true, then immediately redirects the user to the Bubbles page
  if (loginCredentials.isLoggedIn === true) {
    return <Redirect to={"/bubbles"}/>;
  } else {
    return (
      <div className="container">
        <h1>Login For Bubbles</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name={"username"} placeholder={"Lambda"} onChange={handleChange}/>
          <input type="password" name={"password"} placeholder={"Lambda"} onChange={handleChange}/>
          <button type={"submit"}>Log In</button>
        </form>
      </div>
    );
  }
};

export default Login;
