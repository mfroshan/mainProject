
import React from 'react'
import { Grid, Container, Stack, Typography, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function  PlayerProfile () {
  return (
    <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Company
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item align="left" xs={12} sm={3} md={3}>
                            <Card
                                sx={{
                                    py: 2,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff',
                                    height: '228px',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src="https://en.wikipedia.org/wiki/Football_player#/media/File:2019-05-18_Fu%C3%9Fball,_Frauen,_UEFA_Women's_Champions_League,_Olympique_Lyonnais_-_FC_Barcelona_StP_1192_LR10_by_Stepro(Cropped).jpg"
                                    alt=""
                                    height="100%"
                                    width="100%"
                                    style={{ objectFit: 'contain' }}
                                />
                            </Card>
                        </Grid>

                        <Grid item align="left" xs={12} sm={9} md={9}>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Player Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    NAME
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Position
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    NUMM
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       email
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item align="left" xs={12} sm={6} md={6}>
                            <Typography variant="h6" >
                                Billing Address
                            </Typography>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'left',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Street Address
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    aDDRESS
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        city
                                    </Typography>.
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    city
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        VAT
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    vat
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item align="left" xs={12} sm={6} md={6}>
                            <Typography variant="h6" >
                                Bank Details
                            </Typography>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'left',
                                    bgcolor: '#fff'
                                }}
                            >
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}  />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Account No.
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    acc
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        IFSC
                                    </Typography>.
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    fuck
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Bank
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    bnk
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
  )
}