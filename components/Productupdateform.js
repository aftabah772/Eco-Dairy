import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View,  Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import fireDb from './Firebase-config'
import { getDatabase, ref, set,onValue } from "firebase/database";
const ProductupdateForm = ({route,navigation}, props) => {
// states
const [link, setlink] = useState('');
const [Unit, setUnit] = useState('');
const [title, settitle] = React.useState('');
const [Ingrediant, setIngrediant] = React.useState('');
const [Quantity, setQuantity] = React.useState('');
const [Price, setPrice] = React.useState('');
// getting total
const [product, setData] = useState({})
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
  function AddData(userId){
  const db = getDatabase();
  const data= null
  set(ref(db, 'products/' + userId), {
    link:link,
    title:title,
      Ingrediant:Ingrediant,
      Unit:Unit,
      Quantity:Quantity,
      Price:Price,
  });
}
  return (
    <View style={{margin:30}}>
      <Text style={styles.Title}> Product Update Form </Text>
       <View>
        <TextInput
      mode='outlined'
      label="Title"
      value={JSON.stringify(route.params.title)}
      onChangeText={title => settitle(title)}
    />
    <TextInput
    mode='outlined'
      label="Ingrediant"
      value={JSON.stringify(route.params.Ingrediant)}
      onChangeText={Ingrediant => setIngrediant(Ingrediant)}
    />
    <TextInput
    mode='outlined'
      label="Quantity"
      value={JSON.stringify(route.params.Quantity)}
      onChangeText={Quantity => setQuantity(Quantity)}
      keyboardType='number-pad'
    />
    <Picker
          selectedValue={JSON.stringify(route.params.Unit)}
          onValueChange={Unit => setUnit(Unit)}>
          <Picker.Item label="Select" value="Select" />
          <Picker.Item label="Liter" value="L" />
          <Picker.Item label="Milli Liter" value="ML" />
          <Picker.Item label="KG" value="KG" />
          <Picker.Item label="Dozen" value="Dozen" />
          <Picker.Item label="Gram" value="Gram" />
        </Picker>
    <TextInput
    mode='outlined'
      label="Price"
      value={JSON.stringify(route.params.Price)}
      onChangeText={Price => setPrice(Price)}
      keyboardType='number-pad'
    />
    <TextInput
    mode='outlined'
      label="Image Link"
      value={JSON.stringify(route.params.link)}
      onChangeText={link => setlink(link)}
    />
      </View>
      <Button title="Add User" buttonStyle={styles.button} containerStyle={styles.btnconstyle}
onPress={() =>AddData(uniqueid())}/>
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
  
  

export default ProductupdateForm;