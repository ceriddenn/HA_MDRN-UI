import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'
import { TamaguiProvider } from '@tamagui/core'
import config from '../tamagui.config'
import { ToastProvider } from 'react-native-toast-notifications'

const _layout = () => {
  return (
    <TamaguiProvider config={config}>
      <ToastProvider>
        <Tabs
          screenOptions={{
            headerShown: false
          }}
          tabBar={props => <TabBar {...props} />}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
            }}
          >
          </Tabs.Screen>
          <Tabs.Screen
            name='rooms'
            options={{
              title: 'Rooms'
            }}
          >
          </Tabs.Screen>
          <Tabs.Screen
            name='settings'
            options={{
              title: 'Settings'
            }}
          >
          </Tabs.Screen>
        </Tabs>
      </ToastProvider>
    </TamaguiProvider>
  )
}

export default _layout