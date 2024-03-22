import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './LocalFarmers.css'

const LocalFarmers = (props) => {

  const { localFarmersEndpoint, localFarmers } = props

  // console.log(localFarmers)

  const CallTo = ({phone, children}) => {
    return <a href={`tel:${phone}`} id='phoneNumber'>{children}</a>;
  }

  return (
    <>  
        <Container fluid>
          <Row className='justify-content-center text-center mt-5'>
            <Col>
              <h1>Meet Our Local Farmers</h1>
            </Col>
          </Row>
          {localFarmers.map((farmer, index) => {
            return  <Row key={index} className='local-farmer-rows justify-content-center text-center mt-5'>
                      <Col sm={8}>
                        <h3>{farmer.name}</h3>
                        <p>{farmer.description}</p>
                        {farmer.phoneNumber && <p>Phone Number: <CallTo phone={farmer.phoneNumber}>{farmer.phoneNumber}</CallTo></p>}
                        {farmer.websiteURL && <p>Check Them Out At: <a className='websiteUrls' href={`https://${farmer.websiteURL}`}>{farmer.websiteURL}</a></p>}
                      </Col>
                    </Row>
          })}
        </Container>
    </>
  )
}

export default LocalFarmers