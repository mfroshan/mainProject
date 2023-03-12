import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  
  const [setname, userUsername] = useState('');
  
  
  const [setpassword, UserPassword] = useState('');
  


  

  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
    
  // };
  const validSchema = Yup.object().shape({
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('password'),
    username: Yup.string().email('Not a valid Email!').required('Email is required'), 
    
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {

        login();
        
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;





  const showToastMsgFail  = () => {
    
    toast.error('Invalid Login Credential!', {
      position: toast.POSITION.TOP_RIGHT
  });
     
  }

  const login = () =>{
  
    Axios.post("http://localhost:3001/login", {
      
      username: values.username,
      password: values.password,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 1){
        if(response.data[1][0].Type==="Host"){
          navigate('/dashboard/app');
          localStorage.setItem("User_Name",response.data[0][0].Username);
          console.log(response.data[1][0].Type)
          localStorage.setItem("Role",response.data[1][0].Type)
          localStorage.setItem("HostID",response.data[2][0].id)
        }else if(response.data[1][0].Type==="Player"){
          navigate('/user/profile');
          localStorage.setItem("User_Name",response.data[0][0].Username);
          localStorage.setItem("Role",response.data[1][0].Type)
          localStorage.setItem("PlayerID",response.data[2][0].id)
        }else if(response.data[1][0].Type==="Team"){
          navigate('/user/profile');
          localStorage.setItem("User_Name",response.data[0][0].Username);
          localStorage.setItem("Role",response.data[1][0].Type)
          localStorage.setItem("TeamID",response.data[2][0].id)
        }else if(response.data[1][0].Type==="Admin"){
          navigate('/dashboard/app');
          localStorage.setItem("User_Name",response.data[0][0].Username);
          localStorage.setItem("Role",response.data[1][0].Type)
        }
      }
      else{
        showToastMsgFail();
        console.log(response.data[0][0].msg)
      }
    });
}

  return (
    <>
    <ToastContainer />
      <Stack spacing={3}>
        <TextField
        error={ false }
        id="outlined-error"
        name="email" 
        label="Email address" 
        {...getFieldProps('username')}
        helperText={touched.username && errors.username}
        error={Boolean(touched.username && errors.username)}
        />

        <TextField
          error={ false }
          name="password"
          label="Password"
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
          {...getFieldProps('password')}
          helperText={touched.password && errors.password}
          error={Boolean(touched.username && errors.password)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
