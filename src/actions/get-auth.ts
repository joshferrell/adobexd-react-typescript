import { storage } from 'uxp';

interface AuthDataFetch {
    (fs: storage.LocalFileSystemProvider | any): () => Promise<string>;
}

const getAuthData: AuthDataFetch = (fs) => async () => {
    const folder = await fs.getDataFolder();
    const file = await folder.getEntry('auth');
    const data = await file.read();
    if (!data.length) throw new Error('no data');

    return data;
}

export default getAuthData(storage.localFileSystem);
