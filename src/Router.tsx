import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AllMovies,
  HomeScreen,
  MovieDetail,
  OtherScreen,
  PersonScreen,
  SearchScreen,
  SearchScreenHome,
  CategoriesScreen,
  CategoryScreen,
} from './screens';
import {
  HomeIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ListBulletIcon,
} from 'react-native-heroicons/solid';
import {Dimensions, View} from 'react-native';
import ReduxProvider from './redux/Provider';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movie" component={MovieDetail} />
      <Stack.Screen name="Search" component={SearchScreenHome} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
};

const OtherNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Other" component={OtherScreen} />
      <Stack.Screen name="Movie" component={MovieDetail} />
      <Stack.Screen name="All" component={AllMovies} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
};

const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Movie" component={MovieDetail} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
};

const CategoriesNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Movie" component={MovieDetail} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <ReduxProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#12131E',
              borderTopWidth: 0,
              height: Dimensions.get('window').height * 0.13,
            },
          }}>
          <Tab.Screen
            name="HomeNav"
            options={{
              tabBarIcon: ({focused}) => {
                if (focused) {
                  return (
                    <View className="border border-white rounded-full p-4 bg-myblue">
                      <HomeIcon size={'35'} color={'white'} />
                    </View>
                  );
                } else {
                  return <HomeIcon size={'35'} color={'white'} />;
                }
              },
            }}
            component={HomeNavigation}
          />
          <Tab.Screen
            name="OtherNav"
            options={{
              tabBarIcon: ({focused}) => {
                if (focused) {
                  return (
                    <View className="border border-white rounded-full p-4 bg-myblue">
                      <Squares2X2Icon size={'35'} color={'white'} />
                    </View>
                  );
                } else {
                  return <Squares2X2Icon size={'35'} color={'white'} />;
                }
              },
            }}
            component={OtherNavigation}
          />
          <Tab.Screen
            name="CategoriesNav"
            options={{
              tabBarIcon: ({focused}) => {
                if (focused) {
                  return (
                    <View className="border border-white rounded-full p-4 bg-myblue">
                      <ListBulletIcon size={'35'} color={'white'} />
                    </View>
                  );
                } else {
                  return <ListBulletIcon size={'35'} color={'white'} />;
                }
              },
            }}
            component={CategoriesNavigation}
          />
          <Tab.Screen
            name="SearchNav"
            options={{
              tabBarIcon: ({focused}) => {
                if (focused) {
                  return (
                    <View className="border border-white rounded-full p-4 bg-myblue">
                      <MagnifyingGlassIcon size={'35'} color={'white'} />
                    </View>
                  );
                } else {
                  return <MagnifyingGlassIcon size={'35'} color={'white'} />;
                }
              },
            }}
            component={SearchNavigation}
          />
        </Tab.Navigator>
      </ReduxProvider>
    </NavigationContainer>
  );
};

export default App;
