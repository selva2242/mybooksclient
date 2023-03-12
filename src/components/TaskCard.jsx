import React from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';



import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import axiosInstance from "../axiosConfig";

const TaskCard = ({task, status, userId, reload, setReload}) => {


    // "taskId": 76,
    // "requestId": 54,
    // "taskName": "Add Tax to Books",
    // "deadline": "2023-03-13T18:30:00.000+00:00",
    // "createdAt": "2023-03-12T09:33:37.707+00:00",
    // "assignedTo": 3,
    // "status": "resolved"

 

    const statusEquivalentButton = {
        // "all-active" : "View Details",
        "my-active"  : "Resolve Task",
        // "my-queued"  : " Move to Active"
    }




    const getRemainingHours = (date) => {
        const futureDate = new Date(date);
        const now = new Date();
        const diff = futureDate - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return hours;
    }

    const handleAction = async () => {
        try{
            let response = await axiosInstance.post(`/task/${task.taskId}/resolve`)
            let taskData = await response.data;
            console.log(taskData)
            setReload(!reload);
        } catch(e){
            console.log("Error Creating Request");
        }          
    }

 
    return(
        <Card sx={{ maxWidth: 275 }} className="card-item">
             <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            T
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={  `${task?.taskId} -  ${task?.taskName}` }
        subheader={ `${new Date(task.createdAt).toLocaleDateString()}`}
      />
            <CardContent>
            
                <Typography variant="h6" color="blue" component="div" gutterBottom>
                {  ` Request  ${task?.requestId}
                    - Task ${task?.taskId} 
                ` }

                <br></br>
                </Typography>
                
                <Typography variant="body2" color="blue" >
                   { ` Status -  ${task.status} `}               
                </Typography>
                <Typography variant="body2" color="blue" gutterBottom >
                   { ` Assigned to - ${ (status === "my-active" || status === "my-queued") || userId === task.assignedTo ? "You" : 
                   (task.assignedTo === 0 ? "None" : 
                   "user " + task.assignedTo)}`}               
                </Typography>
                <Typography variant="body2" color="red">
                   { status !== "my-resolved" && ` Expires in ${getRemainingHours(task.deadline)} hours`}               
                </Typography>
            </CardContent>
            
            {
                statusEquivalentButton[status] && 
                <CardActions>
                    <Button size="small" onClick={handleAction}>{statusEquivalentButton[status]}</Button>
                </CardActions>
            }
            
        </Card>
    )
}

export default TaskCard;