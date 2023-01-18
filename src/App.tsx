import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Routes, Route, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import supabase from './supabase';
import { Session, User } from '@supabase/supabase-js'

function App() {
    const [session, setSession] = useState<Session | null>();
    const [user, setUser] = useState<User | null>();
    //const [user, setUser] = useState<String | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: {session}, error }) => {
            if (error) {
                console.log("Could not get session.");
            }
            setSession(session);
            setUser(session ? session.user : null);
        });
        
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session ? session.user : null);
            console.log("User: " + (session ? session.user.id : "null"));
        });
    }, []);

    /*async function getSession() {
        const { data: {session}, error } = await supabase.auth.getSession();
        setSession(session);
        if (error) {
            console.log("Could not get session: " + error.message);
        }
    }*/

    /*async function getUser() {
        await supabase.auth.onAuthStateChange(async () => {
            const { data: {user} } = await supabase.auth.getUser();
            setUser(user);
        });
        console.log("Attempted auth state change. User: " + (user ? user.toString() : 'null'));
    }*/

    return (
        <div className="App">
            <header className="App-header">
                Blendus
            </header>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route index element={
                            (user !== null) ? <Home /> : <Navigate to="login" replace />
                        } />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
