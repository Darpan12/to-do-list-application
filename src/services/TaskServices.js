// services/TaskService.js
const TaskService = {
    getTasks: async () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      return tasks;
    },
  
    addTask: async (task) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return task;
    },
  
    updateTask: async (updatedTask) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const index = tasks.findIndex(task => task.id === updatedTask.id);
      tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },
  
    deleteTask: async (id) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };
  
  export default TaskService;
  