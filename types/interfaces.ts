interface Light {
    entity_id: string;
    friendly_name: string;
    dimmer: boolean;
    brightness: number;
    state: "on" | "off";
}


export { Light }