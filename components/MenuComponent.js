import React, { Component } from 'react'
import { FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  }
}

class Menu extends Component {
  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            //  onPress={() => navigate('Dishdetail', { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
            onPress={() =>
              this.props.navigation.navigate({
                name: 'Dishdetail',
                params: { screen: 'Dishdetail', dishId: item.id },
              })
            }
            leftAvatar={{ source: require('./images/uthappizza.png') }}
          />
        </Animatable.View>
      )
      
    }
    // const { navigate } = this.props.navigation;
    if (this.props.dishes.isLoading) {
      return <Loading />
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{props.dishes.errMess}</Text>
        </View>
      )
    } else {
      return (
        <>
          <FlatList
            data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )
    }
  }
}
export default connect(mapStateToProps)(Menu)
