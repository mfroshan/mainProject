import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function AddCat(details) {

  const [update, setUpdate] = useState(details.updated);

  
  
  const validSchema = Yup.object().shape({
    cat_name: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('position Name is required'),
  });

  const [alertMsg, setAlert] = useState();

  const formik = useFormik({
    initialValues: {
      cat_name: update ? details.data.cat_name : '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const alertTimeOut = () => {
    setTimeout(() => {
      setAlert();
    }, 2000);
  };

  const onAdd = () => {

    const updateCall = () => {
      console.log(values.cat_name);
      axios.post("http://localhost:3001/updateCat",{
        pos_value: values.cat_name,
        pos_id: details.data.pos_id,
      }).then((res) => {
          if (res.data[0][0].errorCode === "Updated") {
            setAlert();
          } else {
            alert(res.data[0][0].errorMsg);
          }
        }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
    }

    const InsertCall = () =>{
      console.log(values.cat_name);     
      axios.post("http://localhost:3001/Insertcat",{
        pos_value: values.cat_name,
      }).then((res) => {
          if (res.data[0][0].status === 1) {
            setAlert();
            console.log(res.data);
          } else {
            console.log(res.data);
            alert(res.data[0][0].errorMsg);
          }
        }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
      
    }

    if(update){
      updateCall();
      
    }else{
      InsertCall();
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
              Add Category
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">

          <Stack spacing={1} justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="h4">Category DETAILS</Typography>
            <TextField
              fullWidth
              type="text"
              label="Category Name"
              variant="outlined"
              {...getFieldProps('cat_name')}
              error={Boolean(touched.cat_name && errors.cat_name)}
              helperText={touched.cat_name && errors.cat_name}
            />
          </Stack>
        </Container>
      </Dialog>
    </div>
  );
}
