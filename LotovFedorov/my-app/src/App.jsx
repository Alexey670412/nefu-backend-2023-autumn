import { useState } from 'react';
import { Route, Router, Text, ButtonGroup, Button, useText, Image, Dialog, DialogStep } from '@urban-bot/core';
import fs from 'fs';
import logo from './assets/logo.png';
import { useQuery, gql, useMutation } from '@apollo/client';

const file = fs.readFileSync(logo);

const Echo = () => {
    const [text, setText] = useState('Say something');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
};

const Logo = () => {
    const [title, setTitle] = useState('Urban Bot');

    const addRobot = () => {
        setTitle(title + '🤖');
    };

    return (
        <Image
            title={title}
            file={file}
            buttons={
                <ButtonGroup>
                    <Button onClick={addRobot}>Add robot</Button>
                </ButtonGroup>
            }
        />
    );
};

export const App = () => {
    return (
        <>
            <Text>Welcome to Urban Bot! Type /echo or /logo</Text>
            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/logo">
                    <Logo />
                </Route>
                <Route path="/reg">
                    <User />
                </Route>
                <Route path="/watch">
                    <List />
                </Route>
            </Router>
        </>
    );
};

export default App;
