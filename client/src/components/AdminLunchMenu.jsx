import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuItem from './MenuItem'

const AdminLunchMenu = (props) => {
    const { menuItems, currentMenu, setCurrentMenu } = props

    let lunchItems = []
    let saladsAndStarters = []
    let sandwichesAndPies = []
    let sides = []
    let bowls = []
    let desserts = []

    const addToLunchItems = (item) => {
        lunchItems = [...lunchItems, item]
    }

    menuItems.map((item, index) => {
        let isLunchItem = item.mealPeriodAndPrices.map((item) => item.mealPeriod)
           
        if(isLunchItem.includes('lunch')){
            addToLunchItems(item)
        }
    })

    // console.log(lunchItems)
    lunchItems.map((item) => {
        // console.log(item.mealPeriodAndPrices[0].mealPeriod)
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
    })


    // console.log(lunchItems)
    // console.log(saladsAndStarters)

    return (
        <>
            <Container fluid id='lunch-menu-body'>

                <div>
                    <Row className='justify-content-center text-center m-3/Volumes/STORE N GO/Chef Photos'>
                        <Col>
                        <h1 
                            id='switch-menu'
                            onClick={(e) => {
                                setCurrentMenu('dinner')
                            }}
                        >Click Here To See The Dinner Menu</h1>
                        </Col>
                    </Row>
                </div>

                <div id='starters-div'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='app-header' className='course-headers'>Crafted Salads & Starters
                        </h1>
                    </Row>
                    <Row className='justify-content-center'>
                        {saladsAndStarters.length >= 1 && saladsAndStarters.map((item, index) => {
                            return <Col md={6} key={index}>
                                        <MenuItem 
                                            item={item} 
                                            key={index} 
                                            currentMenu={currentMenu}
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
                    </Row>
                    <Row className='justify-content-center'>
                        {sandwichesAndPies.length >= 1 && sandwichesAndPies.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
                                            />
                                        </Col>
                            })
                        }   
                    </Row>
                    <Row className='justify-content-center text-center'>
                        <Col xs={8}>
                            <h3>Sides: Fries, Sweet Potatoes, Pasta Salad, Asian Slaw, Vegetable of the Day</h3>
                        </Col>
                    </Row>
                </div>

                <div id='bowls-div' className='mt-3'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='bowls-header' className='course-headers'>Bowls
                        </h1>                        
                    </Row>
                    <Row className='justify-content-center'>
                        {bowls.length >= 1 && bowls.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
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
                    </Row>
                    <Row className='justify-content-center'>
                        {desserts.length >= 1 && desserts.map((item, index) => {
                                return <Col md={6} key={index}>
                                            <MenuItem 
                                                item={item} 
                                                key={index} 
                                                currentMenu={currentMenu}
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

export default AdminLunchMenu