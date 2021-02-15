import React from "react";
import { Box, Grid } from "@material-ui/core";
import deepPurple from '@material-ui/core/colors/deepPurple';

function HowItWorks() {
    return (
        <Box p={3} bgcolor="rgba(0,0,0,0.8)">
            <Grid container>
                <Grid item xs={12} md={8}>
                    <p style={{color: deepPurple[50]}}><b>How it works?</b></p>
                    <p style={{color: deepPurple[300], fontSize: "18px", lineHeight: 1.8, paddingRight: "50px"}}>
                        <b style={{color: deepPurple[100]}}>Steps to get started:</b>
                        <ul>
                            <li>
                                In order to start a meeting, the user needs to generate a meeting code and then click <b><i>"Call"</i></b> button.
                                By clicking the "Call" button, you have initiated the call, upon which you become the admin for the call session.
                            </li>
                            <li>
                                Now, you need to share the meeting code to the user you want to connect to.
                            </li>
                            <li>
                                The second user needs to input this meeting code and click <b><i>"Join"</i></b> button.
                            </li>
                            <li>
                                Both the users can now start using the <b><i>"WhiteBoard"</i></b> and <b><i>"ChatBox"</i></b>. Make sure you enter a username before starting to chat.
                            </li>
                            <li>
                                During the call, only the admin can initiate a video conference by clicking onto <b><i>"Video Call"</i></b> button. The other participant also needs to click on this button once the video conference has been initiated.
                            </li>
                            <li>
                                To end the meeting, each of the participants need to click <b><i>"End"</i></b> button.
                            </li>
                            <p><b><i>NOTE:</i></b> As per current functionality, you cannot mute video once you have started video call.</p>
                        </ul>
                    </p>
                </Grid>
                
            </Grid>
        </Box> 
    )
}

export default HowItWorks;