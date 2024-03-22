import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuItem from './MenuItem'


const DinnerMenu = (props) => {

    const { menuItems, currentMenu, setCurrentMenu, menuItemsEndpoint } = props
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish, NS = Nuts/Seeds'

    let dinnerItems = []
    let starters = []
    let soupsAndSalads = []
    let sandwichesAndPies = []
    let comfort = []
    let entrees = []
    let sides = []
    let desserts = []

    const addTodinnerItems = (item) => {
        dinnerItems = [...dinnerItems, item]
    }

    menuItems.map((item, index) => {
        if(item.mealPeriodAndPrices[0].mealPeriod === 'dinner'){
            addTodinnerItems(item)
        }
    })



    dinnerItems.map((item) => {

        if(item.mealPeriodAndPrices.length === 2){
            if(item.mealPeriodAndPrices[0].course === 'starters' || item.mealPeriodAndPrices[1].course === 'starters'){
                starters = [...starters, item]
            }
            if(item.mealPeriodAndPrices[0].course === 'soupsAndSalads' || item.mealPeriodAndPrices[1].course === 'soupsAndSalads'){
                soupsAndSalads = [...soupsAndSalads, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sandwichesAndPies' || item.mealPeriodAndPrices[1].course === 'sandwichesAndPies'){
                sandwichesAndPies = [...sandwichesAndPies, item]
            } 
            else if(item.mealPeriodAndPrices[0].course === 'comfort' || item.mealPeriodAndPrices[1].course === 'comfort'){
                comfort = [...comfort, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'entrees' || item.mealPeriodAndPrices[1].course === 'entrees'){
                entrees = [...entrees, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sides' || item.mealPeriodAndPrices[1].course === 'sides'){
                sides = [...sides, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'desserts' || item.mealPeriodAndPrices[1].course === 'desserts'){
                desserts = [...desserts, item]
            }
        }
        else {
            if(item.mealPeriodAndPrices[0].course === 'starters'){
                starters = [...starters, item]
            }
            if(item.mealPeriodAndPrices[0].course === 'soupsAndSalads'){
                soupsAndSalads = [...soupsAndSalads, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sandwichesAndPies'){
                sandwichesAndPies = [...sandwichesAndPies, item]
            } 
            else if(item.mealPeriodAndPrices[0].course === 'comfort'){
                comfort = [...comfort, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'entrees'){
                entrees = [...entrees, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sides'){
                sides = [...sides, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'desserts'){
                desserts = [...desserts, item]
            }
        }
    })

    let sidesString = sides.map((item) => {
        return item.title
    })
    try {
        sidesString = sidesString.join(', ')
    } catch (e) {
        console.log(e.toString())
    }

    return (
        <>
            <Container fluid id='dinner-menu-body'>
                <div>
                    <Row className='justify-content-center text-center m-3'>
                        <Col>
                        <h1 
                            id='switch-menu'
                            onClick={(e) => {
                                setCurrentMenu('lunch')
                            }}
                        >Click Here To See The Lunch Menu</h1>
                        </Col>
                    </Row>
                </div>
                <div id='starters-div'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='starters-header' className='course-headers'>Starters
                        </h1>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {starters.length >= 1 && starters.map((item, index) => {
                            return <Col md={6} key={index}>
                                        <MenuItem 
                                            item={item} 
                                            key={index} 
                                            currentMenu={currentMenu}
                                            menuItemsEndpoint={menuItemsEndpoint}
                                        />
                                    </Col>
                        })
                        }   
                    </Row>
                </div>
                <div id='apps-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='app-header' className='course-headers'>Crafted Soups & Salads
                        </h1>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {soupsAndSalads.length >= 1 && soupsAndSalads.map((item, index) => {
                            return <Col md={6} key={index}>
                                        <MenuItem 
                                            item={item} 
                                            key={index} 
                                            currentMenu={currentMenu}
                                            menuItemsEndpoint={menuItemsEndpoint}
                                        />
                                    </Col>
                        })
                        }   
                    </Row>
                </div>
                <div id='sandwiches-and-pies-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='sandwiches-and-pies-header' className='course-headers'>Sandwiches & Pies
                        </h1>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {sandwichesAndPies.length >= 1 && sandwichesAndPies.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
                                                menuItemsEndpoint={menuItemsEndpoint}
                                            />
                                        </Col>
                            })
                        }   
                    </Row>
                    <Row className='justify-content-center text-center'>
                        <Col xs={8}>
                            <h3>Sides: {sidesString}</h3>
                        </Col>
                    </Row>
                </div>
                
                <div id='comforts-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='comforts-header' className='course-headers'>Comfort
                        </h1> 
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {comfort.length >= 1 && comfort.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
                                                menuItemsEndpoint={menuItemsEndpoint}
                                            />
                                        </Col>
                            })
                        }   
                    </Row>
                </div>
                
                <div id='entrees-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='entrees-header' className='course-headers'>Entrees
                        </h1> 
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {entrees.length >= 1 && entrees.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
                                                menuItemsEndpoint={menuItemsEndpoint}
                                            />
                                        </Col>
                            })
                        }   
                    </Row>
                </div>
                
                <div id='desserts-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='desserts-header' className='course-headers'>Desserts
                        </h1>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {desserts.length >= 1 && desserts.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
                                                menuItemsEndpoint={menuItemsEndpoint}
                                            />
                                        </Col>
                            })
                        }   
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default DinnerMenu