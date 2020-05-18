import io from 'socket.io-client';

export const explorerSocket = io(process.env.REACT_APP_BLOCK_SYNC_URL);
