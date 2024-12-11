

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

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Checkbox, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, setTasks }) => {
  const [parsedDescription, setParsedDescription] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Ensure the task.description is a valid JSON string
      if (task && typeof task.description === 'string') {
        const parsedData = JSON.parse(task.description);
        setParsedDescription(parsedData);
      } else {
        console.error('Invalid task description:', task.description);
      }
    } catch (error) {
      console.error('Failed to parse task description:', error);
    }
  }, [task]);

  const handleSubtaskToggle = (taskId, subtaskIndex) => {
    const updatedSubtasks = [...parsedDescription];
    updatedSubtasks[subtaskIndex] = {
      ...updatedSubtasks[subtaskIndex],
      completed: !updatedSubtasks[subtaskIndex].completed,
    };

    axios
      .put(
        `http://localhost:7000/api/tasks/${taskId}/toggle`,
        { isChecked: updatedSubtasks[subtaskIndex].completed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setParsedDescription(updatedSubtasks); // Update subtasks state
      })
      .catch((err) => {
        console.error("Error updating subtask:", err);
      });
  };

  const deleteTask = (taskId) => {
    console.log("Deleting task with ID:", taskId); // Log task ID before deletion

    axios
      .delete(`http://localhost:7000/api/deletetasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Successfully deleted, filter out the task from the local state
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
          console.log("Updated tasks after deletion:", updatedTasks); // Log updated task list
          return updatedTasks;
        });

        // Optionally, if your tasks come from a backend, you could refetch the task list
        // to ensure the UI is fully synced with the server. Uncomment if needed.
        // fetchTasks();
        window.location.reload()
      })
      .catch((err) => {
        console.error("Error deleting task:", err.response ? err.response.data : err.message);
      });
};


  const renderSubtasks = (subtasks, taskId) => {
    if (!Array.isArray(subtasks)) return null;
    return subtasks.map((subtask, index) => (
      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Checkbox
          checked={subtask.completed}
          onChange={() => handleSubtaskToggle(taskId, index)}
        />
        <Typography
          sx={{
            textDecoration: subtask.completed ? "line-through" : "none",
          }}
        >
          {subtask.content}
        </Typography>
      </Box>
    ));
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {renderSubtasks(parsedDescription, task.id)}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => navigate(`/edit/${task.id}`)}
            sx={{ marginRight: 1 }}
            color="primary"
          >
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
