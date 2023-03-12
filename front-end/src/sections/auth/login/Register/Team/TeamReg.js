import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormControl from '@mui/material/FormControl';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../../../components/iconify';
import { reject, set } from 'lodash';

import DisplayRazorpay from '../Razorpay/payment';
import { array } from 'prop-types';

// import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------


const showToastMsgFail  = (value) => {
  toast.error(value, {
    position: toast.POSITION.TOP_RIGHT
});
}


export default function TeamReg() {

  const navigate = useNavigate();

  const [open , setopen ] = useState(false);


  const [ base64value , setBase64value] = useState(''); 

  const [setPhoneNo , userPhoneNo ] = useState();

  const [fname ,setFilename ] = useState();

  const [setname , userUsername ] = useState('');
  
  const [regStatus, setRegStatus ] = useState();

  const [setFname ,userFname ] = useState();
  
  const [alertMsg, setAlertMsg ] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  
  const [amt,setAmt] = useState([]);




  const getStatus = () => { 
    Axios.post("http://localhost:3001/getStatus",{
    }).then((response) =>{
      console.log(response.data);
      if(response.data.length > 0 ){        
          console.log(response.data)
          setRegStatus(response.data[0][0].regStatus);        
      }
      else{
        console.log("No data!");
      }
    });
  }

  const paymentRes = async () =>{
    let res = await Axios.post("http://localhost:3001/getStatus",{
      id:id,
      value:'p',
    });
    let status = res.data[0][0].regStatus;
    console.log(status);
    if(status===0){
        let sum = amt.t_reg_amt+amt.total_bid_amt;
        console.log("Sum of amt:"+sum);
        DisplayRazorpay(sum,reg);
        console.log('called');
    }else{
      showToastMsgFail("Sorry Registration Closed!");
    }
   }

   const validSchema = Yup.object().shape({

    username: Yup.string().email('Not a valid Email!').required('Email is required'),    
    fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').max(10).required('Mobile is required'),
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
    
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      fname:  '',
      lname:  '',
      Mobnum:  '',
      username: '',
      password:  '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      paymentRes();
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  console.log(formik);

 
 
 const handleFileUpload =  async (e) => {
  const filename = e.target.files[0];

  setFilename(e.target.files.data);
  console.log(e.target.files[0]);
  
  console.log(fname)

  const base64value  = await convertBase64(filename);

  setBase64value(base64value);
  console.log(base64value);
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

let { id } = useParams();



const reg = () =>{
  console.log("Matchid:"+id); 

    Axios.post("http://localhost:3001/regTeam", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      base64v: base64value,
      match:id,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 0){        
          navigate('/login',{replace:true});
      }
      else{
        console.log(response.data[0][0].msg)
        showToastMsgFail(response.data[0][0].msg);
       }
      });
}  


const getAmt = () => {
  Axios.post("http://localhost:3001/getamt",{
      mid: id,
      value:'t'
  }).then((response) =>{
    console.log(response.data);
    if(response.data.length > 0 ){        
        console.log(response.data[0][0])
        setAmt(response.data[0][0])

    }
    else{
      console.log("No data!");
    }
  });
}

const checkEmail = async () => {
  console.log(values.username)
  let res = await Axios.post("http://localhost:3001/checkEmail",{email: values.username});
  let status = res.data[0][0].status;

  if(status){
    setAlertMsg(true);
    alert("Account exists");
  } else {
    setAlertMsg(false);
  }
}


//   const registerPlayer = (e) =>{
//     e.preventDefault();
//     DisplayRazorpay()
//     if(localStorage.getItem("PaymentID") != null){
//         reg()
//     }else{
//        alert("Registration Failed!"); 
//     }
// }




useEffect(() => {
  
  getAmt()
}, [])


    
   

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
         type="number"
         name="PhoneNo" label="Phone Number" 
        {...getFieldProps('Mobnum')}
        helperText={touched.Mobnum && errors.Mobnum}
        error={Boolean(touched.username && errors.Mobnum)}
         />

        <TextField
          name="password"
          label="Password"
          {...getFieldProps('password')}
           helperText={touched.password && errors.password}
           error={Boolean(touched.username && errors.password)}
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
       
        <label htmlFor="icon-button-file" >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <input name="photo"
        label="Upload Image"
        accept="image/*" 
          id="icon-button-file"
          type="file" 
          onChange={(e)=>{
            handleFileUpload(e);
          }} />
           </FormControl>
        <IconButton color="primary" aria-label="upload picture"
        component="span"
        style={{float:'right'}} >
          <PhotoCamera />
        </IconButton>
       
      </label>
 

          

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>
      {/* onClick={registerPlayer} */}
  
     { 
     alertMsg === false &&
     <LoadingButton fullWidth size="large" type="submit" variant="contained" 
      onClick={handleSubmit}
      >
          Register
     </LoadingButton>
     }
    </>
  );
}
