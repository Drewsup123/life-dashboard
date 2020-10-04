import React from 'react';
import firebase from 'firebase';
import {Password} from 'primereact/password';
import { InputText } from 'primereact/inputtext';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.name === "email"){ setEmail(e.target.value) }
        else{ setPassword(e.target.value) }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <span className="p-float-label">
                    <InputText autoComplete="email" id="email-input" name="email" onChange={handleChange} value={email} />
                    <label htmlFor="email-input">Email</label>
                </span>
                <span className="p-float-label">
                    <Password autoComplete="current-password" id="password-input" name="password" onChange={handleChange} value={password} />
                    <label htmlFor="password-input">Password</label>
                </span>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default Login;