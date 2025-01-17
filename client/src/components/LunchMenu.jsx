import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuItem from './MenuItem'
import { Button } from 'react-bootstrap';
import { useAuth } from '../Hooks/Auth';
import axios from 'axios';

const LunchMenu = (props) => {

    const { menuItemsEndpoint, menuItems, currentMenu, setCurrentMenu } = props
    const auth = useAuth();

    let lunchItems = []
    let saladsAndStarters = []
    let sandwichesAndPies = []
    let sides = []
    let bowls = []
    let desserts = []
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish, NS = Nuts/Seeds'
    const [editingSides, setEditingSides] = useState(false)

    const addToLunchItems = (item) => {
        lunchItems = [...lunchItems, item]
    }

    menuItems.map((item) => {
        // console.log(item.mealPeriodAndPrices[0].mealPeriod)
        if(item.mealPeriodAndPrices[0].mealPeriod === 'lunch'){
            addToLunchItems(item)
        }
    })

    // console.log(lunchItems)

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

    const showSideEditRow = () => {
        if(auth.userToken){
            const editRow = document.getElementById('edit-sides-row')
            editRow.style.display = 'flex'
        }
    }

    const hideSideEditRow = () => {
        const editRow = document.getElementById('edit-sides-row')
        editRow.style.display = 'none'
    }

    console.log(saladsAndStarters)

    return (
        <>
            <Container fluid id='lunch-menu-body' className='py-5'>

                <div>
                    <Row className='justify-content-center text-center m-3'>
                        <Col>
                            <h1 id='menu'>
                                Lunch Menu
                            </h1>
                        </Col>
                    </Row>
                </div>

                <div id='starters-div' className='course-containers'>
                    <Row className='justify-content-center text-center m-3'>
                        <h2 id='app-header' className='course-headers'>Crafted Soups, Salads & Starters
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
                    <Row className='justify-content-center text-center m-3'>
                        <h3>PROTEIN ADD ON:</h3>
                        <h4>Marinated Chicken Breast - 6 / Grilled Coulotte - 8 / Salmon - 12</h4>
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
                    <Row id='edit-sides-row' className='justify-content-center text-center my-3'>
                        <Col sm={3}>
                            <Button variant='success' onClick={(e) => setEditingSides(true)}>Edit Sides</Button>
                        </Col>
                        <Col sm={3}>
                            <Button variant='danger' onClick={(e) => {
                                setEditingSides(false)
                                hideSideEditRow()
                            }}>Cancel</Button>
                        </Col>
                    </Row>
                    <Row 
                        className='justify-content-center text-center'  
                        onClick={(e) => {
                            showSideEditRow()
                        }}
                    >
                        <Col xs={8}>
                            <h3>Sides $5: {sidesString}</h3>
                        </Col>
                    </Row>
                    {auth.userToken && <Row>
                        <Col>
                            {editingSides && sides.map((side, index) => {
                                return  <Row className='justify-content-center text-center my-3' key={index}>
                                            <Col className='mt-4' sm={6}>
                                                <input 
                                                    className='side-edit-inputs' placeholder={side.title}
                                                    name='edited-side'
                                                    id={side.title}
                                                />
                                            </Col>
                                            <Col className='mt-3' sm={4}>
                                                <Button 
                                                    className='mx-4' 
                                                    variant='success'
                                                    onClick={(e) => {
                                                        const editedSide = document.getElementById(side.title)
                                                        console.log(editedSide.value.length)
                                                        if(editedSide.value.length > 0){
                                                            const editedSideToPass = {
                                                                ...side,
                                                                title : editedSide.value
                                                            }

                                                            console.log(editedSideToPass)

                                                            axios.put(`${menuItemsEndpoint}/edit-side-item/${side._id}`, editedSideToPass)
                                                                .then((res) => console.log(res))
                                                                .catch((err) => console.log(err.toString()))
                                                                .finally(() => {
                                                                    window.location.reload(false)
                                                                })
                                                        }
                                                    }}
                                                >Save</Button>
                                                <Button 
                                                    variant='danger'
                                                    onClick={(e) => {
                                                        axios.delete(`${menuItemsEndpoint}/delete-menu-item/${side._id}`)
                                                            .then((res) => console.log(res))
                                                            .catch((err) => console.log(err))
                                                            .finally(() => {
                                                                window.location.reload(false)
                                                            })
                                                    }}
                                                >Delete</Button>
                                            </Col>
                                        </Row>
                            })}
                        </Col>
                    </Row>
                    }
                    
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