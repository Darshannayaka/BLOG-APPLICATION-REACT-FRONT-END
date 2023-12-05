import React from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../services/user-service";
import { useState } from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import ViewUserProfile from "../../components/ViewUserProfile";




function ProfileInfo() {

  const object = useContext(userContext)
  const [user, setUser] = useState(null)
  const {userId}= useParams()
  // console.log(userId);

  useEffect(()=>{
getUser(userId).then(data=>{
  console.log(data);
  setUser({...data})
})
  },[])

  const userView=()=>{
    return(
      
        <Row className="mt-2">
          <Col md={{size:6, offset:3}}>
            {/* <Card className="mt-2 shadow">
              <CardBody>
                <h3 className="text-center text-uppercase">User Information</h3>
                <Container className="text-center">
                  <img style={{maxWidth:'200px', maxHeight:'200px'}} src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png?compress=1&resize=400x300&vertical=top" alt="user profile picture" className="img-fluid rounded-circle"/>
                </Container>
                <Table hover responsive striped bordered={true} className="text-center mt-5">
                  <tbody>
                    <tr>
                      <td className="fw-bolder">
                        BLOG-USER
                      </td>
                      <td>
                        USER-ID : {user.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bolder">
                        USER NAME
                      </td>
                      <td>
                        {user.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bolder">
                        USER EMAIL
                      </td>
                      <td>
                        {user.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bolder">
                        USER ABOUT
                      </td>
                      <td>
                        {user.about}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bolder">
                        USER ROLE
                      </td>
                      <td>
                        {user.roles.map((role)=>{
                          return (
                            <div key={role.id}>{role.name}</div>
                          )
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card> */}


            <ViewUserProfile  user={user}/>
          </Col>
        </Row>
    )
  }

  return (
    <Base>
      
        {
          user ? userView() : 'Loading user Data...'
        }
      
    </Base>
  );
}

export default ProfileInfo;
