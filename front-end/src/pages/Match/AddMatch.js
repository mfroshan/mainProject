import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



export default function AddMatch(details) {

  const [update, setUpdate] = useState(details.updated);



  const [CategoryValue, setCategory] = useState([]);
  

  
  const validSchema = Yup.object().shape({
    mname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('First Name is required'),
    mlname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    // selectcat: Yup.required("Category Should be Selected!"),
    treg_fee: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Amount is required'),
    preg_fee: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Amount is required'),
    tbid_amt: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Amount is required')
    ,
  });

  const [alertMsg, setAlert] = useState();

  const formik = useFormik({
    initialValues: {
      mname: update ? details.data.matchfname : '',
      mlname: update ? details.data.matchlname : '',
      selectcat: update ?  details.data.cat_id : '',
      treg_fee: update ? details.data.treg_fee : '',
      preg_fee: update ? details.data.preg_fee : '',
      tbid_amt: update ? details.data.tbid_amt : '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      onAdd();
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const getCategory = () => { 
    axios.post("http://localhost:3001/getCat",{
    }).then((response) =>{
      console.log(response.data);
      if(response.data.length > 0 ){        
          console.log(response.data)
          setCategory(response.data);        
      }
      else{
        console.log("No data!");
      }
    });
  }

 

  useEffect(() => {
    
    getCategory();
    
    
  },[])


  const alertTimeOut = () => {
    setTimeout(() => {
      setAlert();
    }, 2000);
  };
  
  let hostid = localStorage.getItem("HostID");

  const onAdd = () => {

    const Addmatch = () => {
    axios.post("http://localhost:3001/addMatch",{
      id: hostid,
      fname: values.mname,
      lname: values.mlname,
      cat_id: values.selectcat,
      treg_fee: values.treg_fee,
      preg_fee: values.preg_fee,
      tbid_amt: values.tbid_amt,

    }).then((res) => {
      if (res.data[0][0].errorMsg === 1) {
        setAlert();
      } else {
        alert("Match Already Exist!");
      }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
    console.log("Cat ID:"+values.selectcat);
    console.log("Insert");
  
  }

  const updateMatch = () => {
    axios.post("http://localhost:3001/updateMatch",{
      id: hostid,
      matchid:details.data.match_id,  
      fname: values.mname,
      lname: values.mlname,
      cat_id: values.selectcat,
      treg_fee: values.treg_fee,
      preg_fee: values.preg_fee,
      tbid_amt: values.tbid_amt,
    }).then((res) => {
      if (res.data[0][0].errorMsg === 1) {
        setAlert();
      }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });

  }
    
  if(update){
    updateMatch();
  }else{
    Addmatch();
  }
     
  details.submit();
     alertTimeOut();
    
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
              Add Match
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">

          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">Match DETAILS</Typography>
            <TextField
              fullWidth
              type="text"
              label="Match First Name"
              variant="outlined"
              {...getFieldProps('mname')}
              error={Boolean(touched.mname && errors.mname)}
              helperText={touched.mname && errors.mname}
            />
            <TextField
              fullWidth
              type="text"
              label="Match Last Name"
              variant="outlined"
              {...getFieldProps('mlname')}
              error={Boolean(touched.mlname && errors.mlname)}
              helperText={touched.mlname && errors.mlname}
            />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Position"
          defaultValue={ details.updated ?  details.data.cat_id : ''}
          value= { CategoryValue ? CategoryValue : '' }
          {...getFieldProps('selectcat')}
          error = {Boolean(touched.selectcat &&  errors.selectcat)}
          helperText = {touched.selectcat && errors.selectcat}
        >
          
          {CategoryValue.map((data) => {
              return (
                  <MenuItem value={data.cat_id}>
                  {data.cat_name}
                </MenuItem>
              );

          })}
        </Select>
      </FormControl>

           <TextField
              fullWidth
              type="number"
              label="Team Registration fee"
              variant="outlined"
              {...getFieldProps('treg_fee')}
              error={Boolean(touched.treg_fee && errors.treg_fee)}
              helperText={touched.treg_fee && errors.treg_fee}
            />

          <TextField
              fullWidth
              type="number"
              label="Player Registration fee"
              variant="outlined"
              {...getFieldProps('preg_fee')}
              error={Boolean(touched.preg_fee && errors.preg_fee)}
              helperText={touched.preg_fee && errors.preg_fee}
            />
            <TextField
              fullWidth
              type="number"
              label="Total Bid Amount"
              variant="outlined"
              {...getFieldProps('tbid_amt')}
              error={Boolean(touched.tbid_amt && errors.tbid_amt)}
              helperText={touched.tbid_amt && errors.tbid_amt}
            />
          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
