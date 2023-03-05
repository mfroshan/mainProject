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
import Avatar from '@mui/material/Avatar';
import { Label } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function AddComplaint(details) {

  console.log(details.data);

  const [posData , setPosData ] = useState([]);

  const [player, setplayer ] = useState([]);

  const [ base64value , setBase64value] = useState(''); 

  const [fname ,setFilename ] = useState();

  const [update, setUpdate] = useState(details.updated);

   const [det, setdetails] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  
  const [type, setType] = useState("Team");

  const [uploadcnt, setUploadcnt] = useState(1);
  
  

  const validSchema = Yup.object().shape({
    reason: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Reason is required'),
    poc: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Proof is required'),
    selectplayer: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('select player'),
    
  });



  
  const [alertMsg, setAlert] = useState();

  const formik = useFormik({
    initialValues: {
      reason: update ? details.data.reason : '',
      poc: update ? details.data.poc : '',
      selectplayer : update ? details.data.playerid : ''
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

  const onAdd = () => {
    

const UpdateTeam = () => {
  

    Axios.post("http://localhost:3001/TeamUpdate", {

      username: values.username,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      phoneNo:values.Mobnum,
      match: values.selectmatch,
      id: details.data.team_id,
      
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


  const insertTeam = () => {


    Axios.post("http://localhost:3001/regTeam", {

    username: values.username,
    password: values.password,
    fname: values.fname,
    lname: values.lname,
    phoneNo:values.Mobnum,
    base64v : base64value,
    match:values.selectmatch,
    
  }).then((response) =>{
    console.log(response.data[0][0]);
    if(response.data[0][0].status === 0){        
        //navigate('/',{replace:true});
    }
    else{
      console.log(response.data[0][0].msg)
      // showToastMsgFail();
     }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }

    if(update){
        UpdateTeam();
    }else{
        insertTeam();
    }
    details.submit();
    alertTimeOut();
  };

  
 const getplayer = () =>{
  const mid = localStorage.getItem("mid");
  const tid = localStorage.getItem("TeamID");
  console.log(mid);
  console.log(tid);

    Axios.post("http://localhost:3001/fetchplayer",{
      mid:mid,
      tid:tid,
    }).then((response) =>{
      console.log(response.data[0]);
      if(response.data[0]){        
          console.log("player:"+(response.data[0][0]))
          setplayer(response.data[0])        
      }
      else{
        console.log("No data!");
        setplayer([]);
      }
    });
 }  

  useEffect(() => {

    getplayer();
    
  },[])
  

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  
  const onclose = () => {
    formik.resetForm();
    details.onClose();
  };

  const selectplayer = (values) =>{
    console.log(values);

    Axios.post("http://localhost:3001/getp",{
      tid: values,
    }).then((response) =>{
      console.log(response.data);
      if(response.data[0]){        
          console.log(response.data[0][0])
          setdetails(response.data[0])        
      }
      else{
        console.log("No data!");
        setdetails([]);
      }
    });
    
 }  

  
 console.log(det)
  
 return (
    <div>
      <Dialog fullScreen open={details.open} onClose={details.onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Request
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">REQUEST DETAILS</Typography>
            
            
      {det.length > 0 &&  
            
            
            <>
            <center>
                  <Avatar
                  alt="Player Image"
                  src={det[0].player_img}
                  sx={{ 
                    width: 150, 
                    height: 150,
                 }}
                />
                <Typography>
                  Name:{det[0].name}
                </Typography>
                <Typography>
                Position:{det[0].pos_name}
                </Typography>
            </center>
            </>  
        }
            <TextField
              fullWidth
              type="text"
              label="Reason"
              variant="outlined"
              {...getFieldProps('reason')}
              error={Boolean(touched.reason && errors.reason)}
              helperText={touched.reason && errors.reason}
            />

        {[...Array(uploadcnt)].map((value,index)=>{
          return( 
        <label htmlFor="icon-button-file" >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <input name="photo"
        label="Upload Image"
        accept="image/*"
          id={`icon-button-file${index}`}
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
        { index > 0 ? <RemoveCircleOutlineIcon onClick={()=>{
            setUploadcnt(uploadcnt - 1);
        }}/> : <div/>}
      </label>
          )
      })
    }
    <IconButton onClick={()=>{setUploadcnt(uploadcnt + 1)}}>
    <AddIcon></AddIcon>
      
      </IconButton>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select player</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="select player"
          value= { details.updated ?  '' : player }
          {...getFieldProps('selectplayer')}
          error = {Boolean(touched.selectplayer &&  errors.selectplayer)}
          helperText = {touched.selectplayer && errors.selectplayer}
          onBlur = {()=>{
            selectplayer(values.selectplayer);
            console.log(values.selectplayer);
          }}
        > 
          { player.map( (data) => {
              return (
                  <MenuItem value={data.player_id}>
                  {data.name} ({data.pos_name})
                </MenuItem>
              );

          })}
        </Select>
      </FormControl>

          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
