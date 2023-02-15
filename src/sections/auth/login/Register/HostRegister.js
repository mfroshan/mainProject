import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------


const showToastMsgFail  = () => {
  toast.error('Username Already Exist!', {
    position: toast.POSITION.TOP_RIGHT
});
}

export default function HostRegister() {
  const navigate = useNavigate();

  const [setname , userUsername ] = useState();
  
  const [setpassword, UserPassword ] = useState();

  const [setFname ,userFname ] = useState();
  
  const [setLname, userLname ] = useState();

  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  const registerHost = (e) =>{
    e.preventDefault();
    Axios.post("http://localhost:3001/hostreg", {

      username: setname,
      password: setpassword,
      fname: setFname,
      lname: setLname,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 0){        
          navigate('/',{replace:true});
      }
      else{
        console.log(response.data[0][0].msg)
        showToastMsgFail();

      }
      });
}
  return (
    <>
      <ToastContainer />
      <Stack spacing={3}>
        <TextField name="email" label="Email address" 
        
        onChange={(e)=>{
          userUsername(e.target.value);
        }}/>
        <TextField name="Fname" label="First Name" onChange={
          (e)=>{
          userFname(e.target.value);
        }}/>
        <TextField name="Lname" label="Last Name" 
        onChange={
          (e)=>{
          userLname(e.target.value);
        }}
         />
        <TextField
          name="password"
          label="Password"
          onChange={(e)=>{
            UserPassword(e.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={registerHost}>
        Register
      </LoadingButton>
    </>
  );
}
