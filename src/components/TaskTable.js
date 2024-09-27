import React from 'react';
import './TaskTable.css';

function TaskTable({ tasks, onEditTask, onDeleteTask }) {
    const handleSelectAll = (event) => {
        const checkboxes = document.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = event.target.checked);
    };

    return (
        <table className="task-table">
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={handleSelectAll} /></th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Comments</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td><input type="checkbox" className="task-checkbox" /></td>
                        <td className="text-color">{task.assignedTo}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.priority}</td>
                        <td>{task.comments}</td>
                        <td>
                            <div className="dropdown">
                                <button className="dropbtn">⋮</button>
                                <div className="dropdown-content">
                                    <button onClick={() => onEditTask(task)}>Edit</button>
                                    <button onClick={() => onDeleteTask(task)}>Delete</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TaskTable;
