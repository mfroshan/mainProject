import { faker } from '@faker-js/faker';
// import { Axios } from 'axios';
import { sample } from 'lodash';
// import { useEffect,useState } from 'react';

// ----------------------------------------------------------------------


const Users = 
  
//   const [data, setdata ] = useState();

//   const getData = () =>{
//     Axios.post("http://localhost:3001/playerdisplay", {
//     }).then((response) =>{
//       if(response.length > 0 ){
//         setdata(response);
//         console.log(data);
//         [...Array(data.length)].map((_, index) => ({
//           // id: faker.datatype.uuid(),
//           avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//           First_Name: data.host_fname,
//           Last_Name: data.host_lname,
//           isVerified: faker.datatype.boolean(),
//           status: sample(['active', 'banned']),
//           role: sample([
//             'Host',
//           ]),
//         }));
//       }else{
//         console.log("No data found in database!");
//       }
//     });
//   }  
  
//   useEffect(()=>{
//     getData();
//   },)
// }

[...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  First_Name: faker.name.fullName(),
  Last_Name: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Host',
  ]),

}));


export default Users;
