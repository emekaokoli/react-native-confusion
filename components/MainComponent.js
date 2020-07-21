import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import About from './AboutusComponent';
import Contact from './ContactusComponent';
import Dishdetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Reservation from './ReservationComponent';




const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
 
})


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
          drawerLabel: 'Menu',
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

const FavoritesNavigator = createStackNavigator()
function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={HeaderOptions}
    >
      <FavoritesNavigator.Screen
        name='Favorites'
        component={Favorites}
        options={({ navigation }) => ({
          drawerLabel: 'Favorites',
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
    </FavoritesNavigator.Navigator>
  )
}
const ReservationNavigator = createStackNavigator()
function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={HeaderOptions}
    >
      <ReservationNavigator.Screen
        name='Reservation'
        component={Reservation}
        options={({ navigation }) => ({
          drawerLabel: 'Reservation',
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
    </ReservationNavigator.Navigator>
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
           drawerLabel: 'Home',
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
           drawerLabel: 'About',
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
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='list' type='font-awesome' size={24} color={tintColor} />
          ),
        })}
      />
      <MainNavigator.Screen
        name='About Us'
        component={AboutScreen}
        options={() => ({
          drawerLabel: 'About us',
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
          drawerLabel: 'Contact us',
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
      <MainNavigator.Screen
        name='Favorites'
        component={FavoritesNavigatorScreen}
        options={() => ({
          drawerLabel: 'Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        })}
      />
      <MainNavigator.Screen
        name='Reservation'
        component={ReservationNavigatorScreen}
        options={() => ({
          drawerLabel: 'Reservation',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
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
 
class Main extends Component {
   componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  // componentDidUpdate(){
  //    this.props.fetchDishes();
  // this.props.fetchComments();
  //  this.props.fetchPromos();
  //  this.props.fetchLeaders();
  // }
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
export default connect(mapStateToProps, mapDispatchToProps)(Main)