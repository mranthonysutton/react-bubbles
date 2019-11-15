import React, {useState} from "react";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // Sets state for the login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
    isLoggedIn: false
  });

  // sets login credentials while the user types in their username & password
  const handleChange = event => {
    setLoginCredentials({...loginCredentials, [event.target.name]: event.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('LOGIN CREDENTIALS: ', loginCredentials);
  };

  return (
    <div className="container">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name={"username"} placeholder={"Lambda"} onChange={handleChange}/>
        <input type="password" name={"password"} placeholder={"Lambda"} onChange={handleChange}/>
        <button type={"submit"}>Log In</button>
      </form>
    </div>
  );
};

export default Login;
