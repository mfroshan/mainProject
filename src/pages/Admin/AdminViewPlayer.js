import { filter } from 'lodash';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
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
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Page from '../../components/Page';
import Label from '../../components/label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


let head = [];
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'First_Name', label: 'First Name', alignLeft: false },
  { id: 'Last_Name', label: 'Last Name', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'phno', label: 'Phone Number', alignRight: false },
  { id: 'Image', label: 'Image', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
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
    return filter(array, (_user) => _user.player_fname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function AdminViewPlayer() {
  const navigate = useNavigate()
  const ref = useRef(null);
  const location = useLocation();
  console.log(location);

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState([]);

      const display = () => {
        let mid = localStorage.getItem("MacthId");
        Axios.post("http://localhost:3001/playerdisplayadmin",{
        }).then((res) => {
       if(res){
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

  const [id, setID] = useState();

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

  

  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    const add = (data) => {
      setOpen(false) ;
      setDialog();
      display();
    };
    
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


  
  const genereatePdf = () => {

  const unit = "pt";
  const size = "A4"; 
  const orientation = "portrait"; 

const marginLeft = 200;
const doc = new jsPDF(orientation, unit, size);


const title = "Player Details";
const headers = [[
  "FirstName", 
  "LastName",
  "Username",
  "Phone No",
]];

const data = USERLIST.map(data=> [
  data.player_fname, 
  data.Player_lname,
  data.username,
  data.Player_no
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

    doc.textFontSize(30);
    doc.text(title, marginLeft, 20);
    doc.autoTable(content);

    doc.setFontSize(10);
    doc.text(40, 40, newdat)

    doc.page=1;
    doc.text(500,200, 'Page No:' + doc.page);


doc.save("PlayerDetails.pdf")
  }


  const StatusMenu = (prop)=>{
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const StatusMenuclick = () =>{
      setIsOpen(true)
      console.log("changed");
   }

    setID(prop.aid);
    // setpusername(prop.Username);
    
    const Activatecall = () =>{
      Axios.post("http://localhost:3001/activatePlayer",{
        id:id,
      }).then((res) => {
        console.log(res.data);
         display();
          }).catch(() => {
              console.log('No internet connection found. App is running in offline mode.');
        })
     }

     const Deactivatecall = () =>{
      Axios.post("http://localhost:3001/DeactivatePlayer",{
        id:id,
      }).then((res) => {
        console.log(res.data);
         display();
          }).catch(() => {
              console.log('No internet connection found. App is running in offline mode.');
        })
     }
    return(
      <>
      <IconButton ref={ref} onClick={()=>{
         StatusMenuclick();
          console.log("Clicked"+prop.aid);
          }}>
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
         {prop.status !== 0 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{
         Activatecall();
          console.log("Activate"+prop.aid);
          }}>
            <ListItemIcon>
               <Iconify icon="fontisto:radio-btn-active" width={24} height={24} color='#00b300' />
            </ListItemIcon>
            <ListItemText primary="Activate" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.status !== 1 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{
            Deactivatecall();
            console.log("Deactivate"+prop.aid)
            }}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Deactivate" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
        </Menu></>);
  }



  return (
    <Page title="Players">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Player
          </Typography>
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
              
              <Table id="table">
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
                   const {player_id , username , player_fname, Player_lname,Player_no,player_img,pos_id,match_id,pstatus,Password } = row;
                   // const selectedUser = selected.indexOf(FName + Lname) !== -1;
                   let stst = 'Active'
                  
                   if(pstatus === 1){
                     stst = 'InActive'
                   }
                   
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row" >
                            <Typography variant="h6" >
                              {player_fname}
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" >
                            <Typography variant="h6" >
                              {Player_lname}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{Player_no}</TableCell>
                          <TableCell align="left" style={{    
                            height: "250px",width: "250px"
                          }}>
                            
                            <img src= {player_img} alt="PlayerImages"/>
                            
                          </TableCell>
  
                          <TableCell align="left">
                          <Label  color={pstatus ? 'error' : 'success'}>
                            {stst}
                          </Label>
                        </TableCell>
  

                        <TableCell align="right" >
                        {/* <StatusMenu ref={ref}  status={pstatus} aid={player_id} row={row} /> */}
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
