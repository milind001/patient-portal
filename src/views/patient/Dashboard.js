
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@material-ui/core';
import Container from '@mui/material/Container';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PatientDashboard = () => {
  return (
    <div className="main-container-1">

      <Grid container spacing={3}>

        <Grid item xs={12} md={4} >
          <div className="card">
            <p className="cardTitle">Lab reports</p>

            <p className="count">10</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4} >
          <div className="card">
            <p className="cardTitle">My Visits</p>

            <p className="count">10</p>
          </div>
        </Grid> <Grid item xs={12} md={4} >
          <div className="card">
            <p className="cardTitle">Upcomming Appointments</p>

            <p className="count">2</p>
          </div>
        </Grid>

        <Grid item xs={12} md={12}>
          <div className="card">
            <Bar const data={{
              labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
              datasets: [
                {
                  label: 'My Visits',
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
                }

              ]
            }}
            >
              height={100}
              width={1500}
            </Bar>
          </div>
        </Grid>

      </Grid>


    </div>
  )
}
export default PatientDashboard;