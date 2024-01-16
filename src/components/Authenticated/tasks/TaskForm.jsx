import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  TextareaAutosize,
} from "@mui/material";

import AuthenticatedComponent from "../AuthenticatedComponent";
import { useAuth } from "../../../store/authContext";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();

  const addTaskToBackend = async (task) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_ADD_TASK_URL,
        task,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201){
        const data = response.data;

        console.log(response,data);
  
        // Redirect to the checkout page with task details
        navigate(
          `/checkout?id=${data.task.id}&title=${data.task.title}&description=${data.task.description}&price=${data.task.price}`
        );
      }
    
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, price };

    // Call the function
    addTaskToBackend(task);
  };

  return (
    <AuthenticatedComponent>
      <Container style={{ marginTop: "5rem" }}>
        <Box>
          <h2>Add A new Task</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  placeholder="Description"
                  style={{ width: "95%", padding: "8px", borderRadius: "4px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </AuthenticatedComponent>
  );
};

export default TaskForm;
