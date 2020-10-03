import React from 'react';
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
        </div>
    );
}

export default Login;