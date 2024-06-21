import { View, Text } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import ViewGreeting from '@/components/ViewGreeting'
import { Button, Input, TextArea, YStack } from 'tamagui'
import { Settings as ApiSettings } from '@/utilities/settings'
import { useToast } from "react-native-toast-notifications";

const Settings = () => {

  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [url, setUrl] = React.useState<string | null>(null);
  const [homeName, setHomeName] = React.useState<string | null>(null);
  const [apiToken, setApiToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function setStates() {
      setUrl(await ApiSettings.getHa_Url() as string)
      setHomeName(await ApiSettings.getHa_HomeName() as string);
      setApiToken(await ApiSettings.getAPI_Access_Token() as string)
      setLoading(false);
    }
    setStates()
  }, [loading])

  const handleUrlSet = async () => {
    setLoading(true)
    if (url == null) {
      toast.show("Please input a url.", { type: "warning" })
      return;
    }
    const result = await ApiSettings.setHa_Url(url.toLowerCase());
    if (!result) {
      toast.show("An error occured, please try again."), { type: "warning" }
    } else {
      setLoading(false)
      toast.show("Set the URL Successfully.", { type: "success" })
    }
  }

  const handleNameSet = async () => {
    setLoading(true)
    if (homeName == null) {
      toast.show("Please input a HomeName.", { type: "warning" })
      return;
    }
    if (homeName.length > 20) {
      toast.show("The HomeName should be less than 20 characters.", { type: "warning" })
      return;
    }
    const result = await ApiSettings.setHa_HomeName(homeName);
    if (!result) {
      toast.show("An error occured, please try again."), { type: "warning" }
    } else {
      setLoading(false)
      toast.show("Set the HomeName Successfully.", { type: "success" })
    }
  }

  const handleAccessTokenSet = async () => {
    setLoading(true)
    if (apiToken == null) {
      toast.show("Please input an API Token.", { type: "warning" })
      return;
    }
    const result = await ApiSettings.setAPI_Access_Token(apiToken);
    if (!result) {
      toast.show("An error occured, please try again."), { type: "warning" }
    } else {
      setLoading(false)
      toast.show("Set the API Token Successfully.", { type: "success" })
    }
  }

  return (
    <>
      {loading ? <Text>Loading</Text> : (
        <View className='flex flex-col mx-12'>
          <ViewGreeting greeting='App Settings for' focusedText='Hogwarts' />
          <View className='flex flex-col space-y-2'>
            <Text className='font-semibold text-xl'>Home Assistant</Text>
            <View className='flex flex-row items-center'>
              <Text className='font-medium text-lg'>URL: </Text>
              <Input key={1} size={'$3'} width={'$13'} placeholder={url != null ? url : `HA Instance URL`} className='mr-1 bg-black text-white rounded-2xl' onChange={(event) => setUrl(event.nativeEvent.text)} />
              <Button size={'$3'} className=' bg-[#E7FF86] rounded-2xl mx-3 font-semibold' onPress={() => handleUrlSet()}>Set</Button>
            </View>
            <View className='flex flex-row items-center'>
              <Text className='font-medium text-lg'>Home Name: </Text>
              <Input key={2} size={'$3'} width={'$12'} placeholder={homeName != null ? homeName : `Home Name`} className='mr-1 bg-black text-white rounded-2xl' onChange={(event) => setHomeName(event.nativeEvent.text)} />
              <Button size={'$3'} className=' bg-[#E7FF86] rounded-2xl mx-3 font-semibold' onPress={() => handleNameSet()}>Set</Button>
            </View>
          </View>
          <View className='flex flex-col space-y-2 mt-12'>
            <Text className='font-semibold text-xl'>API Settings</Text>
            <View className='flex flex-col'>
              <Text className='font-medium text-lg mb-1'>Long Lived Access Token: </Text>
              <TextArea size={'$3'} placeholder={apiToken != null ? apiToken : `Long Lived Access Token from profile.`} className='mr-1 bg-black text-white rounded-2xl' onChange={(event) => setApiToken(event.nativeEvent.text)} />
              <Button size={'$3'} className=' bg-[#E7FF86] rounded-2xl mt-2 font-semibold' onPress={() => handleAccessTokenSet()}>Set Token</Button>
            </View>
          </View>
        </View>
      )}</>
  )
}

export default Settings