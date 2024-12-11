

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Box, Checkbox, Button } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TaskCard = ({ task, setTasks }) => {
//   const [parsedDescription, setParsedDescription] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       // Ensure the task.description is a valid JSON string
//       if (task && typeof task.description === 'string') {
//         const parsedData = JSON.parse(task.description);
//         setParsedDescription(parsedData);
//       } else {
//         console.error('Invalid task description:', task.description);
//       }
//     } catch (error) {
//       console.error('Failed to parse task description:', error);
//     }
//   }, [task]);

//   const handleSubtaskToggle = (taskId, subtaskIndex) => {
//     const updatedSubtasks = [...parsedDescription];
//     updatedSubtasks[subtaskIndex] = {
//       ...updatedSubtasks[subtaskIndex],
//       completed: !updatedSubtasks[subtaskIndex].completed,
//     };

//     axios
//       .put(
//         `http://localhost:7000/api/tasks/${taskId}/toggle`,
//         { isChecked: updatedSubtasks[subtaskIndex].completed },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setParsedDescription(updatedSubtasks); // Update subtasks state
//       })
//       .catch((err) => {
//         console.error("Error updating subtask:", err);
//       });
//   };

//   const deleteTask = (taskId) => {
//     axios
//       .delete(`http://localhost:7000/api/deletetasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         // Update parent component's task list after deletion
//         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//       })
//       .catch((err) => {
//         console.error("Error deleting task:", err);
//       });
//   };

//   const renderSubtasks = (subtasks, taskId) => {
//     if (!Array.isArray(subtasks)) return null;
//     return subtasks.map((subtask, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//         <Checkbox
//           checked={subtask.completed}
//           onChange={() => handleSubtaskToggle(taskId, index)}
//         />
//         <Typography
//           sx={{
//             textDecoration: subtask.completed ? "line-through" : "none",
//           }}
//         >
//           {subtask.content}
//         </Typography>
//       </Box>
//     ));
//   };

//   if (!task) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Card sx={{ marginBottom: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{task.title}</Typography>
//         {renderSubtasks(parsedDescription, task.id)}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             onClick={() => navigate(`/edit/${task.id}`)}
//             sx={{ marginRight: 1 }}
//             color="primary"
//           >
//             Edit
//           </Button>
//           <Button onClick={() => deleteTask(task.id)} color="secondary">
//             Delete
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Box, Checkbox, Button } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TaskCard = ({ task, setTasks }) => {
//   const [parsedDescription, setParsedDescription] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       if (task && typeof task.description === "string") {
//         const parsedData = JSON.parse(task.description);
//         if (Array.isArray(parsedData)) {
//           setParsedDescription(parsedData);
//         } else {
//           console.error("Parsed description is not an array:", parsedData);
//           setParsedDescription([]);
//         }
//       } else {
//         console.error("Invalid task description:", task?.description);
//         setParsedDescription([]);
//       }
//     } catch (error) {
//       console.error("Failed to parse task description:", error);
//       setParsedDescription([]);
//     }
//   }, [task]);

//   const handleSubtaskToggle = (taskId, subtaskIndex) => {
//     const updatedSubtasks = [...parsedDescription];
//     updatedSubtasks[subtaskIndex] = {
//       ...updatedSubtasks[subtaskIndex],
//       completed: !updatedSubtasks[subtaskIndex].completed,
//     };

//     axios
//       .put(
//         `http://localhost:7000/api/tasks/${taskId}/toggle`,
//         { isChecked: updatedSubtasks[subtaskIndex].completed },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setParsedDescription(updatedSubtasks);
//       })
//       .catch((err) => {
//         console.error("Error updating subtask:", err);
//       });
//   };

//   const deleteTask = (taskId) => {
//     axios
//       .delete(`http://localhost:7000/api/deletetasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//       })
//       .catch((err) => {
//         console.error("Error deleting task:", err);
//       });
//   };

//   const renderSubtasks = (subtasks, taskId) => {
//     if (!Array.isArray(subtasks) || subtasks.length === 0) {
//       return <Typography>No subtasks available</Typography>;
//     }

//     return subtasks.map((subtask, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//         <Checkbox
//           checked={subtask.completed}
//           onChange={() => handleSubtaskToggle(taskId, index)}
//         />
//         <Typography
//           sx={{
//             textDecoration: subtask.completed ? "line-through" : "none",
//           }}
//         >
//           {subtask.content}
//         </Typography>
//       </Box>
//     ));
//   };

//   if (!task) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Card sx={{ marginBottom: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{task.title}</Typography>
//         {renderSubtasks(parsedDescription, task.id)}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             onClick={() => navigate(`/edit/${task.id}`)}
//             sx={{ marginRight: 1 }}
//             color="primary"
//           >
//             Edit
//           </Button>
//           <Button onClick={() => deleteTask(task.id)} color="secondary">
//             Delete
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, setTasks }) => {
  const [parsedDescription, setParsedDescription] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Log the task to check its format
    console.log("Task Data:", task); 

    // Parse task description into subtasks if it's a string
    if (task.description) {
      try {
        if (typeof task.description === "string") {
          const parsedData = task.description.split(",").map((item) => ({
            content: item.trim(),
            completed: false,
          }));
          setParsedDescription(parsedData);
        } else if (Array.isArray(task.description)) {
          setParsedDescription(
            task.description.map((item) => ({
              content: item.content || item,
              completed: item.completed || false,
            }))
          );
        } else {
          setParsedDescription([]); // If not string or array
        }
      } catch (error) {
        console.error("Failed to parse task description:", error);
        setParsedDescription([]);
      }
    } else {
      setParsedDescription([]); // No description
    }
  }, [task.description]);




  const handleSubtaskToggle = (index,id) => {
    const updatedDescription = [...parsedDescription];
    
    // Toggle the completion status of the subtask
    updatedDescription[index] = {
      ...updatedDescription[index],
      completed: !updatedDescription[index].completed,
    };
  
    // Update local state
    setParsedDescription(updatedDescription);
  
    // Determine if the task's status should be updated
    const allSubtasksCompleted = updatedDescription.every((subtask) => subtask.completed);
    const anySubtaskIncomplete = updatedDescription.some((subtask) => !subtask.completed);
  
    let newTaskStatus = "todo";
    if (anySubtaskIncomplete) {
      newTaskStatus = "in-progress";
    } else if (allSubtasksCompleted) {
      newTaskStatus = "done";
    }
  
    // Send the update request with subtask index, completion state, and task status
    axios
      .put(
        `http://localhost:7000/api/subtasks/${task.id}/toggle`,
        {
          isChecked: updatedDescription[index].completed, // Send isChecked
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Subtask updated:', response.data);
        
        // Update task status based on subtasks completion
        return axios.put(
          `http://localhost:7000/api/tasks/${task.id}/moveToDone`,
          { status: newTaskStatus }, // Send the updated task status
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((response) => {
        console.log('Task status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating subtask or task status:', error);
      });
  };
  
  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:7000/api/deletetasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      });
  };

  const renderDescription = () => {
    if (Array.isArray(parsedDescription) && parsedDescription.length > 0) {
      return parsedDescription.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Checkbox
            checked={item.completed}
            onChange={() => handleSubtaskToggle(index,task.id)} 
          />
          <Typography
            sx={{
              textDecoration: item.completed ? "line-through" : "none", 
            }}
            variant="body2"
            color="textSecondary"
          >
            {item.content}
          </Typography>
        </Box>
      ));
    } else {
      return (
        <Typography variant="body2" color="textSecondary">
          No description available.
        </Typography>
      );
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {renderDescription()} 
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => navigate(`/edit/${task.id}`)} sx={{ marginRight: 1 }} color="primary">
            Edit
          </Button>
          <Button onClick={() => deleteTask(task.id)} color="secondary">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
