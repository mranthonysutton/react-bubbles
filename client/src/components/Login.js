import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom"
import {Container, TextField, Button} from "@material-ui/core"
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
  }, [loginCredentials.isLoggedIn]);

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
      <Container maxWidth={"sm"}>
        <h1>Login For Bubbles</h1>
        <form onSubmit={handleSubmit}>
          <TextField required variant="outlined" label="Username..." margin="normal" type="text" name={"username"} placeholder={"Lambda"} onChange={handleChange}/>
          <TextField required variant="outlined" label="Password..." margin="normal" type="password" name={"password"} placeholder={"Lambda"} onChange={handleChange}/>
          <Button size="large" color={"primary"} variant="contained" type={"submit"}>Log In</Button>
        </form>
      </Container>
    );
  }
};

export default Login;
