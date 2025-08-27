import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { loremIpsum } from 'react-lorem-ipsum';
import './About.css'
import ScrollToTopButton from '../components/ScrollToTopButton.jsx'

const About = () => {
  return (
    <>
        <Container fluid>
          <Row className='justify-content-center text-center mt-5'>
            <Col md={6}>
              <img id='aboutLandingPhoto' src='gandd.jpg'/>
            </Col>
          </Row>
          <Row className='justify-content-center text-center mt-5'>
            <Col md={6}>
              <h4>Born and raised in Virginia Beach, Chef Stephen Gustard's culinary journey was ignited by the  flavors of his childhood home. His mother's resourcefulness in the kitchen instilled in him a deep  love for cooking, setting the stage for a remarkable career in the culinary arts.</h4>
            </Col>
          </Row>

          <Row className='justify-content-center align-items-center text-start my-5'>
            <Col id='img1' md={6}>
              <img className='aboutPics' src='gustardSingle.jpg'/>
            </Col>
            <Col id='para1' className='mt-4' md={5}>
              <h4>With this passion for food, Stephen decided to apply at Johnson & Wales in Norfolk, Virginia.  Through his tenure at JWU he was able to work at various restaurants around Virginia Beach,  giving him exposure to the restaurant world. Also giving him the love for seafood and  understanding its importance to his future cooking abilities. After gaining his Associates Degree  in Culinary Arts, he asked a respected Chef what he should do next. The Chef’s comment was if  you really want to learn how to cook, get into The Greenbrier Apprenticeship Program.</h4>
            </Col>
          </Row>

          <Row id='secondRow' className='justify-content-center align-items-center text-end my-5'>
            <Col id='para2' className='mt-4' md={5}>
              <h4>Stephen packed his bags and headed to the prestigious resort known only as The Greenbrier.  There he trained under Chef Peter Timmins, CMC and a vast array of other talented  chefs where he learned the true meaning of cooking. Being in the Apprenticeship  Program was one of the most grueling and beneficial aspects of his culinary career. The  long hours of training and working throughout the many culinary venues of The Greenbrier gave him the honor and distinction of calling himself a Graduated Apprentice  2004 and the title of Chef. Once he completed the program, he moved down to  Gasparilla Island, FL to become a Sous Chef at The Boca Bay Pass Club.</h4>
            </Col>
            <Col id='img2' md={6}>
              <img className='aboutPics' src='greenbriergroup.jpg'/>
            </Col>
          </Row>

          <Row className='justify-content-center align-items-center text-start my-5'>
            <Col id='img3' md={6}>
              <img className='aboutPics' src='pickingHerbs.jpeg'/>
            </Col>
            <Col id='para3' className='mt-4' md={5}>
              <h4>After a year down in Florida, the hills of West Virginia were calling him back and Chef Gustard  took on the position of Rounds Chef at The Greenbrier Sporting Club. Through his hard work and dedication, he was given the opportunity to run a new restaurant at GSC, The  Summit. Chef Gustard oversaw a very popular venue that produced casual Appalachian  Cuisine and was the place to be on The Greenbrier property. After 3 years of running the  successful operation, he was appointed Executive Chef of The Greenbrier Sporting Club.  Being at The Sporting Club for 10 years Chef Gustard decided to take a chance at a  smaller restaurant called the French Goat</h4>
            </Col>
          </Row>

          <Row id='fourthRow' className='justify-content-center align-items-center text-end my-5'>
            <Col id='para4' className='mt-4' md={5}>
              <h4>At The French Goat he was able to take the restaurant to new levels of excellence with his  creativeness and the connections he made with the local farmers. There he met Delphine  Houssin and, along with the team, they worked side by side to make this place such a  culinary destination. Delphine is from Belgium and brings such a vast array of  knowledge in pastries and French cuisine. This culinary duo worked hand in hand  together, but Chef Gustard took another opportunity at The Tamarack Marketplace in  Beckley, WV.</h4>
            </Col>
            <Col id='img4' md={6}>
              <img className='aboutPics' src='frenchGoat.jpg'/>
            </Col>
          </Row>

          <Row className='justify-content-center align-items-center text-start my-5'>
            <Col id='img5' md={6}>
              <img className='aboutPics' src='upperJQSalt.jpg'/>
            </Col>
            <Col id='para5' className='mt-4' md={5}>
              <h4>The Tamarack Marketplace was a huge operation that catered to the many travelers and locals.  An operation that not only had a restaurant but a large conference center that employed  a lot of culinarians. Through his love of teaching the craft, he was able to redesign how  the place operated by empowering his culinarians to achieve high volume and revenue.  With his fondness of the local farmers, he was able to create a culinary pipeline that  gave the guests and patrons a unique culinary experience. But a simple phone call from  Tom Crabtree will forever change his life.</h4>
            </Col>
          </Row>

          <Row id='sixthRow' className='justify-content-center align-items-center text-end mt-4'>
            <Col id='para6' className='mt-4' md={5}>
              <h4>Chef Gustard and Delphine have now embarked on a new chapter in their lives by purchasing  50 East Casual Dining & Spirits. Living in White Sulphur Springs for 25 years Chef  Gustard is back home to provide a wonderful dining experience enhancing both of their  distinct culinary backgrounds. Chef Gustard & Delphine ask you to take part in this new  chapter and come enjoy the years of culinary experience by dining at Gustard’s Bistro.</h4>
            </Col>
            <Col id='img6' md={6}>
              <img className='aboutPics' src='flamey-drip.jpg'/>
            </Col>
          </Row>
          <ScrollToTopButton />
        </Container>
    </>
  )
}

export default About