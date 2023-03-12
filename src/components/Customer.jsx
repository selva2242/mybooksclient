import React, { useEffect } from "react";

import axiosInstance from "../axiosConfig";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';


import CardMedia from '@mui/material/CardMedia';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Customer = (props) => {

    const [value, setValue] = React.useState("create-request");
    const [ requests, setRequests ] = React.useState([])
    const [loading, setLoading] = React.useState(false);

    const userId = props?.value?.user?.userId 

    console.log("props inside customer", props)


    const createRequest = async () => {
        try{
            setLoading(true);
            let response = await axiosInstance.post(`/request`, {
                "requestType" : "accounting",
                "createdBy"   : userId
            })
            let taskData = await response.data;
            setLoading(false);
        } catch(e){
            console.log("Error Creating Request");
        }
    }

    const fetchMyRequests = async () => {
        try{
            let response = await axiosInstance.get(`/requests?userId=${userId}`)
            let requestData = await response.data;
            setRequests([...requestData])
        } catch(e){
            console.log("Error getting Requests");
        } 
    }

    useEffect(()=> {
        if(value == "my-request"){
            fetchMyRequests()
        }
    }, [value])

    return(
        <div>
          {
              props?.value?.user?.userId ? 
              <>
              <BottomNavigation
                 showLabels
                 value={value}
                 onChange={(event, newValue) => {
                     setValue(newValue);
                 }}
                 >
                 <BottomNavigationAction label="New Request"  value="create-request" icon={<RequestPageIcon />} />
                 <BottomNavigationAction label="My Requests" value="my-request" icon={<RequestQuoteIcon />} />
             </BottomNavigation>
             <div className =  "request-page">
                 {
                     value === "create-request" ?
                     <div className="container">
                        <Button variant="contained" disableElevation onClick={createRequest} disabled={loading}>
                                                create Request
                        </Button> 
                     </div>    
                     
                     :
                     <div>
                      {
                         requests.length === 0 ? 
                             
                         <div className="container">
                             No Requests raised
                         </div> 
                             :   
                 
                         <div className="cards">
                         {
     
                             requests.map( request => {
                                 return(
                                 <Card sx={{ maxWidth: 275 }} className="card-item">
                                 <CardHeader
                                     avatar={
                                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                         R
                                         </Avatar>
                                     }
                                     action={
                                         <IconButton aria-label="settings">
                                         <MoreVertIcon />
                                         </IconButton>
                                     }
                                     title={  ` Request  ${request?.requestId}` }
                                     subheader={ `${new Date(request.createdAt).toLocaleDateString()}`}
                                     />
                                         <CardContent>
                                             <Typography variant="h6" color="blue" component="div" gutterBottom>
                                             {  ` Request Type  ${request?.requestType}` }
                                             </Typography>
                                             <Typography variant="body2" color="blue" >
                                                 { ` Status -  ${request.status} `}               
                                             </Typography>
                                             <Typography variant="body2" color="blue" gutterBottom >
                                                 {  `Assigned to - ${ `${request.assignedTo == 0 ? "None" : "user " + request.assignedTo}`}` }               
                                             </Typography>
                                             <Typography variant="body2" color="red">
                                                 { ` Current Task - ${request.currentTask}`}               
                                             </Typography>
                                         </CardContent>
                                     </Card>
                                     )
                             })
                         }
                         </div>
                     }
                     </div>
                     
                 }
             </div>
            </> 
            : 
            < div className="container" >
                Please Login to Continue
            </div>

          }
        </div>
       
    )
}

export default Customer;