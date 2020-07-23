import React, { Component } from 'react'
import {
  Alert,
  FlatList,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import * as Animatable from 'react-native-animatable'
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

  handleViewRef = (ref) => (this.view = ref)

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true
    else return false
  }
  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) return true
    else return false
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? 'finished' : 'cancelled'),
        )
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState)
      if (recognizeDrag(gestureState))
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress()
              },
            },
          ],
          { cancelable: false },
        )
      if (recognizeComment(gestureState)) props.openModal()
      return true
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? 'finished' : 'cancelled'),
        )
    },
  })

  if (dish != null) {
    return (
      <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.buttons}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              onPress={() =>
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name='pencil'
              type='font-awesome'
              color='#512DA8'
              onPress={() => props.openModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    )
  } else {
    return <View></View>
  }
}

const formatDate = (string) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(string).toLocaleDateString([], options)
}

function RenderComments(props) {
  const comments = props.comments
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          style={{ fontSize: 12, alignItems: 'flex-start' }}
          imageSize={15}
          readonly
          startingValue={item.rating}
        />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + formatDate(item.date)}{' '}
        </Text>
      </View>
    )
  }
  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  )
}
class Dishdetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: [],
      rating: 0,
      author: '',
      comment: '',
      modalVisible: false,
    }
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId)
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  handleComment(dishId) {
    console.log(JSON.stringify(this.state))

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
    })
  }

  render() {
    const dishId = this.props.route.params.dishId

    const { modalVisible } = this.state
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          openModal={() => this.setModalVisible(true)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId,
          )}
        />
        <View style={{ ...styles.modal }}>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={modalVisible}
            // onDismiss={() => {modalVisible}}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible)
            }}
            useNativeDriver={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Rating
                  showRating
                  minValue={1}
                  startingValue={1}
                  onFinishRating={(value) => this.setState({ rating: value })}
                  style={{ ...styles.modalText }}
                />
                <Text>Author:</Text>
                <Input
                  leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                  onChangeText={(value) => this.setState({ author: value })}
                />
                <Text>Comment:</Text>
                <Input
                  leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                  onChangeText={(value) => this.setState({ comment: value })}
                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#512DA8' }}
                  onPress={() => {
                    this.handleComment(dishId)
                    this.setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#888' }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                {/* <View style={styles.formRow}>
              <Button
                onPress={() => this.handleComment(dishId)}
                title=''
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
            </View> */}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 13,
    elevation: 2,
    margin: 20,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalText: {
    marginBottom: 30,
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail)
