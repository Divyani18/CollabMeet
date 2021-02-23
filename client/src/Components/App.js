import React from "react";
import "../App.css"
import NavBar from "./NavBar.js";
import WhiteBoard from "./WhiteBoard.js";
import Chatbox from "./Chatbox.js";
import { Box, Grid, Button, ButtonGroup} from "@material-ui/core";
import VideoCanvas from "./VideoCanvas";
import {w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket(process.env.REACT_APP_URL);

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      callId : "",
      callInfo : "",
      callEnded : 0
    }

    this.generateCode = this.generateCode.bind(this);
    this.enteredText = this.enteredText.bind(this);
    this.joinCall = this.joinCall.bind(this);
    this.isCaller = this.isCaller.bind(this);
    this.endCall = this.endCall.bind(this);

  }

  generateCode() {
    const id = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    } 

    this.setState(() => {
      return {
        callId : id() + id() + "-" + id()
      }
    });
      
  }

  enteredText(event) {
    this.setState(() => {
        return {
          callId : event.target.value
        }
    })
  }

  joinCall() {
    client.send(JSON.stringify({sentCode: this.state.callId}));
    console.log(JSON.stringify({sentCode: this.state.callId}));

  }

  isCaller() {
    this.setState(() => {
      return {
        callInfo : "C"
      }
    })
  }

  endCall() {
    client.close(1000, () => {
      console.log("Call has been ended.");
    })

    this.setState(() => {
      return {
        callEnded : 1
      }
    })

  }

  render() {

    return (
      <div>
        <Grid>
          <NavBar /> 
        </Grid>
        
          <Grid container>
            <Box style={{margin: "20px"}}>
              <ButtonGroup  color="secondary" aria-label="outlined secondary button group">
                <Button onClick={this.generateCode}>Generate meeting code</Button>

              </ButtonGroup>

              <input placeholder="Enter meeting code..."  style={{height: "37px", width: "230px"}} onChange={this.enteredText} value={this.state.callId} />

              <ButtonGroup  color="secondary" aria-label="outlined secondary button group">
                <Button onClick={this.joinCall}>Join</Button>
                <Button onClick={this.isCaller}>Call</Button>
                <Button onClick={this.endCall}>End</Button>
              </ButtonGroup>
            </Box>

          </Grid>

         <Grid container>
            <Grid item xs={12} md={8} py={2} style={{marginBottom: "50px"}}> 
              <WhiteBoard callId={this.state.callId} callEnded={this.state.callEnded} />
            </Grid>
    
            <Grid item xs={12} md={4} py={2} style={{marginBottom: "50px"}}>
              <Chatbox callId={this.state.callId} callEnded={this.state.callEnded} />
            </Grid>

          </Grid>

          <Grid container style={{justifyContent: "center"}}>
            <Grid item>
              <VideoCanvas callId={this.state.callId} callInfo={this.state.callInfo} callEnded={this.state.callEnded} />
            </Grid>
              
          </Grid>
        
      </div>
    )
  }
}

export default App;