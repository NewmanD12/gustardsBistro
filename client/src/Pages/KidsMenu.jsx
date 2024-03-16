import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MenuItem from '../components/MenuItem'
import '../Pages/Menu.css'

const KidsMenu = (props) => {

    const { currentMenu, menuItems, menuItemsEndpoint } = props

    let kidMenuItems = []
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish'

    const addToKidsMenuItems = (item) => {
        kidMenuItems = [...kidMenuItems, item]
    }

    menuItems.map((item, index) => {

        let mealPeriodAndPrices = item.mealPeriodAndPrices.map((period) => {
            return period.course === 'kidsMenu' 
        })

        if(mealPeriodAndPrices.includes(true)){
            addToKidsMenuItems(item)
        }
        return item
    })

    return (
        <>
            <Container fluid id='kids-menu-body' className='py-5'>
                <div id='kids-menu-div' className='course-containers'>
                    <Row className='justify-content-center text-center m-3'>
                        <h2 id='kids-menu-header' className='course-headers'>Kids Menu</h2>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {kidMenuItems.length > 0 && kidMenuItems.map((item, index) => {
                            return  <Col md={6} key={index}>
                                        <MenuItem 
                                            item={item} 
                                            key={index} 
                                            currentMenu={currentMenu}
                                            menuItemsEndpoint={menuItemsEndpoint}
                                        />
                                    </Col>
                        })}
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default KidsMenu