import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import LoginPage from "./component/LoginPage";
import SignupPage from "./component/SignupPage";
import MainPage from "./component/MainPage";
import {Cookies} from "react-cookie";
import NoteEdit from "./component/NoteEdit";

function App() {

    const cookies = new Cookies();
    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path='/note/:id' element={<NoteEdit/>}/>
                </Routes>

            </Router>
        </div>
    );
}

export default App; 