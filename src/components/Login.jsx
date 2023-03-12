import React from "react";

import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";


import axiosInstance from "../axiosConfig";
const Login = (props) => {
    const navigate = useNavigate();


    const [userId, setUserId] = React.useState('')


    const login = async () => {
        try{
            let response = await axiosInstance.get(`/user/${userId}`)
            let requestData = await response.data;
            props.value.loginUser(requestData);
            if(requestData.userType === "expert"){
                navigate("/expert")
              } else{
                navigate("/customer")
              }
        } catch(e){
            console.log(`Error logging in`)
        }
    }

    return(

        <div className="formStyle">
        <FormGroup >
                <TextField id="outlined-basic" label="userId" variant="outlined" onChange={e=> setUserId(e.target.value)}/>
                <br></br>
                <Button variant="outlined" disabled={!userId} onClick={login}>Login </Button>
        </FormGroup>
    </div>
    )
}

export default Login;