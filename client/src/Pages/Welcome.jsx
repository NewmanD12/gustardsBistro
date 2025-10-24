import { Container, Row, Col} from 'react-bootstrap'
import styles from './Welcome.css'
import WelcomeImgCarousel from '../components/WelcomeImgCarousel'
import BulletinModal from '../components/BulletinModal'


const Welcome = (props) => {

  const { bulletins, setBulletins, isModalOpen, setIsModalOpen} = props
  // console.log(bulletins)
  // console.log(isModalOpen)

  return (
    <>
      <Container fluid id='welcome-body' className={isModalOpen ? styles.blurred : ''}>
        <Row className='justify-content-center align-items-center text-center'>
          <Col>
            <WelcomeImgCarousel /> 
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Welcome