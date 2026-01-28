import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

const initialUsers = [
  {
    id: 'admin-1',
    name: 'Super Admin',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    skills: [],
    points: 0,
  },
  {
    id: 'manager-1',
    name: 'Default Manager',
    email: 'manager@example.com',
    password: 'manager',
    role: 'manager',
    skills: [],
    points: 0,
  },
  {
    id: 'employee-1',
    name: 'Sample Employee',
    email: 'employee@example.com',
    password: 'employee',
    role: 'employee',
    skills: ['javascript', 'react'],
    points: 0,
  },
];

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const employees = useMemo(
    () => users.filter((u) => u.role === 'employee'),
    [users],
  );

  const register = ({ name, email, password, role, skills }) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role,
    );
    if (exists) {
      throw new Error('User with this email already exists for this role.');
    }

    const user = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      password,
      role,
      skills: (skills || [])
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
      points: 0,
    };
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    return user;
  };

  const login = ({ email, password, role }) => {
    const user = users.find(
      (u) =>
        u.role === role &&
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!user) {
      throw new Error('Invalid credentials for this role.');
    }
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const autoAssignEmployee = (skillsNeeded) => {
    const normalizedSkills = skillsNeeded.map((s) => s.toLowerCase());

    let bestEmployee = null;
    let bestScore = -1;

    employees.forEach((emp) => {
      const matchCount = emp.skills.filter((s) =>
        normalizedSkills.includes(s.toLowerCase()),
      ).length;
      const activeTasks = tasks.filter(
        (t) =>
          t.assignedTo === emp.id &&
          (t.status === 'in_progress' || t.status === 'pending'),
      ).length;

      const score = matchCount * 10 - activeTasks;

      if (score > bestScore) {
        bestScore = score;
        bestEmployee = emp;
      }
    });

    return bestEmployee;
  };

  const createTask = ({
    title,
    description,
    difficulty,
    skillsNeeded,
    estimatedHours,
  }) => {
    const parsedDifficulty = Math.min(10, Math.max(1, Number(difficulty) || 1));
    const skills = (skillsNeeded || [])
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const now = new Date();
    const dueAt = new Date(
      now.getTime() + (Number(estimatedHours) || 8) * 60 * 60 * 1000,
    ).toISOString();

    const baseTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      difficulty: parsedDifficulty,
      skillsNeeded: skills,
      createdAt: now.toISOString(),
      dueAt,
      assignedTo: null,
      status: 'pending',
      history: [],
    };

    const bestEmployee = autoAssignEmployee(skills);
    const finalTask = {
      ...baseTask,
      assignedTo: bestEmployee ? bestEmployee.id : null,
      status: bestEmployee ? 'in_progress' : 'pending',
      history: bestEmployee
        ? [
            {
              type: 'assigned',
              at: now.toISOString(),
              to: bestEmployee.id,
            },
          ]
        : [],
    };

    setTasks((prev) => [...prev, finalTask]);
  };

  const updateTask = (taskId, updater) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updater(t) ?? t : t)),
    );
  };

  const markTaskCompleted = (taskId, userId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.assignedTo !== userId) return;

    updateTask(taskId, (t) => ({
      ...t,
      status: 'completed',
      completedAt: new Date().toISOString(),
      history: [
        ...t.history,
        { type: 'completed', at: new Date().toISOString(), by: userId },
      ],
    }));

    const earnedPoints = (task.difficulty || 1) * 10;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, points: (u.points || 0) + earnedPoints } : u,
      ),
    );
  };

  const requestExtension = (taskId, userId) => {
    updateTask(taskId, (t) => {
      if (t.assignedTo !== userId) return t;
      return {
        ...t,
        status: 'extension_requested',
        history: [
          ...t.history,
          {
            type: 'extension_requested',
            at: new Date().toISOString(),
            by: userId,
          },
        ],
      };
    });
  };

  const approveExtension = (taskId, extraHours) => {
    updateTask(taskId, (t) => {
      const currentDue = new Date(t.dueAt || new Date());
      const extended = new Date(
        currentDue.getTime() + (Number(extraHours) || 4) * 60 * 60 * 1000,
      ).toISOString();

      return {
        ...t,
        dueAt: extended,
        status: 'in_progress',
        history: [
          ...t.history,
          {
            type: 'extension_approved',
            at: new Date().toISOString(),
            extraHours: Number(extraHours) || 4,
          },
        ],
      };
    });
  };

  const reassignTask = (taskId, newEmployeeId) => {
    updateTask(taskId, (t) => ({
      ...t,
      assignedTo: newEmployeeId,
      status: 'in_progress',
      history: [
        ...t.history,
        {
          type: 'reassigned',
          at: new Date().toISOString(),
          to: newEmployeeId,
        },
      ],
    }));
  };

  const value = {
    users,
    tasks,
    currentUser,
    employees,
    register,
    login,
    logout,
    createTask,
    markTaskCompleted,
    requestExtension,
    approveExtension,
    reassignTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
};

