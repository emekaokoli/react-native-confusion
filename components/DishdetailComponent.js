import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  }
}

function RenderDish({ dish, favorite, onPress }) {
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
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }
  markFavorite(dishId) {
    this.setState({ favorites: this.state.favorites.concat(dishId) })
  }
  render() {
    const dishId = this.props.route.params.dishId
    return (
      <SafeAreaView>
        <ScrollView>
          <RenderDish
            dish={this.props.dishes.dishes[+dishId]}
            favorite={this.state.favorites.some((el) => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId,
            )}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default connect(mapStateToProps)(Dishdetail)