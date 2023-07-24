import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput,StyleSheet,TouchableOpacity,Alert,FlatList } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from './redux/cardSlice';
import Timer from './Timer';


const Card_original = () => {

  const dispatch=useDispatch()
  const data=useSelector((state)=>state.cards)
  const navigation = useNavigation(); 
  const [time, setTime] = useState(data.timer); //no this is undefined
  const [isRunning, setisRunning] = useState(false);
  const [interv, setInterv] = useState();
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
  const h = () => {
    if(time.h === 0){
      return ''; 
    }else {
      return <Text style= {styles.timerNUM}>{time.h}:</Text>;
    }
  }
  // WHENEVER TIME IS SET FROM EDIT ACITIVITY RESET STOPWATCH
useEffect(() => {
  setTime(data.timer)
}, [data.timer]
)

const run = () => {

 if(updatedM ==60){
   updatedH++;
   updatedM = 0;
 }
 if(updatedS == 60){
   updatedS = 0;
   updatedM++;
 }
 updatedS++;
return setTime({ s:updatedS, m:updatedM, h:updatedH});
};
 const start = async(id) => {
  
};
const stop = async() => {
  clearInterval(interv);
  setStatus(0);
 // console.log('stop is called');
  sendTableData()
  //await BackgroundService.stop();
  // settimerOn(false)
};
  
  return (
    <View>
        {/* in future will turn it to draggable flatList */}
      <FlatList
        data={data}
        renderItem={(e)=>{
            return(
        <View style={{display:'flex',alignItems:'center',marginBottom:10}}>
        <View style={styles.Card}>

      {/* ICON AND NAME */}
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',
        justifyContent:'flex-start',margin:5}}>
        <Ionicons name={e.item.icon} size={23} color={e.item.color}/>
        <Text style={{color:e.item.color,fontSize:20,textDecorationLine:'underline',marginLeft:12}}>
            {e.item.title}
        </Text>
         
      </View>
    {/* SET TARGET TIME */}
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',
      justifyContent:'center',width:120,position:'absolute',bottom:10,right:0,
    }}>
      <MaterialCommunityIcons name='target' size={23} color='white'/>
        {((parseInt(e.item.timer.h*60)+parseInt(e.item.timer.m))
        <(parseInt(e.item.targetTime.h*60)
        +parseInt(e.item.targetTime.m)))
        || (e.item.targetTime.h==0&&e.item.targetTime.m==0)
        ?
          <Text style={{color:'white'}}>
        {} {e.item.targetTime.h}hr {}
        {e.item.targetTime.m}min
        </Text>
        :<Text style={{color:'white'}}>completed!</Text>
      }
    
    
      </View>
      {/* EDIT BUTTON */}
      <View style={{position:'absolute',right:40,top:5}}>
      <MaterialCommunityIcons name="square-edit-outline" size={23} color='white'
      onPress={()=>navigation.navigate("Edit-Activity",{id:e.item.id})}/>
    </View>
    {/* DELETE BUTTON */}
    <View style={{position:'absolute',right:10,top:5}}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color='white'
       onPress={()=>handleDelete(e.item.id)}/>
    </View>
  {/* TIMER STOP ON OFF */}
     {/* START AND STOP*/}
     <View style={{position:'absolute'}}>
    {(e.item.isRunning==false)? 
        <TouchableOpacity style={styles.startbtn} onPress={()=>start(e.item.id)}> 
          <Text style={{marginLeft:18,marginTop:12}}>
            <FontAwesome5 name='play' size={30} color='#297C02'/> 
            </Text>  
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => stop(e.item.id)}>
        <View style={[styles.stopbtn,{flex:1,justifyContent:'center',alignItems:'center'}]}>
        <FontAwesome5 name='square-full' size={20} color='#18181a'/> 
        </View>
    </TouchableOpacity>
      }
           </View>
      </View>
      
      </View>
            )
        }}
      />
      
      
    </View>
  )
}

export default Card_original

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