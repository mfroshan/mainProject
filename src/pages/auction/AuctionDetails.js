import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

// components
import Page from '../../components/Page';
import Label from '../../components/label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import BidHistory from './BidHistory';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// import requestPost from '../serviceWorker';
// mock
// import USERLIST from '../_mock/user';
// import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Matchname', label: 'Match Name', alignRight: false },
  { id: 'playername', label: 'Player Name', alignRight: false },
  { id: 'bidamt', label: 'Bid Amount', alignRight: false },
  { id: 'TeamName', label: 'Team Name', alignRight: false },
  { id: 'TeamName', label: 'Position', alignRight: false },
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

  

export default function AuctionDetails() {
  const navigate = useNavigate()
  
  const ref = useRef(null);

  const location = useLocation();

//   console.log(location);

  const handleClose = () => {
    setDialog();
  };

  const [USERLIST,setUserList] = useState([]);
  
  const [mid ,setmid] = useState(
    location.state.mid
  );
//    let mid = location.state.mid; 
    
    

      const display = () => {
        setmid(location.state.mid);
        console.log("Mid:"+mid);
        axios.post("http://localhost:3001/DisplayAuctionDetails",{
          mid: mid,
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

  const [openBidHistory, setOpenBidHistory] = useState(false);

  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClickOpen = (tid,pid,mid,matchname,playername) => {
    setDialog(
        <BidHistory 
          onClose={handleClose}
          open={open}
          tid={tid}
          pid={pid}
          mid={mid}
          pname={playername}
          mname={matchname}
        />      
    );
    setOpenBidHistory(true);
  }

  const genereatePdf = () => {

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    
    const marginLeft = 200;
    const doc = new jsPDF(orientation, unit, size);
    
    
    const title = "Auction Details";
    const headers = [[
      "Player Name",
      "Position", 
      "Bid Amount",
      "Bided Team",
    ]];
    
    const data = USERLIST.map(data=> [
      data.playername, 
      data.pos_name,
      data.price,
      data.teamname
    
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
        doc.text(40, 35, "Match Name: "+ USERLIST[0].matchname)

        doc.setFontSize(10);
        doc.text(40, 45, newdat)
        doc.page=1;

        doc.text(500,200, 'Page No:' + doc.page);

        doc.save('Auction Details.pdf')
      }




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

 
  return (
    <Page title="Auction Details">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Auction Details
          </Typography>
        </Stack>

        <KeyboardBackspaceIcon 
        sx={{
          cursor:'pointer'
        }}
        onClick={()=>{
          navigate(-1)
        }}
        />
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
                    const { teamname,	playername,	matchname,	price,	pos_name,team_id,player_id,match_id} = row;
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row">
                            <Typography variant="h6">
                               {matchname}
                              
                            </Typography>
                        </TableCell >

                        <TableCell variant="h6">
                        {playername}
                           </TableCell>
                           <TableCell variant="h6">
                        {price}
                           </TableCell>
                           <TableCell variant="h6">
                        {teamname}
                           </TableCell>
                           <TableCell variant="h6">
                        {pos_name}
                           </TableCell>
                           <TableCell variant='h6'>
                            <Button
                            onClick={()=>{
                              handleClickOpen(team_id,player_id,match_id,matchname,playername)
                            }}
                            >
                              BidHistory
                            </Button>
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
