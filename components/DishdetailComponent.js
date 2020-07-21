import React, { Component } from 'react'
import {
  Button, FlatList,
  Modal, ScrollView,
  StyleSheet, Text,
  View
} from 'react-native'
import { Card, Icon, Input, Rating } from 'react-native-elements'
import { connect } from 'react-redux'
import { postComment, postFavorite } from '../redux/ActionCreators'
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
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
})
function RenderDish(props) {
  const dish = props.dish

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() =>
            props.favorite ? console.log('Already favorite') : props.onPress()
          }
        />
        <Icon
          raised
          reverse
          name='pencil'
          type='font-awesome'
          color='#512DA8'
          onPress={() => props.toggleModal()}
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
      favorites: [],
      showModal: false,
      rating: 5,
      author: '',
      comment: '',
    }
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId)
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }
  handleComment(dishId) {
    console.log(JSON.stringify(this.state))
    this.toggleModal()
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment,
    )
  }
  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      comment: '',
      showModal: false,
    })
  }

  static navigationOptions = {
    title: 'Dish Details',
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '')
    console.log('====================================');
    console.log(this.props)
    console.log('====================================');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId,
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal()
            this.resetForm()
          }}
          onRequestClose={() => {
            this.toggleModal()
            this.resetForm()
          }}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              stepSize='{1}'
              value='{5}'
              onFinishRating={(value) => this.setState({ rating: value })}
            />
            <Input
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(value) => this.setState({ author: value })}
            />
            <Input
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              onChangeText={(value) => this.setState({ comment: value })}
            />
            <View style={styles.formRow}>
              <Button
                onPress={() => this.handleComment(dishId)}
                title='SUBMIT'
                color='#512DA8'
              />
            </View>
            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.toggleModal()
                  this.resetForm()
                }}
                color='#888'
                title='CANCEL'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);