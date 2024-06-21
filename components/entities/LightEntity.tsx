import { View, Text } from 'react-native'
import React from 'react'
import { Switch } from 'tamagui';
import { Slider } from 'tamagui'
import { Api } from '@/utilities/api';

interface LightEntityProps {
    dimmer: boolean;
    currentBrightness: number;
    name: string;
    entity_id: string;
    rooms: Array<string>;
    setSwEn: (value: boolean) => void;
    state: "on" | "off";
}

const LightEntity = ({ dimmer, currentBrightness: cBrightness, name, rooms, setSwEn, state: st, entity_id }: LightEntityProps) => {

    const [currentBrightness, setCurrentBrightness] = React.useState<number>(cBrightness);
    const [state, setState] = React.useState<"on" | "off">(st);
    const [uiSwitchState, setUiSwitchState] = React.useState<boolean>(false);

    const handleCurrentBrightnessValue = (): number => {
        if (currentBrightness == undefined && state == "on") return 100;
        if (!currentBrightness) return 0;

        if (currentBrightness) {
            return Math.round((currentBrightness / 255) * 100);
        }
        return 0;
    }

    const handleSwitchToggle = async () => {
        await Api.toggleLight(entity_id);
        setState(state == "on" ? "off" : "on")
    }

    return (
        <View className='flex flex-col px-6 py-4 rounded-3xl bg-[#FEF4DB] space-y-10 my-2 mx-1'>
            <View className='flex flex-row items-center'>
                <View className='flex flex-col space-y-1'>
                    <Text className='font-semibold'>{name}</Text>
                    <View className='flex flex-row'>
                        {rooms.map((room, index) => (
                            <Text key={index} className='text-xs font-medium'>{room}{index !== rooms.length - 1 && ", "}</Text>
                        ))}
                    </View>
                </View>
                <Switch size={'$2'} className='absolute right-0 bg-white border-white' onPress={() => handleSwitchToggle()} checked={state == "on" ? true : false}>
                    <Switch.Thumb animation="quicker" style={state == "on" ? { backgroundColor: "green" } : { backgroundColor: "gray" }} />
                </Switch>
            </View>

            <View className='flex flex-row items-center'>
                <Text className='font-semibold text-2xl'>{currentBrightness ? handleCurrentBrightnessValue() : handleCurrentBrightnessValue()}%</Text>
                {dimmer && (
                    <Slider size="$6" width={'$11'} defaultValue={[0]} max={255} step={1} className='absolute right-0' onPressIn={() => setSwEn(false)} onPressOut={() => setSwEn(true)} value={[currentBrightness]} onValueChange={(value) => setCurrentBrightness(value[0])}>
                        <Slider.Track className='bg-white'>
                            <Slider.TrackActive className='bg-[#FEC83A]' />
                        </Slider.Track>
                        <Slider.Thumb circular index={0} size={'$1'} className='bg-white border-white' />
                    </Slider>
                )}
            </View>
        </View>
    )
}

export default LightEntity