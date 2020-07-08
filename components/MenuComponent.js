import React from 'react'
import { FlatList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

export default function Menu(props) {
  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: require('./images/uthappizza.png'), }}
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
      <Text>testing 123</Text>
    </>
  )
}
