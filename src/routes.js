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
import TeamBidView from './pages/auction/TeamBidView';
import Home from './HomePage/Home';
import Home404 from './HomePage/Home404';
import AuctionDisplay from './pages/auction/AuctionDisplay';
import MatchesAuction from './pages/auction/MatchesAuction';
import AdminViewPlayer from './pages/Admin/AdminViewPlayer';
import AdminViewTeam from './pages/Admin/AdminViewTeam';
import AdminViewPosition from './pages/Admin/AdminViewPosition';
import AdminViewMatches from './pages/Admin/AdminViewMatches';
import ViewAuction from './pages/user/ViewAuction';
import AuctionDetails from './pages/auction/AuctionDetails';
import ViewCategory from './pages/Category/ViewCategory';
import PlayerRegCom from './pages/PlayerRegCom';
import TeamComReg from './pages/TeamComReg';
import TeamViewPlayer  from './pages/user/TeamViewPlayer';
import MyTeam from './pages/Team/MyTeam';
import AdminViewTeamPlayers from './pages/Admin/AdminViewTeamPlayers';
import DisplayComplaint from './pages/Complaints/DisplayComplaint';
import Complaint from './pages/Host/Complaint';
import AdminViewComplaint from './pages/Admin/AdminviewComplaint';


// ----------------------------------------------------------------------

export default function Router() {
 
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />, 
      children:[
        {element: <Navigate to="/index" /> ,index: true},
        { path: '*', element: <Navigate to="/index404" />}
      ]
    },
    {
      path: '/login',
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
        { path: 'auctions' ,element: <MatchesAuction />},
        { path:'teamplayer',element:<AdminViewTeamPlayers />},
        { path:'viewcategory',element:<ViewCategory />},
        { path:'auctiondetails',element:<AuctionDetails />},
        { path: 'auctiondisplay', element: <AuctionDisplay />},
        { path: 'viewplayer', element:<AdminViewPlayer />},   
        { path:'viewteam', element: <AdminViewTeam />}, 
        { path:'viewpositon',element: <AdminViewPosition />},
        { path:'viewmatches',element:<AdminViewMatches />}, 
        { path:'reauction',element: <Complaint/>},  
        { path:'viewreauction',element: <AdminViewComplaint/>},
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
        { path: 'teambidview', element: <TeamBidView />},
        { path: 'viewauction', element: <ViewAuction />},   
        { path:'playerlist', element: <TeamViewPlayer />},     
        {path:'listplayer', element:<MyTeam />}, 
        {path:'request', element:<DisplayComplaint />}, 
        { path: '*', element: <Navigate to="/User404" />}
      ],
    },
    {
        path:'/registerteam',
        element: <TeamComReg />,
    },
    {
        path:'/registerplayer',
        element: <PlayerRegCom/>,
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
      path:'/index',
      element: <Home />
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '/User404', element: <User404 /> },
        { path: '/index404' ,element: <Home404 />},
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
