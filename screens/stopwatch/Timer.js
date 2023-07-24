import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect} from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch,useSelector } from 'react-redux'
import { timerStopwatch } from './redux/cardSlice'
import { storeTableData } from './redux/cardSlice'
import moment from 'moment';
//import BackgroundTimer from 'react-native-background-timer';
import BackgroundService from 'react-native-background-actions';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// //LogBox.ignoreAllLogs(); //Ignore all log notifications

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const options = {
  taskName: 'Example',
  taskTitle: 'Time Manager',
  taskDesc: 'ExampleTask description',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  // color: 'white',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
      delay: 999,
  },
};
const Timer = (props) => {
const dispatch = useDispatch()

 const data=useSelector((state)=>state.cards)
// const id = props.ID
// const object = data.find(obj => obj.id === id)

 const [time, setTime] = useState(props.timer);
 const [status, setStatus] = useState(0);
 const [interv, setInterv] = useState();
 const [stopwatchOn, setstopwatchOn] = useState(false)
//  const [timerOn, settimerOn] = useState(false)
//  useEffect(() => {
//    if(timerOn) startBgTimer()
//    else BackgroundTimer.stopBackgroundTimer();
 
//    return () => {
//     BackgroundTimer.stopBackgroundTimer()
//    }
//  }, [timerOn])
 
 const h = () => {
  if(time.h === 0){
    return ''; 
  }else {
    return <Text style= {styles.timerNUM}>{time.h}:</Text>;
  }
}
// WHENEVER TIME IS SET FROM EDIT ACITIVITY RESET STOPWATCH
useEffect(() => {
  setTime(props.timer)
}, [props.timer]
)
// const [running, setrunning] = useState(false)
// const startBgTimer=()=>{
//   BackgroundTimer.runBackgroundTimer(() => { 
// //console.log('hi');
//     run();
// }, 
// 999);
// }


const veryIntensiveTask = async (taskDataArguments) => {
  // Example of an infinite loop task
  const { delay } = taskDataArguments;
  await new Promise( async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
          console.log(i);
          run()
          await sleep(delay);
      }
      // run()
      // await sleep(delay)
  });
};

var updatedS = time.s , updatedM = time.m, updatedH = time.h;
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
 const start = async() => {
  // await BackgroundService.start(veryIntensiveTask, options);
  // await BackgroundService.updateNotification({taskDesc: 'Timer is on'});
    run();
    setStatus(1);
    setInterv(setInterval(run, 999));
    //console.log('start is called');
  // settimerOn(true)
};
const stop = async() => {
  clearInterval(interv);
  setStatus(0);
 // console.log('stop is called');
  sendTableData()
  //await BackgroundService.stop();
  // settimerOn(false)
};
// const CheckStart2 = (id)=>{  
//   // const object = data.find(obj => obj.id === id)
//   //     object.stopwatchOn=true
//     let newdatarun=data.map((e)=>{
//         if(e.id==id){
//           e.stopwatchOn=true
//         }
//         if(e.id!=id){
//           e.stopwatchOn=false
//         }
//         return e
//     })
//     newdatarun.map((e)=>{
//       console.log(e.title,e.stopwatchOn)
//       if(stopwatchOn==true){
//         start()
//       }
//   })
// }
//0=>start, button of stop
//1=>stop, button of start

//TIMER DATA SENDING TO TABLE

//let today = new Date().toLocaleDateString('en-IN');
  let date = new Date();
  let today = moment(date).format('DD/MM/YYYY');
  const sendTableData=()=>{ 
    let TABLE_DATA= data.map((e)=>{ 
    //   let CardDate=e.date 
    //REMOVING THE IF CONDITION MAKING IT SIMPLE:)
    //   if(CardDate==today){
         let requiredTableData={title:e.title,timerHour:e.timer.h,timerMinute:e.timer.m}
         return requiredTableData
      // }
      })
     let filteredArray = TABLE_DATA.filter(element => element !== undefined);
     dispatch(storeTableData(filteredArray))
   }
//SENDING DATA TO TABLE IF NEW CARD ADDED R DELETED
useEffect(() => {
  sendTableData()
  //console.log('f');
}, [data.length,props.timer.m,props.timer.h]
)

// STORING TIMER DATA TO REDUX
useEffect(()=>{
  dispatch(timerStopwatch({id:props.ID,timer:time}))
  //console.log('hi',time);
},[time]
)
//   //RESET-ALL STOPWATCH WHEN DATE CHANGES
let currentTime=moment().valueOf()-4000
let todayNew = moment(currentTime).format('DD/MM/YYYY');
useEffect(() => {
if (todayNew != today) {
  clearInterval(interv);
  setStatus(0)
  setTime({h:0,m:0,s:0})
  console.log('Date has changed',todayNew,today);
}else{
   // console.log('outside if')
   // console.log(todayNew,today);
}
  today=todayNew
}, [today])

//{/* ()=>CheckStart(props.ID) */}
// const CheckStart=(id)=>{
//   console.log(id);
//   data.map((e)=>{
//    // e.stopwatchRun=false
//     if(e.id==id){
//       //e.stopwatchRun=true
//       setStatus(1)
//       start()
//       console.log(status);
//       console.log('id same');
//     }
//     if( e.id!=id){
//       //e.stopwatchRun=false
//       stop()
//       console.log('id not same');
//     }
//     // if(e.stopwatchRun==true){
//     //         //setStatus(1)
//     //         start()
//     //         console.log('start');
//     //       }
//     // if(e.stopwatchRun==false){
//     //         //setStatus(0)
//     //         stop()
//     //         console.log('stop');
//     //       }
//   })
//   // const object = data.find(obj => obj.id === id)
//   // object.stopwatchRun=true
//   //console.log(dataNew)
// //  dataNew.map((e)=>{
// //     if(e.stopwatchRun==true){
// //       setStatus(1)
// //       start()
// //     }
// //     else if(e.stopwatchRun==false){
// //       setStatus(0)
// //       stop()
// //     }
// //  })
// }
  return (
    <>
    <View style={styles.timerContainer}>
       {h()}
      <Text style={styles.timerNUM}>{(time.m >= 10)? time.m : "0"+ time.m}:</Text>
      <Text style={styles.timerNUM}>{(time.s >= 10)? time.s : "0"+ time.s}</Text>
    </View>

    {/* BUTTON COMPONENT */}
    <View style={{position:'absolute'}}>
    {(status === 0)? 
        <TouchableOpacity style={styles.startbtn} onPress={()=>start(props.ID)}> 
          <Text style={{marginLeft:18,marginTop:12}}>
            <FontAwesome5 name='play' size={30} color='#297C02'/> 
            </Text>  
        </TouchableOpacity>:<Text style={{position:'absolute'}}></Text>
      }
      {(status === 1)? 
        <TouchableOpacity onPress={stop}>
         
            <View style={[styles.stopbtn,{flex:1,justifyContent:'center',alignItems:'center'}]}>
            <FontAwesome5 name='square-full' size={20} color='#18181a'/> 
            </View>
         
        </TouchableOpacity>:<Text style={{position:'absolute'}}></Text>
      }
    </View>
    </>
  )
}

export default Timer

const styles = StyleSheet.create({
  timerContainer:{
    display:'flex',flexDirection:'row',paddingLeft:80,
  },
  timerNUM:{
    color:'white',fontSize:35
  },
  startbtn:{
    width:55,height:55,backgroundColor:'#04254B',borderRadius:100,marginLeft:12
  },
  stopbtn:{
    width:55,height:55,backgroundColor:'#c42124',borderRadius:100,marginLeft:10

  }
})