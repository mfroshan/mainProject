// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Iconify from '../../components/iconify';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(3),
  height: theme.spacing(3),
  justifyContent: 'center',
  marginBottom: theme.spacing(0),
}));

// ----------------------------------------------------------------------

MatchPlayerPos.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function MatchPlayerPos({ title, total, icon, color = 'primary', sx,pid, mid, ...other }) {
  const Navigate = useNavigate();
  console.log("Count:");
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography sx={{
        cursor: "pointer",
        opacity: 0.72 
        }} 
       variant="subtitle2" onClick={()=>{
        let mid = localStorage.getItem("MatchID");
            Navigate('/auction/profile',{
              state:
                {
                  matchid: mid,
                  pos_id : pid,
                }
            });
       }}>
        {title}
      </Typography>
    </Card>
  );
}
