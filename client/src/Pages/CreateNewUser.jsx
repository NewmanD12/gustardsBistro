import { useEffect, useState } from "react"
import { useAuth } from "../Hooks/Auth"
import { useNavigate } from "react-router"
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import "./CreateNewUser.css"

const CreateNewUser = (props) => {

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})
  const auth = useAuth()
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  // console.log(auth)

  const handleSubmit = async (e) => {
      e.preventDefault()
      // console.log(firstName, lastName, username, password)
      console.log(errors)
      
      const registerResult = await auth.register(firstName, lastName, username, password)
      // console.log(registerResult)
      if(registerResult.success){
        auth.login(username, password)
        navigate('/')
      }
  }

  return (
      <Container id='register-container' fluid='md'>
        <Row className="justify-content-center m-2 text-center">
          <h1>Register New User</h1>
        </Row>
        <Row className="justify-content-center m-2">
          <Col md={6}>
            <Form id='register-form'>
              <Form.Group className="inputs">
                <Form.Label>First Name:</Form.Label>
                {firstNameError && <Form.Label className="errors">{firstNameError}</Form.Label>}
                <Form.Control type="text" placeholder="Enter first name" onChange={(e) => {
                  setFirstName(e.target.value)
                }}></Form.Control>
              </Form.Group>

              <Form.Group className="inputs">
                <Form.Label>Last Name:</Form.Label>
                {errors.lastNameError && <Form.Label className="errors">{errors.lastNameError}</Form.Label>}
                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => {
                  setLastName(e.target.value)
                }}></Form.Control>
              </Form.Group>

              <Form.Group className="inputs">
                <Form.Label>Username: </Form.Label>
                {errors.usernameError && <Form.Label className="errors">{errors.usernameError}</Form.Label>}
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => {
                  setUsername(e.target.value)
                }}></Form.Control>
              </Form.Group>
  
              <Form.Group className="inputs">
                <Form.Label>Password:</Form.Label>
                {errors.passwordError && <Form.Label className="errors">{errors.passwordError}</Form.Label>}
                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
                  setPassword(e.target.value)
                }}></Form.Control>
              </Form.Group>

              <Form.Group className="inputs">
                <Form.Label>Confirm Password:</Form.Label>
                {errors.confirmPasswordError && <Form.Label className="errors">{errors.confirmPasswordError}</Form.Label>}
                <Form.Control type="password" placeholder="Confirm your password" onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}></Form.Control>
              </Form.Group>
  
              <Row className="justify-content-center mt-5">
                <Col xs={3}>
                  <Button 
                    id="register-button"
                    variant="primary" type="submit"
                    onClick={(e) => {
                      handleSubmit(e)
                    }}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
  
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default CreateNewUser