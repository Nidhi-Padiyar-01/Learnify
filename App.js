import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Login from './App/Pages/Login'
import { AuthContext } from './App/Context/AuthContext'
import Home from './App/Pages/Home';

export default function App() {
const [userData,setUserData]=useState();
useEffect(()=>{
console.log()
})
  return (
    <View>
      <AuthContext.Provider 
      value={{userData,setUserData}}>
      
      {userData?<Home/>:<Login/>}
      
      </AuthContext.Provider>
    </View>
  )
}