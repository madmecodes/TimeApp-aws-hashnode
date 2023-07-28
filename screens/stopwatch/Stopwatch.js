import { StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
//import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from './Card'
import { useSelector } from 'react-redux'
import { defaultTemplate } from './redux/cardSlice'
import { useDispatch } from 'react-redux'

const Stopwatch = ({navigation}) => {
  const dispatch =useDispatch()
  const data=useSelector((state)=>state.cards)

  const DefaultTemplate=()=>{
    dispatch(defaultTemplate())
  }
  
  return (
    
    <SafeAreaView style={styles.Mconatiner}>
    
    {/* DISPLAYING CARD HERE */}
    { data.length==0? 
    <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:20}}>
    <Text style={{color:'white',fontSize:20,textAlign:'center',width:205}}>
      CLICK ON "+" ICON TO CREATE ACTIVITIES OR
      </Text>
      <TouchableOpacity style={styles.defaultTemplateBtn} onPress={DefaultTemplate}>
        <Text style={{color:'white',fontSize:19,fontWeight:'700',padding:12}}>USE DEFAULT TEMPLATE</Text>
      </TouchableOpacity>
      </View> 
     :
    <Card data={data}/>
    //<Card_original data={data}/>
    }
    {/* CREATE BUTTON */}
    <View style={[styles.conatiner]}>
    <TouchableOpacity
        style={styles.btn} 
        onPress={()=>navigation.navigate("Add-Activity")}
      >
     <Text style={{fontSize:50,color:'#fff'}}>+</Text> 
      </TouchableOpacity>
    </View>
    
    </SafeAreaView>
  )
}

export default Stopwatch

const styles = StyleSheet.create({
   Mconatiner:{
    backgroundColor:'#1F2A37',flex:1,padding:20
  },
  conatiner:{
  flex:1,display:'flex',bottom:10,right:10,position:'absolute',
  alignItems:'center',
  width:70,height:70,borderRadius:100,
  backgroundColor:'#083365',
  margin:5,
  shadowColor: "#000",
  shadowOffset: {
	width: 1,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,
elevation: 5,
  },
  btn:{
    width:45,flex:1,justifyContent:'center',alignItems:'center',
    width:70,height:70,borderRadius:100,
  } ,
  Card:{
    width:330,height:105,backgroundColor:'#121820',
      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 2,},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position:'relative'
  },
  defaultTemplateBtn:{
    backgroundColor:'#0E498F',
    borderRadius:100,
    shadowColor: "#000",margin:4,
    shadowOffset: {
	width: 0,
	height: 2,
    },
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,justifyContent:'center',alignSelf:'center'
   
  }
})
