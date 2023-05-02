import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import { reject } from 'lodash';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function AddHost(details) {


  const [ base64value , setBase64value] = useState(''); 

  const [fname ,setFilename ] = useState();

  const [update, setUpdate] = useState(details.updated);



  const [showPassword, setShowPassword] = useState(false);
  
  const [type, setType] = useState("Host");
  
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validSchema = Yup.object().shape({
    fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    Mobnum: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Mobile is required').min(10,'Not a valid Number').max(10,'Not a valid Number'),
    username: Yup.string().email('Not a valid Email!').required('Email is required'), 
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
  });



  
  const [alertMsg, setAlert] = useState();

  const formik = useFormik({
    initialValues: {
      fname: update ? details.data.host_fname : '',
      lname: update ? details.data.host_lname : '',
      Mobnum: update ? details.data.HPhone_No : '',
      username: update ? details.data.Username : '',
      password: update ? details.data.Password : '',  
      userType: type
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

 

  const handleFileUpload =  async (e) => {
    const filename = e.target.files[0];
  
    setFilename(e.target.files.data);
    console.log(e.target.files[0]);
  
    const base64Value  = await convertBase64(filename);
  
    setBase64value(base64Value);
    console.log(base64Value);
  }
  
  const convertBase64 =  (filename) =>{
      return new Promise((resolve,object) => {
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(filename)
  
        fileReader.onload = () =>{
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error)=>{
          reject(error);
        }
      })
  }

  const alertTimeOut = () => {
    setTimeout(() => {
      setAlert();
    }, 2000);
  };

  const onAdd = () => {
    

const UpdateHost = () => {
  console.log(values.username);
    console.log(values.password);
    console.log(values.fname);
    console.log(values.lname);
    console.log(values.Mobnum);
    console.log(details.data.host_id);
      

    Axios.post("http://localhost:3001/HostUpdate", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      id:details.data.host_id,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 0){        
          // navigate('/',{replace:true});
      }
      else{
        console.log(response.data[0][0].msg)
        // showToastMsgFail();
      }
      
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }


  const insertHost = () => {
    
    console.log(values.username);
    console.log(values.password);
    console.log(values.fname);
    console.log(values.lname);
    console.log(values.Mobnum);
    console.log(base64value);
    

    Axios.post("http://localhost:3001/regHost", {

    username: values.username,
    password: values.password,
    fname: values.fname,
    lname: values.lname,
    base64v: base64value,
    phoneNo:values.Mobnum,
    
    
  }).then((response) =>{
    console.log(response.data[0][0]);
    if(response.data[0][0].status === 0){        
      
    }
    else{
      console.log(response.data[0][0].msg)
      
     }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }

    if(!update){
      insertHost();
        
    }else{
      UpdateHost();
    }
    
    details.submit();
    alertTimeOut(()=>{

    },10000);
  };


  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  
  const onclose = () => {
    formik.resetForm();
    details.onClose();
  };

  const checkEmail = async () => {
    console.log(values.username)
    if(values.username !== details.data.username){
      let res = await Axios.post("http://localhost:3001/checkEmail",{email: values.username});
      let status = res.data[0][0].status;
      if(status){
        alert("Account exists");
        document.getElementById("Username").value = '';
  
      }
    }  
  };

  return (
    <div>
      <Dialog fullScreen open={details.open} onClose={details.onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Host
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">Host DETAILS</Typography>
            <TextField
              fullWidth
              type="text"
              label="First Name"
              variant="outlined"
              {...getFieldProps('fname')}
              error={Boolean(touched.fname && errors.fname)}
              helperText={touched.fname && errors.fname}
            />
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              variant="outlined"
              {...getFieldProps('lname')}
              autoComplete
              error={Boolean(touched.lname && errors.lname || alertMsg)}
              helperText={touched.lname && errors.lname || alertMsg}
            />

            <TextField
              fullWidth
              id="Username"
              type="text"
              label="Username"
              variant="outlined"
              {...getFieldProps('username')}
              autoComplete
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              
            />

        {!update && <label htmlFor="icon-button-file" >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <input name="photo"
        label="Upload Image"
        accept="image/*"
          id="icon-button-file"
          type="file" 
          onChange={(e)=>{
            handleFileUpload(e);
          }} 
          />
           </FormControl>
        <IconButton color="primary" aria-label="upload picture"
        component="span"
        style={{float:'right'}} >
          <PhotoCamera />
        </IconButton>
       
      </label>
      }
      <TextField
              fullWidth
              type="number" 
              label="Phone Number"
              variant="outlined"
              {...getFieldProps('Mobnum')}
              error={Boolean(touched.Mobnum && errors.Mobnum)}
              helperText={touched.Mobnum && errors.Mobnum}
            />


        <TextField
              fullWidth
              type="password" 
              label="Password"
              variant="outlined"
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
