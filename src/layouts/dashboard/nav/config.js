
// component

import SvgColor from '../../../components/svg-color';

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
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Player Register',
    path: '/PlayerRegister',
    icon: icon('ic_lock'),
  },
  {
    title:'HostRegister Page',
    path:'/HostRegister',
    icon: icon('ic_lock'),
  });
}else if(role==="Host"){
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
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title:'HostRegister Page',
    path:'/HostRegister',
    icon: icon('ic_lock'),
  },
  );
 }
 return navConfig
}
