import { MailComposer } from 'expo-mail-composer'
import React from 'react'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Button, Card, Icon } from 'react-native-elements'

export default class Contact extends React.Component {
     sendMail=()=>{
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:',
        })
    }
render(){
    return (
    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
      <Card title='Our Address'>
        <Icon raised name='home' type='font-awesome' color='#512DA8' />
        <Text>
          121, Clear Water Bay Road Clear Water Bay, Kowloon H ONG KONG
        </Text>
        <Icon raised name='phone-square' type='font-awesome' color='#512DA8' />
        <Text>Tel: +852 1234 5678</Text>
        <Icon raised name='fax' type='font-awesome' color='#512DA8' />
        <Text>Fax: +852 8765 4321</Text>
        <Icon raised name='envelope' type='font-awesome' color='#512DA8' />
        <Text>Email: confusion@food.net</Text>
          <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
      </Card>
    </Animatable.View>
  )

}

}
