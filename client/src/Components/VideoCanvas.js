import React from "react";
import { Box, Button, ButtonGroup, Grid} from "@material-ui/core";

import {w3cwebsocket as W3CWebSocket} from "websocket"

const signaling = new W3CWebSocket(process.env.REACT_APP_URL);

const constraints = {audio: true, video: true};

const iceConfiguration = { }
iceConfiguration.iceServers = [];

//stun server
iceConfiguration.iceServers.push({
    urls:  "stun:stun.l.google.com:19302"
 })    
   
const pc = new RTCPeerConnection(iceConfiguration);


// Once remote track media arrives, show it in remote video element.
pc.ontrack = async (event) => {
  
  console.log("Called")
  var remoteViews = document.getElementsByClassName("remoteVideo");

  console.log("remoteViewSet");

  // Don't set srcObject again if it is already set.
  if(remoteViews[0].srcObject) return;

  remoteViews[0].srcObject = event.streams[0];
  console.log("sourceObjectSet", event.streams[0]);
  
};


class VideoCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            callInfo: "",
            callId: "",
            participantId: "",
            isClicked: 0
        }

        this.joinedCall = this.joinedCall.bind(this);
        this.start = this.start.bind(this);

    }

    componentDidMount() {

      // Send any ice candidatCheck these out:es to the other peer.
      pc.onicecandidate = ({candidate}) => {
        console.log(JSON.stringify({candidate}));
        console.log("i'm a candidate");
        signaling.send(JSON.stringify({candidate}));
        
      }

        signaling.onmessage = async (message) => {
          try {

            console.log("hey1");
            var dataFromServer = JSON.parse(message.data);
            console.log("Received description:", dataFromServer);

            if(dataFromServer.sentCode && this.state.callInfo === "C")
            {
              console.log("participantId set")
               this.setState(() => {
                 return {
                   participantId: dataFromServer.sentCode
                 }
               })

               console.log("caller's id", this.state.callId);
               console.log("participant's id", this.state.participantId);

               if(this.state.participantId === this.state.callId)
               {
                  console.log("Verification done!")
                  pc.onnegotiationneeded = await this.offerCreator();
               }
               
            }              
            else if (!dataFromServer.candidate) {
              //If you get an offer, you need to reply with an answer.
        
              if (dataFromServer.desc.type === 'offer' && this.state.callInfo !== "C") {
                this.setState(() => {
                  return {
                    callInfo : "R"
                  }
                  
                })

                console.log("hey1.1");
                console.log("Remote desc",dataFromServer.desc);
                await pc.setRemoteDescription(dataFromServer.desc);
                
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                var selfView = document.getElementById("localVideo");

                stream.getTracks().forEach((track) =>
                  pc.addTrack(track, stream));
        
                selfView.srcObject = stream;

                await pc.setLocalDescription(await pc.createAnswer());
                signaling.send(JSON.stringify({desc: pc.localDescription}));

                //}
        
              } else if (dataFromServer.desc.type === 'answer' && this.state.callInfo === "C") {
                console.log("hey1.2");

                await pc.setRemoteDescription(dataFromServer.desc);
                console.log("Remote desc after recieving the answer",dataFromServer.desc);
        
              } else {
                console.log('Unsupported SDP type.');
              }

            }
            else if (dataFromServer.candidate) {
               await pc.addIceCandidate(dataFromServer.candidate);
               console.log("hey2");
            }

          } catch (err) {
            console.error("ERROR:",err);
            console.log("hey3");
          }
        };
      
    };

    joinedCall(id) {
      
      try{
        console.log("From joinedCall",id);
        this.state.callId = id;
        /*this.setState(() => {
          return {
            callId : id
          }
        })*/

        console.log("From joinedCall",this.state.callId);

        signaling.send(JSON.stringify({sentCode: this.state.callId}));
        console.log(JSON.stringify({sentCode: this.state.callId}));
  
      }catch (err) {
        console.error("ERROR From joinedCall:",err);

      }
      

    }

    async offerCreator() {
      try {   

          await pc.setLocalDescription(await pc.createOffer());

          // Send the offer to the other peer.
          signaling.send(JSON.stringify({desc: pc.localDescription}));
          console.log(JSON.stringify({desc: pc.localDescription}));
    
      
      } catch (err) {
          console.error(err);
      }
  
    }

    // Call start() to initiate.
    async start(id) {
      try {
        // Get local stream, show it in self-view, and add it to be sent.
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        var selfView = document.getElementById("localVideo");
        
        stream.getTracks().forEach((track) =>
          pc.addTrack(track, stream));
        
        selfView.srcObject = stream;
        console.log("Caller Stream", stream);

        this.setState(() => {
          return {
            callInfo : "C",
            callId : id
          }
          
        })
        
        console.log("Caller's info set",this.state.callId);

      } catch (err) {
        console.error(err);
      }
    }

    closeVideoCall() {
      var remoteViews = document.getElementsByClassName("remoteVideo");
      var selfView = document.getElementById("localVideo");
    
      if (pc) {
        pc.ontrack = null;
        pc.onremovetrack = null;
        pc.onremovestream = null;
        pc.onicecandidate = null;
        pc.oniceconnectionstatechange = null;
        pc.onsignalingstatechange = null;
        pc.onicegatheringstatechange = null;
        pc.onnegotiationneeded = null;
    
        if (remoteViews[0].srcObject) {
          remoteViews[0].srcObject.getTracks().forEach(track => track.stop());
        }
    
        if (selfView.srcObject) {
          selfView.srcObject.getTracks().forEach(track => track.stop());
        }
    
        pc.close();

      }
    
      remoteViews[0].removeAttribute("src");
      remoteViews[0].removeAttribute("srcObject");
      selfView.removeAttribute("src");
      remoteViews[0].removeAttribute("srcObject");
    
    }

    render() {

        return (
            <Box>
              {this.props.callEnded ? this.closeVideoCall() : console.log("On call")}

              <Box p={2}>   
                  <ButtonGroup color="secondary" aria-label="outlined secondary button group" >
                    <Button onClick={this.props.callInfo === "C"? () => this.start(this.props.callId) : () => {this.joinedCall(this.props.callId)}}>
                      Video call
                    </Button>
                  </ButtonGroup>
              </Box>
              
                <Grid container style={{justifyContent: "space-around"}}>
                  <Grid item style={{flexWrap: "wrap", margin: "20px", backgroundColor: "rgb(0,0,0)", height: "250px", width: "250px"}}>
                    <video id="localVideo" autoPlay style={{height: "200px", width: "250px"}}></video>
                  </Grid>
                  
                  <Grid item style={{flexWrap: "wrap", margin: "20px", backgroundColor: "rgb(0,0,0)", height: "250px", width: "250px"}}>
                    <video className="remoteVideo" autoPlay muted style={{height: "200px", width: "250px"}}></video>
                  </Grid> 
                </Grid>  
            </Box>
        )
        
    }
}

export default VideoCanvas;