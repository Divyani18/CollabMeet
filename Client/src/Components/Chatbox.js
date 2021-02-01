import React from "react";
import { Box, Container, Card, Avatar, Typography, ButtonGroup, Button} from "@material-ui/core";
import orange from '@material-ui/core/colors/orange';
import red from "@material-ui/core/colors/red";
import TextField from '@material-ui/core/TextField';
import {w3cwebsocket as W3CWebSocket} from "websocket"

const client = new W3CWebSocket(process.env.URL || 'ws://127.0.0.1:4000');

var verified = 0;

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            messages: [],
            user : "",
            count : "",
            callId : ""
        }

        this.getUserName = this.getUserName.bind(this);
        this.enteredText = this.enteredText.bind(this);
        this.joinedCall = this.joinedCall.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount() {
        client.onopen = () => {
          console.log("Client connected to server...");
        }
    
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);

          if(dataFromServer.sentCode === this.state.callId)
          {
            console.log(dataFromServer.sentCode, "verified", verified);
            verified = 1;
          }
          if (dataFromServer.type === "message" && verified) {
            this.setState((state) => {
              console.log("Got reply", dataFromServer);
              return (
                {
                  messages: [...state.messages,
                  {
                    msg: dataFromServer.msg,
                    user: dataFromServer.user,
                    count: dataFromServer.count
                  }]
                }
              )
            }
            );
          }
        }
      }
    
    enteredText(event) {
        this.setState(() => {
            return {
                text : event.target.value}
        })
    }
    
    onButtonClick() {

      if(verified) {

        client.send(JSON.stringify({
          type: "message",
          msg: this.state.text,
          user: this.state.user,
          count: this.state.count + 1
        }))

      }


    }

    getUserName(event) {
        this.setState(() => {
            return {
                user : event.target.value}
        })


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
        return (
            <Container>
                {this.props.callEnded ? this.endCall() : console.log("On call")}

                <Box display="flex" flexDirection="row">
                  <input style={{height: "37px", flexGrow: 1}} onChange={this.getUserName} placeholder="Enter username before chat..." />
                  <ButtonGroup style={{flexGrow: 0.1}} color="secondary" aria-label="outlined secondary button group">
                      <Button onClick={this.joinedCall(this.props.callId)}>Submit</Button>
                  </ButtonGroup>

                </Box>
                
                <Box display="flex" flexDirection="column" bgcolor={orange[50]}>
                    <Box flexGrow={1} py={0.2} px={1} bgcolor="rgb(0,0,0)" color="green"><h4>ChatBox</h4></Box>
                    <div style={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "auto"}}>
                        
                        {this.state.messages.map(message => 
                            <Box key={message.msg} style={{display: "flex", flexDirection: "row", justifyContent: this.state.user === message.user? "flex-end" : "flex-start"}}>

                                <Card style={{padding: "10px", margin: "5px"}}>
                                  <Box display="flex" flexDirection="row"><Avatar style={{backgroundColor : red[700]}}>{message.user[0]}</Avatar><Box px={0.5} py={1}><strong> {message.user} : </strong></Box></Box>
                                  <div><Typography variant="body2" gutterBottom>{message.msg}</Typography></div>
                                </Card>
                                
                            </Box>)
                        
                        }
                        
                    </div>

                    <Box flexgrow={2} alignitem="flex-end" display="flex" flexDirection="row" my={2}>
                        <TextField onChange={this.enteredText} id="outlined-basic" label="Type a message..." variant="outlined" style={{width: "75%"}}/>
                        <button onClick={this.onButtonClick} style={{width: "25%"}}>Send</button>
                    </Box>
                    
                </Box>

            </Container>)
    }
   
}

export default Chatbox;