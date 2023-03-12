import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';



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
import Page from '../../components/Page';
// import Label from '../../components/label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddCat from './AddCat';
// import requestPost from '../serviceWorker';
// mock
// import USERLIST from '../_mock/user';
// import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' ,alignRight: false},
  { id: 'catName', label: 'Category Name', alignRight: false },
  { id: '' ,alignRight: false},
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
    return filter(array, (_user) => _user.cat_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function ViewCategory() {
  const navigate = useNavigate()
  const ref = useRef(null);

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState([]);
  
  const location = useLocation();
    
     
      const display = () => {
        axios.post("http://localhost:3001/getCat",{
        }).then((res) => {
          console.log(res.data);
          setUserList(res.data);
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

  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    const add = () => {
      setOpen(false) ;
      setDialog();
      display();
    };
    setDialog(() => (
      <AddCat
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
    const dl = ()=>{
      axios.post("http://localhost:3001/delCat",{
        pos_id: prop.aid,
      }).then((res) => {
         display();
          }).catch(() => {
              console.log('No internet connection found. App is running in offline mode.');
        })
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
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText onClick={(e)=>handleAdd(e,true,'EDIT',prop.row)} primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => {
            console.log("Clicked:"+prop.aid);
            dl();
      }}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Remove" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Menu>
        </>);
  }



  return (
    <Page title="Category">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Category
          </Button>
        </Stack>
        <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
        <Card>
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
                    const { cat_id,	cat_name} = row;  
                        
                    return (
                      <TableRow key={cat_id}>                      
                        
                        <TableCell align='left'>
                              
                        </TableCell>
                        <TableCell align='left'>
                              {cat_name}
                        </TableCell>

                        <TableCell align="right" >
                        <StatusMenu key={cat_id}  ref={ref} aid={cat_id} row={row} />
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
