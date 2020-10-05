import React from 'react';
import * as firebase from 'firebase';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Redirect } from 'react-router';
import { Button } from 'primereact/button';
import { login } from '../store/user/actions';

export interface IProps {
    isAuthenticated: boolean;
    login: any;
}

const Login: React.FC<IProps> = (props: IProps) => {
    const { isAuthenticated } = props;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();
        console.log("Handle login");
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            //? Needs email, created, isFirstSignin, and UID
            console.log(response);
            let isNewUser = response.additionalUserInfo?.isNewUser;
            let email = response.user?.email;
            let emailVerified = response.user?.emailVerified;
            let UID = response.user?.uid;
            if(email && UID){
                props.login({ UID, email, emailVerified: emailVerified, isNewUser });
            }
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

    if(isAuthenticated) return <Redirect to="/" />

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <span className="p-float-label">
                    <InputText autoComplete="email" id="email-input" name="email" onChange={handleChange} value={email} />
                    <label htmlFor="email-input">Email</label>
                </span>
                <span className="p-float-label">
                    <Password autoComplete="current-password" id="password-input" name="password" onChange={handleChange} value={password} />
                    <label htmlFor="password-input">Password</label>
                </span>
                <Button type="submit" label="Login" />
            </form>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({ isAuthenticated: state.userReducer.isAuthenticated });

export default connect(mapStateToProps, { login })(Login);