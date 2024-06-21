import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import Icon from 'react-native-vector-icons/FontAwesome6';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const scaleAnimations = useRef(state.routes.map(() => new Animated.Value(1))).current;

  const onPressTab = (index: number) => {
    setCurrentTabIndex(index);
    navigation.navigate(state.routes[index].name);
  };

  return (
    <View style={styles.tabbar}>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const itemStyle = [
            styles.tabbarItem,
            isFocused ? styles.tabbarItemFocused : styles.tabbarItemUnfocused,
          ];

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPressTab(index)}
              style={itemStyle}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {label === "Home" && <Icon name='house' size={22} />}
                {label === "Rooms" && <Icon name='door-closed' size={22} />}
                {label === "Settings" && <Icon name='gear' size={22} />}

                {isFocused && (
                  <Text style={styles.tabbarLabel}>
                    {label.toString().toUpperCase()}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 35,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
  },
  tabbarItemFocused: {
    flex: 2, // Larger flex value for focused item
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7FF86',
    borderRadius: 25,
    paddingVertical: 16,
  },
  tabbarItemUnfocused: {
    flex: 1, // Smaller flex value for unfocused items
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 16,
  },
  tabbarItem: {
    marginHorizontal: 5, // Optional: Add some spacing between items
  },
  tabbarLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // Add some spacing between icon and label
  },
});

export default TabBar;
