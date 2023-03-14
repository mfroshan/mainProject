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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { reject } from 'lodash';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



export default function AddPlayer(details) {



  const [posData , setPosData ] = useState([]);

  const [MacthDetails, setMacthDetails ] = useState([]);

  const [ base64value , setBase64value] = useState(''); 

  const [fname ,setFilename ] = useState();

  const [update, setUpdate] = useState(details.updated);

   const [position, setPosition] = useState();

   const [base64cert,setBase64Certificate] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  
  const [type, setType] = useState("Player");
  
  

  const validSchema = Yup.object().shape({
    fname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').max(10).required('Mobile is required'),
    username: Yup.string().email('Not a valid Email!').required('Email is required'), 
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
    selectpos : Yup.string().required('select position'),
    selectmatch : Yup.string().required('select match'),
    pvclub: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Previous Club should be Specified!'),
    exp: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Experience is required'),
  });



  
  const [alertMsg, setAlert] = useState();

  const formik = useFormik({
    initialValues: {
      fname: update ? details.data.player_fname : '',
      lname: update ? details.data.Player_lname : '',
      Mobnum: update ? details.data.Player_no : '',
      username: update ? details.data.username : '',
      password: update ? details.data.Password : '',
      selectpos: update ?  details.data.pos_id : '',
      selectmatch : update ? details.data.match_id : '',
      pvclub: '',
      exp: '',
      userType: type

    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  


const handlecertificateUpload = async (e) => {
  const filename = e.target.files[0];

  setFilename(e.target.files.data);
  console.log(e.target.files[0]);

  const base64c  = await convertCertBase64(filename);
   console.log(base64c);

  setBase64Certificate(base64c);
  console.log(base64cert);
}

const convertCertBase64 =  (filename) =>{
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


  const handleFileUpload =  async (e) => {
    const filename = e.target.files[0];
  
    setFilename(e.target.files.data);
    console.log(e.target.files[0]);
    
    console.log(fname)
  
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

  console.log(formik);

  const onAdd = () => {
    

const UpdatePlayer = () => {
  

    Axios.post("http://localhost:3001/playerUpdate", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      pos: values.selectpos,
      match: values.selectmatch,
      id: details.data.player_id,
      
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



  const insertPlayer = () => {
    
   

    Axios.post("http://localhost:3001/playerreg", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      base64v: base64value,
      pos: values.selectpos,
      match:values.selectmatch,
      exp:values.exp,
      pvclub:values.pvclub,
      cert:base64cert,
      
    }).then((response) =>{
      console.log(response.data[0][0]);
      if(response.data[0][0].status === 0){        
          // navigate('/',{replace:true});
      }else{
        console.log(response.data[0][0].msg)
        // showToastMsgFail();
      }
      
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }

    if(update){
        UpdatePlayer();
    }else{
        insertPlayer();
    }
    details.submit();
    alertTimeOut();
  };

  
  const getPosition = () => { 
    let matchid = localStorage.getItem("MatchID"); 
    console.log("getPositon Matchid:"+matchid)
    Axios.post("http://localhost:3001/getPos",{
      mid: values.selectmatch,
    }).then((response) =>{
      console.log(response.data);
      if(response.data.length > 0 ){        
          console.log("position details:"+response.data[0])
          setPosData(response.data[0])        
      }
      else{
        console.log("No data!");
        setPosData([]);
      }
    });
  }

  let hostid = localStorage.getItem("HostID");
 const getMatch = () =>{
    Axios.post("http://localhost:3001/getMatch",{
      id:hostid,
    }).then((response) =>{
      console.log(response.data);
      if(response.data.length > 0 ){        
          console.log(response.data[0])
          setMacthDetails(response.data[0])        
      }
      else{
        console.log("No data!");
        setMacthDetails([]);
      }
    });
 }  

  useEffect(() => {
    
    getMatch();
    
  },[])
  

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  
  

  
  const onclose = () => {
    formik.resetForm();
    details.onClose();
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
              Add Player
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">PLAYER DETAILS</Typography>
            
            {/* { update && 
            <>
            <center>
                  <Avatar
                  alt="Player Image"
                  src={details.data.player_img}
                  sx={{ 
                    width: 150, 
                    height: 150,
                 }}
                />
            </center>
            </>  
            }  */}
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
              type="text"
              label="Username"
              variant="outlined"
              {...getFieldProps('username')}
              autoComplete
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth
              type="number"
              label="Mobile Number"
              variant="outlined"
              value={details.update ? details.data.Mobnum : ''}
              {...getFieldProps('Mobnum')}
              error={Boolean(touched.Mobnum && errors.Mobnum)}
              helperText={touched.Mobnum && errors.Mobnum}
            />

            <TextField
              fullWidth
              type="password" 
              label="Password"
              variant="outlined"
              value={details.update ? details.data.Mobnum : ''}
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

        {!update && 
        <label htmlFor="icon-button-file">Your Photo:
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
      }

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Matches</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Matches"
          value= { details.updated ?  '' : MacthDetails }
          defaultValue={details.updated ? details.data.match_id : ''}
          {...getFieldProps('selectmatch')}
          error = {Boolean(touched.selectmatch &&  errors.selectmatch)}
          helperText = {touched.selectmatch && errors.selectmatch}
          onBlur = {getPosition}
        >
          
          { MacthDetails.map( (data) => {
              return (
                  <MenuItem value={data.mid}>
                  {data.mfname} { data.mlname}
                </MenuItem>
              );

          })}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Position</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="position"
          value= { details.updated ? '' : position }
          defaultValue={details.updated ? details.data.pos_id : ''}
          {...getFieldProps('selectpos')}
          error = {Boolean(touched.selectpos &&  errors.selectpos)}
          helperText = {touched.selectpos && errors.selectpos}
          
        >
          
          { posData.map( (data) => {
              return (
                  <MenuItem value={data.pos_id}>
                  {data.pos_name}
                </MenuItem>
              );

          })}
        </Select>
      </FormControl>
      
     {!update && 
     <>
     <TextField type="text" name="exp" label="Experience" 
         required
         {...getFieldProps('exp')}
         helperText={touched.exp && errors.exp}
         error={Boolean(touched.exp && errors.exp)}
         />
        
        <TextField type="text" name="exp" label="Previous Club" 
         required
         {...getFieldProps('pvclub')}
         helperText={touched.pvclub && errors.pvclub}
         error={Boolean(touched.pvclub && errors.pvclub)}
         />

      <label htmlFor="icon-button-file">Certificates:
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <input name="Certificate"
      label="Upload certificate"
      accept="image/*"
        id="icon-button-file"
        type="file" 
        onChange={(e)=>{
          handlecertificateUpload(e);
        }} 
        required
        />
         </FormControl>
      <IconButton color="primary" aria-label="upload certificate"
      component="span"
      style={{float:'right'}} >
        <PhotoCamera />
      </IconButton>
     
    </label>
    </>
     }

          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
