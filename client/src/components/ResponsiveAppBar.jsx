import * as React from 'react';
import { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import './ResponsiveAppBar.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../Hooks/Auth';




function ResponsiveAppBar() {
  const navigate = useNavigate()
  const auth = useAuth();
  const [showNavbar, setShowNavbar] = useState(false)
  
  
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  // console.log(auth)
  // const toggleNavElements = () => {
  //   const navElements = document.getElementById('nav-elements')
  //   if(navElements.className.includes('active')){
  //     navElements.classList.toggle('active')
  //   }
  //   else {
  //     navElements.classList.toggle('active')
  //   }

  // }

  return (
    <nav className="navbar">
      <div className="container">

        <Container fluid>
            <Row id='nav-row-container'>
              <Col onClick={() => navigate('/')}>
                <img src={`/gustardsBistroBlue.png`} id='logo'></img>
              </Col>
              <Col xs={2} id='menu-icon'  className='menu-icon' onClick={() => {
                handleShowNavbar()
                console.log('clicked')
              }}>
                <div id='hamburger'>
                  <div id='bar1'></div>
                  <div id='bar2'></div>
                  <div id='bar3'></div>
                </div>
              </Col>
              <Col id='wide-nav'>
                <div id='nav-elements' className={`nav-elements  ${showNavbar && 'active'}`}>
                  <ul>

                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/">Home</NavLink>
                                        </li>}
                    
                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/about">About</NavLink>
                                        </li>}
                    
                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/menu">Menu</NavLink>
                                        </li>}

                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/kids-menu">Kids Menu</NavLink>
                                        </li>}

                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/tasting-room">Tasting Room</NavLink>
                                        </li>}
                    
                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/gallery">Gallery</NavLink>
                                        </li>}
                    
                    {!auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to="/localfarmers">Local Farmers</NavLink>
                                        </li>}

                    {auth.userToken && <li className='dropdown' id='all-pages-link' onMouseEnter={() => {
                                          const dropdown = document.getElementById('dropdown-content')
                                          dropdown.style.display = 'flex'
                                        }}
                                        
                                        onMouseLeave={() => {
                                          const dropdown = document.getElementById('dropdown-content')

                                          dropdown.style.display = 'none'
                                        }}
                                        >
                                          <NavLink to='#'>All Other Pages</NavLink>
                                          <div 
                                          id='dropdown-content'
                                          >
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/' className='other-pages-links'>Home</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/about' className='other-pages-links'>About</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/menu' className='other-pages-links'>Menu</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/kids-menu' className='other-pages-links'>Kids Menu</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/tasting-room' className='other-pages-links'>Tasting Room</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/gallery' className='other-pages-links'>Gallery</NavLink>
                                            <NavLink onClick={() => {
                                              const dropdown = document.getElementById('dropdown-content')
                                              dropdown.style.display = 'none'
                                            }} to='/localfarmers' className='other-pages-links'>Local Farmers</NavLink>
                                          </div>
                                        </li>
                                        }
                    
                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/' onClick={(e) => handleShowNavbar()}>Home</NavLink>
                                      </li>}
                    
                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/about' onClick={(e) => handleShowNavbar()}>About</NavLink>
                                      </li>}
                    
                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/menu' onClick={(e) => handleShowNavbar()}>Menu</NavLink>
                                      </li>}

                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/kids-menu' onClick={(e) => handleShowNavbar()}>Kids Menu</NavLink>
                                      </li>}
                    
                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/gallery' onClick={(e) => handleShowNavbar()}>Gallery</NavLink>
                                      </li>}
                    
                    {auth.userToken && <li className='condensed-dropdown'>
                                        <NavLink to='/localfarmers' onClick={(e) => handleShowNavbar()}>Local Farmers</NavLink>
                                      </li>}                   

                    {auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to='/admin'>Admin</NavLink>
                                        </li>}

                    {auth.userToken && <li onClick={() => handleShowNavbar()}>
                                          <NavLink to='/' onClick={() => {
                                            auth.logout()
                                          }}>Logout</NavLink>
                                        </li>}
                  </ul>
                </div>
              </Col>
            </Row>
        </Container>  
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;