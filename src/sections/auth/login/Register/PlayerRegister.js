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
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// components
import Iconify from '../../../../components/iconify';
import { reject } from 'lodash';

import DisplayRazorpay from './Razorpay/payment';

// import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------


const showToastMsgFail  = (value) => {
  toast.error(value, {
    position: toast.POSITION.TOP_RIGHT
});
}


export default function PlayerRegister() {

  const navigate = useNavigate();

  const [ mid , setmid ] = useState();

  const [posData , setPosData ] = useState([]);

  const [ base64value , setBase64value] = useState(''); 

  const [fname ,setFilename ] = useState();

  const [setname , userUsername ] = useState();
  
  const [regStatus,setRegStatus] = useState();

  const [showPassword, setShowPassword] = useState(false);
  
  const [position, setPosition] = useState();

  const [error, setError] = useState(false);
  


  const [amt , setAmt] = useState();

  // const handleChange = () => {
    
  //   console.log("postion:".position);
  // };

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });


  // };
  
  let { id } = useParams();

  

  const paymentRes = async () =>{
   let res = await Axios.post("http://localhost:3001/getStatus",{
      id:id,
      value:'p',
    });
    let status = res.data[0][0].regStatus;
    console.log(status);
    if(status===1){
      showToastMsgFail("Sorry Registration Closed!");
    }else{
    DisplayRazorpay(amt,registerPlayer);
    console.log('called');
    }
   }

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  const validSchema = Yup.object().shape({

    username: Yup.string().email('Not a valid Email!').required('Email is required'),    
    fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    Mobnum: Yup.string().matches(phoneRegExp, 'Not a valid Phone Number').max(10).required('Mobile is required'),
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
    selectpos: Yup.string().required("Position Should be selected!"),
    
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      fname:  '',
      lname:  '',
      Mobnum:  '',
      password:  '',
      selectpos:'',
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



  const registerPlayer = () =>{

      setmid(id);
    console.log("Matchid:"+id);
    Axios.post("http://localhost:3001/playerreg", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      base64v: base64value,
      pos: values.selectpos,
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

 

const getPosition = () => { 
  Axios.post("http://localhost:3001/getPos",{
    mid:id,
  }).then((response) =>{
    console.log(response.data);
    if(response.data.length > 0 ){        
        console.log(response.data[0])
        setPosData(response.data[0])        
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
    setError(true);
    alert("Account exists");
  } else {
    setError(false);
  }

}

const getAmt = () => {

  Axios.post("http://localhost:3001/getamt",{
      mid: id,
      value:'p'
  }).then((response) =>{
    console.log(response.data);
    if(response.data.length > 0 ){        
        console.log(response.data[0][0].preg_amt);
        setAmt(response.data[0][0].preg_amt);
        console.log(amt);
  }
    else{
      console.log("No data!");
    }
  });
}

  
    useEffect(() => {
      
      getPosition();
      getAmt();

    },[])

    
   

  return (
    <>
      <ToastContainer />
      <Stack spacing={3}>
        <TextField 
        name="email" 
        value={setname} 
        label="Email address" 
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
         <TextField type="number" name="PhoneNo" label="Phone Number" 
         required
         inputProps={{  maxLength:10  }}
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
          }}
          required
          />
           </FormControl>
        <IconButton color="primary" aria-label="upload picture"
        component="span"
        style={{float:'right'}} >
          <PhotoCamera />
        </IconButton>
       
      </label>
 

          
            

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Position"
          {...getFieldProps('selectpos')}
           helperText={touched.selectpos && errors.selectpos}
           error={Boolean(touched.selectpos && errors.selectpos)}
          value={ values.selectpos ? values.selectpos : "" }
          // onChange={
          //    (e)=>{
          //     setPosition(e.target.value) 
          // }}
        >
          
          { posData.map( (data) => {
            //  <MenuItem 
            //  value={data.pos_id}>
            //   {data.pos_name}
            //  </MenuItem>
              return (
                  <MenuItem value={data.pos_id}>
                  {data.pos_name}
                </MenuItem>
              );

          })}
        </Select>
      </FormControl>

      

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      { error===false && 
      <LoadingButton fullWidth size="small" type="button" variant="contained"
      onClick={
       (e)=>{ 
         
         handleSubmit()
       }
     }
       >
       Register
     </LoadingButton>
      }
      
    </>
  );
}
