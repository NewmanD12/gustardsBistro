import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MenuItem from '../components/MenuItem'
import '../Pages/Menu.css'

const KidsMenu = (props) => {

    const { currentMenu, menuItems, menuItemsEndpoint } = props

    let kidMenuItems = []
    let kidsDessertItems = []
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish, NS = Nuts/Seeds'

    const addToKidsMenuItems = (item) => {
        kidMenuItems = [...kidMenuItems, item]
        return true
    }

    const addToKidsDessertsItems = (item) => {
        kidsDessertItems = [...kidsDessertItems, item]
        return true
    }

    menuItems.map((item, index) => {

        let mealPeriodAndPrices = item.mealPeriodAndPrices.map((period) => {
            return period.course === 'kidsMenu' 
        })

        let mealPeriodAndPrices2 = item.mealPeriodAndPrices.map((period) => {
            return period.course === 'kidsDessert' 
        })

        if(mealPeriodAndPrices.includes(true)){
            addToKidsMenuItems(item)
        }

        if(mealPeriodAndPrices2.includes(true)){
            addToKidsDessertsItems(item)
        }

        // if(mealPeriodAndPrices2.includes)
        return item
    })

    // console.log(kidsDessertItems)

    return (
        <>
            <Container fluid id='kids-menu-body' className='py-5'>

                <div>
                    <Row className='justify-content-center text-center m-3'>
                        <Col>
                            <h1 id='menu'>
                                Kid's Menu
                            </h1>
                        </Col>
                    </Row>
                </div>

                <div id='kids-menu-div' className='course-containers'>
                    <Row className='justify-content-center text-center m-3'>
                        <h2 id='kids-menu-header' className='course-headers'>Entrees</h2>
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

                <div id='kids-desserts-div' className='course-containers mt-5'>
                    <Row className='justify-content-center text-center m-3'>
                        <h2 id='kids-desserts-header' className='course-headers'>Desserts</h2>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {kidsDessertItems.length > 0 && kidsDessertItems.map((item, index) => {
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