import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';

const GetStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents();
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch students. Please connect backend.');
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
        try {
            await deleteStudent(id);
            setStudents(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            alert('Failed to delete student.');
        }
    };

    if (loading) return <div className="loading">Loading students...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <header className="page-header">
                <h2>Students List</h2>
                <Link to="/create" className="btn btn-primary">Add New Student</Link>
            </header>

            {students.length === 0 ? (
                <div className="empty-state">No students found. Add one!</div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.department}</td>
                                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/update/${student.id}`} state={{ student }} className="btn btn-secondary btn-sm">
                                            Edit
                                        </Link>
                                        {' '}
                                        <button onClick={() => handleDelete(student.id, student.name)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GetStudents;
