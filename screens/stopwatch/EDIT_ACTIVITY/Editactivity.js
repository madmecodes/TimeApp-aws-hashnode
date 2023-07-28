import { StyleSheet, Text, View,TextInput,Modal } from 'react-native'
import React,{useEffect, useState, useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalTest from '../colorPicker/ModalTest'
import { useSelector,useDispatch } from 'react-redux'
import { editCard } from '../redux/cardSlice'
 import Icons from '../iconPicker/Icons'
import TargetTime from '../TargetTime/TargetTime'
//import { timerStopwatch } from '../redux/cardSlice'
 
const Editactivity = ({route,navigation}) => {
    const dispatch=useDispatch()
    const id = route.params.id
    const dataArray=useSelector((state)=>state.cards)
    const object = dataArray.find(obj => obj.id === id);

    const [icondata, seticondata] = useState(object.icon)
    const [text, setText] = useState(object.title);
    const [colordata, setcolordata] = useState(object.color)
    const [targetTime, settargetTime] = useState(object.targetTime)
    const [timeElapsedEdit, settimeElapsedEdit] = useState(object.timeElapsed)
    const [timerEdit, settimerEdit] = useState({"h": 0, "m": 0, "s": 0})
  
    function convertTimerToSeconds(timerEdit) {
      const { h, m, s } = timerEdit;
      const totalSeconds = h * 3600 + m * 60 + s;
      return totalSeconds;
    }
    let updatedS = timerEdit.s, updatedM = timerEdit.m, updatedH = timerEdit.h;
  // updating in object timer {h:0,m:0,s:0}
    useEffect(() => {
      let hours = Math.floor(timeElapsedEdit / 3600);
      let minutes = Math.floor((timeElapsedEdit % 3600) / 60);
      let seconds = timeElapsedEdit % 60;
      let timerObject={'h':hours,'m':minutes,'s':seconds}
      settimerEdit(timerObject)
    }, [])    
    //updating in seconds
    useEffect(() => {
      let timeInSec= convertTimerToSeconds(timerEdit);
      settimeElapsedEdit(timeInSec)
    }, [timerEdit])
    

    const increment=(val)=>{
      if(val==='hour'){
        if(updatedH<23){
          
        updatedH++
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})
        
      }
     
       else{
        alert('limit reached')
       }
      }
      if(val==='minute'){
        if(updatedM<59){
        updatedM++
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})}
       else if(updatedM==59){
        updatedM=0
        if(updatedH!=23){updatedH++}else{alert('limit reached')}
        settimerEdit({ s:updatedS, m:updatedM, h:updatedH})
       }
      }
      if(val==='second'){
        if(updatedS<59){
        updatedS++
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})}
       else if(updatedS==59){
        updatedS=0
        if(updatedM!=60){updatedM++}else{alert('limit reached')}
        settimerEdit({ s:updatedS, m:updatedM, h:updatedH})
       }
      }
      
     
     
     
    }
    const decrement=(val)=>{
      if(val==='hour'){
        if(0<updatedH&&updatedH<24){
        updatedH--
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})}
       let timeInSec= convertTimerToSeconds(timerEdit);
      settimeElapsedEdit(timeInSec)
      }
      if(val==='minute'){
        if(0<updatedM&&updatedM<60){
        updatedM--
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})
      }
      }
      if(val==='second'){
        if(0<updatedS&&updatedS<60){
        updatedS--
       settimerEdit({ s:updatedS, m:updatedM, h:updatedH})
      }
      }
    }
    const resetStopWatch=()=>{
      settimerEdit({ s:0, m:0, h:0})
    }
 

    const editBtn=()=>{
      
        dispatch(editCard({
            id:id,title:text,icon:icondata,color:colordata,targetTime:targetTime,
            timeElapsed:timeElapsedEdit
        }))
        //dispatch(timerStopwatch({id:id,timer:timerEdit}))
        navigation.goBack()
    }
  const gettingColorDataMemo =useCallback(
      function gettingColorData(color){
        //console.log(color); 
       return( setcolordata(color))
    },[colordata]
  )
const gettingIconData=(ICON)=>{ 
    seticondata(ICON)  
  }
  const gettingTargetTime=(time)=>{ 
    settargetTime(time)
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
        <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Change Icon</Text>
        <Icons gettingIconData={gettingIconData} icondata={icondata}/>
        </View>

        {/* SET A COLOR */}
        <View style={styles.field}>
        <ModalTest gettingColorData={gettingColorDataMemo} colordata={colordata}/>
        </View>
        
        {/* SET TARGET TIME */}
        <View style={styles.field}>
        <Text style={{fontSize:18,fontWeight:'600',color:'white'}}>Change Target Time</Text>
        <TargetTime gettingTargetTime={gettingTargetTime} targetTime={targetTime}/>
        </View>

        {/* CHANGE STOPWATCH */}
        <View style={styles.changeStopwatch}>
          <View style={styles.currentTime}>
            <Text style={{fontSize:20,color:'white'}}>
              Stopwatch=</Text>
            <Text style={{fontSize:20,color:'white'}}>{timerEdit.h}:</Text>
            <Text style={{fontSize:20,color:'white'}}>{(timerEdit.m >= 10)? timerEdit.m : "0"+ timerEdit.m}:</Text>
            <Text style={{fontSize:20,color:'white'}}>{(timerEdit.s >= 10)? timerEdit.s : "0"+ timerEdit.s}</Text>
          </View>
          <Text style={{fontSize:16,color:'white',textAlign:'center'}}>MISSED TO ON YOUR WATCH?</Text>

          <View>
            <View style={styles.changeButtonRow}>
            <TouchableOpacity style={styles.changeButton} onPress={()=>increment('hour')}>
            <Text style={{color:'white',fontWeight:'700',fontSize:18,textAlign:'center'}}>+1hr</Text>
            </TouchableOpacity>
            <View  style={[styles.changeButton]}>
              <Text style={{color:'white',fontWeight:'700',fontSize:22,textAlign:'center'}}>{timerEdit.h}</Text>
              </View>
            <TouchableOpacity style={styles.changeButton} onPress={()=>decrement('hour')} >
            <Text style={{color:'white',fontWeight:'700',fontSize:18,textAlign:'center'}}>-1hr</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.changeButtonRow}>
            <TouchableOpacity style={styles.changeButton} onPress={()=>increment('minute')}>
            <Text style={{color:'white',fontWeight:'500',fontSize:16,textAlign:'center'}}>+1min</Text>
            </TouchableOpacity>
            <View  style={[styles.changeButton]}>
              <Text style={{color:'white',fontWeight:'500',fontSize:22,textAlign:'center'}}>{timerEdit.m}</Text>
              </View>
            <TouchableOpacity style={styles.changeButton} onPress={()=>decrement('minute')}>
            <Text style={{color:'white',fontWeight:'500',fontSize:16,textAlign:'center'}}>-1min</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.changeButtonRow}>
            <TouchableOpacity style={styles.changeButton} onPress={()=>increment('second')}>
            <Text style={{color:'white',fontWeight:'500',fontSize:16,textAlign:'center'}}>+1sec</Text>
            </TouchableOpacity>
            <View  style={[styles.changeButton]}>
              <Text style={{color:'white',fontWeight:'500',fontSize:22,textAlign:'center'}}>{timerEdit.s}</Text>
              </View>
            <TouchableOpacity style={styles.changeButton} onPress={()=>decrement('second')}>
            <Text style={{color:'white',fontWeight:'500',fontSize:16,textAlign:'center'}}>-1sec</Text>
            </TouchableOpacity>
            </View>
          </View>
         <TouchableOpacity style={styles.reset} onPress={resetStopWatch}>
          <Text style={{fontSize:16,color:'white',textAlign:'center',opacity:0.5}}>RESET STOPWATCH</Text>
         </TouchableOpacity>
        </View>


        {/* SAVING THE DATA */}
        <TouchableOpacity style={styles.savebtn} onPress={editBtn} >
          <Text style={{color:'#3167A6',fontSize:28,marginBottom:4}}>DONE</Text>
        </TouchableOpacity>
     </View>
     
     </SafeAreaView>
  )
}

export default Editactivity

const styles = StyleSheet.create({
    Mconatiner:{
        backgroundColor:'#1F2A37',flex:1,
        alignItems: 'center',
      },
      container:{
        backgroundColor:'#171F28',height:640,
        width:350,
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
       
      },
      changeStopwatch:{
        height:240,width:270,
        backgroundColor:'#30629D',borderRadius:20,
      },
      currentTime:{
        display:'flex',flexDirection:'row',backgroundColor:'#143A66',
        margin:3,padding:3,justifyContent:'center',borderRadius:100,marginTop:8
      },
      changeButton:{
        width:60,height:30,backgroundColor:'#143A66',borderRadius:50,justifyContent:'center',
        shadowOffset: {
          width: 0,
          height: 1,}, shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3,
      },
      changeButtonRow:{
       justifyContent:'space-around',display:'flex',flexDirection:'row',
        padding:5,
      },
      reset:{
        backgroundColor:'#143A66',width:200,borderRadius:100,alignItems:'center',marginTop:18,
        marginLeft:38
      }
})