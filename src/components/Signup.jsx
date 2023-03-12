import React ,{ useContext } from 'react';

import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import axiosInstance from "../axiosConfig";
import Button from '@mui/material/Button';

import {userContext} from '../userContext';
import { useNavigate } from "react-router-dom";
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';

const Signup = (props) => {

    console.log(props)

    const [userType, setUserType] = React.useState('customer')
    const [userName, setUserName] = React.useState('')
    const navigate = useNavigate();



    const signUp = async () => {
        try{
            // console.log(userName)
            // console.log(userType)
            let response = await axiosInstance.post(`/user`, {
                "userName" : userName,
                "userType"   : userType
            })
            let responseData = await response.data;
            console.log( responseData)
            props.value.loginUser(responseData);
            if(responseData.userType === "expert"){
                navigate("/expert")
              } else{
                navigate("/customer")
            }
        } catch(e){
            console.log("Error Signing up", e);
        }
    }

    return(

        
        <div className="formStyle">
            <FormGroup >
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e=> setUserName(e.target.value)}/>

                    <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="customer"
                    name="radio-buttons-group"
                >
                    <FormControlLabel control={<Radio />} value="customer" onChange={e=> setUserType(e.target.value)}label="customer" />
                    <FormControlLabel control={<Radio />} value="expert" onChange={e=> setUserType(e.target.value)}
                    label="expert" />
                </RadioGroup>
                    
                    <Button variant="outlined" disabled={!userName || !userType} onClick={signUp}>SignUp </Button>
            </FormGroup>
        </div>
       
    )
}

export default Signup;