import * as React from 'react';

import { handleLogin } from '../actions';

const defaultErrorState = { 
    emailError: false, 
    passwordError: false,
    loginError: false
};

type PropTypes = {
    onLoginSuccess: (authData: string) => void;
}

const SignIn: React.FC<PropTypes> = ({ onLoginSuccess }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorState, setError] = React.useState(defaultErrorState);

    const handleSubmit = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError({
            emailError: !!!email,
            passwordError: !!!password,
            loginError: false
        });

        if (!email || !password) return;

        try {
            const loginData = await handleLogin(email, password);
            onLoginSuccess(loginData);
        } catch (err) {
            console.warn(err);
            setError({ loginError: true, emailError: false, passwordError: false });
        }

        return handleLogin(email, password)
            .then(onLoginSuccess, console.warn);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                {errorState.emailError && <div>Please enter your email</div>}
                <input 
                    placeholder="j.doe@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text" 
                />
            </label>

            <label>
                Password
                {errorState.passwordError && <div>Please enter your password</div>}
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
            </label>

            <div className="row">
                <button onClick={handleSubmit} uxp-variant="cta">Login</button>
                <a href="http://example.com" style={{ marginLeft: '8px' }}>Sign Up</a>
            </div>
        </form>
    )
}

export default SignIn;