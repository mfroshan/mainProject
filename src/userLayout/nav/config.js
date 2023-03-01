
// component

import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export default function displayNavConfig(){

  let role = '';
  if(role != null){
  role = localStorage.getItem("Role");
  console.log(role);
  }
const navConfig = [];

if(role === "Admin"){
  navConfig.push({
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Team Details',
    path: '/dashboard/team',
    icon: icon('ic_user'),
  },
  {
    title:'Player Details',
    path:'/dashboard/player',
    icon: icon('ic_user'),
  },
  {
    title: 'Position Details',
    path: '/dashboard/position',
    icon: icon('ic_user'),
  },
  {
    title: 'Host Details',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  });
}else if(role==="Host"){
  navConfig.push({
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Auctions',
    path: '/dashboard/auctions',
    icon: icon('ic_user'),
  },
  {
    title: 'Host Details',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Match Details',
    path: '/dashboard/matches',
    icon: icon('ic_user'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  }
  );
 }else if(role==="Player"){
  navConfig.push({
    title: 'Profile',
    path: '/user/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'Auction',
    path: '/user/viewauction',
    icon: icon('ic_user'),
  });
 }else if(role==="Team"){
  navConfig.push({
    title: 'Profile',
    path: '/user/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'Auction',
    path: '/user/teambidview',
    icon: icon('ic_user'),
  },
  {
    title:'Player Registered',
    path:'/user/playerlist',
    icon: icon('ic_user'),
  },
  {
    title:'Request ReAuction',
    path:'/user/request',
    icon: icon('ic_user'),
  },
  {
    title:'My Team',
    path:'/user/listplayer',
    icon: icon('ic_user'),
  }
  );
 }
 return navConfig
}

