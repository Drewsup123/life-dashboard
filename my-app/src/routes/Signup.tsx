import React from 'react';
import firebase from 'firebase';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export interface IProps {
    
}

const Signup: React.FC<IProps> = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmation, setConfirmation] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();
        if((password == confirmation) && email){
            firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                let isNewUser: boolean = response.additionalUserInfo?.isNewUser || false;
                let email: string | null | undefined = response.user?.email;
            })
            .catch((error: any) => {
                let { code, message } = error;
                console.log("Error : " + code + message);
                setError(message);
            });
        }else{
            // show warning
            alert("no");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.name === "email") setEmail(e.target.value)
        else if(e.target.name === "password") setPassword(e.target.value)
        else setConfirmation(e.target.value)
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleLogin}>
                <span className="p-float-label">
                    <InputText autoComplete="email" id="email-input" name="email" onChange={handleChange} value={email} />
                    <label htmlFor="email-input">Email</label>
                </span>
                <span className="p-float-label">
                    <Password autoComplete="current-password" id="password-input" name="password" onChange={handleChange} value={password} />
                    <label htmlFor="password-input">Password</label>
                </span>
                <span className="p-float-label">
                    <Password autoComplete="current-password" id="password-confirm-input" name="confirm-password" onChange={handleChange} value={confirmation} />
                    <label htmlFor="password-confirm-input">Confirm Password</label>
                </span>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default Signup;