import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuItem from './MenuItem'

const LunchMenu = (props) => {

    const { menuItemsEndpoint, menuItems, currentMenu, setCurrentMenu } = props

    let lunchItems = []
    let saladsAndStarters = []
    let sandwichesAndPies = []
    let sides = []
    let bowls = []
    let desserts = []
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish'

    const addToLunchItems = (item) => {
        lunchItems = [...lunchItems, item]
    }

    menuItems.map((item) => {
        if(item.mealPeriodAndPrices[0].course === 'lunch'){
            addToLunchItems(item)
        }
    })

    lunchItems.map((item) => {
        // console.log(item.mealPeriodAndPrices[0].mealPeriod)
        if(item.mealPeriodAndPrices.length === 2){
            if(item.mealPeriodAndPrices[0].course === 'saladsAndStarters' || item.mealPeriodAndPrices[1].course === 'saladsAndStarters'){
                saladsAndStarters = [...saladsAndStarters, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sandwichesAndPies' || item.mealPeriodAndPrices[1].course === 'sandwichesAndPies'){
                sandwichesAndPies = [...sandwichesAndPies, item]
            } 
            else if(item.mealPeriodAndPrices[0].course === 'sides' || item.mealPeriodAndPrices[1].course === 'sides'){
                sides = [...sides, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'bowls' || item.mealPeriodAndPrices[1].course === 'bowls'){
                bowls = [...bowls, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'desserts' || item.mealPeriodAndPrices[1].course === 'desserts'){
                desserts = [...desserts, item]
            }
        }
        else {
            if(item.mealPeriodAndPrices[0].course === 'saladsAndStarters'){
                saladsAndStarters = [...saladsAndStarters, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'sandwichesAndPies'){
                sandwichesAndPies = [...sandwichesAndPies, item]
            } 
            else if(item.mealPeriodAndPrices[0].course === 'sides'){
                sides = [...sides, item]
            }
            else if(item.mealPeriodAndPrices[0].course === 'bowls'){
                bowls = [...bowls, item]
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
            <Container fluid id='lunch-menu-body' className='py-5'>

                <div>
                    <Row className='justify-content-center text-center m-3'>
                        <Col>
                            <h1 
                                id='switch-menu'
                                onClick={(e) => {
                                    setCurrentMenu('dinner')
                                }}
                            >
                                Click Here To See The Dinner Menu
                            </h1>
                        </Col>
                    </Row>
                </div>

                <div id='starters-div' className='course-containers'>
                    <Row className='justify-content-center text-center m-3'>
                        <h2 id='app-header' className='course-headers'>Crafted Salads & Starters
                        </h2>
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {saladsAndStarters.length >= 1 && saladsAndStarters.map((item, index) => {
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
                
                <div id='sandwiches-and-pies-div' className='course-containers mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h3 id='sandwiches-and-pies-header' className='course-headers'>Sandwiches & Pies
                        </h3>
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

                <div id='bowls-div' className='course-containers mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='bowls-header' className='course-headers'>Bowls
                        </h1> 
                        <h6>{abbrevLegend}</h6>
                    </Row>
                    <Row className='justify-content-center'>
                        {bowls.length >= 1 && bowls.map((item, index) => {
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

                <div id='desserts-div' className='course-containers mt-3'>
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

export default LunchMenu