import React from 'react';
import { TextField, Button } from '@adobe/react-spectrum';
import firebase from 'firebase';

export interface IProps {
    
}

const Signup: React.SFC<IProps> = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmation, setConfirmation] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = () => {
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
        })
        .catch((error: any) => {
            let { code, message } = error;
            console.log("Error : " + code + message);
            setError(message);
        });
    }

    return (
        <div>
            <h1>Login Page</h1>
            <TextField onChange={setEmail} value={email} label="Email" placeholder="abc@lifedashboard.com" />
            <TextField onChange={setPassword} value={password} label="Password" placeholder="" type="password" />
            <TextField onChange={setConfirmation} value={confirmation} label="Confirm Password" placeholder="" type="password" />
            <Button onPress={handleLogin} variant="primary">Sign Up</Button>
        </div>
    );
}

export default Signup;