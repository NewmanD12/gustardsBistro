import React, { useState } from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import '../Pages/Menu.css'
import './MenuItem.css'
import { useAuth } from '../Hooks/Auth';
import axios from 'axios';



const MenuItem = (props) => {

    const { item, currentMenu, menuItemsEndpoint } = props
    const auth = useAuth();

    console.log(item)


    const [isEditing, setIsEditing] = useState(false)
    
    ///////////////////////////////////////////
    // THIS BLOCK IS FOR FINDING THE MENU PRICE AND CONVERTING THE SUBS INTO A STRING

    let price = ''
    let course = ''

    
    const mealPeriodAndPrices = item.mealPeriodAndPrices
    if(currentMenu === 'lunch' || currentMenu === 'dinner'){
        let menutoChange = ''
        if (currentMenu === 'lunch'){
            menutoChange = 'lunch'
        }
        else{
            menutoChange = 'dinner'
        }
        const menuPriceFound = mealPeriodAndPrices.filter((item) => {
            return item.mealPeriod === menutoChange
        })

        // console.log(menutoChange)
        price = menuPriceFound[0].price
        course = menuPriceFound[0].course
    }

    const subs = item.subsAndUpcharges.filter((sub) => {
        return sub.title
    })

    const convertSubs = (listOfSubs) => {
        const lengthOfSubs = listOfSubs.length
        
        let finalSubsAndPrices = ''
        
        if(lengthOfSubs === 1){
            finalSubsAndPrices = `${listOfSubs[0].title} $${listOfSubs[0].price}`
        }
        else if(lengthOfSubs === 2){
            finalSubsAndPrices = `${listOfSubs[0].title} ${listOfSubs[0].price ? `$${listOfSubs[0].price}` : '' } | ${listOfSubs[1].title} ${listOfSubs[1].price ? `$${listOfSubs[1].price}` : '' }`
        }
        else if(lengthOfSubs === 3){
            finalSubsAndPrices = `${listOfSubs[0].title} ${listOfSubs[0].price ? `$${listOfSubs[0].price}` : '' } | ${listOfSubs[1].title} ${listOfSubs[1].price ? `$${listOfSubs[1].price}` : '' } | ${listOfSubs[2].title} ${listOfSubs[2].price ? `$${listOfSubs[2].price}` : '' }`
        }
        else if(lengthOfSubs === 4){
            finalSubsAndPrices = `${listOfSubs[0].title} ${listOfSubs[0].price ? `$${listOfSubs[0].price}` : '' } | ${listOfSubs[1].title} ${listOfSubs[1].price ? `$${listOfSubs[1].price}` : '' } | ${listOfSubs[2].title} ${listOfSubs[2].price ? `$${listOfSubs[2].price}` : '' } | ${listOfSubs[3].title} ${listOfSubs[3].price ? `$${listOfSubs[3].price}` : '' }`
        }
        else if(lengthOfSubs === 5){
            finalSubsAndPrices = `${listOfSubs[0].title} ${listOfSubs[0].price ? `$${listOfSubs[0].price}` : '' } | ${listOfSubs[1].title} ${listOfSubs[1].price ? `$${listOfSubs[1].price}` : '' } | ${listOfSubs[2].title} ${listOfSubs[2].price ? `$${listOfSubs[2].price}` : '' } | ${listOfSubs[3].title} ${listOfSubs[3].price ? `$${listOfSubs[3].price}` : '' } | ${listOfSubs[4].title} ${listOfSubs[4].price ? `$${listOfSubs[4].price}` : '' }`
        }
        
        return finalSubsAndPrices
    }
    if(subs.length > 0){
        convertSubs(subs)
    }
    
    ///////////////////////////////////////////
    // console.log(item)

    ///////////////////////////////////////////

    // console.log(item.allergyWarnings)
    const abbreviatedAllergyWarnings = item.allergyWarnings.map((warning) => {
        let abbreviatedWarning = ''
        if(warning === 'vegetarian'){
            abbreviatedWarning = 'VEG'
        }
        if(warning === 'vegan'){
            abbreviatedWarning = 'V'
        }
        if(warning === 'dairy free'){
            abbreviatedWarning = 'DF'
        }
        if(warning === 'gluten free'){
            abbreviatedWarning = 'GF'
        }
        if(warning === 'shellfish'){
            abbreviatedWarning = 'SF'
        }
        if(warning === 'nutsSeeds'){
            abbreviatedWarning = 'NS'
        }

        return abbreviatedWarning
    })

    ///////////////////////////////////////////    

    ///////////////////////////////////////////
    // THIS BLOCK IS FOR COLLECTING AND SENDING THE EDITED MENU ITEM TO THE BACKEND

    const [editedMenuItem, setEditedMenuItem] = useState({})

    const [allergyWarnings, setAllergyWarnings] = useState([])
    const [firstSubAndUpcharge, setFirstSubAndUpcharge] = useState({})
    const [secondSubAndUpcharge, setSecondSubAndUpcharge] = useState({})
    const [thirdSubAndUpcharge, setThirdSubAndUpcharge] = useState({})
    const [fourthSubAndUpcharge, setFourthSubAndUpcharge] = useState({})
    const [fifthSubAndUpcharge, setFifthSubAndUpcharge] = useState({})

    const handleAlleryWarningChange = (e) => {

        // console.log(e.target.name)

        if(allergyWarnings.includes(e.target.name)){
    
          const index = allergyWarnings.indexOf(e.target.name)
          let newAllergyWarnings = []
    
          if(index === 0){
            newAllergyWarnings = allergyWarnings.slice(1)
            setAllergyWarnings(newAllergyWarnings)
          }
          else if(index === allergyWarnings.length - 1){
            newAllergyWarnings = allergyWarnings.slice(0, index)
            setAllergyWarnings(newAllergyWarnings)
          }
          else{
            const beginning = allergyWarnings.slice(0, index)
            const ending = allergyWarnings.slice(index + 1)
            setAllergyWarnings(beginning.concat(ending))
          }
        }
        else {
          setAllergyWarnings([
            ...allergyWarnings, e.target.name
          ])
        }
        // console.log(allergyWarnings)
    }

    const handleChange = (e) => {
        setEditedMenuItem({
            ...editedMenuItem,
            [e.target.name]: e.target.value
        })
    }

    const submitEdit = (e) => {
        e.preventDefault()

        const subsAndUpchargesToPass = [firstSubAndUpcharge, secondSubAndUpcharge, thirdSubAndUpcharge, fourthSubAndUpcharge, fifthSubAndUpcharge]

        const createMealPeriodAndPrices = () => {
            let mealPeriodAndPrices = []
            if(item.mealPeriodAndPrices[0].course === 'kidsMenu'){
                if(currentMenu === 'lunch'){
                    mealPeriodAndPrices = [{
                        mealPeriod : currentMenu, 
                        course : 'kidsMenu',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    }, 
                    {
                        mealPeriod : 'dinner', 
                        course : 'kidsMenu',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    }]
                }
                else {
                    mealPeriodAndPrices = [{
                        mealPeriod : 'lunch', 
                        course : 'kidsMenu',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    },
                    {
                        mealPeriod : currentMenu, 
                        course : 'kidsMenu',
                        price : editedMenuItem.price ? editedMenuItem.price : price 
                    }]
                }
            }
            else if(item.mealPeriodAndPrices[0].course === 'kidsDessert'){
                if(currentMenu === 'lunch'){
                    mealPeriodAndPrices = [{
                        mealPeriod : currentMenu, 
                        course : 'kidsDessert',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    }, 
                    {
                        mealPeriod : 'dinner', 
                        course : 'kidsDessert',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    }]
                }
                else {
                    mealPeriodAndPrices = [{
                        mealPeriod : 'lunch', 
                        course : 'kidsDessert',
                        price : editedMenuItem.price ? editedMenuItem.price : price
                    },
                    {
                        mealPeriod : currentMenu, 
                        course : 'kidsDessert',
                        price : editedMenuItem.price ? editedMenuItem.price : price 
                    }]
                }
            }
            else {
                mealPeriodAndPrices = [{
                    "mealPeriod" : currentMenu,
                    "course" : editedMenuItem.course ? editedMenuItem.course : course,
                    "price" : editedMenuItem.price ? editedMenuItem.price : price
                }]
            }
            
            return mealPeriodAndPrices
        }



        const editedItemToPass = {
            "title" : editedMenuItem.title ? editedMenuItem.title : item.title,
            "description" : editedMenuItem.description ? editedMenuItem.description : item.description,
            "restaurant" : item.restaurant,
            "allergyWarnings" : allergyWarnings.length >= 1 ? allergyWarnings : item.allergyWarnings,
            "mealPeriodAndPrices" : createMealPeriodAndPrices(),
            "subsAndUpcharges" : firstSubAndUpcharge.title ? subsAndUpchargesToPass : item.subsAndUpcharges
        }

        axios.put(`${menuItemsEndpoint}/edit-item/${item._id}`, editedItemToPass)
                .then((res) => console.log(res))
                .catch((err) => console.log(err.toString()))
                .finally(() => {
                    window.location.reload(false)
                })
    }


    ///////////////////////////////////////////

    
    const [currentSubLevel, setCurrentSubLevel] = useState(1)
    
    
    
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleDelete = (menuItemId) => {
        // console.log(menuItemId)
        axios.delete(`${menuItemsEndpoint}/delete-menu-item/${menuItemId}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
                .finally(() => {
                    window.location.reload(false)
                })
    }

    return (

        <>

        {!isEditing && !auth.userToken && <Container fluid id='individual-menu-items'>
            {auth.userToken && <Row 
                                    className='edit-row justify-content-end' 
                                    id={`${item._id}-edit-row`}
                                >
                                    <Col xs={2} className='button-cols' id={`${item._id}-edit-col`}>
                                        <Button 
                                            variant='warning'
                                            onClick={() => {
                                                handleEdit(item._id)
                                            }}    
                                        >Edit</Button>
                                    </Col>
                                    <Col xs={2} className='button-cols' id={`${item._id}-delete-col`}>
                                        <Button 
                                            variant='danger'
                                            onClick={() => {
                                                handleDelete(item._id)
                                            }}    
                                        >Delete</Button>
                                    </Col>
                                </Row>
            }
            
            <Row className='justify-content-center'>
                <Col id='menu-item-title' xs={8}>{item.title}</Col>
                <Col id='menu-item-price'>${price}</Col>
            </Row>

            {abbreviatedAllergyWarnings.length > 0 && <Row>
                <Col>
                    <p className='allergyWarnings'>[{abbreviatedAllergyWarnings.join(', ')}]</p>
                </Col>
            </Row>}
            
            <Row>
                <Col>
                    <p id='menu-item-desc'>{item.description}</p>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col>
                    <p className='subs'>{convertSubs(subs)}</p>
                </Col>
            </Row>
        </Container>}
        
        {!isEditing && auth.userToken && <Container fluid 
                            id='individual-menu-items'
                            onMouseEnter={(e) => {
                                const editCol = document.getElementById(`${item._id}-edit-col`)
                                const deleteCol = document.getElementById(`${item._id}-delete-col`)
                                
                                editCol.style.display = 'flex'
                                deleteCol.style.display = 'flex'
                            }}
                            onMouseLeave={(e) => {
                                const editCol = document.getElementById(`${item._id}-edit-col`)
                                const deleteCol = document.getElementById(`${item._id}-delete-col`)
                                
                                editCol.style.display = 'none'
                                deleteCol.style.display = 'none'
                            }}
                        >
                            {auth.userToken && <Row 
                                                    className='edit-row justify-content-end' 
                                                    id={`${item._id}-edit-row`}
                                                >
                                                    <Col xs={2} className='button-cols' id={`${item._id}-edit-col`}>
                                                        <Button 
                                                            variant='warning'
                                                            onClick={() => {
                                                                handleEdit(item._id)
                                                            }}    
                                                        >Edit</Button>
                                                    </Col>
                                                    <Col xs={2} className='button-cols' id={`${item._id}-delete-col`}>
                                                        <Button 
                                                            variant='danger'
                                                            onClick={() => {
                                                                handleDelete(item._id)
                                                            }}    
                                                        >Delete</Button>
                                                    </Col>
                                                </Row>
                            }
                            
                            <Row className='justify-content-center'>
                                <Col id='menu-item-title' xs={8}>{item.title}</Col>
                                <Col id='menu-item-price'>${price}</Col>
                            </Row>

                            {abbreviatedAllergyWarnings.length > 0 && <Row>
                                <Col>
                                    <p className='allergyWarnings'>[{abbreviatedAllergyWarnings.join(', ')}]</p>
                                </Col>
                            </Row>}
                            
                            <Row>
                                <Col>
                                    <p id='menu-item-desc'>{item.description}</p>
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col>
                                    <p className='subs'>{convertSubs(subs)}</p>
                                </Col>
                            </Row>
                        </Container>}
        

        {
            isEditing && <Container fluid className='mt-5'>
                            <Row 
                                className='justify-content-center text-center'
                            >
                                <Col xs={6}>
                                    <Form>
                                        <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                                        <Form.Control type="text" placeholder={item.title} name='title'/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs={3} className='text-right'>
                                    <Form>
                                        <Form.Group
                                        onChange={(e) => handleChange(e)}>
                                        <Form.Control 
                                        type='text'
                                        name='price'
                                        placeholder={price}
                                        />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            <Row className='justify-content-center'>
                                <Col xs={9}>
                                    <Form>
                                        <Form.Group className="mb-3" onChange={(e) => handleChange(e)}>
                                        <Form.Control as='textarea' rows={3} placeholder={item.description} name='description'/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            <Row className='justify-content-center mx-5'>
                                <Col xs={4}>
                                    <Form.Group className="mb-3" onChange={(e) => handleAlleryWarningChange(e)}>
                                        
                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='vegetarian'
                                        label='Vegetarian'
                                        name='vegetarian'
                                        />
                            
                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='vegan'
                                        label='Vegan'
                                        name='vegan'
                                        />

                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='shellfish'
                                        label='Shellfish'
                                        name='shellfish'
                                        />
                                        
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group className="mb-3" onChange={(e) => handleAlleryWarningChange(e)}>
                            
                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='glutenFree'
                                        label='Gluten Free'
                                        name='gluten free'
                                        />
                            
                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='dairyfree'
                                        label='Dairy Free'
                                        name='dairy free'
                                        />

                                        <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='nutsSeeds'
                                        label='Nuts/Seeds'
                                        name='nutsSeeds'
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {currentMenu === 'lunch' && <Row className='justify-content-center'>
                                                            <Col xs={9}>
                                                                <Form.Group onChange={(e) => {
                                                                    setEditedMenuItem({
                                                                        ...editedMenuItem, 
                                                                        'course' : e.target.value
                                                                    })
                                                                }}>
                                                                    <Form.Select name='course'>
                                                                    <option id='pick-course'>Pick A Course</option>
                                                                    <option value='saladsAndStarters'>Crafted Salads & Starters</option>
                                                                    <option value='sandwichesAndPies'>Sandwiches & Pies</option>
                                                                    <option value='sides'>Sides</option>
                                                                    <option value='bowls'>Bowls</option>
                                                                    <option value='kidsMenu'>Kids Menu</option>
                                                                    <option value='desserts'>Desserts</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                            }

                            {currentMenu === 'dinner' && <Row className='justify-content-center'>
                                                            <Col xs={9}>
                                                                <Form.Group onChange={(e) => {
                                                                    setEditedMenuItem({
                                                                        ...editedMenuItem, 
                                                                        'course' : e.target.value
                                                                    })
                                                                }}>
                                                                    <Form.Select name='course'>
                                                                    <option id='pick-course'>Pick A Course</option>
                                                                    <option value='starters'>Starters</option>
                                                                    <option value='soupsAndSalads'>Crafted Soups and Salads</option>
                                                                    <option value='sandwichesAndPies'>Sandwiches and Pies</option>
                                                                    <option value='comfort'>Comfort</option>
                                                                    <option value='entrees'>Entrees</option>
                                                                    <option value='sides'>Sides</option>
                                                                    <option value='kidsMenu'>Kids Menu</option>
                                                                    <option value='desserts'>Desserts</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                            }

                            

                            <Row className='justify-content-center'>
                                <Col className='mt-3' xs={5}>
                                    <Form.Group>
                                    <Form.Label>Substitution</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Enter Substitution" name='firstSubAndUpcharge'
                                    onChange={(e) => {
                                        setFirstSubAndUpcharge({...firstSubAndUpcharge, title : e.target.value})
                                    }}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col className='mt-3' xs={4}>
                                    <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Price" 
                                        name='sub1-price'
                                        onChange={(e) => {
                                        setFirstSubAndUpcharge({...firstSubAndUpcharge, price : e.target.value})
                                        }}
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>
          
                            {currentSubLevel >= 2 && <Row className='justify-content-center'>
                                <Col className='mt-3' xs={5}>
                                    <Form.Group>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter Substitution" name='secondSubAndUpcharge'
                                        onChange={(e) => {
                                        setSecondSubAndUpcharge({...secondSubAndUpcharge, title : e.target.value})
                                        }}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col className='mt-3' xs={4}>
                                    <Form.Group>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Price" 
                                        name='sub2-price'
                                        onChange={(e) => {
                                        setSecondSubAndUpcharge({...secondSubAndUpcharge, price : e.target.value})
                                        }}
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>}
          
                            {currentSubLevel >= 3 && <Row className='justify-content-center'>
                            <Col className='mt-3' xs={5}>
                                <Form.Group>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Enter Substitution" name='thirdSubAndUpcharge'
                                    onChange={(e) => {
                                    setThirdSubAndUpcharge({...thirdSubAndUpcharge, title : e.target.value})
                                    }}
                                />
                                </Form.Group>
                            </Col>
                            <Col className='mt-3' xs={4}>
                                <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Price" 
                                    name='sub3-price'
                                    onChange={(e) => {
                                    setThirdSubAndUpcharge({...thirdSubAndUpcharge, price : e.target.value})
                                    }}
                                />
                                </Form.Group>
                            </Col>
                            </Row>}
                        
                            {currentSubLevel >= 4 && <Row className='justify-content-center'>
                                <Col className='mt-3' xs={5}>
                                <Form.Group>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Enter Substitution" name='fourthSubAndUpcharge'
                                    onChange={(e) => {
                                        setFourthSubAndUpcharge({...fourthSubAndUpcharge, title : e.target.value})
                                    }}
                                    />
                                </Form.Group>
                                </Col>
                                <Col className='mt-3' xs={4}>
                                <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Price" 
                                    name='sub4-price'
                                    onChange={(e) => {
                                    setFourthSubAndUpcharge({...fourthSubAndUpcharge, price : e.target.value})
                                    }}
                                />
                                </Form.Group>
                                </Col>
                            </Row>}
          
                            {currentSubLevel >= 5 && <Row className='justify-content-center'>
                                <Col className='my-3' xs={5}>
                                    <Form.Group>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter Substitution" name='fifthSubAndUpcharge'
                                        onChange={(e) => {
                                            setFifthSubAndUpcharge({...fifthSubAndUpcharge, title : e.target.value})
                                        }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className='mt-3' xs={4}>
                                    <Form.Group>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Price" 
                                        name='sub5-price'
                                        onChange={(e) => {
                                        setFifthSubAndUpcharge({...fifthSubAndUpcharge, price : e.target.value})
                                        }}
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>}
        
                            {currentSubLevel <= 4 && <Row className='justify-content-end m-3' id='addAnotherButton' xs={2}>
                            <Col xs={3}>
                                <p onClick={() => {
                                setCurrentSubLevel(currentSubLevel + 1)
                                }}>+Add Another</p>
                            </Col>
                            </Row>}

                            <Row className='justify-content-center text-center mb-5'>
                                <Col xs={4}>
                                    <Button
                                        variant='success'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            submitEdit(e)}
                                        }
                                    >Save</Button>
                                </Col>
                                <Col xs={4}>
                                    <Button
                                        variant='danger'
                                        onClick={(e) => {
                                            setEditedMenuItem({})
                                            setAllergyWarnings([])
                                            setFirstSubAndUpcharge({})
                                            setSecondSubAndUpcharge({})
                                            setThirdSubAndUpcharge({})
                                            setFourthSubAndUpcharge({})
                                            setFifthSubAndUpcharge({})
                                            setIsEditing(false)
                                        }}
                                    >Cancel</Button>
                                </Col>
                            </Row>
                        </Container>
        }

        </>

        
    )
}

export default MenuItem