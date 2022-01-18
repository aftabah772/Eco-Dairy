import React, { useState,useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image,FlatList } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-elements';
import { getDatabase, ref, set,onValue,remove, query,equalTo, orderByChild,get } from "firebase/database";
// Firebase Getting Data
import fireDb from './Firebase-config'
import { configureFonts } from 'react-native-paper';
const db = getDatabase();
export default function Home({route, navigation }){
  // Order information
  const [Order, setOrder] = useState({})
  const [unshipped, setunshipped] = useState()
  useEffect(()=>{
    fireDb.child('Order').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        setOrder({...snapshot.val()})
        
      }
      else{
        setOrder({})
      }
    })
    return()=>{
      setOrder({})
    }
  },[])
  
// filtering

const unshippedOrders = async () => {
  const readNewLogEntries = await get(
    query(ref(db, "Order"), orderByChild("shipped"), equalTo("false"))
  );
  setunshipped(readNewLogEntries.size)
};
unshippedOrders()





  // Products Information

  const [product, setproduct] = useState({})
  useEffect(()=>{
    fireDb.child('products').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        setproduct({...snapshot.val()})
        
      }
    })
  },[])
  // Users information
  const [Users, setUsers] = useState()
  const Totalusers = async () => {
    const readNewLogEntries = await get(
      query(ref(db, "users"))
    );
    setUsers(readNewLogEntries.size)
  };
  Totalusers()
    return (
      <ScrollView>
        
    <Text style={styles.TopText}> Orders </Text>
      <View style={styles.card}>
        <Text style={styles.title}> Total Orders : {Object.keys(Order).length} </Text>
        <Text style={styles.data}> Unshiped orders : {unshipped}</Text>
        <Text style={styles.data}> Shipped : {Object.keys(Order).length-unshipped} </Text>
      </View>
      <Text style={styles.TopText}> Products </Text>
      <View style={styles.card}>
        <Text style={styles.title}> Total Products : {Object.keys(product).length} </Text>
      </View>
      <Text style={styles.TopText}> Users </Text>
      <View style={styles.card}>
        <Text style={styles.title}> Total Customers : {Users} </Text>
      </View>
      
    </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      alignSelf: 'center'
    },
    TopText: {
      color:'green',
      fontSize:24,
      fontWeight:'bold'
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
    tinyLogo: {
      width: 50,
      height: 50,
    },
    
  });
  