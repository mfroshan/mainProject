-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2023 at 03:14 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auction`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addMatch` (IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `cat_id` INT(5), IN `treg_fee` DECIMAL(10,2), IN `preg_fee` DECIMAL(10,2), IN `tbid_amt` DECIMAL(10,2), IN `id` INT(5))   BEGIN
DECLARE result varchar(100);
set result = (select match_fname from tbl_match where match_fname = fname && match_lname = lname);
IF result is not null THEN
	select 0 as errorMsg , 0 as status;
ELSE
	insert into tbl_match(host_id,
                          match_fname,
                          match_lname,
                          cat_id,
                          t_reg_amt,
                          preg_amt,
                          total_bid_amt,
                          team_reg_status,
                          player_reg_status,
                          m_status)
    VALUES(id,
           fname,
           lname,
           cat_id,
           treg_fee,
           preg_fee,
           tbid_amt,
           0,
           0,
           0);
    select 1 as  errorMsg, 1 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BidStatus` (IN `id` INT(5))   BEGIN
DECLARE res int(10);
set res = (select bid_status from tbl_match where match_id = id);
select res as bidStatus;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckEMail` (IN `email` VARCHAR(100))   BEGIN
DECLARE result varchar(100);
set result = (select Username from tbl_login where Username=email);
IF result is not null THEN
	select "Account Exist!" as msg,1 as status;
ELSE
	select "No username Found!" as msg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCat` (IN `id1` INT(5))   BEGIN
DECLARE result varchar(10);
delete from tbl_category where cat_id = id1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePos` (IN `id1` INT(5))   BEGIN
DECLARE result varchar(10);
delete from tbl_position where pos_id = id1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAmt` (IN `id` INT(5), IN `value` VARCHAR(5))   BEGIN
 DECLARE result varchar(10);
 IF value LIKE "t" THEN
 		select t_reg_amt,total_bid_amt from tbl_match where match_id = id;
 ELSE
 		select preg_amt from tbl_match where match_id = id;
 END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getMatchDetails` (IN `id` INT(5))   BEGIN
select 
    m1.match_id as mid,
    m1.match_fname as mfname,
    m1.match_lname as mlname 
    from tbl_match m1
    INNER join  tbl_host h1 on h1.host_id = m1.host_id where h1.host_id = id; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertCat` (IN `Catname` VARCHAR(50))   BEGIN
DECLARE result varchar(50);
set result = (select cat_name from tbl_category where cat_name = Catname); 
IF result is not null THEN
	select "Category Exist!" as errorMsg, 0 as status;
ELSE
	INSERT into tbl_category(cat_name) value(Catname);
    select "Inserted!" as errorCode, 1 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPos` (IN `Posname` VARCHAR(50))   BEGIN
DECLARE result varchar(50);
set result = (select pos_name from tbl_position where pos_name = Posname); 
IF result is not null THEN
	select "Position Exist!" as errorMsg, 0 as status;
ELSE
	INSERT into tbl_position(pos_name) value(Posname);
    select "Inserted!" as errorCode, 1 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50))   BEGIN
DECLARE us varchar(50);
DECLARE role varchar(10);
DECLARE Id int(10);
set us = (select Username from tbl_login where BINARY Username = username1  and  BINARY Password =password1 and L_Status=0);
set role = (select U_Type from tbl_login where BINARY Username = username1  and  BINARY Password =password1 and L_Status=0);
if us is not null THEN
	select us as Username, "Login success" as msg, 1 as status;
    select role as U_Type , role as Type, 1 as status;
	if role LIKE "Host%" THEN
    	set Id = (select host_id from tbl_host where BINARY Username = username1);
        select Id as id ;
    END if;
else 
	select "Invalid password" as msg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mactivate` (IN `sts` BOOLEAN, IN `name` VARCHAR(10), IN `mid` INT(5))   BEGIN
declare nm varchar(10);
IF sts = 0 AND name='teamReg' THEN
	update tbl_match set team_reg_status = 1 where match_id = mid; 
	select "Updated" as msg, 1 as status;
ELSEIF sts = 1 AND name='teamReg' THEN
	update tbl_match set team_reg_status = 0 where match_id = mid;
    select "Updated" as msg, 1 as status;
ELSEIF sts = 0 AND name='playerReg' THEN
	update tbl_match set player_reg_status = 1 where match_id = mid;
    select "Updated" as msg, 1 as status;
ELSEIF sts = 1 AND name='playerReg' THEN
	update tbl_match set player_reg_status = 0 where match_id = mid;
    select "Updated" as msg, 1 as status;
ELSEIF sts = 0 AND name='match' THEN
	update tbl_match set m_status = 1 where match_id = mid;
     update tbl_match set player_reg_status = 1 where match_id = mid;
    update tbl_match set team_reg_status = 1 where match_id = mid; 
    select "Updated" as msg, 1 as status;
ELSE
	update tbl_match set m_status = 0 where match_id = mid;
    update tbl_match set team_reg_status = 0 where match_id = mid;
    update tbl_match set player_reg_status = 0 where match_id = mid;
    select "Updated" as msg, 1 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `matchdisplay` (IN `id1` INT(5))   BEGIN
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
    m1.match_id as match_id,
    m1.m_status as mstatus
    from tbl_match m1
INNER join tbl_category ca on m1.cat_id = ca.cat_id
INNER JOIN tbl_host h1 on m1.host_id = h1.host_id where h1.host_id = id1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pactivate` (IN `pid` INT(5))   BEGIN
DECLARE res int(5);
DECLARE us int(5);
DECLARE player_username varchar(50);
set player_username =  (select username from tbl_player where player_id = pid);
update tbl_player set pstatus = 0 where player_id=pid;
update tbl_login set L_Status = 0 where Username = player_username;
set res = (select L_Status from tbl_login where Username=player_username);  
IF res = 0 THEN
	set us = (select pstatus from tbl_player where player_id=pid);
    if us = 0 THEN
		select "updated" as msg;
	ELSE
		select "Not updated" as msg ;
	END IF;
 ELSE
    SELECT "Something went wrong" as msg;
 END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdeactivate` (IN `pid` INT(5))   BEGIN
DECLARE res int(5);
DECLARE us int(5);
DECLARE playerusername varchar(50);
set playerusername =  (select username from tbl_player where player_id = pid);
update tbl_player set pstatus = 1 where player_id=pid;
update tbl_login set L_Status = 1 where Username = playerusername;
set res = (select L_Status from tbl_login where Username=playerusername);  
IF res = 1 THEN
	set us = (select pstatus from tbl_player where player_id=pid);
    if us = 1 THEN
		select "updated" as msg;
	ELSE
		select "Not updated" as msg ;
	END IF;
 ELSE
    SELECT "Something went wrong" as msg;
 END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `playerDisplay` (IN `m_id` INT(5))   BEGIN
SELECT * from tbl_player p1 inner join tbl_login l1 on l1.Username = p1.username where match_id = m_id; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `playerReg` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `position` INT(5), IN `base64v` LONGTEXT, IN `Number` VARCHAR(10), IN `m_id` INT(5))   BEGIN
DECLARE result varchar(100);
DECLARE res int(5);
set res = (select player_reg_status from tbl_match where match_id = m_id);
SET result =  (select Username from tbl_login where Username = username1  and Password=password1 and L_Status=0);
IF res=1 THEN
    select "Registration Closed!" as msg, 1 as status;
ELSE
    IF result is not null THEN
	    SELECT "Account Exist"  as msg, 1 as status;
    ELSE 
	    INSERT INTO tbl_login(Username,Password,U_Type,L_Status) values(username1,password1,'Player',0);
        INSERT INTO tbl_player(Username,Player_fname,Player_lname,pos_id,player_img,Player_no,match_id) values          			        (username1,fname,lname,position,base64v,Number,m_id);
	    SELECT result as Username, "Registerd" as msg, 0 as status;
    END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registerHost` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50))   BEGIN
DECLARE result varchar(100);
SET result = (select Username from tbl_login where Username = username1  and Password = password1 and L_Status=0);
IF result is not null THEN
	select result as username, "Account Exist" as msg, 1 as status;
else
	INSERT INTO tbl_login(Username,Password,U_Type,L_Status) values(username1,password1,'Host',0);
    INSERT INTO tbl_host(host_fname,host_lname,Username) values (fname,lname,username1);
	select result as Username, "Registerd" as msg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `regStatus` (IN `id` INT(10), IN `value` VARCHAR(10))   BEGIN
DECLARE res int(10);
IF value LIKE "p" THEN
    set res = (select player_reg_status from tbl_match where match_id=id);
    select res as regStatus;
ELSE
    set res = (select team_reg_status from tbl_match where match_id =id);
    select res as regStatus;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tactivate` (IN `pid` INT(5), IN `status1` INT(5))   BEGIN
DECLARE t_username varchar(50); 
IF status1 = 0 THEN
    set t_username =  (select team_username from tbl_team where team_id = pid);
    update tbl_team set status = 1 where team_id=pid;
    update tbl_login set L_Status = 1 where Username = t_username;
	select "Deactivated!" as msg;
 ELSE
    set t_username =  (select team_username from tbl_team where team_id = pid);
    update tbl_team set status = 0 where team_id=pid;
    update tbl_login set L_Status = 0 where Username = t_username;
    SELECT "Activated!" as msg;
 END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TeamDisplay` (IN `m_id` INT(5))   BEGIN
SELECT * from tbl_team t1 inner join tbl_login l1 on l1.Username = t1.team_username where match_id = m_id; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Teamreg` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `base64v` LONGTEXT, IN `Number` VARCHAR(10), IN `m_id` INT(5))   BEGIN
DECLARE result varchar(100);
DECLARE res int(5);
SET res = (select team_reg_status from tbl_match where match_id=m_id);
SET result =  (select Username from tbl_login where Username = username1  and Password=password1 and L_Status=0);
IF res=1 THEN
  select "Registration Closed!" as msg, 1 as status;
ELSE
     IF result is not null THEN
	      SELECT "Account Exist!" as msg, 1 as status;
     ELSE 
	     INSERT INTO tbl_login(Username,Password,U_Type,L_Status) values(username1,password1,'Team',0);
         INSERT INTO tbl_team
                        (
                            match_id,
                            team_username,
                            team_fname,
                            team_lname,
                            team_img,
                            team_number
                        ) 
                        values
                        (
                            m_id,
                            username1,
                            fname,
                            lname,
                            base64v,
                            Number
                        );
	      SELECT "Registerd" as msg, 0 as status;
      END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCategory` (IN `id1` INT(5), IN `Catname` VARCHAR(50))   BEGIN
DECLARE result varchar(50);
update tbl_category set cat_name = Catname where cat_id = id1; 
set result = (select cat_name from tbl_category where cat_id = id1);
IF result is not null THEN
	select "Updated" as errorCode , 1 as status;
ELSE
	select "Not Updated" as errorMsg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMatch` (IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `catid` INT(5), IN `treg_fee` DECIMAL(10,2), IN `preg_fee` DECIMAL(10,2), IN `tbid_amt` DECIMAL(10,2), IN `id` INT(5), IN `matchid` INT(5))   BEGIN
DECLARE result varchar(100);
update tbl_match 
    set match_fname=fname,
    match_lname=lname, 
    cat_id=catid, 
    t_reg_amt=treg_fee,
    preg_amt=preg_fee,
    total_bid_amt=tbid_amt
    where match_id = matchid;  
    select 1 as  errorMsg, 1 as status;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdatePlayer` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `position` INT(5), IN `Number` VARCHAR(10), IN `m_id` INT(5), IN `id` INT(5))   BEGIN
DECLARE result varchar(100);
DECLARE oldUsername varchar(50);
set oldUsername = (select username from tbl_player where player_id=id);
SET result = (select Username from tbl_login where Username = username1);
IF result = oldUsername THEN
    update tbl_login set Password = password1 where Username= oldUsername;
    update tbl_player 
    set Player_fname=fname,
    Player_lname=lname,
    pos_id=position,
    Player_no=Number,
    match_id = m_id where player_id = id;
    SELECT result as Username, "Updated!" as msg, 0 as status;
ELSEIF result = username1 THEN
 	select "Account Exist" as msg, 1 as status;
ELSE
	update tbl_login set Username = username1,Password = password1 where Username= oldUsername;
    update tbl_player set Username = username1,
    Player_fname=fname,
    Player_lname=lname,
    pos_id=position,
    Player_no=Number,
    match_id = m_id where player_id = id;
	SELECT result as Username, "Updated!" as msg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdatePos` (IN `id1` INT(5), IN `Posname` VARCHAR(50))   BEGIN
DECLARE result varchar(50);
update tbl_position set pos_name = Posname where pos_id = id1; 
set result = (select pos_name from tbl_position where pos_id = id1);
IF result is not null THEN
	select "Updated" as errorCode , 1 as status;
ELSE
	select "Not Updated" as errorMsg, 0 as status;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateTeam` (IN `username1` VARCHAR(50), IN `password1` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `Number` VARCHAR(10), IN `m_id` INT(5), IN `id` INT(5))   BEGIN
DECLARE result varchar(100);
DECLARE oldUsername varchar(50);
set oldUsername = (select team_username from tbl_team where team_id=id);
SET result = (select Username from tbl_login where Username = username1);
IF result = oldUsername THEN
    update tbl_login set Password = password1 where Username= oldUsername;
    update tbl_team 
    set team_fname=fname,
    team_lname=lname,
    team_number=Number,
    match_id = m_id where team_id = id;
    SELECT result as Username, "Updated!" as msg, 0 as status;
ELSEIF result = username1 THEN
 	select "Account Exist" as msg, 1 as status;
ELSE
	update tbl_login set Username = username1,Password = password1 where Username= oldUsername;
    update tbl_team set team_username = username1,
    team_fname=fname,
    team_lname=lname,
    team_number=Number,
    match_id = m_id where team_id = id;
	SELECT result as Username, "Updated!" as msg, 0 as status;
END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ auction _child`
--

CREATE TABLE `tbl_ auction _child` (
  `auction_child_id` int(5) NOT NULL,
  `auction_masterr_id` int(5) NOT NULL,
  `Team_id` int(5) NOT NULL,
  `player_id` int(5) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `auction_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auction_master`
--

CREATE TABLE `tbl_auction_master` (
  `auction_master_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL,
  `total_bid_time` time NOT NULL,
  `base_amt` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `cat_id` int(5) NOT NULL,
  `cat_name` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`cat_id`, `cat_name`) VALUES
(1, '5\'s'),
(2, '7\'s'),
(3, 'changed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_child`
--

CREATE TABLE `tbl_chat_child` (
  `chat_child_id` int(5) NOT NULL,
  `chat_master_id` int(5) NOT NULL,
  `team_id` int(5) NOT NULL,
  `messageIn` varchar(50) NOT NULL,
  `messageOut` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_master`
--

CREATE TABLE `tbl_chat_master` (
  `chat_master_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_host`
--

CREATE TABLE `tbl_host` (
  `host_id` int(5) NOT NULL,
  `host_fname` varchar(10) DEFAULT NULL,
  `host_lname` varchar(10) DEFAULT NULL,
  `Username` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_host`
--

INSERT INTO `tbl_host` (`host_id`, `host_fname`, `host_lname`, `Username`) VALUES
(1, 'Roshan', 'Francis', 'roshan@gmail.com'),
(2, 'Riyas', 'Salim', 'riyas@gmail.com'),
(3, 'host', 'host', 'host@gmail.com'),
(4, 'elsy', 'Francis', 'e@gmail.com'),
(5, 'admin', 'admin', 'admin@gmail.com'),
(6, 'new', 'host', 'newHost@gmail.com'),
(7, 'new', 'host', 'hostnew11@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `Username` varchar(30) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `U_Type` varchar(8) NOT NULL,
  `L_Status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`Username`, `Password`, `U_Type`, `L_Status`) VALUES
('admin@gmail.com', '11', 'Host', 0),
('e@gmail.com', '11', 'Host', 0),
('hi@gmail.com', '11', 'Team', 0),
('host@gmail.com', '123', 'Host', 0),
('hostnew11@gmail.com', '11', 'Host', 0),
('newenew@gmail.com', '11', 'Team', 0),
('newHost@gmail.com', '11', 'Host', 0),
('newteam@gmail.com', '11', 'Team', 0),
('r@gmail.com', '11', 'Admin', 0),
('riyas@gmail.com', 'riyas', 'Host', 0),
('roroor@gmail.com', '11', 'Player', 0),
('roshan@gmail.com', '123', 'Host', 0),
('rr@gmail.com', '11', 'Player', 0),
('team2@gmail.com', '11', 'Team', 0),
('team4@gmail.com', 'irmb5/m/d', 'Team', 0),
('team@gmail.com', '123', 'Team', 0),
('u@gmail.com', '123', 'Player', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_match`
--

CREATE TABLE `tbl_match` (
  `match_id` int(5) NOT NULL,
  `host_id` int(5) DEFAULT NULL,
  `match_fname` varchar(30) NOT NULL,
  `match_lname` varchar(50) NOT NULL,
  `cat_id` int(5) DEFAULT NULL,
  `t_reg_amt` decimal(10,2) NOT NULL,
  `preg_amt` decimal(10,2) NOT NULL,
  `total_bid_amt` decimal(10,2) NOT NULL,
  `team_reg_status` tinyint(1) NOT NULL,
  `player_reg_status` tinyint(1) NOT NULL,
  `m_status` tinyint(4) NOT NULL,
  `bid_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_match`
--

INSERT INTO `tbl_match` (`match_id`, `host_id`, `match_fname`, `match_lname`, `cat_id`, `t_reg_amt`, `preg_amt`, `total_bid_amt`, `team_reg_status`, `player_reg_status`, `m_status`, `bid_status`) VALUES
(1, 1, 'Match', 'one', 1, '200.00', '100.00', '30000.00', 0, 0, 0, 0),
(2, 1, 'match ', '2', 1, '400.00', '200.00', '30000.00', 0, 0, 0, 0),
(6, 1, 'Kodikutmala', 'League', 1, '300.00', '200.00', '40000.00', 0, 0, 0, 0),
(7, 7, 'match', '1', 2, '300.00', '400.00', '30000.00', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_player`
--

CREATE TABLE `tbl_player` (
  `player_id` int(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `player_fname` varchar(10) NOT NULL,
  `Player_lname` varchar(10) NOT NULL,
  `Player_no` varchar(10) NOT NULL,
  `player_img` longtext NOT NULL,
  `pos_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL,
  `pstatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_player`
--

INSERT INTO `tbl_player` (`player_id`, `username`, `player_fname`, `Player_lname`, `Player_no`, `player_img`, `pos_id`, `match_id`, `pstatus`) VALUES
(15, 'roroor@gmail.com', 'roro', 'r', '9895459416', '', 42, 1, 0),
(16, 'rr@gmail.com', 'roshan', 'hih', '9895459416', '', 41, 1, 0),
(17, 'u@gmail.com', '11', '11', '9895459416', '', 42, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_position`
--

CREATE TABLE `tbl_position` (
  `pos_id` int(5) NOT NULL,
  `pos_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_position`
--

INSERT INTO `tbl_position` (`pos_id`, `pos_name`) VALUES
(41, 'GoalKeeper'),
(42, 'Left Back'),
(43, 'Right Back'),
(44, 'MidFielder');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_team`
--

CREATE TABLE `tbl_team` (
  `team_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL,
  `team_username` varchar(30) NOT NULL,
  `team_fname` varchar(10) NOT NULL,
  `team_lname` varchar(10) NOT NULL,
  `team_img` longtext NOT NULL,
  `team_number` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_team`
--

INSERT INTO `tbl_team` (`team_id`, `match_id`, `team_username`, `team_fname`, `team_lname`, `team_img`, `team_number`, `status`) VALUES
(2, 1, 'team2@gmail.com', 'rr', 'r', '', '9899', 0),
(3, 6, 'team4@gmail.com', 'team', 'kodikuthma', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAZCAYAAADqrKTxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABMSURBVDhP7ZMxDgAgCAOL//+zSlITZRC6c4sMXsQmtbmByOAp0RJpibREviU0M04vaXNdjFfS9VyIL5b+FMVyELcopXdEOXIXZQkAFkgIHiTnMBx3AAAAAElFTkSuQmCC', '9895459416', 0),
(4, 1, 'hi@gmail.com', 'hi1`h', 'hihi', '', '9895459416', 0),
(5, 7, 'newteam@gmail.com', 'ew', 'team', 'data:image/png;base64,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', '9895459416', 0),
(6, 1, 'team@gmail.com', 'team', 'one', '', '9895459416', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_ auction _child`
--
ALTER TABLE `tbl_ auction _child`
  ADD PRIMARY KEY (`auction_child_id`),
  ADD KEY `auction_masterr_id` (`auction_masterr_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `Team_id` (`Team_id`);

--
-- Indexes for table `tbl_auction_master`
--
ALTER TABLE `tbl_auction_master`
  ADD PRIMARY KEY (`auction_master_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `tbl_chat_child`
--
ALTER TABLE `tbl_chat_child`
  ADD PRIMARY KEY (`chat_child_id`),
  ADD KEY `chat_master_id` (`chat_master_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `tbl_chat_master`
--
ALTER TABLE `tbl_chat_master`
  ADD PRIMARY KEY (`chat_master_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `tbl_host`
--
ALTER TABLE `tbl_host`
  ADD PRIMARY KEY (`host_id`),
  ADD KEY `Username` (`Username`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `tbl_match`
--
ALTER TABLE `tbl_match`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `host_id` (`host_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `tbl_player`
--
ALTER TABLE `tbl_player`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `username` (`username`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `tbl_player_ibfk_3` (`pos_id`);

--
-- Indexes for table `tbl_position`
--
ALTER TABLE `tbl_position`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `tbl_team`
--
ALTER TABLE `tbl_team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `team_username` (`team_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_ auction _child`
--
ALTER TABLE `tbl_ auction _child`
  MODIFY `auction_child_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_auction_master`
--
ALTER TABLE `tbl_auction_master`
  MODIFY `auction_master_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `cat_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_chat_child`
--
ALTER TABLE `tbl_chat_child`
  MODIFY `chat_child_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_chat_master`
--
ALTER TABLE `tbl_chat_master`
  MODIFY `chat_master_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_host`
--
ALTER TABLE `tbl_host`
  MODIFY `host_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_match`
--
ALTER TABLE `tbl_match`
  MODIFY `match_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_player`
--
ALTER TABLE `tbl_player`
  MODIFY `player_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_position`
--
ALTER TABLE `tbl_position`
  MODIFY `pos_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tbl_team`
--
ALTER TABLE `tbl_team`
  MODIFY `team_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_ auction _child`
--
ALTER TABLE `tbl_ auction _child`
  ADD CONSTRAINT `tbl_ auction _child_ibfk_1` FOREIGN KEY (`auction_masterr_id`) REFERENCES `tbl_auction_master` (`auction_master_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_ auction _child_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `tbl_player` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_ auction _child_ibfk_3` FOREIGN KEY (`Team_id`) REFERENCES `tbl_team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_auction_master`
--
ALTER TABLE `tbl_auction_master`
  ADD CONSTRAINT `tbl_auction_master_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `tbl_match` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_chat_child`
--
ALTER TABLE `tbl_chat_child`
  ADD CONSTRAINT `tbl_chat_child_ibfk_1` FOREIGN KEY (`chat_master_id`) REFERENCES `tbl_chat_master` (`chat_master_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_chat_child_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `tbl_team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_chat_master`
--
ALTER TABLE `tbl_chat_master`
  ADD CONSTRAINT `tbl_chat_master_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `tbl_match` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_host`
--
ALTER TABLE `tbl_host`
  ADD CONSTRAINT `tbl_host_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `tbl_login` (`Username`);

--
-- Constraints for table `tbl_match`
--
ALTER TABLE `tbl_match`
  ADD CONSTRAINT `tbl_match_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `tbl_host` (`host_id`),
  ADD CONSTRAINT `tbl_match_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `tbl_category` (`cat_id`);

--
-- Constraints for table `tbl_player`
--
ALTER TABLE `tbl_player`
  ADD CONSTRAINT `tbl_player_ibfk_1` FOREIGN KEY (`username`) REFERENCES `tbl_login` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_player_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `tbl_match` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_player_ibfk_3` FOREIGN KEY (`pos_id`) REFERENCES `tbl_position` (`pos_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_team`
--
ALTER TABLE `tbl_team`
  ADD CONSTRAINT `tbl_team_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `tbl_match` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_ibfk_2` FOREIGN KEY (`team_username`) REFERENCES `tbl_login` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
