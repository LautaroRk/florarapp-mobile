import { MAIN_URL } from './routes';

const io = require('socket.io-client');
const socket = io(MAIN_URL);

export default socket;