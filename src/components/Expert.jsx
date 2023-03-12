import React, { useEffect, useState } from "react";

import axiosInstance from "../axiosConfig";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QueueIcon from '@mui/icons-material/Queue';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskCard from "./TaskCard";
import AddTaskIcon from '@mui/icons-material/AddTask';

const Expert = (props) => {

    const userId =   props?.value?.user?.userId 

    // const testData = [
    //     {
    //         "taskId": 77,
    //         "requestId": 54,
    //         "taskName": "Add Tax to Books",
    //         "deadline": "2023-03-13T18:30:00.000+00:00",
    //         "createdAt": "2023-03-12T09:33:37.707+00:00",
    //         "assignedTo": 3,
    //         "status": "resolved"
    //     },
    //     {
    //         "taskId": 76,
    //         "requestId": 54,
    //         "taskName": "Add Tax to Books",
    //         "deadline": "2023-03-13T18:30:00.000+00:00",
    //         "createdAt": "2023-03-12T09:33:37.707+00:00",
    //         "assignedTo": 3,
    //         "status": "resolved"
    //     }

    // ]

    const [value, setValue] = React.useState("all-active");
    const [ tasks, setTasks ] = React.useState([])
    const [reload, setReload] = React.useState([])

   

    const fetchAndUpdateData = async () => {
        const params = value.split('-')
        let response = await axiosInstance.get(`/tasks?filter=${params[0]}&userId=${userId}&status=${params[1]}`)
        let taskData = await response.data;
        setTasks([...taskData])
    }

    useEffect(() => {
        fetchAndUpdateData()
    }, [value, reload])



    return(
        <div>
           {
               userId ?
               <>
               <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                      setValue(newValue);
                  }}
                  >
                  <BottomNavigationAction label="All Active"  value="all-active" icon={<FormatListBulletedIcon />} />
                  <BottomNavigationAction label="All Queued" value="all-queued" icon={<QueueIcon />} />
                  <BottomNavigationAction label="My Active" value="my-active" icon={<FormatListBulletedIcon />} />
                  <BottomNavigationAction label="My Queued" value="my-queued" icon={<QueueIcon />} />
                  <BottomNavigationAction label="My Completed" value="my-resolved" icon={<AddTaskIcon />} />

              </BottomNavigation>

              
              
              {
                  tasks.length === 0 ? 
                      
                  <div className="container">
                      No Tasks Available
                  </div> 
                      :   
                  <div className="cards">
                  {
                      
                      tasks.map(data => {
                          return <TaskCard key={data.taskId} task={data} status={ value}
                           userId={userId} reload={reload} setReload={setReload}/>
                          // return <h1>hey bro</h1>
                      })
                  }
                  </div>
              }
             
              </>
              : 

              <div className="container">
                Please Login to Continue
              </div>
           }

        </div>
        
    )
}

export default Expert;