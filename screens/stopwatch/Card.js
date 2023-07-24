import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { deleteCard } from './redux/cardSlice';
import { timerStopwatch } from './redux/cardSlice';

const Card = () => {
  const data=useSelector((state)=>state.cards)
  const navigation = useNavigation(); 
  const dispatch=useDispatch() 
  const [stopwatches, setStopwatches] = useState(data);
  
  const handleDelete=(ID)=>{
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this Card?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(deleteCard({id:ID}))
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }
  
  const startStopwatch = index => {
    let updatedStopwatches = [...stopwatches];
    updatedStopwatches.forEach(stopwatch => {
      stopwatch.isRunning = false;
    });
    updatedStopwatches[index].isRunning = true;
    setStopwatches(updatedStopwatches);
  };

  const stopStopwatch = index => {
    let updatedStopwatches = [...stopwatches];
    updatedStopwatches[index].isRunning = false;
    setStopwatches(updatedStopwatches);

  };
  
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      let updatedStopwatches = [...stopwatches];
      updatedStopwatches.forEach(stopwatch => {
        if (stopwatch.isRunning) {
          stopwatch.timeElapsed++
          dispatch(timerStopwatch({id:stopwatch.id,timeElapsed:stopwatch.timeElapsed}))
          console.log(stopwatch.id);
          setStopwatches(updatedStopwatches);
        }
      });
    }, 750);
    return () => clearInterval(intervalId);
  }, [stopwatches]);
  
  useEffect(()=>{
    setStopwatches(data);
  },[,data.length])

  
  const formatTime = timeInSeconds => {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = timeInSeconds % 60;
    return `${hours==0?'':`${hours}:`}${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  return (
    <ScrollView>
    <View>
      {stopwatches.map((e, index) => (
        <View style={{display:'flex',alignItems:'center',marginBottom:10}} key={index}>
        <View style={styles.Card}>
      {/* ICON,TITLE, AND COLOR */} 
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',
        justifyContent:'flex-start',margin:5}}>
        <Ionicons name={e.icon} size={23} color={e.color}/>
        <Text style={{color:e.color,fontSize:20,textDecorationLine:'underline',marginLeft:12}}>
            {e.title}
        </Text>
        </View>
      {/* EDIT BUTTON */}
            <View style={{position:'absolute',right:40,top:5}}>
      <MaterialCommunityIcons name="square-edit-outline" size={23} color='white'
      onPress={()=>navigation.navigate("Edit-Activity",{id:e.id})}/>
         </View>
      {/* DELETE BUTTON */}
         <View style={{position:'absolute',right:10,top:5}}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color='white'
       onPress={()=>handleDelete(e.id)}/>
         </View>
      {/* SET TARGET TIME */}
         <View style={{display:'flex',flexDirection:'row',alignItems:'center',
      justifyContent:'center',width:120,position:'absolute',bottom:10,right:0,}}>
      <MaterialCommunityIcons name='target' size={23} color='white'/>
        {((parseInt(e.timer.h*60)+parseInt(e.timer.m))
        <(parseInt(e.targetTime.h*60)
        +parseInt(e.targetTime.m)))
        || (e.targetTime.h==0&&e.targetTime.m==0)
        ?
          <Text style={{color:'white'}}>
        {} {e.targetTime.h}hr {}
        {e.targetTime.m}min
        </Text>
        :<Text style={{color:'white'}}>completed!</Text>
      }
            </View>
       {/* TIMER STOPWATCH 00:00 */}
        <View style={styles.timerContainer}>
        <Text style={styles.timerNUM}>{formatTime(e.timeElapsed)}</Text>
        </View>
        {/* START AND STOP*/}
      <View style={{position:'absolute'}}>
    {(e.isRunning==false)? 
        <TouchableOpacity style={styles.startbtn} onPress={() => startStopwatch(index)}> 
          <Text style={{marginLeft:18,marginTop:12}}>
            <FontAwesome5 name='play' size={30} color='#297C02'/> 
            </Text>  
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => stopStopwatch(index)}>
        <View style={[styles.stopbtn,{flex:1,justifyContent:'center',alignItems:'center'}]}>
        <FontAwesome5 name='square-full' size={20} color='#18181a'/> 
        </View>
    </TouchableOpacity>
      }
           </View>
        </View>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

export default Card;
const styles = StyleSheet.create({
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
    timerMain:{
      flex:1,
    },
    startbtn:{
      width:55,height:55,backgroundColor:'#04254B',borderRadius:100,marginLeft:12,marginTop:40
    },
    stopbtn:{
      width:55,height:55,backgroundColor:'#c42124',borderRadius:100,marginLeft:10,marginTop:40
  
    },
    timerContainer:{
      display:'flex',flexDirection:'row',paddingLeft:80,
    },
    timerNUM:{
      color:'white',fontSize:35
    },
})