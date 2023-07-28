import { StyleSheet, Text, View,Image,TextInput } from 'react-native'
import React,{useEffect, useState,useMemo, useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalTest from './colorPicker/ModalTest'

import Icons from './iconPicker/Icons'
import TargetTime from './TargetTime/TargetTime.js'

import { addCard } from './redux/cardSlice'
import { useDispatch } from 'react-redux'

const Addactivity = ({ navigation}) => {
  
  const [text, setText] = useState("");
  const [icondata, seticondata] = useState("hourglass")
  const [colordata, setcolordata] = useState('white')
  const [targetTime, settargetTime] = useState({h:0,m:0})
 
 const dispatch =useDispatch()

  const gettingIconData=(ICON)=>{ 
    seticondata(ICON);
  }
  const gettingTargetTime=(time)=>{ 
    settargetTime(time)
    
  }
  const gettingColorDataMemo =useCallback(
      function gettingColorData(color){
        //console.log(color); 
       return( setcolordata(color))
    },[colordata]
  )
  const SaveBtn=()=>{
  if(text){
    dispatch(addCard({
      title:text,icon:icondata,color:colordata,targetTime:targetTime
    }))
  }
  else{
    alert('activity name required')
  }
    navigation.navigate('Stopwatch')
  }
 
  return (
    
    <SafeAreaView style={styles.Mconatiner}>
     <View style={styles.container}>
      
        {/* INPUT FIELD */}
        <View style={styles.field1}>
        
          {/* <Text style={{fontSize:20,fontWeight:'600',color:'white'}}>Activity name</Text> */}
        <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text)=>setText(text)}
        placeholder="ENTER ACTIVITY NAME" 
      />
        </View>

        {/* SET A ICON */}
        <View style={styles.field}>
        <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Set Icon</Text>
        <Icons gettingIconData={gettingIconData}/>
        </View>

        {/* SET A COLOR */}
        <View style={styles.field}>
        <ModalTest gettingColorData={gettingColorDataMemo}/>
        </View>
        
        {/* SET TARGET TIME */}
        <View style={styles.field}>
        <Text style={{fontSize:18,fontWeight:'600',color:'white'}}>Set Target Time</Text>
          <TargetTime gettingTargetTime={gettingTargetTime}/>
        </View>

        {/* SAVING THE DATA */}
        <TouchableOpacity style={styles.savebtn} 
        onPress={SaveBtn}>
          <Text style={{color:'#3167A6',fontSize:28,marginBottom:4}}>SAVE</Text>
        </TouchableOpacity>
     </View>
     <View>
      <Image source={require('../../assets/imgused/blackwhite-clock-removebg-preview.png')} style={styles.img}></Image>
     </View>
    </SafeAreaView>
  )
}
 
export default Addactivity

const styles = StyleSheet.create({
  Mconatiner:{
    backgroundColor:'#1F2A37',flex:1,
  
    alignItems: 'center',
  },
  container:{
    backgroundColor:'#171F28',
    height:400,width:350,
    display:'flex',alignItems:'center',padding:20,justifyContent:'space-around',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,

elevation: 16,
    
  },
  field1:{
    width:300,height:50,borderRadius:30,backgroundColor:'#3167A6',
    display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
    paddingHorizontal:12
  },
  field:{
    width:300,height:50,borderRadius:30,backgroundColor:'#3167A6',
    display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',
    paddingHorizontal:12
  },
  savebtn:{
    width:120,height:45,backgroundColor:'#F2F8FF',borderRadius:100,borderColor:'#3167A6',borderWidth:2,
    shadowColor: "#000",justifyContent:'center',alignItems:'center',
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
  },
  img:{
    width:270,height:270,opacity:0.4,
    
  },
  input: {
    borderBottomWidth:2,borderBottomColor:'#fff',
    fontSize:18,
    color:'#fff',
    width:260
   
  }
})