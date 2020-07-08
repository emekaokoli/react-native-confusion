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