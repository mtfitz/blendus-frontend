import React, { Component, useState, useEffect } from 'react';
import {
    Card,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import supabase from '../supabase';

export default function Login() {
    const [emailAddress, setEmailAddress] = useState("");

    useEffect(() => {
        document.title = "Login | Blendus";
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        
        let { name, value } = e.target;
        switch (name) {
            case 'email': {
                setEmailAddress(value);
                break;
            }
            default: {}
        }
    }

    async function handleLogin(email: string) {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: window.location.hostname
            }
        })
        if (error) {
            console.log(error.message);
            alert("Could not sign in: " + error.message);
            return;
        }
        
        alert("Magic link sent to: " + email);
    }

    return (
        <div className="container p-2">
            <div className="row h-100">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <h3>Sign In or Register</h3>
                        <Form>
                            <FormGroup>
                                <Label for="login-email">Email address</Label>
                                <Input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    value={emailAddress}
                                    onChange={handleChange}
                                    placeholder="Enter email address..."
                                />
                            </FormGroup>
                        </Form>
                        <Button 
                            color="success"
                            onClick={() => handleLogin(emailAddress)}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}