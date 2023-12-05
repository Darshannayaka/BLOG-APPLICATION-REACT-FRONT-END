import React, { useContext, useEffect, useState } from "react";
import { InputGroup, InputGroupText } from "reactstrap";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {


  const userContxtData=useContext(userContext)

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    if (
      loginDetail.username.trim() === "" &&
      loginDetail.password.trim() === ""
    ) {
      toast.error("Email and password are required");
    } else if (loginDetail.username.trim() === "") {
      toast.error("Email is required");
    } else if (loginDetail.password.trim() === "") {
      toast.error("Password is required");
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
        
          userContxtData.setUser({
            data: data.user,
            login:true,
          });
          navigate("/user/dashboard");
        });

        toast.success("Login Success");
      })

      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on Server");
        }
      });
  };

  //reset button
  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const [gradient, setGradient] = useState(generateRandomGradient());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradient(generateRandomGradient());
    }, 5000); // Change colors every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  function generateRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const isLoginDisabled =
    loginDetail.username.trim() === "" || loginDetail.password.trim() === "";

  return (
    <Base>
      <Container>
        <Row className="mt-3">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card
              className="animated-gradient-card"
              style={{ background: gradient }}
              color="dark"
              inverse
            >
              <CardHeader>
                <h3 align="center">Login here</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* {email filed} */}
                  <FormGroup>
                    <Label for="email">Enter email</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter Email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* {password field} */}
                  {/* <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup> */}

                  {/* {Password Field} */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={loginDetail.password}
                      />
                      <InputGroupText
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>

                  <Container className="text-center">
                    {/* <Button color="dark">Login</Button> */}
                    <Button color="dark" disabled={isLoginDisabled}>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
