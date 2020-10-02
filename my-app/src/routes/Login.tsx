import React from 'react';
import { TextField, Button } from '@adobe/react-spectrum';
import firebase from 'firebase';

export interface IProps {
    
}

const Login: React.SFC<IProps> = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = () => {
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
        })
        .catch((error: any) => {
            let { code, message } = error;
            console.log(code, message);
            setError(message);
        });
    }

    return (
        <div>
            <h1>Login Page</h1>
            <TextField onChange={setEmail} value={email} label="Email" placeholder="abc@lifedashboard.com" />
            <TextField onChange={setPassword} value={password} label="Password" placeholder="" type="password" />
            <Button onPress={handleLogin} variant="primary">Submit</Button>
        </div>
    );
}

export default Login;