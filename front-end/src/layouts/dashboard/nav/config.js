
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
  },{
    title: 'Category',
    path: '/dashboard/viewcategory',
    icon: icon('ic_user'),
  },
  {
    title: 'Team Details',
    path: '/dashboard/viewteam',
    icon: icon('ic_user'),
  },
  {
    title:'Player Details',
    path:'/dashboard/viewplayer',
    icon: icon('ic_user'),
  },
  {
    title: 'Position Details',
    path: '/dashboard/viewpositon',
    icon: icon('ic_user'),
  },
  {
    title: 'Matches',
    path: '/dashboard/viewmatches',
    icon: icon('ic_user'),
  },
  {
    title: 'Host Details',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Re Auction',
    path: '/dashboard/viewreauction',
    icon: icon('ic_user'),
  }
  );
}else if(role==="Host"){
  navConfig.push({
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
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
    title: 'Auctions',
    path: '/dashboard/auctions',
    icon: icon('ic_user'),
  },{
    title: 'ReAuction Request',
    path: '/dashboard/reauction',
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
    path: '/user/auctiondisplay',
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
  }
  );
 }
 return navConfig
}