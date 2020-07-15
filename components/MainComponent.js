import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import About from './AboutusComponent';
import Contact from './ContactusComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const DrawerContent = (props) => (
  <ScrollView>
    <DrawerContentScrollView
      {...props}
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  </ScrollView>
)
  
const MenuNavigator = createStackNavigator()

const HeaderOptions = {
  headerStyle: {
    backgroundColor: '#512DA8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  }
}
function MenuNavigatorScreen() {
  
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={HeaderOptions}
    >
      <MenuNavigator.Screen
        name='Menu'
        component={Menu}
        options={({ navigation }) => ({
          title: 'Menu',
          headerLeft: () => (
            <Icon
              name='menu'
              size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />

      <MenuNavigator.Screen
        name='Dishdetail'
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }}
      />
    </MenuNavigator.Navigator>
  )
}

 const HomeNavigator = createStackNavigator()

 function HomeNavigatorScreen() {
   return (
     <HomeNavigator.Navigator
       initialRouteName='Menu'
       screenOptions={HeaderOptions}
     >
       <HomeNavigator.Screen
         name='Home'
         component={Home}
         options={({ navigation }) => ({
           title: 'Home',
           headerLeft: () => (
             <Icon
               name='menu'
               size={24}
               color='white'
               onPress={() => navigation.toggleDrawer()}
             />
           ),
         })}
       />
     </HomeNavigator.Navigator>
   )
 }
 const AboutNavigator = createStackNavigator()

 function AboutScreen() {
   return (
     <AboutNavigator.Navigator
       initialRouteName='Menu'
       screenOptions={HeaderOptions}
     >
       <AboutNavigator.Screen
         name='About'
         component={About}
         options={({ navigation }) => ({
           title: 'About',
           headerLeft: () => (
             <Icon
               name='menu'
               size={24}
               color='white'
               onPress={() => navigation.toggleDrawer()}
             />
           ),
         })}
       />
     </AboutNavigator.Navigator>
   )
 }
const ContactNavigator = createStackNavigator()

function ContactScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={HeaderOptions}
    >
      <ContactNavigator.Screen
        name='Contact'
        component={Contact}
        options={({ navigation }) => ({
          drawerLabel: 'Contact',
          headerLeft: () => (
            <Icon
              name='menu'
              size={27}
              color='white'
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  )
}

const MainNavigator = createDrawerNavigator()

function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{ backgroundColor: '#D1C4E9' }}
    >
      <MainNavigator.Screen
        name='Home'
        component={HomeNavigatorScreen}
        options={() => ({
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='home' type='font-awesome' size={24} color={tintColor} />
          ),
        })}
      />
      <MainNavigator.Screen
        name='Menu'
        component={MenuNavigatorScreen}
        options={() => ({
          drawerLabel: 'menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='list' type='font-awesome' size={24} color={tintColor} />
          ),
        })}
      />
      <MainNavigator.Screen
        name='About Us'
        component={AboutScreen}
        options={() => ({
          drawerLabel: 'About',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        })}
      />
      <MainNavigator.Screen
        name='Contact Us'
        component={ContactScreen}
        options={() => ({
          drawerLabel: 'About',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        })}
      />
    </MainNavigator.Navigator>
  )
}
 
  



export default class Main extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorDrawer />
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
})