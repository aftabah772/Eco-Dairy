import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View,  Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import fireDb from './Firebase-config'
import { getDatabase, ref, set,onValue } from "firebase/database";
const OForm = (navigation) => {
  // states
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [productname, setproductname] = useState('');
  const [price, setprice] = useState();
  const [address, setaddress] = useState('');
// getting total
const [order, setData] = useState({})
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
const uniqueid=()=>{
   const value= (Object.keys(order).length)+1
   return 'order'+value
}
uniqueid()
// posting data
  function AddData(userId, Name, email,address,price,product){
  const db = getDatabase();
  set(ref(db, 'Order/' + userId), {
    OrderID: uniqueid(),
    shipped:'false',
    email: email,
    Name : Name,
    address : address,
    price : price,
    product : product
  });
}

  return (
    <View style={{margin:30}}>
      <Text style={styles.Title}> Place an Order </Text>
       <View>
        <TextInput
      mode='outlined'
      label="Product name"
      value={productname}
      onChangeText={productname => setproductname(productname)}
    />
    <TextInput
    mode='outlined'
      label="Price"
      value={price}
      onChangeText={price => setprice(price)}
    />
    <TextInput
    mode='outlined'
      label="User Name"
      value={Name}
      onChangeText={Name => setName(Name)}
    />
    <TextInput
    mode='outlined'
      label="Address"
      value={address}
      onChangeText={address => setaddress(address)}
    />
    <TextInput
    mode='outlined'
      label="email"
      value={email}
      onChangeText={email => setemail(email)}
    />
      </View>
      <Button title="Add Order" buttonStyle={styles.button} containerStyle={styles.btnconstyle}
onPress={() =>AddData(uniqueid(),Name,email,address,price,productname)}/>
    </View>
  );
};
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
      color: 'black',
  
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
    
  });
  
  

export default OForm;