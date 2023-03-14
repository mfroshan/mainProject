import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


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
import AddMatch from './AddMatch';
import jsPDF from 'jspdf';
// import requestPost from '../serviceWorker';
// mock
// import USERLIST from '../_mock/user';
// import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Matchname', label: 'Match name', alignRight: false },
  { id: 'Category', label: 'Category Name', alignRight: false },
  { id: 'teamfee', label: 'Team Registration Fee', alignRight: false },
  { id: 'playerfee', label: 'Player Registration Fee', alignRight: false },
  { id: 'totalbid amt', label: 'Total Bid Amount', alignRight: false },
  { id: 't_status', label: 'Team Registration Status', alignRight: false },
  { id: 'p_status', label: 'Player Registration Status', alignRight: false },
  { id: 'm_status', label: 'Match Status', alignRight: false },
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
    return (
      filter(array, (_user) => _user.matchfname.toLowerCase().indexOf(query.toLowerCase()) !== -1));
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function MatchDisplay() {
  const navigate = useNavigate()
  const ref = useRef(null);

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState([]);
  

    
     let hostid = localStorage.getItem("HostID");
     console.log("HostID:"+hostid);

      const display = () => {
        axios.post("http://localhost:3001/matchDetails",{
          id:hostid,
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

  

  const handleAdd = (e, upd = Boolean(false), button = 'ADD', data = {}) => {
    const add = (data) => {
      setOpen(false) ;
      setDialog();
      display();
    };
    setDialog(() => (
      <AddMatch
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

 
  const genereatePdf = () => {

    const unit = "pt";
    const size = "A4"; 
    const orientation = "portrait"; 
    
    const marginLeft = 200;
    const doc = new jsPDF(orientation, unit, size);
    
    
    const title = `Match Details`;
    const headers = [[
      "Match Name ", 
      "Category",
      "Team Registration Fee",
      "Player Registration Fee",
      "Total Bid Amout",
    ]];
    
    const data = USERLIST.map(data=> [
      data.matchfname +" "+ data.matchlname, 
      data.cname,
      data.treg_fee,
      data.preg_fee,
      data.tbid_amt,
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
    
        doc.setFontSize(20);
        doc.text(title, marginLeft, 20);
        doc.autoTable(content);

        doc.setFontSize(10);
        doc.text(40, 35, `Host Name: ${localStorage.getItem("fname") + " " + localStorage.getItem("lname")}`)

        doc.setFontSize(10);
        doc.text(40, 45, newdat)
        doc.page=1;

        doc.text(500,200, 'Page No:' + doc.page);

        doc.save('Match Details.pdf')
      }


  const StatusMenu = (prop)=>{
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    
    const open = (sts,table,mid) => {
            axios.post("http://localhost:3001/Activate",{
                status:sts,
                tbl_name: table,
                matchid:mid,
            }).then((res) => {
              if(res.data){
               display();
              }
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
         {prop.tstatus !== 0 && prop.mstatus !== 1  && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(1,'teamReg',prop.aid);}}>
            <ListItemIcon>
               <Iconify icon="fontisto:radio-btn-active" width={24} height={24} color='#00b300' />
            </ListItemIcon>
            <ListItemText primary="Open Team Registration" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.tstatus !== 1  && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(0,'teamReg',prop.aid);}}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Close Team Registration" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.pstatus !== 0 && prop.mstatus !== 1 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(1,'playerReg',prop.aid)}}>
            <ListItemIcon>
               <Iconify icon="fontisto:radio-btn-active" width={24} height={24} color='#00b300' />
            </ListItemIcon>
            <ListItemText primary="Open Player Registration" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.pstatus !== 1 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(0,'playerReg',prop.aid);}}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Close Player Registration" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          
          {prop.mstatus !== 0 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(1,'match',prop.aid)}}>
            <ListItemIcon>
               <Iconify icon="fontisto:radio-btn-active" width={24} height={24} color='#00b300' />
            </ListItemIcon>
            <ListItemText primary="Activate Match" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>}
          {prop.mstatus !== 1 && <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>{open(0,'match',prop.aid)}}>
            <ListItemIcon>
               <Iconify icon="el:remove-circle" width={24} height={24}  color='#cc2900'/>
            </ListItemIcon>
            <ListItemText primary="Close Match" primaryTypographyProps={{ variant: 'body2' }} />
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
    <Page title="Matches">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Matches
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={handleAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Match
          </Button>
        </Stack>

        <Card>
        <IconButton
          sx={{
            float:'right',
            marginLeft:'30px'
          }}
          onClick = {genereatePdf}
          ><Iconify icon="prime:file-pdf" width={40} height={40} /></IconButton>
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
                    const { cat_id,	cname,	treg_fee,	preg_fee,	tbid_amt,	t_status,	p_status,	matchfname,	matchlname,	match_id,mstatus} = row;
                    let pstst = 'Open';
                  //  if(aId === parseInt(localStorage.getItem('loginId'), 10)){
                  //   return;
                  //  }
                  if(p_status === 1){
                    pstst = 'Closed';
                  }
                  let tstst = 'Open';
                  //  if(aId === parseInt(localStorage.getItem('loginId'), 10)){
                  //   return;
                  //  }
                  if(t_status === 1){
                    tstst = 'Closed';
                  }

                  let mstst = 'Active';
                  if(mstatus === 1){
                    mstst = 'In Active';
                  }
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row"  sx={{cursor: "pointer"}} onClick={()=>{
                              navigate('/dashboard/matchdetails',
                              {state:
                                {
                                  mid : match_id,
                                  values:row
                                }
                              })
                            }}>
                            <Typography variant="h6">
                              {matchfname} {matchlname}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">{cname}</TableCell>
                        <TableCell align="left">{treg_fee}</TableCell>
                        <TableCell align="left">{preg_fee}</TableCell>
                        <TableCell align="left">{tbid_amt}</TableCell>
                        <TableCell align="left">
                          <Label  color={t_status ? 'error' : 'success'}>
                            {tstst}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label  color={p_status ? 'error' : 'success'}>
                            {pstst}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label  color={mstatus ? 'error' : 'success'}>
                            {mstst}
                          </Label>
                        </TableCell>

                        <TableCell align="right" >
                        <StatusMenu ref={ref} pstatus={p_status} tstatus={t_status} mstatus={mstatus} aid={match_id} row={row} />
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
