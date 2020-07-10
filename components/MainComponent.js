<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Dishdetail from './DishdetailComponent.js'
import Menu from './MenuComponent'


const MenuNavigator = createStackNavigator()

 function NavigationInitializer(){
   return (
     <MenuNavigator.Navigator
       initialRouteName='Menu'
       screenOptions={{
         headerStyle: {
           backgroundColor: '#512DA8',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           color: '#fff',
         },
       }}
     >
       <MenuNavigator.Screen name='Menu' component={Menu} options={{ title: 'Menu' }}/>
       <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} options={{ headerTitle: 'Dish Detail' }}/>
     </MenuNavigator.Navigator>
   )
 }

export default class Main extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <NavigationInitializer />
      </NavigationContainer>
    )
  }
}
=======
import React, { Component } from 'react'
import { View } from 'react-native'
import { DISHES } from '../shared/dishes'
import Dishdetail from './DIshdetailComponent'
import Menu from './MenuComponent'

export default class Main extends Component {
                 constructor(props) {
                   super(props)

                   this.state = {
                     dishes: DISHES,
                     selectedDish: null,
                   }
                 }
                 onDishSelect(dishId) {
                   this.setState({ selectedDish: dishId })
                 }

                 render() {
                   return (
                     <View style={{ flex: 1 }}>
                       <Menu
                         dishes={this.state.dishes}
                         onPress={(dishId) => this.onDishSelect(dishId)}
                       />
                       <Dishdetail
                         dish={
                           this.state.dishes.filter(
                             (dish) => dish.id === this.state.selectedDish,
                           )[0]
                         }
                       />
                     </View>
                   )
                 }
               }
>>>>>>> d171971752561053eb5ad775b617074cbb837a35
