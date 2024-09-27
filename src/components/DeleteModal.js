import React from 'react';
import './DeleteModal.css';

function DeleteModal({ task, onConfirmDelete, onClose }) {
    return (
        <div className="modal delete-modal">
            <div className="modal-header">Delete</div>
            <div className="modal-content">
                <p>Are you sure you want to delete the task "{task.assignedTo}"?</p>
            </div>
            <div className="modal-footer">
                <button className="btn-no" onClick={onClose}>Cancel</button>
                <button className="btn-yes" onClick={onConfirmDelete}>OK</button>
            </div>
        </div>
    );
}

export default DeleteModal;
