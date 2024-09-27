import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskFormModal from './components/TaskFormModal';
import DeleteModal from './components/DeleteModal';
import SearchBar from './components/SearchBar';
import TaskService from './services/TaskServices';
import Image from './image/download.jpeg'
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        TaskService.getTasks()
            .then((fetchedTasks) => {
                setTasks(fetchedTasks);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const handleRefresh = () => {
            window.location.reload()
    };

    const handleAddTask = () => {
        setTaskToEdit(null);
        setShowFormModal(true);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setShowFormModal(true);
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const handleSaveTask = (newTask) => {
        if (taskToEdit) {
            TaskService.updateTask(newTask)
                .then(() => {
                    setTasks(tasks.map(task => task.id === newTask.id ? newTask : task));
                })
                .catch((error) => console.error('Error updating task:', error));
        } else {
            newTask.id = tasks.length + 1; // Assign a new ID
            TaskService.addTask(newTask)
                .then((addedTask) => {
                    setTasks([...tasks, addedTask]);
                })
                .catch((error) => console.error('Error adding task:', error));
        }
        setShowFormModal(false);
    };

    const handleConfirmDelete = () => {
        TaskService.deleteTask(taskToDelete.id)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskToDelete.id));
                setShowDeleteModal(false);
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = tasks.filter((task) =>
                task.assignedTo.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks([]);
        }
    };

    const tasksToShow = filteredTasks.length > 0 ? filteredTasks : tasks;

    return (
        <div className="app-container">
            <header className="app-header">
               <div className="header-left">
                <div className="header-title">
                 <img src={Image} alt='ICON' className='header-icon' />
                    <h1>Tasks</h1> 
                </div>
                    <h3>All Tasks</h3>
                    <p>{tasksToShow.length} records</p>
                </div>
                <div className="header-right">
                    <div className="button-group">
                        <button onClick={handleAddTask} className="btn-new-task">New Task</button><button onClick={handleRefresh} className="btn-refresh">Refresh</button>
                    </div>
                    <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
                </div>
            </header>

            <div className="app-content">
                <TaskTable tasks={tasksToShow} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
            </div>

            <footer className="app-footer">
                <div className="footer-left">
                    <label>
                        <select>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>
                <div className="footer-right">
                    <button className="btn-pagination">First</button>
                    <button className="btn-pagination">Prev</button>
                    <button className="btn-pagination">Next</button>
                    <button className="btn-pagination">Last</button>
                </div>
            </footer>

            {showFormModal && (
                <TaskFormModal
                    task={taskToEdit}
                    onSaveTask={handleSaveTask}
                    onClose={() => setShowFormModal(false)}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    task={taskToDelete}
                    onConfirmDelete={handleConfirmDelete}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

export default App;

