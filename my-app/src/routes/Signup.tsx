import React from 'react';
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
        </div>
    );
}

export default Signup;