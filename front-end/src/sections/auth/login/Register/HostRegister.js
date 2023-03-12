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

import * as Yup from 'yup';
import { useFormik } from 'formik';

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
  
  const [error, setError] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  const registerHost = (e) =>{
    Axios.post("http://localhost:3001/hostreg", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 0){        
          navigate('/login',{replace:true});
      }
      else{
        console.log(response.data[0][0].msg)
        showToastMsgFail();

      }
      });
}


  const validSchema = Yup.object().shape({

    username: Yup.string().email('Not a valid Email!').required('Email is required'),    
    fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      fname:  '',
      lname:  '',
      password:  '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      registerHost();
    }
  });
  
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  console.log(formik);

  const checkEmail = async () => {
    console.log(values.username)
    let res = await Axios.post("http://localhost:3001/checkEmail",{email: values.username});
    let status = res.data[0][0].status;
  
    if(status){
      setError(true);
      alert("Account exists");
    } else {
      setError(false);
    }
  
  }


  return (
    <>
      <ToastContainer />
      <Stack spacing={3}>
        <TextField name="email" label="Email address" 
        {...getFieldProps('username')}
        helperText={touched.username && errors.username}
        error={Boolean(touched.username && errors.username)}
        onBlur={()=> checkEmail()}
        />
        <TextField name="Fname" label="First Name"
           {...getFieldProps('fname')}
           helperText={touched.fname && errors.fname}
           error={Boolean(touched.fname && errors.fname)}
           />
        <TextField name="Lname" label="Last Name" 
         {...getFieldProps('lname')}
         helperText={touched.lname && errors.lname}
         error={Boolean(touched.lname && errors.lname)}
         />
        <TextField
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
          error={Boolean(touched.password && errors.password)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      {error===false && 
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Register
      </LoadingButton>
      }
    </>
  );
}
