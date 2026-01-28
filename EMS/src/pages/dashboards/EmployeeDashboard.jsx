import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import TaskCard from '../../components/common/TaskCard.jsx';
import './Dashboards.css';

const performanceBand = (points) => {
  if (points >= 200) return 'Promotion-ready';
  if (points >= 100) return 'High performer';
  if (points >= 40) return 'Developing';
  return 'New / ramping up';
};

const EmployeeDashboard = () => {
  const {
    currentUser,
    tasks,
    markTaskCompleted,
    requestExtension,
  } = useApp();

  const myTasks = useMemo(
    () => tasks.filter((t) => t.assignedTo === currentUser?.id),
    [tasks, currentUser],
  );

  const completed = myTasks.filter((t) => t.status === 'completed');
  const active = myTasks.filter(
    (t) =>
      t.status === 'in_progress' ||
      t.status === 'pending' ||
      t.status === 'extension_requested',
  );

  const points = currentUser?.points || 0;

  const handleComplete = (task) => {
    markTaskCompleted(task.id, currentUser.id);
  };

  const handleRequestExtension = (task) => {
    requestExtension(task.id, currentUser.id);
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p className="dash-sub">
            Focus on your tasks, track progress, and see how points affect
            growth.
          </p>
        </div>
        <div className="perf-card">
          <h3>Performance</h3>
          <p className="perf-points">{points} pts</p>
          <p className="perf-band">{performanceBand(points)}</p>
          <p className="perf-note">
            Difficulty × 10 points per completed task. Higher points mean
            stronger reviews and promotion readiness.
          </p>
        </div>
      </header>

      <section className="dash-grid">
        <div className="dash-card wide">
          <h2>Current Tasks</h2>
          {active.length === 0 ? (
            <p className="muted">No active tasks assigned to you.</p>
          ) : (
            <div className="task-list">
              {active.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showActions
                  onComplete={handleComplete}
                  onRequestExtension={handleRequestExtension}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="dash-card">
          <h2>Completed History</h2>
          {completed.length === 0 ? (
            <p className="muted">
              Complete tasks to build your performance history.
            </p>
          ) : (
            <ul className="history-list">
              {completed.map((t) => (
                <li key={t.id}>
                  <span>{t.title}</span>
                  <span className="history-meta">
                    +{(t.difficulty || 1) * 10} pts
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>
    </div>
  );
};

export default EmployeeDashboard;

