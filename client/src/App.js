import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Register from './Pages/Register';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import About from './Pages/About';
import Menu from './Pages/Menu';
import Gallery from './Pages/Gallery';
import LocalFarmers from './Pages/LocalFarmers';
import Contact from './Pages/Contact';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateNewMenuItem from './Pages/CreateNewMenuItem';
import AdminPage from './Pages/AdminPage';
import CreateNewUser from './Pages/CreateNewUser';
import CreateNewFarmer from './Pages/CreateNewFarmer';
import TastingRoom from './Pages/TastingRoom';
import KidsMenu from './Pages/KidsMenu';
import UnderConstruction from './Pages/UnderConstruction';
import BulletinModal from './components/BulletinModal';

function App() {
  const menuItemsEndpoint = process.env.REACT_APP_MENUITEMS_ENDPOINT;
  const localFarmersEndpoint = process.env.REACT_APP_LOCALFARMERS_ENDPOINT;
  const bulletinsEndpoint = process.env.REACT_APP_BULLETINS_ENDPOINT;

  const [menuItems, setMenuItems] = useState([]);
  const [localFarmers, setLocalFarmers] = useState([]);
  const [currentMenu, setCurrentMenu] = useState('lunch');
  const [bulletins, setBulletins] = useState([]); // Ensure bulletins is always an array
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${menuItemsEndpoint}/all-menu-items`)
      .then((res) => {
        setMenuItems(res.data.menuItems || []);
      })
      .catch((err) => {
        console.error('Error fetching menu items:', err);
        setMenuItems([]); // Fallback to empty array
      });
  }, []);

  useEffect(() => {
    axios.get(`${localFarmersEndpoint}/all-local-farmers`)
      .then((res) => {
        setLocalFarmers(res.data.localFarmers || []);
      })
      .catch((err) => {
        console.error('Error fetching local farmers:', err);
        setLocalFarmers([]); // Fallback to empty array
      });
  }, []);

  useEffect(() => {
    axios.get(`${bulletinsEndpoint}/all-bulletins`)
      .then((res) => {
        setBulletins(res.data.bulletins || []); // Ensure array even if response is empty
        // console.log('Bulletins loaded:', res.data.bulletins);
      })
      .catch((err) => {
        console.error('Error fetching bulletins:', err);
        setBulletins([]); // Fallback to empty array
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
      ),
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/menu',
          element: (
            <Menu
              menuItemsEndpoint={menuItemsEndpoint}
              menuItems={menuItems}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
            />
          ),
        },
        {
          path: '/kids-menu',
          element: (
            <KidsMenu
              currentMenu={currentMenu}
              menuItems={menuItems}
              menuItemsEndpoint={menuItemsEndpoint}
            />
          ),
        },
        {
          path: '/tasting-room',
          element: <UnderConstruction />,
        },
        {
          path: '/admin',
          element: <AdminPage 
                      bulletin={bulletins[0]}
                    />,
        },
        {
          path: '/create-new-user',
          element: <CreateNewUser />,
        },
        {
          path: '/create-new-menu-item',
          element: (
            <CreateNewMenuItem
              menuItemsEndpoint={menuItemsEndpoint}
            />
          ),
        },
        {
          path: '/create-new-farmer',
          element: (
            <CreateNewFarmer
              localFarmersEndpoint={localFarmersEndpoint}
            />
          ),
        },
        {
          path: '/gallery',
          element: <Gallery />,
        },
        {
          path: '/localfarmers',
          element: (
            <LocalFarmers
              localFarmersEndpoint={localFarmersEndpoint}
              localFarmers={localFarmers}
            />
          ),
        },
        {
          path: '/contact',
          element: <Contact />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className={isModalOpen ? 'blurred' : ''}>
        <RouterProvider router={router} />
      </div>
      {bulletins.length > 0 && (
        <BulletinModal
          bulletin={bulletins[0]}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          // onModalStateChange={(state) => console.log('Modal state changed:', state)}
        />
      )}
    </>
  );
}

export default App;