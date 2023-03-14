import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { Table,TableCell, TableContainer, TableRow,TableBody,IconButton } from '@mui/material';
import Iconify from '../../components/iconify';


export default function ViewCert(props) {
  
  

  console.log(props);

  

  const handleClose = () => {
    props.onClose();
  };

  
  

  const genereatePdf = () => {

    // const unit = "pt";
    // const size = "A4"; // Use A1, A2, A3 or A4
    // const orientation = "portrait"; // portrait or landscape
    
    // const marginLeft = 40;
    // const doc = new jsPDF(orientation, unit, size);
    
    
    // const title = `Bid History of player ${props.pname}`;
    // const headers = [[
    //   "Team Name",
    //   "Bid Amount",
    // ]];
    
    // const data = USERLIST.map(data=> [
    //   data.name, 
    //   data.bidamt
    // ]);

    // var today = new Date();
    // var dd = today.getDate();
    
    // var mm = today.getMonth()+1; 
    // var yyyy = today.getFullYear();
    // if(dd<10) 
    // {
    //     dd='0'+dd;
    // } 
    
    // if(mm<10) 
    // {
    //     mm='0'+mm;
    // } 
    // today = mm+'-'+dd+'-'+yyyy;

    // var newdat = "Date of Report Generated  : "+ today;

    // let content = {
    //   startY: 50,
    //   head: headers,
    //   body: data
    // };
    
    // doc.text(title, marginLeft, 20);
    // doc.autoTable(content);

    // doc.setFontSize(10);
    // doc.text(40, 35, "Match Name: "+ props.mname)

    // doc.setFontSize(10);
    // doc.text(40, 45, newdat)
    //     doc.save('Bid History.pdf')
      }


  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle
        align='center'
        >Certificate</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
               <TableCell component="th" scope="row" align='center'>
                Player Name : {props.name}
               </TableCell>
               <TableCell  scope="row" align='center'>
                <img
                src={props.cert}
                />
                
               </TableCell>
            </TableRow>
            
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