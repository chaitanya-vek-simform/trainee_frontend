import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStudents from './pages/GetStudents';
import CreateStudent from './pages/CreateStudent';
import UpdateStudent from './pages/UpdateStudent';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <nav className="navbar">
          <div className="navbar-brand">Student Management System</div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<GetStudents />} />
            <Route path="/create" element={<CreateStudent />} />
            <Route path="/update/:id" element={<UpdateStudent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
