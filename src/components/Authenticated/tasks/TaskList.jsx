import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AuthenticatedComponent from "../AuthenticatedComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../store/authContext";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_FETCH_ALL_TASK_URL, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`,
            'X-Content-Type-Options': 'nosniff', // Prevent MIME sniffing
            'X-Frame-Options': 'DENY', // Prevent clickjacking attacks
            'X-XSS-Protection': '1; mode=block', // Enable XSS protection
            'Referrer-Policy': 'no-referrer', // Reduce information leakage
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload', // Enforce HTTPS
          },
        
        });
        const data = response.data;
        console.log(response);
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fething tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <AuthenticatedComponent>
      <Typography variant="h4">Task List</Typography>
      <Button onClick={() => navigate("/add-task")}>Add task</Button>
      {tasks.map((task) => (
        <Paper key={task.id} style={{ margin: "1rem", padding: "0.5rem" }}>
          <Typography variant="h5">{task.title}</Typography>
          <Typography variant="body1">
            Description: {task.description}
          </Typography>
          <Typography variant="body1">Price: {task.price} $</Typography>
          <Typography variant="body1">Status: {task.status}</Typography>
        </Paper>
      ))}

      {/* {tasks.length == 0 ? 'No task ,Please add !!' : '' } */}
    </AuthenticatedComponent>
  );
};

export default TaskList;
