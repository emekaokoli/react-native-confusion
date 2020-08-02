import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store'
import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, CheckBox, Icon, Input } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      remember: false,
    }
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      let userinfo = JSON.parse(userdata)
      if (userinfo) {
        this.setState({ username: userinfo.username })
        this.setState({ password: userinfo.password })
        this.setState({ remember: true })
      }
    })
  }

  handleLogin() {
    console.log(JSON.stringify(this.state))
    if (this.state.remember)
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      ).catch((error) => console.log('Could not save user info', error))
    else
      SecureStore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error),
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title='Login'
            icon={
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color='white'
              />
            }
            buttonStyle={{
              backgroundColor: '#512DA8',
            }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            title='Register'
            clear
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='blue'
              />
            }
            titleStyle={{
              color: 'blue',
            }}
          />
        </View>
      </View>
    )
  }
}

class RegisterScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png',
    }
  }
  // componentDidMount() {
  //   this.getImageFromGallery()
  // }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    )

    if (
      cameraPermission.status === 'granted' &&
      cameraRollPermission.status === 'granted'
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })
      if (!capturedImage.cancelled) {
        console.log(capturedImage)
        this.processImage(capturedImage.uri)
      }
    }
  }

  // getImageFromGallery = () => {
    getImageFromGallery = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync()
      // if (pickerResult.cancelled === true) {
      //   return
      // }
      // if (pickerResult !== null) {

      // }
      console.log(pickerResult)
      this.processImage(pickerResult.uri)
    }
  //}
  processImage = async (imageUri) => {
    const processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 300, height: 300 } }],
      { format: 'png', compress: 0.85 },
    )
    console.log(processedImage)
    this.setState({ imageUrl: processedImage.uri })
  }

  handleRegister = () => {
    console.log(JSON.stringify(this.state))
    if (this.state.remember)
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      ).catch((error) => console.log('Could not save user info', error))
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image}
            />
            <View style={styles.buttonsub}>
              <View styles={styles.formButton}>
                <Button
                  title='Camera'
                  onPress={this.getImageFromCamera}
                  styles={styles.formButton}
                />
              </View>
              <Button
                title='Gallery'
                onPress={this.getImageFromGallery}
                styles={styles.buttonsub}
              />
            </View>
            {/* <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity> */}
          </View>
          <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='First Name'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(lastname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Last Name'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title='Remember Me'
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title='Register'
              icon={
                <Icon
                  name='user-plus'
                  type='font-awesome'
                  size={24}
                  color='white'
                />
              }
              buttonStyle={{
                backgroundColor: '#512DA8',
              }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const LoginOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name='sign-in'
      type='font-awesome'
      size={24}
      iconStyle={{ color: tintColor }}
    />
  ),
}
const RegisterOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name='user-plus'
      type='font-awesome'
      size={24}
      iconStyle={{ color: tintColor }}
    />
  ),
}
const Tab = createBottomTabNavigator()

export default function Login() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Login' component={LoginScreen} options={LoginOptions} />
      <Tab.Screen
        name='Register'
        component={RegisterScreen}
        options={RegisterOptions}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
  buttonsub:{
    justifyContent:'space-between',
    flexDirection:'row'

  }
})
