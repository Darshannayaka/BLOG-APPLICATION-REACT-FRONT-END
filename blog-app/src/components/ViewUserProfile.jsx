import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

const ViewUserProfile = ({user}) => {

const [currentUser,setCurrentUser]=useState(null)
const [login,setLogin]=useState(false)

useEffect(()=>{
    setCurrentUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
},[])

  return (
    <Card className="mt-2 shadow">
    <CardBody>
      <h3 className="text-center text-uppercase">User Information</h3>
      <Container className="text-center">
        <img style={{maxWidth:'200px', maxHeight:'200px'}} src={user.image ? user.image : 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png?compress=1&resize=400x300&vertical=top'} alt="user profile picture" className="img-fluid rounded-circle"/>
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
    {currentUser ? (currentUser.id==user.id) ? (
        <CardFooter className='text-center'>
        <Button color='warning'>Update Profile</Button>
      </CardFooter>
    ) : '' : ''}
    </CardBody>
  </Card>
  )
}

export default ViewUserProfile