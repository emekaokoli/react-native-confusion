<<<<<<< HEAD
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';


 class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }


render() {
 const renderMenuItem = ({ item, index }) => {
  
   return (
     <ListItem
       key={index}
       title={item.name}
       subtitle={item.description}
       hideChevron={true}
       //  onPress={() => navigate('Dishdetail')}
       onPress={() =>
         this.props.navigation.navigate({
           name: 'Dishdetail',
           params: { screen: 'Dishdetail', dishId: item.id },
         })
       }

       leftAvatar={{ source: require('./images/uthappizza.png') }}
     />
   )
 }
  // const { navigate } = this.props.navigation;
 
  return (
    <>
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
       
      />
    </>
  )
  }
}
export default Menu
=======
import React from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

export default function Menu(props) {
  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        onPress={() => props.onPress(item.id)}
        leftAvatar={{ source: require('./images/uthappizza.png') }}
      />
    )
  }

  return (
    <>
      <FlatList
        data={props.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  )
}
>>>>>>> d171971752561053eb5ad775b617074cbb837a35
