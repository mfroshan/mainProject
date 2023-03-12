import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { Stack,TextField ,Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiSnackbar from '@mui/material/Snackbar';



export const UpdateDetails = (props) => {

    console.log(props)

    const [alertOpen, setAlertOpen] = useState(false);

    const [alertMsg, setAlert] = useState(false);

    const navigate = useNavigate();

    const validSchema = Yup.object().shape({
        fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
        lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
        Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').max(10,'Mobile Number Length should be 10').required('Mobile is required'),
        username: Yup.string().email('Not a valid Email!').required('Email is required'), 
        
      });
    
    
    
      
     
    
      const update = () => {
        const role = localStorage.getItem("Role");
        const oldusername = localStorage.getItem("User_Name");
          Axios.post("http://localhost:3001/ProfileUpdate",{
                role: role,
                oldusername: oldusername,
                email:values.username,
                fname:values.fname,
                lname:values.lname,
                Number:values.Mobnum, 
          }).then((res) => {
            console.log(res.data[0][0])
            if (res.data[0][0].status === 0) {
                console.log("Fetched!");
                localStorage.setItem("User_Name",res.data[0][0].Username);
                setAlertOpen(true)
                props.close();
            }
          })
      };
      setTimeout(() => {
        setAlertOpen(false);
      }, 1000);


      const formik = useFormik({
        initialValues: {
          username: props.data.email,
          fname: props.data.fname,
          lname: props.data.lname,
          Mobnum : props.data.number,
        },
        validationSchema: validSchema,
        onSubmit: (values, actions) => {
            update();
            
        }
      });
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    
      console.log(formik);

      const checkEmail = async () => {
        console.log(values.username)
        let email = localStorage.getItem("User_Name");
        let res = await Axios.post("http://localhost:3001/checkEmail",{email: values.username});
        let status = res.data[0][0].status;
      if(email === values.username){
        setAlert(false);
      }else{
        if(status){
            setAlert(true);
            alert("Account exists");
          }
      }
        
      }
console.log(alertMsg);
  

  return (
    <div>
        <Stack  spacing={4} sx={{ padding: 2 }}>
        <TextField name="email" label="Email address" 
        {...getFieldProps('username')}
        helperText={touched.username && errors.username}
        error={Boolean(touched.username && errors.username)}
        onBlur={()=> checkEmail()}
        />

        <TextField name="fname" label="First Name" 
        {...getFieldProps('fname')}
        helperText={touched.fname && errors.fname}
        error={Boolean(touched.fname && errors.fname)}
    
        />

        <TextField name="lastname" label="Last Name" 
        {...getFieldProps('lname')}
        helperText={touched.lname && errors.lname}
        error={Boolean(touched.lname && errors.lname)}
      
        />
        <TextField name="number" label="Phone Number" 
        {...getFieldProps('Mobnum')}
        helperText={touched.Mobnum && errors.Mobnum}
        error={Boolean(touched.Mobnum && errors.Mobnum)}
        />
        

        </Stack>
       { alertMsg===false && 
        <LoadingButton
        sx={{float:'right'}}
        size="small" type="submit" variant="contained" 
      onClick={()=>{
        handleSubmit();
      }}
      >
          Save
     </LoadingButton>
      }

     <MuiSnackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
          variant="filled"
        >
          Saved SuccessFully
        </Alert>
      </MuiSnackbar>
            
    </div>
  )
}
