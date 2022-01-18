import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
// Output
// <CustomCard brand='test' ProductDes='the description' price='100' quantity='20' />
export default function CustomCard(props){
  return(
    <>
  <Card>
          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <Card.Title>{props.brand}</Card.Title>
            <View style={{flexDirection:'row'}}>
          
           <Text>edit delete </Text>
         </View>
          
          </View>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0, height:100, width:200}}
              source={{
                uri:
                  'https://cdn.mos.cms.futurecdn.net/fpS3om4E6gTMo4JHC9nKAQ-970-80.jpg.webp',
              }}
              
            />
            <Text style={{ marginBottom: 10 }}>
              {props.ProductDes}
            </Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>{props.price} </Text>
            <Text>{props.quantity} </Text>
            </View>
          </Card>


          </>
          )
}
// Other Card
{/* <Card>
          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <Card.Title>Your Details</Card.Title>
            <View style={{flexDirection:'row'}}>
          
           <Text>edit </Text>
         </View>
          
          </View>
            <Card.Divider />
            <Text style={{ marginBottom: 10 }}>
              Full address
              Name
              Email
              Phone number
            </Text>
           
          </Card> */}