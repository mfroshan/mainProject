import { Navigate, useRoutes } from 'react-router-dom';
// layouts

import DashboardLayout from './layouts/dashboard';
import AuctionLayout from './layouts/auction';
import UserLayout from './userLayout/UserLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import User404 from './userLayout/User404';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Register from './pages/Register';
import HostReg from './pages/HostReg';
import PlayerDisplay from './pages/Player/PlayerDisplay';
import DisplayMatch from './pages/Match/MatchDisplay';
import ManagePosition from './pages/Position/ManagePosition';
import TeamDisplay from './pages/Team/TeamDisplay';
import Profile from './pages/user/Profile';
import MatchDetails from './pages/Match/MatchDetails';
import TeamRegister from './pages/TeamRegister';
import BidSetup from './pages/Match/BidSetup';
import PlayerProfile from './pages/auction/PlayerProfile';

// ----------------------------------------------------------------------

export default function Router() {
 
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />, 
      children:[
        {element: <Navigate to="/login" /> ,index: true},
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'host', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'player', element: <PlayerDisplay />},
        { path: 'team', element: <TeamDisplay />},
        { path: 'matches', element: <DisplayMatch />},
        { path: 'matchdetails', element: <MatchDetails />},
        { path: 'bidsetup', element: <BidSetup />},
        { path: 'position', element: <ManagePosition />},
        { path: 'profile', element: <Profile />},        
        { path: '*', element: <Navigate to="/404" />}
      ],
    },
    {
      path: '/auction',
      element: <AuctionLayout />,
      children: [
        { element: <Navigate to="/auction/home" />, index: true },
        { path: 'profile', element: <PlayerProfile/>},        
        { path: '*', element: <Navigate to="/404" />}
      ],
    },
    {
      path: '/user',
      element: <UserLayout />,
      children: [
        { element: <Navigate to="/user/profile" />, index: true },
        { path: 'profile', element: <Profile />},          
        { path: '*', element: <Navigate to="/User404" />}
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path:'PlayerRegister/:id',
      element: <Register />, 
    },
    {
      path:'/HostRegister',
      element: <HostReg />, 
    },
    {
      path:'/TeamReg/:id',
      element: <TeamRegister />, 
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '/User404', element: <User404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
