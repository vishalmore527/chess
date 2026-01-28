import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import './TaskCard.css';

const difficultyColor = (d) => {
  if (d >= 8) return 'high';
  if (d >= 4) return 'medium';
  return 'low';
};

const TaskCard = ({
  task,
  showActions = false,
  onComplete,
  onRequestExtension,
  children,
}) => {
  const { users } = useApp();
  const assignee = users.find((u) => u.id === task.assignedTo);

  const dueLabel = task.dueAt
    ? new Date(task.dueAt).toLocaleString()
    : 'Not set';

  return (
    <article className="task-card">
      <header className="task-card-header">
        <div>
          <h3>{task.title}</h3>
          <p className="task-meta">
            Difficulty{' '}
            <span className={`pill diff-${difficultyColor(task.difficulty)}`}>
              {task.difficulty}
            </span>
            {assignee && (
              <>
                <span className="dot-sep">•</span>
                Assigned to <strong>{assignee.name}</strong>
              </>
            )}
          </p>
        </div>
        <div className="task-status pill">
          {task.status.replace('_', ' ')}
        </div>
      </header>
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
      <p className="task-meta small">
        Due by <span>{dueLabel}</span>
      </p>
      {task.skillsNeeded?.length ? (
        <div className="task-skills">
          {task.skillsNeeded.map((s) => (
            <span key={s} className="skill-pill">
              {s}
            </span>
          ))}
        </div>
      ) : null}

      {showActions && (
        <div className="task-actions">
          {onComplete && (
            <button
              type="button"
              className="primary-btn"
              onClick={() => onComplete(task)}
              disabled={task.status === 'completed'}
            >
              Mark Complete
            </button>
          )}
          {onRequestExtension && (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => onRequestExtension(task)}
              disabled={task.status === 'extension_requested'}
            >
              Request Extension
            </button>
          )}
        </div>
      )}

      {children}
    </article>
  );
};

export default TaskCard;

