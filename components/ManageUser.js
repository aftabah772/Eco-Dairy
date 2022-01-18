import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, ScrollView, TextInput,Image,FlatList, Alert,Modal,Pressable} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { DataTable, IconButton,Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDatabase, ref, set,onValue,remove } from "firebase/database";
// Firebase Getting Data
import fireDb from './Firebase-config'
export default function ManageUserScreen({route, navigation }){
   // For Modal
   const [modalVisible, setModalVisible] = useState(false);
   const [modalData, setmodalData] = useState();

  const [data, setData] = useState({})
  useEffect(()=>{
    fireDb.child('users').on('value',(snapshot)=>{
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
// deleting data
const DeleteData=(id)=>{
  const db = getDatabase();
  let myPromise = new Promise(function(myResolve, myReject) {
    remove(ref(db, 'users/' + id))
    
      myResolve(); 
      myReject();
    });
  
  
  myPromise.then(
      function(value) { alert('Data delete successfully!')},
      function(error) { alert('Error in deleting data') }
    );

}
  // Adding users
  function AddData(userId, email, name){
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      id: userId,
      name: name,
      email: email,
    });
  }
  return (
    <ScrollView>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>User Information</Text>
            <Card>
          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <Card.Title>Name</Card.Title>
            <View style={{flexDirection:'row'}}>
          
            <IconButton
        style={{margin:0}}
    icon="close"
    color={Colors.blue500}
    size={20}
    onPress={() => setModalVisible(!modalVisible)}
  />
            
         </View>
          
          </View>
            <Card.Divider />
            <Text style={{ marginBottom: 10 }}>
            email
            </Text>
          </Card>
            
          </View>
        </View>
      </Modal>
      <View style={{flexDirection:'row'}}>
      <Button title="Add Order" buttonStyle={styles.button} containerStyle={styles.btnconstyle}
onPress={() =>navigation.navigate('Order Form')}/>

</View>
<Text style={styles.Title}>
All Users
</Text>
<DataTable>
      <DataTable.Header>
        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title >Name</DataTable.Title>
        <DataTable.Title >Action</DataTable.Title>
      </DataTable.Header>


         
      {Object.keys(data).map((id, index)=>{
    return(
      <>
      <DataTable.Row> 
      <DataTable.Cell>{data[id].email}</DataTable.Cell>
      <DataTable.Cell >{data[id].name}</DataTable.Cell>
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
    onPress={() => DeleteData(data[id].id)}
  />
  <IconButton
  style={{margin:0, marginRight:0}}
    icon="eye"
    color={Colors.green500}
    size={20}
    onPress={() => {
      console.log(data[id])
      setmodalData(data[id]) 
      setModalVisible(true)}}
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


  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      alignSelf: 'center'
    },
    btnconstyle: {
      width: 150,
      marginLeft: 10,
      marginVertical: 10,
    },
    input: {
      borderRadius:40,
      borderColor:'green',
      borderWidth:2,
      height: 40,
      width: 250,
      margin: 12,
      padding: 10,
      alignSelf:'center'
    },
    Title: {
      fontSize: 25,
      
      marginLeft:10,
      color: '#343a40',
  
    },
    TopText: {
      color:'green',
      fontSize:24,
      fontWeight:'bold'
    },
    button: {
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 30,
    },
    
    btnText: {
      color: "white",
      fontSize: 20,
      justifyContent: "center",
      textAlign: "center",
    },
    scrollView: {
      backgroundColor: 'white',
      marginTop:0,
    },
    card: {
       width: '90%',
      padding: 15,
      marginLeft:5,
      marginRight:5,
      marginBottom: 20,
      backgroundColor: 'grey',
      borderRadius: 10,
    },
    title:{
      color:'white',
      fontSize:18,
    },
    data:{
    color: 'white',
    fontSize: 18, 
    fontWeight:"bold", 
    },
    
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  