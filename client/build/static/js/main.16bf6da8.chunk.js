(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{78:function(e,t,a){e.exports=a(98)},83:function(e,t,a){},84:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(10),r=a.n(o),c=(a(83),a(18)),s=a(19),i=a(25),d=a(20),u=a(26),m=a(9),f=(a(84),a(66)),p=a(33),g=a(128),h=a(138),b=a(130),y=a(131),x=a(65),C=a(139),E=a(103),v=a(60),k=a.n(v),j=a(61),O=a.n(j);var w=function(){var e=Object(p.a)(),t=Object(g.a)(e.breakpoints.down("sm")),a=l.a.useState(null),n=Object(f.a)(a,2),o=n[0],r=n[1],c=function(){r(null)};return l.a.createElement(h.a,{display:"flex",flexDirection:"row",bgcolor:"rgba(0,0,0,0.8)",color:k.a[900],p:2},l.a.createElement(h.a,{display:"flex",flexDirection:"row",alignItems:"center"},l.a.createElement(b.a,null,"CollabMeet")),t?l.a.createElement(h.a,{flexGrow:2,display:"flex",flexDirection:"row",justifyContent:"flex-end"},l.a.createElement("div",null,l.a.createElement(y.a,{color:"inherit","aria-label":"menu","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},l.a.createElement(O.a,null)),l.a.createElement(x.a,{id:"simple-menu",anchorEl:o,keepMounted:!0,open:Boolean(o),onClose:c},l.a.createElement(C.a,{onClick:c},"About"),l.a.createElement(C.a,{onClick:c},"Get Started")))):l.a.createElement(h.a,{flexGrow:2,display:"flex",flexDirection:"row",justifyContent:"flex-end"},l.a.createElement(E.a,{color:"inherit"},"About"),l.a.createElement(E.a,{color:"inherit"},"Get Started")))},I=a(51),S=a(62),D=a.n(S),N=a(132),B=a(133),J=a(24),R=new J.w3cwebsocket("wss://collabmeet.herokuapp.com/socketserver"),T=[],G=0,V=0,M=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).Sketch=function(e){e.setup=function(){var t;t=document.getElementById("board").offsetWidth,e.createCanvas(t,400),e.background(255,255,255)},e.draw=function(){V&&(e.noStroke(),e.fill(0,0,255),e.mouseIsPressed&&(e.ellipse(e.mouseX,e.mouseY,5,5),a.mouseDragged(e)),G&&T.map(function(t){return e.ellipse(t.x,t.y,5,5)}))}},a.mouseDragged=function(e){if(V){console.log("Sending..."+e.mouseX+", "+e.mouseY);var t={x:e.mouseX,y:e.mouseY,type:"coordinates"};R.send(JSON.stringify(t))}},a.state={data:"",callId:""},a.myRef=l.a.createRef(),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"joinedCall",value:function(e){this.state.callId=e}},{key:"endCall",value:function(){R.close(1e3,function(){console.log("Call has been ended.")})}},{key:"componentDidMount",value:function(){var e=this;this.myP5=new D.a(this.Sketch,this.myRef.current),R.onmessage=function(t){var a=JSON.parse(t.data);console.log("Got reply",a),a.sentCode===e.state.callId?V=1:"coordinates"===a.type&&V?(G=1,T=[].concat(Object(I.a)(T),[{x:a.x,y:a.y}])):G=0}}},{key:"render",value:function(){return l.a.createElement(N.a,null,this.props.callEnded?this.endCall():console.log("On call"),l.a.createElement(h.a,{display:"flex",flexDirection:"row",bgcolor:"rgb(0,0,0)",color:"green"},l.a.createElement(h.a,{flexGrow:2},l.a.createElement("p",null,"WhiteBoard")),l.a.createElement(h.a,{display:"flex",flexGrow:.1,styles:{justifyContent:"flex-end"}},l.a.createElement(B.a,{color:"secondary","aria-label":"outlined secondary button group"},l.a.createElement(E.a,{color:"secondary",onClick:this.joinedCall(this.props.callId)},"Pen")))),l.a.createElement(h.a,{ref:this.myRef,id:"board"}))}}]),t}(l.a.Component),A=a(134),P=a(140),U=a(63),W=a.n(U),F=a(64),X=a.n(F),Y=a(137),L=new J.w3cwebsocket("wss://collabmeet.herokuapp.com/socketserver"),q=0,z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={text:"",messages:[],user:"",count:"",callId:""},a.getUserName=a.getUserName.bind(Object(m.a)(Object(m.a)(a))),a.enteredText=a.enteredText.bind(Object(m.a)(Object(m.a)(a))),a.joinedCall=a.joinedCall.bind(Object(m.a)(Object(m.a)(a))),a.onButtonClick=a.onButtonClick.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;L.onopen=function(){console.log("Client connected to server...")},L.onmessage=function(t){var a=JSON.parse(t.data);a.sentCode===e.state.callId&&(console.log(a.sentCode,"verified",q),q=1),"message"===a.type&&q&&e.setState(function(e){return console.log("Got reply",a),{messages:[].concat(Object(I.a)(e.messages),[{msg:a.msg,user:a.user,count:a.count}])}})}}},{key:"enteredText",value:function(e){this.setState(function(){return{text:e.target.value}})}},{key:"onButtonClick",value:function(){q&&L.send(JSON.stringify({type:"message",msg:this.state.text,user:this.state.user,count:this.state.count+1}))}},{key:"getUserName",value:function(e){this.setState(function(){return{user:e.target.value}})}},{key:"joinedCall",value:function(e){this.state.callId=e}},{key:"endCall",value:function(){L.close(1e3,function(){console.log("Call has been ended.")})}},{key:"render",value:function(){var e=this;return l.a.createElement(N.a,null,this.props.callEnded?this.endCall():console.log("On call"),l.a.createElement(h.a,{display:"flex",flexDirection:"row"},l.a.createElement("input",{style:{height:"37px",flexGrow:1},onChange:this.getUserName,placeholder:"Enter username before chat..."}),l.a.createElement(B.a,{style:{flexGrow:.1},color:"secondary","aria-label":"outlined secondary button group"},l.a.createElement(E.a,{onClick:this.joinedCall(this.props.callId)},"Submit"))),l.a.createElement(h.a,{display:"flex",flexDirection:"column",bgcolor:W.a[50]},l.a.createElement(h.a,{flexGrow:1,py:.2,px:1,bgcolor:"rgb(0,0,0)",color:"green"},l.a.createElement("h4",null,"ChatBox")),l.a.createElement("div",{style:{width:"100%",height:"250px",display:"flex",flexDirection:"column",justifyContent:"flex-start",overflow:"auto"}},this.state.messages.map(function(t){return l.a.createElement(h.a,{key:t.msg,style:{display:"flex",flexDirection:"row",justifyContent:e.state.user===t.user?"flex-end":"flex-start"}},l.a.createElement(A.a,{style:{padding:"10px",margin:"5px"}},l.a.createElement(h.a,{display:"flex",flexDirection:"row"},l.a.createElement(P.a,{style:{backgroundColor:X.a[700]}},t.user[0]),l.a.createElement(h.a,{px:.5,py:1},l.a.createElement("strong",null," ",t.user," : "))),l.a.createElement("div",null,l.a.createElement(b.a,{variant:"body2",gutterBottom:!0},t.msg))))})),l.a.createElement(h.a,{flexgrow:2,alignitem:"flex-end",display:"flex",flexDirection:"row",my:2},l.a.createElement(Y.a,{onChange:this.enteredText,id:"outlined-basic",label:"Type a message...",variant:"outlined",style:{width:"75%"}}),l.a.createElement("button",{onClick:this.onButtonClick,style:{width:"25%"}},"Send"))))}}]),t}(l.a.Component),H=a(135),K=a(17),Q=a.n(K),Z=a(43),$=new J.w3cwebsocket("wss://collabmeet.herokuapp.com/socketserver"),_={audio:!0,video:!0},ee={iceServers:[]};ee.iceServers.push({urls:"stun:stun.l.google.com:19302"});var te=new RTCPeerConnection(ee);te.ontrack=function(){var e=Object(Z.a)(Q.a.mark(function e(t){var a;return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Called"),a=document.getElementsByClassName("remoteVideo"),console.log("remoteViewSet"),!a[0].srcObject){e.next=5;break}return e.abrupt("return");case 5:a[0].srcObject=t.streams[0],console.log("sourceObjectSet",t.streams[0]);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();var ae=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={callInfo:"",callId:"",participantId:"",isClicked:0},a.joinedCall=a.joinedCall.bind(Object(m.a)(Object(m.a)(a))),a.start=a.start.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;te.onicecandidate=function(e){var t=e.candidate;console.log(JSON.stringify({candidate:t})),console.log("i'm a candidate"),$.send(JSON.stringify({candidate:t}))},$.onmessage=function(){var t=Object(Z.a)(Q.a.mark(function t(a){var n,l,o;return Q.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,console.log("hey1"),n=JSON.parse(a.data),console.log("Received description:",n),!n.sentCode||"C"!==e.state.callInfo){t.next=16;break}if(console.log("participantId set"),e.setState(function(){return{participantId:n.sentCode}}),console.log("caller's id",e.state.callId),console.log("participant's id",e.state.participantId),e.state.participantId!==e.state.callId){t.next=14;break}return console.log("Verification done!"),t.next=13,e.offerCreator();case 13:te.onnegotiationneeded=t.sent;case 14:t.next=52;break;case 16:if(n.candidate){t.next=48;break}if("offer"!==n.desc.type||"C"===e.state.callInfo){t.next=38;break}return e.setState(function(){return{callInfo:"R"}}),console.log("hey1.1"),console.log("Remote desc",n.desc),t.next=23,te.setRemoteDescription(n.desc);case 23:return t.next=25,navigator.mediaDevices.getUserMedia(_);case 25:return l=t.sent,o=document.getElementById("localVideo"),l.getTracks().forEach(function(e){return te.addTrack(e,l)}),o.srcObject=l,t.t0=te,t.next=32,te.createAnswer();case 32:return t.t1=t.sent,t.next=35,t.t0.setLocalDescription.call(t.t0,t.t1);case 35:$.send(JSON.stringify({desc:te.localDescription})),t.next=46;break;case 38:if("answer"!==n.desc.type||"C"!==e.state.callInfo){t.next=45;break}return console.log("hey1.2"),t.next=42,te.setRemoteDescription(n.desc);case 42:console.log("Remote desc after recieving the answer",n.desc),t.next=46;break;case 45:console.log("Unsupported SDP type.");case 46:t.next=52;break;case 48:if(!n.candidate){t.next=52;break}return t.next=51,te.addIceCandidate(n.candidate);case 51:console.log("hey2");case 52:t.next=58;break;case 54:t.prev=54,t.t2=t.catch(0),console.error("ERROR:",t.t2),console.log("hey3");case 58:case"end":return t.stop()}},t,null,[[0,54]])}));return function(e){return t.apply(this,arguments)}}()}},{key:"joinedCall",value:function(e){try{console.log("From joinedCall",e),this.state.callId=e,console.log("From joinedCall",this.state.callId),$.send(JSON.stringify({sentCode:this.state.callId})),console.log(JSON.stringify({sentCode:this.state.callId}))}catch(t){console.error("ERROR From joinedCall:",t)}}},{key:"offerCreator",value:function(){var e=Object(Z.a)(Q.a.mark(function e(){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=te,e.next=4,te.createOffer();case 4:return e.t1=e.sent,e.next=7,e.t0.setLocalDescription.call(e.t0,e.t1);case 7:$.send(JSON.stringify({desc:te.localDescription})),console.log(JSON.stringify({desc:te.localDescription})),e.next=14;break;case 11:e.prev=11,e.t2=e.catch(0),console.error(e.t2);case 14:case"end":return e.stop()}},e,null,[[0,11]])}));return function(){return e.apply(this,arguments)}}()},{key:"start",value:function(){var e=Object(Z.a)(Q.a.mark(function e(t){var a,n;return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia(_);case 3:a=e.sent,n=document.getElementById("localVideo"),a.getTracks().forEach(function(e){return te.addTrack(e,a)}),n.srcObject=a,console.log("Caller Stream",a),this.setState(function(){return{callInfo:"C",callId:t}}),console.log("Caller's info set",this.state.callId),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:case"end":return e.stop()}},e,this,[[0,12]])}));return function(t){return e.apply(this,arguments)}}()},{key:"closeVideoCall",value:function(){var e=document.getElementsByClassName("remoteVideo"),t=document.getElementById("localVideo");te&&(te.ontrack=null,te.onremovetrack=null,te.onremovestream=null,te.onicecandidate=null,te.oniceconnectionstatechange=null,te.onsignalingstatechange=null,te.onicegatheringstatechange=null,te.onnegotiationneeded=null,e[0].srcObject&&e[0].srcObject.getTracks().forEach(function(e){return e.stop()}),t.srcObject&&t.srcObject.getTracks().forEach(function(e){return e.stop()}),te.close()),e[0].removeAttribute("src"),e[0].removeAttribute("srcObject"),t.removeAttribute("src"),e[0].removeAttribute("srcObject")}},{key:"render",value:function(){var e=this;return l.a.createElement(h.a,null,this.props.callEnded?this.closeVideoCall():console.log("On call"),l.a.createElement(h.a,{p:2},l.a.createElement(B.a,{color:"secondary","aria-label":"outlined secondary button group"},l.a.createElement(E.a,{onClick:"C"===this.props.callInfo?function(){return e.start(e.props.callId)}:function(){e.joinedCall(e.props.callId)}},"Video call"))),l.a.createElement(H.a,{container:!0,style:{justifyContent:"space-around"}},l.a.createElement(H.a,{item:!0,style:{flexWrap:"wrap",margin:"20px",backgroundColor:"rgb(0,0,0)",height:"250px",width:"250px"}},l.a.createElement("video",{id:"localVideo",autoPlay:!0,style:{height:"200px",width:"250px"}})),l.a.createElement(H.a,{item:!0,style:{flexWrap:"wrap",margin:"20px",backgroundColor:"rgb(0,0,0)",height:"250px",width:"250px"}},l.a.createElement("video",{className:"remoteVideo",autoPlay:!0,muted:!0,style:{height:"200px",width:"250px"}}))))}}]),t}(l.a.Component),ne=new J.w3cwebsocket("wss://collabmeet.herokuapp.com/socketserver"),le=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).state={callId:"",callInfo:"",callEnded:0},e.generateCode=e.generateCode.bind(Object(m.a)(Object(m.a)(e))),e.enteredText=e.enteredText.bind(Object(m.a)(Object(m.a)(e))),e.joinCall=e.joinCall.bind(Object(m.a)(Object(m.a)(e))),e.isCaller=e.isCaller.bind(Object(m.a)(Object(m.a)(e))),e.endCall=e.endCall.bind(Object(m.a)(Object(m.a)(e))),e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"generateCode",value:function(){var e=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};this.setState(function(){return{callId:e()+e()+"-"+e()}})}},{key:"enteredText",value:function(e){this.setState(function(){return{callId:e.target.value}})}},{key:"joinCall",value:function(){ne.send(JSON.stringify({sentCode:this.state.callId})),console.log(JSON.stringify({sentCode:this.state.callId}))}},{key:"isCaller",value:function(){this.setState(function(){return{callInfo:"C"}})}},{key:"endCall",value:function(){ne.close(1e3,function(){console.log("Call has been ended.")}),this.setState(function(){return{callEnded:1}})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(H.a,null,l.a.createElement(w,null)),l.a.createElement(H.a,{container:!0},l.a.createElement(h.a,{style:{margin:"20px"}},l.a.createElement(B.a,{color:"secondary","aria-label":"outlined secondary button group"},l.a.createElement(E.a,{onClick:this.generateCode},"Generate meeting code")),l.a.createElement("input",{placeholder:"Enter meeting code...",style:{height:"37px",width:"270px"},onChange:this.enteredText,value:this.state.callId}),l.a.createElement(B.a,{color:"secondary","aria-label":"outlined secondary button group"},l.a.createElement(E.a,{onClick:this.joinCall},"Join"),l.a.createElement(E.a,{onClick:this.isCaller},"Call"),l.a.createElement(E.a,{onClick:this.endCall},"End")))),"*/}",l.a.createElement(H.a,{container:!0},l.a.createElement(H.a,{item:!0,xs:12,md:8,py:2,style:{marginBottom:"50px"}},l.a.createElement(M,{callId:this.state.callId,callEnded:this.state.callEnded})),l.a.createElement(H.a,{item:!0,xs:12,md:4,py:2,style:{marginBottom:"50px"}},l.a.createElement(z,{callId:this.state.callId,callEnded:this.state.callEnded}))),l.a.createElement(H.a,{container:!0,style:{justifyContent:"center"}},l.a.createElement(H.a,{item:!0},l.a.createElement(ae,{callId:this.state.callId,callInfo:this.state.callInfo,callEnded:this.state.callEnded}))))}}]),t}(l.a.Component);r.a.render(l.a.createElement(le,null),document.getElementById("root"))}},[[78,1,2]]]);
//# sourceMappingURL=main.16bf6da8.chunk.js.map