import React from "react";
import p5 from "p5"
import { Box, Button, Container, ButtonGroup} from "@material-ui/core";

import {w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket(process.env.REACT_APP_URL);

var msg = [];
var isReceived = 0;
var verified = 0;

class WhiteBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            callId: "",
        }

        this.myRef = React.createRef();
    }

    joinedCall(id) {
        this.state.callId = id;
    }

    endCall() {
        client.close(1000, () => {
          console.log("Call has been ended."); 
        })
    }

    Sketch = (p) => {

            p.setup = () => {
                var sketchWidth;
                var sketchHeight;
        
                sketchWidth = document.getElementById("board").offsetWidth;
                sketchHeight=400;
                p.createCanvas(sketchWidth, sketchHeight);
                p.background(255,255,255);
            }
        
   
        p.draw = () => {
            if(verified) {
                p.noStroke();
                p.fill(0,0,255);
                
                if(p.mouseIsPressed)
                {
                    p.ellipse(p.mouseX,p.mouseY,5,5);
                    this.mouseDragged(p);
                    
                }    
    
                if(isReceived) {
    
                    msg.map((message) => {
                        return(
                            p.ellipse(message.x,message.y,5,5));            
                    })
                    
                }
            }
        }
     }
   

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current);

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

    }

    mouseDragged = (p5) => {

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

    render() {
        
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
            
                <Box ref={this.myRef} id="board" >

                </Box>
                
            </Container>

        );
    }
}

export default WhiteBoard;