import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Box, Typography, Button, IconButton, useMediaQuery, useTheme, Menu, MenuItem} from "@material-ui/core";
import cyan from '@material-ui/core/colors/cyan';
import MenuIcon from '@material-ui/icons/Menu';
import About from "./About.js";
import HowItWorks from "./HowItWorks.js"
import logo from '../logo.png'

function NavBar() {

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
      <Router>
        <Box display="flex" flexDirection="row" bgcolor="rgba(0,0,0,0.8)" color={"white"} p={2}>

            <Box display="flex" flexDirection="row" alignItems="center">
              <img src={logo} alt="CollabMeet" style={{height: "50px", width: "50px"}}></img>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography>CollabMeet</Typography>
            </Box>

                {isMatch? 
                  <Box flexGrow={2} display="flex" flexDirection="row" justifyContent="flex-end">
                    <div>
                      
                      <IconButton color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon/>
                      </IconButton>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        
                        <MenuItem onClick={handleClose}><Link to="/about">About</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/howitworks">How it works?</Link></MenuItem>

                      </Menu>
                    </div>

                  </Box> :

                  <Box flexGrow={2} display="flex" flexDirection="row" justifyContent="flex-end">
                    <Button color="inherit" ><Link to="/about">About</Link></Button>
                    <Button color="inherit"><Link to="/howitworks">How it works?</Link></Button>
                  </Box>} 
        
        </Box>

                <Switch>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/howitworks">
                      <HowItWorks />
                    </Route>
                </Switch>
      </Router>)

}

export default NavBar; 