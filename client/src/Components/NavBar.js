import React from 'react';
import { Box, Typography, Button, IconButton, useMediaQuery, useTheme, Menu, MenuItem} from "@material-ui/core";
import yellow from '@material-ui/core/colors/yellow';
import MenuIcon from '@material-ui/icons/Menu';

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
      
        <Box display="flex" flexDirection="row" bgcolor="rgba(0,0,0,0.8)" color={yellow[900]} p={2}>

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
                  
                  <MenuItem onClick={handleClose}>About</MenuItem>
                  <MenuItem onClick={handleClose}>Get Started</MenuItem>

                </Menu>
              </div>

            </Box> :

            <Box flexGrow={2} display="flex" flexDirection="row" justifyContent="flex-end">
              <Button color="inherit">About</Button>
              <Button color="inherit">Get Started</Button>
            </Box>}
        
        </Box>)

}

export default NavBar; 