import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import TaskCard from '../../components/common/TaskCard.jsx';
import Modal from '../../components/common/Modal.jsx';
import './Dashboards.css';

const ManagerDashboard = () => {
  const { tasks, employees, approveExtension, reassignTask } = useApp();
  const [selectedTask, setSelectedTask] = useState(null);
  const [extraHours, setExtraHours] = useState(4);
  const [reassignTarget, setReassignTarget] = useState('');

  const extensionTasks = useMemo(
    () => tasks.filter((t) => t.status === 'extension_requested'),
    [tasks],
  );

  const activeTasks = useMemo(
    () =>
      tasks.filter(
        (t) => t.status === 'in_progress' || t.status === 'pending',
      ),
    [tasks],
  );

  const handleApprove = (task) => {
    setSelectedTask(task);
  };

  const confirmApprove = () => {
    if (!selectedTask) return;
    approveExtension(selectedTask.id, Number(extraHours) || 4);
    setSelectedTask(null);
  };

  const handleReassign = (task, targetId) => {
    if (!targetId) return;
    reassignTask(task.id, targetId);
    setReassignTarget('');
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Manager Dashboard</h1>
          <p className="dash-sub">
            Respond to extension requests and rebalance workload.
          </p>
        </div>
      </header>

      <section className="dash-grid">
        <div className="dash-card wide">
          <h2>Extension Requests</h2>
          {extensionTasks.length === 0 ? (
            <p className="muted">No pending extension requests.</p>
          ) : (
            <div className="task-list">
              {extensionTasks.map((task) => (
                <TaskCard key={task.id} task={task}>
                  <div className="task-actions">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => handleApprove(task)}
                    >
                      Approve Extension
                    </button>
                  </div>
                </TaskCard>
              ))}
            </div>
          )}
        </div>

        <aside className="dash-card">
          <h2>Active Tasks &amp; Reassignment</h2>
          {activeTasks.length === 0 ? (
            <p className="muted">No active tasks to manage.</p>
          ) : (
            <div className="task-list small-list">
              {activeTasks.map((task) => (
                <TaskCard key={task.id} task={task}>
                  <div className="task-actions">
                    <select
                      className="select-input"
                      value={reassignTarget}
                      onChange={(e) =>
                        setReassignTarget(e.target.value)
                      }
                    >
                      <option value="">Reassign to…</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() =>
                        handleReassign(task, reassignTarget)
                      }
                      disabled={!reassignTarget}
                    >
                      Reassign
                    </button>
                  </div>
                </TaskCard>
              ))}
            </div>
          )}
        </aside>
      </section>

      <Modal
        open={!!selectedTask}
        title="Approve Extension"
        onClose={() => setSelectedTask(null)}
      >
        <p style={{ marginBottom: '0.5rem' }}>
          How many extra hours would you like to grant?
        </p>
        <input
          type="number"
          min={1}
          className="select-input"
          value={extraHours}
          onChange={(e) => setExtraHours(e.target.value)}
        />
        <div style={{ marginTop: '0.7rem', textAlign: 'right' }}>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setSelectedTask(null)}
          >
            Cancel
          </button>{' '}
          <button
            type="button"
            className="primary-btn"
            onClick={confirmApprove}
          >
            Approve
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManagerDashboard;

