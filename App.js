import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import {Ionicons} from '@expo/vector-icons';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return ( <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#351401'},
      headerTintColor: 'white',
      sceneStyle: {backgroundColor: '#3f2f25'},
      drawerStyle: {backgroundColor: '#3f2f25'},
      drawerInactiveTintColor: 'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#e4baa1'
    }}
  >
    <Drawer.Screen 
      name='Categories' 
      component={CategoriesScreen}
      options={{
        title: 'All Categories',
        drawerIcon: ({color, size}) => (
          <Ionicons name='list' color={color} size={size}/>
        )
      }}
    />
    <Drawer.Screen 
      name='Favorites' 
      component={FavoritesScreen}
      options={{
        drawerIcon: ({color, size}) => (
          <Ionicons name='star' color={color} size={size}/>
        )
      }}
    />
  </Drawer.Navigator>
  );
}

export default function App() {

  const [fontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare();
  }, []);

  if (!fontLoaded) {
    return undefined;
  }else {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator 
          //initialRouteName="MealsCategories"
          screenOptions={{
            headerStyle: { backgroundColor: '#351401'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: '#3f2f25'}
          }}
          >
          <Stack.Screen 
            name="Drawer" 
            component={DrawerNavigator} 
            options={{
              title: 'Back',
              headerShown: false,
    
            }}
           
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen name="MealDetail" component={MealDetailScreen} options={{title: 'About the meal'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
