import * as Calendar from 'expo-calendar'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  Picker,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import DatePicker from 'react-native-datepicker'

// async function getDefaultCalendarSource() {
//   const calendars = await Calendar.getCalendarsAsync()
//   const defaultCalendars = calendars.filter(
//     (each) => each.source.name === 'Default',
//   )
//   return defaultCalendars[0].source
// }
async function getDefaultCalendarSource() {
  await Calendar.getCalendarsAsync().then((id) => console.log(id))
}
class Reservation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guests: 0,
      smoking: false,
      date: '',
      visible: false,
    }
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS,
    )
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS,
      )
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications')
      }
    }
    return permission
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission().catch((err) => console.Error(err))
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: '#512DA8',
      },
      
    })
    .catch((err) => console.Error(err))
  }

  // toggleModal() {
  //   this.setState({ showModal: !this.state.showModal })
  // }

  handleReservation() {
    const { guests, smoking, date } = this.state
    console.log(JSON.stringify(this.state))
    this.Resevationlert()
    this.addReservationToCalendar(date)
  }
  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR)
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR)
      return
    }
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.REMINDERS)
      return

      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to calendar')
      }
    }
    return permission
  }

  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission()
    var dateMs = Date.parse(date)
    var startDate = new Date(dateMs)
    var endDate = new Date(dateMs + 2 * 60 * 60 * 1000)

    getDefaultCalendarSource()
    const newCalendar = await Calendar.createCalendarAsync({
      title: 'Con Fusion Reservation',
      color: '#512DA8',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: getDefaultCalendarSource.id,
      source: getDefaultCalendarSource,
      name: 'Restauran confusion',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    })

      .then((id) => {
        Calendar.createEventAsync(id, {
          title: 'Con Fusion Table Reservation',
          startDate: startDate,
          endDate: endDate,
          timeZone: 'Asia/Hong_Kong',
          location:
            '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
        }).catch((err) => console.log(err))
        console.log(`calendar ID is: ${id}`)
      })
      .catch((err) => console.log(err))
  }

  handletoggle() {
    this.toggleModal()
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      visible: false,
    })
  }

  Resevationlert = () => {
    const { guests, smoking, date } = this.state

    // const formatDate = (string) => {
    //   var options = { year: 'numeric', month: 'long', day: 'numeric' }
    //   return new Date(string).toLocaleDateString([], options)
    // }

    Alert.alert(
      'Is your Reservation Okay',
      `Number of Guests: ${guests},
        Do you Smoke ?: ${smoking ? 'Yes' : 'No'},
        Date and Time: ${date}`,
      [
        {
          text: 'Cancel',
          onPress: () => this.resetForm(),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.addReservationToCalendar(date);
            this.presentLocalNotification(date);
            this.resetForm()
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    return (
      <Animatable.View
        animation='zoomIn'
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        useNativeDriver={true}
      >
        <ScrollView useNativeDriver={true}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor='#512DA8'
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              useNativeDriver={true}
              style={{ flex: 2, marginRight: 20 }}
              date={this.state.date}
              format=''
              mode='datetime'
              placeholder='select date and Time'
              minDate='2017-01-01'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date: date })
              }}
              useNativeDriver={true}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => this.handleReservation()}
              title='Reserve'
              color='#512DA8'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>

          {/* <Modal
          animationType={'slide'}
          transparent={false}
          hideModalContentWhileAnimating
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={this.toggleModal}
          useNativeDriver={true}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Reservation</Text>
            <Text style={styles.modalText}>
              Number of Guests: {this.state.guests}
            </Text>
            <Text style={styles.modalText}>
              Do you Smoke ?: {this.state.smoking ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.modalText}>
              Date and Time: {this.state.date}
            </Text>

            <Button
              onPress={(showModal) => {
                this.setState({ showModal: showModal })
              }}
              color='#512DA8'
              title='Close'
            />
          </View>
        </Modal> */}
        </ScrollView>
      </Animatable.View>
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
  root: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  input: {
    padding: 8,
    marginBottom: 8,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 4,
  },
})

export default Reservation
