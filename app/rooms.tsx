import { View, Text } from 'react-native'
import React from 'react'
import LightEntity from '@/components/entities/LightEntity'
import ViewGreeting from '@/components/ViewGreeting'

const Rooms = () => {
  return (
    <View className='flex flex-col ml-12'>
      <ViewGreeting greeting='Rooms in...' focusedText='Hogwarts' />
    </View>
  )
}

export default Rooms