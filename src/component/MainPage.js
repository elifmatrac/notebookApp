// WelcomeDashboard.js
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, ButtonGroup, Container, Table} from "reactstrap"; // Import useHistory hook

function WelcomeDashboard({ username }) {
    const history = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear session, remove authentication token)
        // After logout, redirect to the login page
        history('/');
    };

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const request = {
            method: undefined,
            headers: { 'Authorization': document.cookie }
        };

        fetch('api/note', request)
            .then(response => response.json())
            .then(data => {
                setNotes(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/note/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': document.cookie
            }
        }).then(() => {
            let updatedNotes = [...notes].filter(i => i.id !== id);
            setNotes(updatedNotes);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const noteList = notes.map(note => {
        const title = `${note.id || ''} ${note.title || ''}`;
        return <tr key={note.id}>
            <td style={{whiteSpace: 'nowrap'}}>{note.title}</td>
            <td>{title}</td>

            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/note/" + note.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(note.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/note/new">Add Note</Button>
                </div>
                <h3>My Notes</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Id</th>
                        <th width="20%">Title</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {noteList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );

}
export default WelcomeDashboard;
