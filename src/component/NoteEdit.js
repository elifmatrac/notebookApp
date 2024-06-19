import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {MDBTextArea} from "mdb-react-ui-kit";

function NoteEdit() {
    const initialFormState = {
        title: '',
        noteDescription: ''
    };
    const [note, setNote] = useState(initialFormState);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id !== 'new') {
            const request = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': document.cookie,
                    'Content-Type': 'application/json'
                })
            };
            fetch(`/api/note/${id}`, request)
                .then(response => response.json())
                .then(data => setNote(data));
        }
    }, [id, setNote]);
    console.log('------', note)

    const handleChange = (event) => {
        const {name, value} = event.target

        setNote({...note, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/note${note.id ? `/${note.id}` : ''}`, {
            method: (note.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': document.cookie
            },
            body: JSON.stringify(note)
        });
        setNote(initialFormState);
        navigate('/main');
    }

    const title = <h2>{note.id ? 'Edit Note' : 'Add Note'}</h2>;

    return (<div>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={note.title || ''}
                               onChange={handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Note</Label>
                        <MDBTextArea type="text" name="noteDescription" id="noteDescription" value={note.noteDescription || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/main">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default NoteEdit;