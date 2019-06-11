import { storage } from 'uxp';

interface AuthDataRemove {
    (fs: storage.LocalFileSystemProvider | any): () => Promise<void>;
}

const removeAuthData: AuthDataRemove = (fs) => async () => {
    const folder = await fs.getDataFolder();
    const file = await folder.getEntry('auth');
    return file.delete();
}

export default removeAuthData(storage.localFileSystem);