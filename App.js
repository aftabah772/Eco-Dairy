import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import ManageOrdScreen from './components/ManageOrd';
import ManageProdScreen from './components/ManageProd';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  NativeBaseProvider} from "native-base"
import ManageUserScreen from './components/ManageUser'
import Home from './components/Home'
import Productupdateform from './components/Productupdateform';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import ProductForm from './components/Productform'
import OForm from './components/OrderForm'
function HomeStack() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  );
}
function ProductStack() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Products" component={ManageProdScreen}/>
      <Stack.Screen name="Product Form" component={ProductForm}/>
      <Stack.Screen name="Product update Form" component={Productupdateform}/>
    </Stack.Navigator>
  );
}
function OrderStack() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Orders" component={ManageOrdScreen}/>
      <Stack.Screen name="Order Form" component={OForm}/>
    </Stack.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Cart">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Manage Users" component={ManageUserScreen} />
      <Drawer.Screen name="Manage Products" component={ProductStack} />
      <Drawer.Screen name="Manage Orders" component={OrderStack} />
    </Drawer.Navigator>
  );
}



export default function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
    <MyDrawer />
  </NavigationContainer>
  </NativeBaseProvider>
  
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignSelf: 'center'
  },
  history: {
    
    backgroundColor:'white'
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
  button: {
    width: 200,
    marginTop: 20,
    marginLeft:5,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center'
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
  
});

