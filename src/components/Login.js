import React from 'react';
import {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, logInWithGoogle } from '../firebase';
import { Toast, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useAuthState, GoogleAuthProvider } from "react-firebase-hooks/auth";

import "./Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();                              
    useEffect(() => {
        if (loading) {
        // maybe trigger a loading screen
        return;
        }
        if (user) navigate("/projects");
    }, [user, loading]);

    return (
        <div className="login">
            <Form className="login__container">
                <h1>BuGone</h1>
                <FormGroup>
                    <Label>Email</Label>
                    <Input 
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </FormGroup>
                
                <Button
                    className="login__button"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </Button>
                <Button
                    className="login__button login__google"
                    onClick={logInWithGoogle}
                >
                    Login with Google
                </Button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </Form>
        </div>
    );
}


export default Login;