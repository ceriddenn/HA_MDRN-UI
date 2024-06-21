import { View, Text } from 'react-native'
import React from 'react'
import { Switch } from 'tamagui';
import { Slider } from 'tamagui'

interface SwitchEntityProps {
    currentBrightness: number;
    name: string;
    rooms: Array<string>;
}

const SwitchEntity = ({ currentBrightness, name, rooms }: SwitchEntityProps) => {
    const [uiSwitchState, setUiSwitchState] = React.useState<boolean>(false);
    return (
        <View className='flex flex-col px-6 py-4 rounded-3xl bg-[#E6EFFF] space-y-10 my-2 mx-1'>
            <View className='flex flex-row items-center'>
                <View className='flex flex-col space-y-1'>
                    <Text className='font-semibold'>{name}</Text>
                    <View className='flex flex-row'>
                        {rooms.map((room, index) => (
                            <Text key={index} className='text-xs font-medium'>{room}{index !== rooms.length - 1 && ", "}</Text>
                        ))}
                    </View>
                </View>
                <Switch defaultChecked={true} size={'$2'} className='absolute right-0 bg-white border-white' onPress={() => setUiSwitchState(!uiSwitchState)} checked={uiSwitchState}>
                    <Switch.Thumb animation="quicker" style={uiSwitchState ? { backgroundColor: "green" } : { backgroundColor: "gray" }} />
                </Switch>
            </View>

            <View className='flex flex-row items-center'>
                <Text className='font-semibold text-2xl'>{currentBrightness}%</Text>
            </View>
        </View>
    )
}

export default SwitchEntity