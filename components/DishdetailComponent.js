import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { postFavorite } from '../redux/ActionCreators'
import { baseUrl } from '../shared/baseUrl'


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  }
}

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
})


function RenderDish({ dish, favorite, onPress }) {
  console.log('=================inside render dish===================');
  console.log(favorite);
  console.log('====================================');
  // const dish = props.dish;
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() =>
            favorite ? console.log('Already favorite') : onPress()
          }
        />
      </Card>
    )
  } else {
    return <View></View>
  }
}

function RenderComments(props) {
  const comments = props.comments

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    )
  }

  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  )
}

class Dishdetail extends Component {
  
  markFavorite(dishId) {
    this.props.postFavorite(dishId)
  }

  render() {
    const dishId = this.props.route.params.dishId
    console.log('============for favourites component========================');
    console.log(favorite);
    console.log('====================================');
    return (
      <SafeAreaView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId,
          )}
        />
      </SafeAreaView>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail)
