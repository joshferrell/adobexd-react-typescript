import { storage } from 'uxp';
const { localFileSystem } = storage;

// TODO: better mock types would be nice
interface HandleLogin {
    (fs: storage.LocalFileSystemProvider | any): (username: string, password: string) => Promise<string>;
}

const makeHandleLogin: HandleLogin = (fs) => async (username, password) => {
    const baseUrl = process.env.API_URL;

    console.log(baseUrl);
    const loginData = new FormData();
    loginData.append('username', username);
    loginData.append('password', password);

    const authResponse = await fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        body: loginData
    });

    if (!authResponse.ok) {
        throw new Error('unable to login');
    }

    const authData = await authResponse.json();
    const folder = await fs.getDataFolder();
    const file = await folder.createFile('auth', { overwrite: true });
    const authString = JSON.stringify(authData);
    await file.write(authString);

    return authString;
}

export default makeHandleLogin(localFileSystem);