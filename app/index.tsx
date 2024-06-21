import React from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import LightEntity from '@/components/entities/LightEntity';
import ViewGreeting from '@/components/ViewGreeting';
import { ScrollView } from 'tamagui';
import SwitchEntity from '@/components/entities/SwitchEntity';
import { Api } from '@/utilities/api';
import { useToast } from 'react-native-toast-notifications';
import { Light } from '@/types/interfaces';
const Home = () => {

  const toast = useToast();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [swiperEn, setSwiperEn] = React.useState<boolean>(true);
  const [lights, setLights] = React.useState<Array<Light> | null>(null);

  React.useEffect(() => {
    async function getLights() {
      const result = await Api.getAllLights();
      if (result.code != 200) {
        toast.show(result.message, { type: "danger" })
        return;
      }
      setLights(result.lights);
      setLoading(false);
    }
    getLights();
  }, [])

  return (
    <>
      {loading ? <Text>Loading</Text> : (
        <View className='flex-1 mx-12'>
          <ViewGreeting greeting="Welcome Home," focusedText="Finn" />
          <Swiper
            scrollEnabled={swiperEn}
            showsPagination={true}
            loop={false}

          >
            <View className='flex flex-1 max-h-[55vh]'>
              <Text className='font-semibold text-lg mb-2'>My Lights:</Text>
              <ScrollView className='flex-1' >
                {lights ? lights.map((light, index) => (
                  <LightEntity key={index} entity_id={light.entity_id} state={light.state} setSwEn={setSwiperEn} name={light.friendly_name} rooms={[""]} dimmer={light.dimmer} currentBrightness={light.brightness} />
                )) : <Text>No Lights Found</Text>}
              </ScrollView>
            </View>
            <View className='flex flex-1 max-h-[55vh]'>
              <Text className='font-semibold text-lg mb-2'>My Switches:</Text>
              <ScrollView className='flex-1'>
                <SwitchEntity name="Living Room Ceiling" rooms={["Living Room",]} currentBrightness={100} />
              </ScrollView>
            </View>
          </Swiper>
        </View>
      )}
    </>
  );
};

export default Home;
