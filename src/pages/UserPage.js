import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



// material
import {
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Page from '../components/Page';
import Label from '../components/label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar} from '../sections/@dashboard/user';
import AddHost from './AddHost';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// mock
// import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fname', label: 'Team Fname', alignRight: false },
  { id: 'lname', label: 'Team Lname', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'PhoneNo', label: 'Phone Number', alignRight: false },
  { id: 'Image', label: 'Image', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.mobile.indexOf(query) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const navigate = useNavigate()
  const ref = useRef(null);

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState([]);
  
      const display = () =>{
        axios.post("http://localhost:3001/hostdisplay",{
        }).then((res) => {
       if(res.data[0]){
        console.log(res.data)
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
      
  useEffect(() => {
   display();
  }, [])
  
  const [open, setOpen] = useState(true);

  const [addDialog, setDialog] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const genereatePdf = () => {

    const unit = "pt";
    const size = "A4"; 
    const orientation = "portrait"; 
  
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  
  
  const title = "Host Details";
  const headers = [[
    "FirstName", 
    "LastName",
    "Username",
    "Phone No",
  ]];
  
  const data = USERLIST.map(data=> [
    data.host_fname, 
    data.host_lname,
    data.Username,
    data.HPhone_No
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
      doc.text(40, 40, newdat)
  
      doc.save('HostDetails.pdf')
    }
  
  

  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    const add = (data) => {
      setOpen(false) ;
      setDialog();
      display();
    };

    setDialog(() => (
      <AddHost
        onClose={handleClose}
        open={open}
         submit={add}
         updated={upd}
         button={button}
         data={data}
      />
    ));
    setOpen(true);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

 
  const StatusMenu = (prop)=>{
    
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const spcall = (status)=>{
      axios.post("http://localhost:3001/HostStatus",{
        id:  prop.aid,
        status: status,
      }).then((res) => {
        console.log(res.data);
         display();
          }).catch(() => {
              console.log('No internet connection found. App is running in offline mode.');
          });
     }
     
    return(
      <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
         {prop.status !== 0 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{spcall(1)}}>
            <ListItemIcon>
               <Iconify icon="fontisto:radio-btn-active" width={24} height={24} color='#00b300' />
            </ListItemIcon>
            <ListItemText primary="Activate" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.status !== 1 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{spcall(0)}}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Deactivate" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={(e)=>handleAdd(e,true,'EDIT',prop.row)} primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        </Menu></>);
  }



  return (
    <Page title="Host">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Host
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Host
          </Button>
        </Stack>

        
        <Card>
          <IconButton

              sx={{
                float:'right',
                marginLeft:'30px'
              }}
              onClick = {genereatePdf}
              ><Iconify icon="prime:file-pdf" width={30} height={30} /></IconButton>

          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                 // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {host_id, host_fname, host_lname, Username,hostImage,HPhone_No,L_Status } = row;
                   // const selectedUser = selected.indexOf(FName + Lname) !== -1;
                   let stst = 'Active'
                  
                   if(L_Status === 1){
                     stst = 'InActive'
                   }
                   
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row" >
                            <Typography variant="h6" >
                              {host_fname}
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" >
                            <Typography variant="h6" >
                              {host_lname}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{Username}</TableCell>
                          <TableCell align="left">{HPhone_No}</TableCell>
                          <TableCell align="left" style={{    
                            height: "250px",width: "250px"
                          }}>
                            
                            <img src= {hostImage} alt="PlayerImages"/>
                            
                          </TableCell>
  
                          <TableCell align="left">
                          <Label  color={L_Status ? 'error' : 'success'}>
                            {stst}
                          </Label>
                        </TableCell>

                        <TableCell align="right" >
                        <StatusMenu ref={ref}  status={L_Status} aid={host_id} row={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
