import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, ScrollView, TextInput,Image,FlatList} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { DataTable, IconButton,Colors } from 'react-native-paper';


// firebase
import fireDb from './Firebase-config'

export default function ManageOrdScreen({route, navigation }){
  const [data, setData] = useState({})
  useEffect(()=>{
    fireDb.child('Order').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        setData({...snapshot.val()})
      }
      else{
        setData({})
      }
    })
    return()=>{
      setData({})
    }
  },[])
console.log(Object.keys(data))
  return (
    <ScrollView>
      <View style={{flexDirection:'row'}}>
      <Button title="Add Order" buttonStyle={styles.button} containerStyle={styles.btnconstyle}
onPress={() =>navigation.navigate('Order Form')}/>

</View>
<Text style={styles.Title}>
All Users
</Text>
<DataTable>
      <DataTable.Header>
        <DataTable.Title>Title</DataTable.Title>
        <DataTable.Title >Price</DataTable.Title>
        <DataTable.Title >Action</DataTable.Title>
      </DataTable.Header>


         
      {Object.keys(data).map((id, index)=>{
    return(
      <>
      <DataTable.Row> 
      <DataTable.Cell>{data[id].email}</DataTable.Cell>
      <DataTable.Cell >{data[id].username}</DataTable.Cell>
      <DataTable.Cell style={{flexDirection:"row", justifyContent:'flex-end'}}>
        <View style={{flexDirection:"row"}}>
        
        <IconButton
        style={{margin:0}}
    icon="pencil"
    color={Colors.blue500}
    size={20}
    onPress={() => console.log('Pressed')}
  />
  <IconButton
        style={{margin:0}}
    icon="delete"
    color={Colors.red500}
    size={20}
    onPress={() => console.log('Pressed')}
  />
  <IconButton
  style={{margin:0, marginRight:0}}
    icon="eye"
    color={Colors.green500}
    size={20}
    onPress={() => console.log('Pressed')}
  />
  </View>
        </DataTable.Cell>
        </DataTable.Row>
      </>
  )
})
  }
    </DataTable>
    </ScrollView>
  );
  }
