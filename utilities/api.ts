import axios from 'axios';
import { Settings } from './settings';
import { Light } from '@/types/interfaces';

interface GetLightsPolicy {
    message: string;
    code: number;
    lights: Array<Light> | null;
}

const getAllLights = async (): Promise<GetLightsPolicy> => {
    const base_url = await Settings.getHa_Url() as string;
    const api_token = await Settings.getAPI_Access_Token() as string;
    try {
        const request = await axios.get(`${base_url}/api/states`,
            {
                headers: {
                    "Authorization": `Bearer ${api_token}`,
                    "Content-Type": "application/json"
                }
            })

        const data = await request.data;
        const lights: Array<Light> = [];
        for (var i = 0; i < data.length; i++) {
            if ((data[i].entity_id as string).startsWith("light.")) {
                const friendly_name = data[i].attributes.friendly_name;
                const entity_id = (data[i].entity_id as string).toString();
                const brightness = data[i].attributes.brightness;
                const state = data[i].state;
                const isDimmer = (data[i].attributes.supported_color_modes as Array<string>).includes("brightness") ? true : false
                const light: Light = { friendly_name, entity_id: entity_id, brightness, state, dimmer: isDimmer }
                lights.push(light);

            }
        }
        return {
            message: "Successfully queried all lights.",
            code: 200,
            lights,
        };
    } catch (error) {
        return {
            message: "Failed to query all lights.",
            code: 501,
            lights: null,
        };
    }
}

const toggleLight = async (entity_id: string) => {
    const base_url = await Settings.getHa_Url() as string;
    const api_token = await Settings.getAPI_Access_Token() as string;
    try {
        const request = await axios(`${base_url}/api/services/light/toggle`,
            {
                headers: {
                    "Authorization": `Bearer ${api_token}`,
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({ entity_id: entity_id }),
                withCredentials: true,
                method: "post"

            })
        const data = await request.data;
    } catch (error) {
        console.log(error)
    }
}



export const Api = { getAllLights, toggleLight }