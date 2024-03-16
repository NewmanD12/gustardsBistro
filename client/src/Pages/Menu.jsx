import React, { useState } from 'react'
import './Menu.css'
import LunchMenu from '../components/LunchMenu';
import DinnerMenu from '../components/DinnerMenu';

const Menu = (props) => {
  
  const { menuItems, currentMenu, setCurrentMenu, menuItemsEndpoint } = props

  return (

    <>

      {currentMenu === 'lunch' && <LunchMenu
                                      menuItems={menuItems}
                                      currentMenu={currentMenu}
                                      setCurrentMenu={setCurrentMenu}
                                      menuItemsEndpoint={menuItemsEndpoint}
                                    />
      }

      {currentMenu === 'dinner' &&  <DinnerMenu 
                                        menuItems={menuItems}
                                        currentMenu={currentMenu}
                                        setCurrentMenu={setCurrentMenu}
                                        menuItemsEndpoint={menuItemsEndpoint}
                                      />
      }
        
    </>
  )
}

export default Menu