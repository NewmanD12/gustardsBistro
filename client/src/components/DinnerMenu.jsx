import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuItem from './MenuItem';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../Hooks/Auth';






const DinnerMenu = (props) => {

    const { menuItems, currentMenu, setCurrentMenu, menuItemsEndpoint } = props
    const abbrevLegend = 'GF = Gluten Free, V = Vegan, VEG = Vegetarian, DF = Dairy Free, SF = Shellfish, NS = Nuts/Seeds'
    const [editingSides, setEditingSides] = useState(false)
    const auth = useAuth();

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
                            <h1 id='menu'>Dinner Menu</h1>
                        </Col>
                    </Row>
                </div>
                <div id='starters-div'>
                    <Row className='justify-content-center text-center m-3'>
                        <h1 id='starters-header' className='course-headers'>Soups, Salads & Starters
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
                    <Row className='justify-content-center text-center m-3'>
                        <h3>PROTEIN ADD ON:</h3>
                        <h4>Marinated Chicken Breast - 6 / Grilled Coulotte - 8 / Salmon - 12</h4>
                    </Row>
                </div>
                {/* <div id='apps-div' className='mt-3'>
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
                </div> */}
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
                        onClick={(e) => showSideEditRow()}
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
                    </Row>}
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