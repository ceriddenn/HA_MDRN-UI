import { View, Text } from 'react-native'
import React from 'react'

interface GreetingProps {
    greeting: string;
    focusedText: string;
}

const ViewGreeting = ({ greeting, focusedText }: GreetingProps) => {
    return (
        <View className='flex flex-col gap-1 mt-20 mb-12'>
            <Text className='font-regular text-3xl'>{greeting}</Text>
            <Text className='font-bold text-3xl'>{focusedText}</Text>
        </View>
    )
}

export default ViewGreeting