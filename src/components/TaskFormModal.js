import React, { useState } from 'react';
import './TaskFormModal.css';

function TaskFormModal({ task, onSaveTask, onClose }) {
    const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : '');
    const [status, setStatus] = useState(task ? task.status : '');
    const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const [comments, setComments] = useState(task ? task.comments : '');

    const [errors, setErrors] = useState({}); 

    const handleSave = () => {
        const validationErrors = {};

        if (!assignedTo) {
            validationErrors.assignedTo = "This field is mandatory";
        }
        if (!status) {
            validationErrors.status = "This field is mandatory";
        }
        if (!priority) {
            validationErrors.priority = "This field is mandatory";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newTask = { 
            id: task ? task.id : null, 
            assignedTo, 
            status, 
            dueDate, 
            priority, 
            comments 
        };
        onSaveTask(newTask);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
            <button className="modal-close-btn" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>{task ? 'Edit Task' : 'New Task'}</h2>
                </div>

                <div className="modal-content">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Assigned To <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                            />
                            {errors.assignedTo && <p className="error-text">{errors.assignedTo}</p>}
                        </div>
                        <div className="form-group">
                            <label>Status <span style={{ color: 'red' }}>*</span></label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Review">Review</option>
                                <option value="Reject">Reject</option>
                                <option value="Done">Done</option>
                            </select>
                            {errors.status && <p className="error-text">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Priority <span style={{ color: 'red' }}>*</span></label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Highest">Highest</option>
                            </select>
                            {errors.priority && <p className="error-text">{errors.priority}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                    <button onClick={handleSave} className="save-btn">Save</button>
                </div>
            </div>
        </div>
    );
}

export default TaskFormModal;
