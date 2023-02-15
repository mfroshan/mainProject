```sql
    select 
    h1.host_fname as hf_name,
    h1.host_lname as hl_name,
    ca.cat_id as cat_id,
    ca.cat_name as cname,
    m1.t_reg_amt as treg_fee,
    m1.preg_amt as preg_fee,
    m1.total_bid_amt as tbid_amt,
    m1.team_reg_status as t_status,
    m1.player_reg_status as p_status,
    m1.match_fname as matchfname,
    m1.match_lname as matchlname,
    m1.match_id as match_id
    from tbl_match m1
INNER join tbl_category ca on m1.cat_id = ca.cat_id
INNER JOIN tbl_host h1 on m1.host_id = h1.host_id where h1.host_id = id;
```
```sql
BEGIN
declare nm varchar(10);

if name LIKE "teamReg%" THEN
	set nm = "team_reg_status";
ELSEIF name LIKE "playerReg" THEN
	set nm = "player_reg_status";
ELSE
	set nm = "m_status";
END IF;

IF sts = 0 AND name Like "teamReg" THEN
	update tbl_match set team_reg_status = 1 where match_id = mid; 
	select "Updated" as msg, 1 as status;
ELSEIF sts = 1 AND name Like "teamReg%" THEN
	update tbl_match set team_reg_status = 0 where match_id = mid; 
ELSEIF sts = 0 AND name LIKE "playerReg%" THEN
	update tbl_match set player_reg_status = 1 where match_id = mid;
ELSEIF sts = 1 AND LIKE "playerReg%" THEN
	update tbl_match set player_reg_status = 0 where match_id = mid;
ELSEIF sts = 0 AND LIKE "match%" THEN
	update tbl_match set m_status = 1 where match_id = mid;
ELSE
	update tbl_match set m_status = 0 where match_id = mid; 
END IF;
END
```
```sql
    BEGIN
DECLARE result varchar(100);
DECLARE oldUsername varchar(50);
SET oldUsername = (select Username from tbl_login where player_id = id);
SET result = (select Username from tbl_login where Username = username1);
IF result is not null THEN  
	SELECT result as Username, "Username Exist"  AS msg, 1 as status;
else 
	update tbl_login 
    set Username = username1,
    set Password = password1
    where Username = oldUsername;
     update tbl_player 
     set username = username1,
     Player_fname = fname,
     Player_lname = lname,
     pos_id = position,
     player_img = base64v,
     Player_no = Number,
     match_id = m_id where player_id = id;
	SELECT result as Username, "Registerd" as msg, 0 as status;
END IF;
END


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
                                  mid : match_id
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

          

```