import React from "react";
import { Box, Grid } from "@material-ui/core";
import deepPurple from '@material-ui/core/colors/deepPurple';
import logo from '../logo.png'

function About() {
    return (
        <Box p={3} bgcolor="rgba(0,0,0,0.8)">
            <Grid container>
                <Grid item xs={12} md={8}>
                    <p style={{color: deepPurple[100]}}><b>About</b></p>
                    <p style={{color: deepPurple[300], fontSize: "18px", lineHeight: 1.8, paddingRight: "50px"}}>
                        CollabMeet is a real-time collaboration-cum-communication application that enables users to leverage features like shared whiteboard(users on both ends of call can write on it and it'll be shared to the other end in real-time), chat and video-call.
                    </p>
                </Grid>
               
                <Grid item xs={12} md={4}>
                    <img src={logo} alt="CollabMeet" style={{height: "400px", width: "400px"}}></img>
                </Grid>
                
            </Grid>
        </Box>   
       
    )
}

export default About;