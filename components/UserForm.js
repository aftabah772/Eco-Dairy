import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View,  Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import fireDb from './Firebase-config'
// title, ingrediant, quantity, price
const ProductForm = (navigation) => {
  const [Unit, setUnit] = useState('');
  const [title, settitle] = React.useState('');
  const [Ingrediant, setIngrediant] = React.useState('');
  const [Quantity, setQuantity] = React.useState('');
  const [Price, setPrice] = React.useState('');
  

  // getting total
const [product, setproduct] = useState({})
useEffect(()=>{
  fireDb.child('products').on('value',(snapshot)=>{
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
 const value= (Object.keys(product).length)+1
 return 'product'+value
}
uniqueid()
  const Data={
    title:title,
      Ingrediant:Ingrediant,
      Unit:Unit,
      Quantity:Quantity,
      Price:Price,
  }

  // posting data
  function AddData(userId, title, Ingrediant, Unit,Quantity,Price){
    const db = getDatabase();
    const data= null
    set(ref(db, 'products/' + userId), Data);
    alert('Product added to the database')
  }

  return (
    <View style={{margin:30}}>
      <Text style={styles.Title}> Product Form </Text>
       <View>
        <TextInput
      mode='outlined'
      label="Title"
      value={title}
      onChangeText={title => settitle(title)}
    />
    <TextInput
    mode='outlined'
      label="Ingrediant"
      value={Ingrediant}
      onChangeText={Ingrediant => setIngrediant(Ingrediant)}
    />
    <TextInput
    mode='outlined'
      label="Quantity"
      value={Quantity}
      onChangeText={Quantity => setQuantity(Quantity)}
    />
    <Picker
          selectedValue={Unit}
          onValueChange={Unit => setUnit(Unit)}>
          <Picker.Item label="KG" value="KG" />
          <Picker.Item label="Dozen" value="Dozen" />
          <Picker.Item label="Gram" value="Gram" />
        </Picker>
    <TextInput
    mode='outlined'
      label="Price"
      value={Price}
      onChangeText={Price => setPrice(Price)}
    />
      </View>
      <Button title="Add User" buttonStyle={styles.button} containerStyle={styles.btnconstyle}
onPress={() =>AddData(uniqueid(),title,Ingrediant,Unit,Quantity,Price)}/>
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
  
  

export default ProductForm;