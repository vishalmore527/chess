import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import TaskCard from '../../components/common/TaskCard.jsx';
import './Dashboards.css';

const AdminDashboard = () => {
  const { users, tasks, employees, createTask } = useApp();
  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 5,
    skills: '',
    estimatedHours: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsNeeded = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    createTask({
      title: form.title,
      description: form.description,
      difficulty: Number(form.difficulty),
      skillsNeeded,
      estimatedHours: Number(form.estimatedHours),
    });

    setForm({
      title: '',
      description: '',
      difficulty: 5,
      skills: '',
      estimatedHours: 8,
    });
  };

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter(
      (t) => t.status === 'pending' || t.status === 'in_progress',
    ).length;
    const extensionRequested = tasks.filter(
      (t) => t.status === 'extension_requested',
    ).length;
    const totalPoints = users.reduce((sum, u) => sum + (u.points || 0), 0);

    return { totalTasks, completed, pending, extensionRequested, totalPoints };
  }, [tasks, users]);

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="dash-sub">
            Define work, auto-assign tasks, and oversee the entire org.
          </p>
        </div>
      </header>

      <section className="dash-grid">
        <div className="dash-card wide">
          <h2>Create Task</h2>
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="field-row">
              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                />
              </label>
            </div>
            <div className="field-group">
              <label>
                Difficulty (1–10)
                <input
                  type="number"
                  name="difficulty"
                  min={1}
                  max={10}
                  value={form.difficulty}
                  onChange={handleChange}
                />
              </label>
              <label>
                Est. hours
                <input
                  type="number"
                  name="estimatedHours"
                  min={1}
                  value={form.estimatedHours}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field-row">
              <label>
                Required skills (comma separated)
                <input
                  type="text"
                  name="skills"
                  placeholder="react, api, sql"
                  value={form.skills}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="primary-btn">
              Create &amp; Auto-Assign
            </button>
          </form>
        </div>

        <aside className="dash-card">
          <h2>Org Snapshot</h2>
          <ul className="stats-list">
            <li>
              <span>Total users</span>
              <strong>{users.length}</strong>
            </li>
            <li>
              <span>Employees</span>
              <strong>{employees.length}</strong>
            </li>
            <li>
              <span>Total tasks</span>
              <strong>{stats.totalTasks}</strong>
            </li>
            <li>
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </li>
            <li>
              <span>Active</span>
              <strong>{stats.pending}</strong>
            </li>
            <li>
              <span>Extension requests</span>
              <strong>{stats.extensionRequested}</strong>
            </li>
            <li>
              <span>Points awarded</span>
              <strong>{stats.totalPoints}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="dash-card">
        <h2>All Tasks</h2>
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="muted">No tasks yet. Create one above.</p>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

