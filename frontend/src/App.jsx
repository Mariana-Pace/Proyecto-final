import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [editingDescTaskId, setEditingDescTaskId] = useState(null);
  const [editingTitleId, setEditingTitleId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tasks", { title, description: "" });
    setTitle("");
    fetchTasks();
    toast.success("Tarea creada exitosamente!");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
    toast.error("Tarea eliminada!");
  };

  const handleChangeStatus = async (task) => {
    const oldStatus = task.status;
    const nextStatus = oldStatus === "pendiente" ? "en curso" : 
                     oldStatus === "en curso" ? "finalizado" : "pendiente";
    
    await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, { status: nextStatus });
    fetchTasks();
    toast.info(`Estado cambiado de "${oldStatus}" a "${nextStatus}"`);
  };

  const handleSaveDescription = async (taskId, newDescription) => {
    await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { description: newDescription });
    setEditingDescTaskId(null);
    fetchTasks();
    toast.success("Descripción actualizada!");
  };

  const handleSaveTitle = async (taskId, newTitle) => {
    await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { title: newTitle });
    setEditingTitleId(null);
    fetchTasks();
    toast.success("Título actualizado!");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getStatusButtonClass = (status) => {
    const variant = darkMode ? "outline-" : "";
    return `btn btn-sm btn-${variant}${status === "pendiente" ? "secondary" : status === "en curso" ? "info" : "success"}`;
  };

  const getStatusButtonText = (status) => {
    switch (status) {
      case "pendiente": return "Pasar a En Curso";
      case "en curso": return "Marcar como Finalizado";
      case "finalizado": return "Volver a Pendiente";
      default: return status;
    }
  };

  const getStatusTitleClass = (status) => {
    if (darkMode) {
      switch (status) {
        case "pendiente": return "text-status-pendiente-dark";
        case "en curso": return "text-status-encurso-dark";
        case "finalizado": return "text-status-finalizado-dark";
        default: return "text-light";
      }
    } else {
      switch (status) {
        case "pendiente": return "text-status-pendiente-light";
        case "en curso": return "text-status-encurso-light";
        case "finalizado": return "text-status-finalizado-light";
        default: return "text-dark";
      }
    }
  };

  const TaskCard = React.memo(({ task }) => {
    const [localTitle, setLocalTitle] = useState(task.title);
    const [localDescription, setLocalDescription] = useState(task.description || "");

    return (
      <div className={`card mb-3 ${darkMode ? "dark-card" : ""}`}>
        <div className={`card-body ${darkMode ? "dark-card-body" : ""}`} style={{ textAlign: 'left' }}>
          <h5 className={`d-flex justify-content-between align-items-start ${darkMode ? "text-white" : ""}`} style={{ wordBreak: 'break-word' }}>
            {editingTitleId === task._id ? (
              <div className="w-100">
                <input
                  type="text"
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  className={`form-control form-control-sm mb-2 ${darkMode ? "dark-input" : ""}`}
                  autoFocus
                />
                <div className="d-flex gap-2 mt-2">
                  <button className={`btn btn-sm ${darkMode ? "btn-outline-success" : "btn-success"}`} onClick={() => handleSaveTitle(task._id, localTitle)}>
                    Guardar
                  </button>
                  <button className={`btn btn-sm ${darkMode ? "btn-outline-secondary" : "btn-secondary"}`} onClick={() => { setEditingTitleId(null); setLocalTitle(task.title); }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, marginRight: '10px' }}>{task.title}</div>
                <button className={`btn p-0 ${darkMode ? "text-light" : ""}`} onClick={() => { setEditingTitleId(task._id); setLocalTitle(task.title); }}>
                  ✏️
                </button>
              </>
            )}
          </h5>

          <div style={{ textAlign: 'left' }}>
            {editingDescTaskId === task._id ? (
              <>
                <textarea
                  value={localDescription}
                  onChange={(e) => setLocalDescription(e.target.value)}
                  placeholder="Descripción de la tarea"
                  className={`form-control form-control-sm mb-2 ${darkMode ? "dark-input" : ""}`}
                  autoFocus
                  style={{ width: '100%', minHeight: '60px', resize: 'none', textAlign: 'left' }}
                />
                <div className="d-flex gap-2 mb-2">
                  <button className={`btn btn-sm ${darkMode ? "btn-outline-success" : "btn-success"}`} onClick={() => handleSaveDescription(task._id, localDescription)}>
                    Guardar
                  </button>
                  <button className={`btn btn-sm ${darkMode ? "btn-outline-secondary" : "btn-secondary"}`} onClick={() => { setEditingDescTaskId(null); setLocalDescription(task.description || ""); }}>
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div className={`form-control form-control-sm mb-2 ${darkMode ? "dark-input-disabled" : ""}`} style={{ minHeight: '60px', overflow: 'auto', textAlign: 'left' }}>
                {task.description || "Descripción de la tarea"}
              </div>
            )}
          </div>

          <div className="d-flex gap-2 flex-wrap mt-2">
            <button className={getStatusButtonClass(task.status)} onClick={() => handleChangeStatus(task)}>
              {getStatusButtonText(task.status)}
            </button>
            <button className={`btn btn-sm ${darkMode ? "btn-outline-warning" : "btn-warning"}`} onClick={() => { setEditingDescTaskId(task._id); setLocalDescription(task.description || ""); }}>
              Cambiar descripción
            </button>
            <button className={`btn btn-sm ${darkMode ? "btn-outline-danger" : "btn-danger"}`} onClick={() => handleDelete(task._id)}>
              Borrar
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover theme={darkMode ? "dark" : "light"} />
      <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark dark-navbar" : "navbar-dark bg-primary"} ${navHidden ? "translate-y-[-100%]" : ""}`} style={{ transition: 'transform 0.3s ease-in-out' }}>
        <div className="container-fluid justify-content-between align-items-center">
          <span className="navbar-brand">📋 Gestor de Tareas</span>
          <form className="d-flex mx-auto" onSubmit={handleSubmit} style={{ maxWidth: "500px", flex: 1 }}>
            <input className="form-control me-2" type="text" placeholder="Nueva tarea" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <button className={`btn ${darkMode ? "btn-outline-light" : "btn-light"}`} type="submit">Agregar</button>
          </form>
          <button onClick={toggleDarkMode} className="btn p-0" style={{ fontSize: "1.5rem" }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <div className="container mt-5 pt-4">
        <div className="row">
          {["pendiente", "en curso", "finalizado"].map((status) => (
            <div key={status} className="col-md-4 text-center mb-3">
              <h4 className={`status-title ${getStatusTitleClass(status)}`}>
                {status === "pendiente" && "🕒 "}
                {status === "en curso" && "⏳ "}
                {status === "finalizado" && "✅ "}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </h4>
              {tasks.filter((t) => t.status === status).map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}