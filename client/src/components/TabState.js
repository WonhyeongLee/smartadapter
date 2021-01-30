import React from 'react';
import './TabState.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({

//     paper: {
//         textAlign: 'center',
//         height: 340,
//         width: 300,
//     },
//     control: {
//       padding: theme.spacing(2),
//     },
//   }));

function TabState() {
    // const classes = useStyles();

        return(
            <div class="container">
	            <div class="grid-tab1"></div>
	            <div class="grid-tab2"></div>
	            <div class="grid-tab3"></div>
	            <div class="grid-state-chart"></div>
            </div>
        )
    }

export default TabState;