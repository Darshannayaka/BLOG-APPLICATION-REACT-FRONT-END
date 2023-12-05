import { signup } from "../services/user-service";
import { InputGroup, InputGroupText } from "reactstrap";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //handle-change
  const handleChange = (event, property) => {
    //dynamic-setting-values
    setData({ ...data, [property]: event.target.value });
  };

  //resetting the form
  const reserData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  //submitting the form
  const submitForm = (event) => {
    event.preventDefault();

    // if (error.isError) {
    //   toast.error("Form Data is invalid , Correct All details then submit.");
    //   return;
    // }

    console.log(data);
    //data validate

    //call server api for sending the data
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered Successfully !! user id :" + resp.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
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

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Base>
      <Container>
        {/* {JSON.stringify(data)} */}

        <Row className="mt-3">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card
              className="animated-gradient-card"
              style={{ background: gradient }}
              color="dark"
              inverse
            >
              <CardHeader>
                <h3 align="center">User Registration </h3>
              </CardHeader>

              <CardBody>
                {/*Creating Form*/}

                <Form onSubmit={submitForm}>
                  {/* {Name Field} */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* {Email Field} */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* {Password Field} */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.errors?.response?.data?.password ? true : false
                        }
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
                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>

                  {/* {About Field} */}
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter About"
                      id="about"
                      style={{ height: "90px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="dark">Register</Button>
                    <Button
                      onClick={reserData}
                      color="secondary"
                      className="ms-2"
                      type="reset"
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

export default Signup;
