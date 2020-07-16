import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';



const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  }
}


function History() {
  return (
    <Card title='Our History'>
      <Text style={{ margin: 10 }}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us. The restaurant traces its
        humble beginnings to The Frying Pan, a successful chain started by our
        CEO, Mr. Peter Pan, that featured for the first time the world's best
        cuisines in a pan.
      </Text>
    </Card>
  )
}
function RenderLeader({ item, index }) {
  if (item != null) {
    
    return (
      <>
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          titleStyle={{ fontWeight: 'bold', color: '#512DA8' }}
          hideChevron={true}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      </>
      // <Card title='Corporate Leadership'>
      //   {leader.map((lead) => {
      //     return (
      //       <ListItem
      //         key={index}
      //         title={lead.name}
      //         subtitle={lead.description}
      //         titleStyle={{ fontWeight: 'bold', color: '#512DA8' }}
      //         hideChevron={true}
      //         leftAvatar={{
      //           source: require('./images/alberto.png'),
      //         }}
      //       />
      //     )
      //   })}
      // </Card>
    )
  } else {
    return <View></View>
  }
}

class About extends Component{
  
  render() {
       
        return (
          <>
            <SafeAreaView style={{ flex: 1 }}>
              {/* <ScrollView> */}
              <History />
              <Card title='Corporate Leadership'>
                <FlatList
                  data={this.props.leaders.leaders}
                  renderItem={RenderLeader}
                  keyExtractor={(leader) => leader.id.toString()}
               />
              </Card>

              {/* </ScrollView> */}
            </SafeAreaView>
          </>
        )
    }
}
export default connect(mapStateToProps)(About)