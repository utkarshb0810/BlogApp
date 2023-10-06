import React, { useState, useEffect, useContext } from "react";

import { TextField, Box, Button, Typography, styled } from "@mui/material";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");
  const {setAccount} = useContext(DataContext);
  const navigate = useNavigate();

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setError(false);
  }, [login]);

  const onvalueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response?.isSuccess) {
        setError("");
        setSignup(signupInitialValues);
        toggleAccount("login");
      } else {
        setError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      // Handle the error here
      setError("An error occurred while signing up. Please try again later.");
      // console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login); // Add "await" here
      if(response?.isSuccess) {
        setError("");
        setLogin(loginInitialValues);

        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)

        //name aur username mujhe pure project me chahiye kiska blog hai kisne comment kiya to CONTEXT API ka use karenge
        setAccount({username:response.data.username , name:response.data.name})

        isUserAuthenticated(true);
        
        navigate('/');


      } else {
        setError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while login. Please try again later.");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="blog" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onvalueChange(e)}
              name="username"
              label="Enter username"
            ></TextField>
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onvalueChange(e)}
              name="password"
              label="Enter password"
            ></TextField>
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>

            <Text style={{ textAlign: "center" }}>OR</Text>

            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              value={signup.name}
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
