import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// material
import {
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

import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import jsPDF from 'jspdf';
import IconButton from '@mui/material/IconButton';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Matchname', label: 'Match name', alignRight: false },
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

  

export default function AdminViewMatches() {
  const navigate = useNavigate()
  const ref = useRef(null);

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState([]);
  

      const display = () => {
        axios.post("http://localhost:3001/matchDetailsadmin",{
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
      "Organised By", 
      "Category",
      "Team Registration Fee",
      "Player Registration Fee",
      "Total Bid Amout",
    ]];
    
    const data = USERLIST.map(data=> [
      data.matchfname +" "+ data.matchlname, 
      data.hname,
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

        // doc.setFontSize(10);
        // doc.text(40, 35, `Host Name: ${localStorage.getItem("fname") + " " + localStorage.getItem("lname")}`)

        doc.setFontSize(10);
        doc.text(40, 45, newdat)
        doc.page=1;

        doc.text(500,200, 'Page No:' + doc.page);

        doc.save('Match Details.pdf')
      }


  return (
    <Page title="Auctions Available">
      <Container maxWidth="xl">
      {addDialog}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Auctions
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
                    const { cat_id,	cname,	treg_fee,	preg_fee,	tbid_amt,	t_status,	p_status,	matchfname,	matchlname,	match_id,mstatus,bstatus} = row;
                    return (
                      <TableRow>                      
                        <TableCell component="th" scope="row">
                            <Typography variant="h6">
                              {matchfname} {matchlname}
                            </Typography>
                        </TableCell>
                           <TableCell component="th" scope="row" sx={{cursor: "pointer"}}>
                            <Button
                                      variant='contained'
                                      onClick={()=>{
                                        console.log('Auction Details');  
                                        navigate('/dashboard/auctiondetails',{state:{
                                          mid : match_id,
                                        }})        
                                      }}
                                      >
                                        Auction Details
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
