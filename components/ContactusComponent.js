import React from 'react'
import { Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'


export default function Contact() {
  return (
    <Card title='Our Address'>
      <Text style={{ margin: 10 }}>
        <Icon name='home' type='font-awesome' size={26} />
        121, Clear Water Bay Road Clear Water Bay, Kowloon H ONG KONG
        <Icon name='phone' type='font-awesome' />
        Tel: +852 1234 5678
        <Icon name='fax' type='font-awesome' />
        Fax: +852 8765 4321
        <Icon name='envelope-o' type='font-awesome' />
        Email: confusion@food.net
      </Text>
    </Card>
  )
  
}