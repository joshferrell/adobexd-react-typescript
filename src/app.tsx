import * as React from 'react';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

import { getAuthData, removeAuthData } from './actions';
import { SignIn, LoggedIn } from './views';

const viewMachine = Machine({
    id: 'app',
    initial: 'idle',
    context: { authentication: undefined },
    states: {
        idle: {
            invoke: {
                id: 'getAuthData',
                src: getAuthData,
                onDone: {
                    target: 'loggedIn',
                    actions: assign({ 
                        authentication: (context: any, event: any) => event.data
                    })
                },
                onError: {
                    target: 'loggedOut'
                }
            }
        },
        loggedOut: {
            on: { LOGIN: 'loggedIn' }
        },
        loggedIn: {
            on: { LOGOUT: 'loggedOut' }
        }
    }
});

const App = () => {
    const [current, send] = useMachine(viewMachine);
    if (current.value === 'idle') return <p>test</p>;

    if (current.value === 'loggedIn') {
        return (
            <LoggedIn 
                onLogout={() => {
                    assign({ authentication: undefined });
                    removeAuthData();
                    send('LOGOUT');
                }} 
                authData={JSON.stringify(current.context.authentication)}
            />
        );
    }

    return <SignIn onLoginSuccess={
        (authentication) => {
            assign({ authentication });
            send('LOGIN')
        }} />
};

export default App;