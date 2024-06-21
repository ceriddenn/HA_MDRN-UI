import AsyncStorage from '@react-native-async-storage/async-storage';

const setHa_Url = async (url: string): Promise<boolean> => {
    try {
        await AsyncStorage.setItem("HA_URL", url);
    } catch (error) {
        return false;
    }
    return true;
}

const setHa_HomeName = async (homeName: string): Promise<boolean> => {
    try {
        await AsyncStorage.setItem("HA_HOMENAME", homeName)
    } catch (error) {
        return false;
    }
    return true;
}

const setAPI_Access_Token = async (acces_token: string): Promise<boolean> => {
    try {
        await AsyncStorage.setItem("API_ACCESS_TOKEN", acces_token)
    } catch (error) {
        return false;
    }
    return true;
}

const getHa_Url = async (): Promise<string | false | null> => {
    try {
        const ha_url = await AsyncStorage.getItem("HA_URL")
        return ha_url;
    } catch (error) {
        return false;
    }
}

const getHa_HomeName = async (): Promise<string | false | null> => {
    try {
        const ha_homeName = await AsyncStorage.getItem("HA_HOMENAME")
        return ha_homeName;
    } catch (error) {
        return false;
    }
}

const getAPI_Access_Token = async (): Promise<string | false | null> => {
    try {
        const ha_homeName = await AsyncStorage.getItem("API_ACCESS_TOKEN")
        return ha_homeName;
    } catch (error) {
        return false;
    }
}

export const Settings = {
    setAPI_Access_Token, setHa_HomeName, setHa_Url,
    getAPI_Access_Token, getHa_HomeName, getHa_Url
};