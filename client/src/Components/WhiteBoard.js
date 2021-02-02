import React from "react";
import Sketch from "react-p5";
import { Box, Button, Container, ButtonGroup} from "@material-ui/core";

import {w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket(process.env.URL);

var msg = [];
var isReceived = 0;
var verified = 0;
var sketchWidth;
var sketchHeight;


class WhiteBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            callId: "",
        }
    }

    joinedCall(id) {
        this.state.callId = id;
    }

    endCall() {
        client.close(1000, () => {
          console.log("Call has been ended."); 
        })
      }

    render() {
        
        const setup = (p5, canvasParentRef) => {
            sketchWidth = document.getElementById("board").offsetWidth;
            sketchHeight=400;
            p5.createCanvas(sketchWidth, sketchHeight).parent(canvasParentRef);
            p5.background(255,255,255);
        }

        const mouseDragged = (p5) => {

            if(verified) {
                console.log("Sending..."+ p5.mouseX + ", " + p5.mouseY);

                var data = {
                    x: p5.mouseX,
                    y: p5.mouseY,
                    type: "coordinates",
                
                }

                client.send(JSON.stringify(data));
            }
            
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log("Got reply", dataFromServer);

            if(dataFromServer.sentCode === this.state.callId)
            {
                verified = 1;
            }
            else if (dataFromServer.type === "coordinates" && verified) {
                isReceived = 1;
                msg = [...msg,{
                    x: dataFromServer.x,
                    y: dataFromServer.y
                }]

            }
            else
            {
                isReceived = 0;
            }
        }

        const draw = (p5) => {

            if(verified) {
                p5.noStroke();
                p5.fill(0,0,255);
                
                if(p5.mouseIsPressed)
                {
                    p5.ellipse(p5.mouseX,p5.mouseY,5,5);
                    mouseDragged(p5);
                    
                }    

                if(isReceived) {

                    msg.map((message) => {
                        return(
                            p5.ellipse(message.x,message.y,5,5));            
                    })
                    
                }
            }
                
        }

        return (

            <Container>
                {this.props.callEnded ? this.endCall() : console.log("On call")}

                <Box display="flex" flexDirection="row" bgcolor="rgb(0,0,0)" color="green">
                    <Box flexGrow={2}>
                        <p>WhiteBoard</p>
                    </Box>

                    <Box display="flex" flexGrow={0.1} styles={{justifyContent: "flex-end"}}>
                        <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                            <Button color="secondary" onClick={this.joinedCall(this.props.callId)}>Pen</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            
                <Box id="board" >
                    <Sketch setup={setup} draw={draw} />
                </Box>
            </Container>

        );
    }
}

export default WhiteBoard;