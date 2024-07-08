import { View, Text,Image,StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AuthContext } from '../Context/AuthContext';


export default function Login() {
  WebBrowser.maybeCompleteAuthSession();
  const[accessToken,setAccessToken]=useState();
  const[userInfo,setUserInfo]=useState();
  const {userData,setUserData}=useContext(AuthContext)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '55959786226-e9frfu2d60hu3lt653blch82e4rhjsnp.apps.googleusercontent.com',
    expoClientId:'288087915980-ent8ogj40a6k1vih6gcbnbbr1vccl3o9.apps.googleusercontent.com'
  });

  useEffect(()=>{
    if(response?.type=='success'){
      setAccessToken(response.authentication.accessToken);
      
      getUserData();
    }
  },[response]);

  const getUserData=async()=>{
    try {
      const resp = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
        }
      );
  

      const user = await resp.json();
      console.log("user Details",user) 
      setUserInfo(user); 
      setUserData(user)
      // setUserData(user);
      await Services.setUserAuth(user);
    } catch (error) {
      // Add your own error handler here
    }

  }


  return (
    <View>
      <Image source={require('./../Assets/Images/Login.png')}/>
      <View style={ styles.container}>
      <Text style={styles.welcomeText}>Welcome to Learnify</Text>
      <Text style={{textAlign:'center',marginTop:80,fontSize:20,}}>Login/Signup</Text>
      <TouchableOpacity style={styles.button} 
      onPress={()=>promptAsync()}>
      <Ionicons name="logo-google" size={24} color="white" style={{marginRight:10}}/>
        <Text style={{color:Colors.white}}>Sign in with Google</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        paddingTop:40,
        marginTop:-25,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    welcomeText:{
    fontSize:35,
    textAlign:'center',
    fontWeight:'bold',
    },
    button:{
        backgroundColor:Colors.primary,
        padding:10,
        margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:10
    }
})