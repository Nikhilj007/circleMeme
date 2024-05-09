import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://circle-backend-ewrpf36y4q-el.a.run.app/api/chat";

export const socket = io(URL);