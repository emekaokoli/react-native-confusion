import React, { Component } from 'react'
import {
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Field, reduxForm } from 'redux-form'
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


function RenderDish({ dish, favorite, onPress, onRequestClose }) {
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
            favorite ? console.log('Already favorited') : onPress()
          }
          style={{ flex: 1 }}
        />
        <Icon
          raised
          reverse
          name='pencil'
          type='font-awesome'
          color='#512DA8'
          onPress={()=>onRequestClose()}
          style={{ flex: 2 }}
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

const onSubmit = (values) => console.log(values)


class commentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }
renderInput = ({ input: { onChange, ...input }, ...rest }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      {...input}
      {...rest}
    />
  )
}
handleSubmit=(props)=>{
   const { handleSubmit } = props
  console.log(JSON.stringify(values),)
    this.props.postComment(this.props.dishId, values)
    this.toggleModal()

}
 
  
  resetForm() {
    this.setState({
      rating: '',
      author: '',
      message: '',
    })
  }
  // ratingCompleted(rating) {
  //   console.log('Rating is: ' + JSON.stringify(rating))
  // }

  render() {
    return (
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          hideModalContentWhileAnimating
          visible={this.state.modalVisible}
          // onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
          useNativeDriver
        >
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Rating</Text>
            <Rating
              showRating
              fractions='{1}'
              startingValue='{2.1}'
              onFinishRating={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Author</Text>
            <Field
              props={{
                placeholder: 'Author',
              }}
              component={renderInput}
              leftIcon={<Icon name='user' size={24} color='black' />}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Comment</Text>
            <Field
              props={{
                placeholder: 'Comment',
              }}
              component={renderInput}
              leftIcon={<Icon name='user' size={24} color='black' />}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={handleSubmit(onSubmit)}
              title='Submit'
              color='#512DA8'
              accessibilityLabel='submit button'
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onRequestClose={() => this.toggleModal()}
              title='Cancel'
              color='#808080'
              accessibilityLabel='cancel button'
            />
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

class Dishdetail extends Component {
  markFavorite(dishId) {
    this.props.postFavorite(dishId)
  }

  render() {
    const dishId = this.props.route.params.dishId

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onRequestClose={() => this.toggleModal()}
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
export default reduxForm(mapStateToProps, mapDispatchToProps)(Dishdetail)

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
  input: {
    padding: 8,
    marginBottom: 8,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 4,
  },
})
