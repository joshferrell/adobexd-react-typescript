import * as React from 'react';

type PropTypes = {
    onLogout: () => void;
    authData: string;
}

const LoggedIn: React.FC<PropTypes> = ({ authData, onLogout }) => (
    <div>
        <h3>You're logged in!</h3>
        <p>{authData}</p>
        <button onClick={onLogout}>Log Out</button>
    </div>
);

export default LoggedIn;
