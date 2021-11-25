import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@material-ui/core';
import Container from '@mui/material/Container';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
const AdminDashboard = () => {
    return (
        <div className="main-container-1">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} >
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                                mt:1,
                                ml:1
                            }}
                        >
                            <Doughnut
                                const data={{
                                    labels: [
                                        'Physician',
                                        'Patient',
                                        'Appointments',
                                    
                                    ],
                                    datasets: [{
                                        label: 'My First Dataset',
                                        data: [40, 100,120],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 205, 86)'
                                        ],
                                        hoverOffset: 4
                                    }]
                                }}
                                height={200}
                                width={200}
                                margin-top={5}
                                options={{ maintainAspectRatio: false, }}>

                            </Doughnut>
                        </Paper>
                        </Grid>
                        <Grid item xs={12} md={2} >
                        {/* <center> */}
                        <Paper className="card"
                            sx={{
                                // p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 200,
                                mt:6
                            }}
                        > 
                        <h3 className="cardTitle">Patient Count
                        </h3>   
                        <center>
                            <h1 className="count">40</h1>
                            </center>   
                          
                        </Paper>
                        </Grid>
                        <Grid item xs={12} md={2} >
                        <Paper className="card"
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 200,
                                mt:6
                            }}
                        > 
                         <h3 className="cardTitle">Physician Count
                        </h3>   
                        <h1 className="count">40</h1>
                        </Paper>
                        </Grid>
                        <Grid item xs={12} md={2} >
                        {/* <center> */}
                        <Paper className="card"
                            sx={{
                                // p: 2,
                                // display: 'flex',
                                // flexDirection: 'column',
                                height: 200,
                                mt:6
                            }}
                        >      
                           <h3 className="cardTitle">Appointments
                        </h3>   
                        <center>
                            <h1 className="count">120</h1>
                            </center>  
                        </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column',ml:1 }}>
                                <Bar const data={{
                                    labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                                    datasets: [{
                                        label: 'Patient visits',
                                        data: [65, 59, 80, 81, 56, 55, 40],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(201, 203, 207, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(54, 162, 235)',
                                            'rgb(153, 102, 255)',
                                            'rgb(201, 203, 207)'
                                        ],
                                        borderWidth: 1,
                                        barPercentage: 0.4,
                                    }]
                                }}>

                                </Bar>
                            </Paper>
                        </Grid>

                </Grid>
        </div>
    )
}
export default AdminDashboard;