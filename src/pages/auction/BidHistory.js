import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Table,TableCell, TableContainer, TableRow,TableBody,IconButton } from '@mui/material';
import Iconify from '../../components/iconify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export default function BidHistory(props) {
  
  const [USERLIST,setUserList] = useState([]);

  console.log(props);

  

  const handleClose = () => {
    props.onClose();
  };

  const display = () => {
    
    axios.post("http://localhost:3001/AuctionHistory",{
      mid: props.mid,
      pid:props.pid,
    }).then((res) => {
   if(res.data){
      console.log(res);
      setUserList(res.data[0]);
   }
   else{
    setUserList([]);
   }
    }).catch((error) => {
      console.log(error);
        console.log('No internet connection found. App is running in offline mode.');
      });
  }

  useEffect(()=>{
    display()
  },[])


  const genereatePdf = () => {

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    
    
    const title = `Bid History of player ${props.pname}`;
    const headers = [[
      "Team Name",
      "Bid Amount",
    ]];
    
    const data = USERLIST.map(data=> [
      data.name, 
      data.bidamt
    ]);

    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'-'+dd+'-'+yyyy;

    var newdat = "Date of Report Generated  : "+ today;

    let content = {
      startY: 50,
      head: headers,
      body: data
    };
    
    doc.text(title, marginLeft, 20);
    doc.autoTable(content);

    doc.setFontSize(10);
    doc.text(40, 35, "Match Name: "+ props.mname)

    doc.setFontSize(10);
    doc.text(40, 45, newdat)
        doc.save('Bid History.pdf')
      }


  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle
        align='center'
        >BidHistory</DialogTitle>
        <DialogContent>
        <IconButton
          sx={{
            float:'right',
            marginLeft:'30px'
          }}
          onClick = {genereatePdf}
          ><Iconify icon="prime:file-pdf" width={40} height={40} /></IconButton>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
               <TableCell component="th" scope="row" align='center'>
                Team Name
               </TableCell>
              
              <TableCell component="th" scope="row" align='center'>
                Bid Amount
            </TableCell>
            </TableRow>
            {
                USERLIST.map((data)=>{
                return(
                    <TableRow>
                    <TableCell component="th" scope="row" align='center'>
                    {data.name}
                   </TableCell>
                   <TableCell component="th" scope="row" align='center'>
                    {data.bidamt}
                   </TableCell>
                   </TableRow>
                  )
                })
            }
            </TableBody>
            </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}