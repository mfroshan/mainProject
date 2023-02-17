import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';



// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Box
} from '@mui/material';

// components
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from '../../components/Page';
import CardContent from '@mui/material/CardContent';
import Iconify from 'src/components/iconify/Iconify';
// import requestPost from '../serviceWorker';
// mock
// import USERLIST from '../_mock/user';
// import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------






export default function BidSetup() {
  const navigate = useNavigate()
  const ref = useRef(null);
  


  const [USERLIST,setUserList] = useState();
      

  //     const display = () => {
  //       axios.post("http://localhost:3001/bidStatus",{
  //         id:location.state.mid,
  //       }).then((res) => {
  //      if(res.data){
  //         console.log(res.data[0][0]);
  //         setUserList(res.data[0][0].bidStatus);
  //      }
  //      else{
  //       setUserList([]);
  //      }
  //       }).catch((error) => {
  //         console.log(error);
  //           console.log('No internet connection found. App is running in offline mode.');
  //         });
  //     }
      
  // useEffect(() => {
   
  // }, [])
  
  const [open, setOpen] = useState(true);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  const validSchema = Yup.object().shape({

    totalbidtime: Yup.string().required('bid time is required'),    
    baseamt: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Base Amount is required'),
    lname: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Last Name is required'),
    Mobnum: Yup.string().matches(phoneRegExp, 'Not a valid Phone Number').max(10).required('Mobile is required'),
    password: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Password is required'),
    selectpos: Yup.string().required("Position Should be selected!"),
    
  });

  const formik = useFormik({
    initialValues: {
      totalbidtime: '',
      baseamt:  '',
      lname:  '',
      Mobnum:  '',
      username: '',
      password:  '',
      selectpos:'',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
      
    }
  });
  
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  const [value, setValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));




  const [addDialog, setDialog] = useState();

  
  const location = useLocation();
  console.log(location.state.mid);

 
  const StatusMenu = (props)=>{
  console.log(props)
    return(
      <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {props.status === 0  && 
      <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Create a bid Room
          </Typography>
        <Button>setup bid</Button>
        </CardContent>
        }
        {
         props.status ===1 && <Button>Bid Details</Button>
        }
      </Box>
      </>);
  }
  
  return (
    <Page title="Matches">
      <Container maxWidth="xl">
      {addDialog}
      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bid Details
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Match
          </Button> */}
          
        </Stack>
        <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />

        <Button variant="contained" component={RouterLink} to="#" onClick={()=>{
          
        }} startIcon={<Iconify icon="eva:plus-fill" />}>
            Start Auction
          </Button>

        <Grid sx={{ display: 'flex',justifyContent:'center'}} >
        <Stack spacing={3}>
        <TextField 
        sx={{ width: '25ch' }}
        name="time"  
        label="Total Bid time" 
        {...getFieldProps('totalbidtime')}
        helperText={touched.totalbidtime && errors.totalbidtime}
        error={Boolean(touched.totalbidtime && errors.totalbidtime)}
        
        />
        {/* <DesktopTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}

        <TextField 
        type="number"
        name="baseamount" label="Base Amount of Players" 
        {...getFieldProps('baseamt')}
        helperText={touched.baseamt && errors.baseamt }
        error={Boolean(touched.baseamt && errors.baseamt)}
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
         </Stack>
         </Grid>

        <Grid sx={{ display: 'flex',justifyContent:'center'}}>
          <Card sx={{ display: 'flex',marginTop:'100px',justifyContent:'center',width:'400px' }}>
            <StatusMenu status={USERLIST} />
            </Card>
        </Grid>

      </Container>
    </Page>
  );
}
