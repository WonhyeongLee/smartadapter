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
	            <div class="grid-tab1"> 
                    <div className="tab-box">
                        <span className="tab-style">TAB1</span><br></br>
                        <button className="fas fa-power-off fa-5x tab-button-style"></button> 
                    </div>
                </div>
	            <div class="grid-tab2"> 
                    <div className="tab-box">
                        <span className="tab-style">TAB2</span><br></br>
                        <button className="fas fa-power-off fa-5x tab-button-style"></button> 
                    </div>
                </div>
               <div className="grid-tab3">
                    <div className="tab-box">
                        <span className="tab-style">TAB3</span><br></br>
                        <button className="fas fa-power-off fa-5x tab-button-style"></button> 
                    </div>
               </div>
               <div className="grid-state-chart">
                    ----chart----
               </div>
            </div>
        )
    }

export default TabState;