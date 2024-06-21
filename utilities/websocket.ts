import { Settings } from "./settings";

let HA_Websocket: WebSocket | null = null;

const initSocket = async () => {
    const ws = new WebSocket('ws://10.0.0.187:8123/api/websocket');
    const api_token = await Settings.getAPI_Access_Token() as string;

    ws.onopen = () => {
        //setConnectionState('Connected');
        // Send authentication message
        const authMessage = {
            type: 'auth',
            access_token: api_token,
        };
        ws.send(JSON.stringify(authMessage));
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'auth_ok') {
            HA_Websocket = ws;
            return ws;
        }
    };
}

const getSocket = () => {
    return HA_Websocket;
}

export const ApiWebSocket = { getSocket, initSocket }

