import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router,Routes, Route,  } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';


import Login from './components/Login';
import Signup from './components/Signup';
import Customer from './components/Customer';
import Expert from './components/Expert';
import {userContext} from './userContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



function App() {

  const [user, setUser] = useState({});



  const logoutUser = () => {
    setUser({})
  } 
 
  const loginUser = (data) => {
    console.log("loginUser getting called");
    setUser({...data})
    console.log(user)
  }

  const stateValues = {
    user : user,
    loginUser : loginUser,
    logoutUser : logoutUser
  }



  return (

    <userContext.Provider value={stateValues}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"  
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyBook
          </Typography>
          {
            user.userId ?
            <Button color="inherit" onClick={logoutUser}> Logout</Button>
            :
            <div cl>
              <div>
                    <a className='anchor' href='login'><span>Login</span></a>
                    <a className='anchor' href='signup'><span>Signup</span></a>
              </div>
            </div>
           
          }
        </Toolbar>
      </AppBar>
    </Box>
      <Router>
            <Routes>
                  <Route exact path='/' element={< Signup value={stateValues}/>}></Route>
                  <Route exact path='/signup' element={< Signup value={stateValues}/>}></Route>
                  <Route exact path='/login' element={< Login value={stateValues}/>}></Route>
                  <Route exact path='/Customer' element={< Customer value={stateValues} />}></Route>
                  <Route exact path='/expert' element={< Expert value={stateValues}/>}></Route>
            </Routes>
            {/* </div> */}
        </Router>    
        // added this to enable audience from vercel
        <Analytics />

      </userContext.Provider>
  );
}

export default App;
