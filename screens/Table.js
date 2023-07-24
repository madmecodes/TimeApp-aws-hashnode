import { StyleSheet, Text, View,Button ,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector,useDispatch } from 'react-redux'
import { storeTableData } from './stopwatch/redux/cardSlice'
import moment from 'moment';

const Table = () => {
 
  const todayTableData = useSelector((state)=>state.tableData)
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.cards)
  
  //let today = new Date().toLocaleDateString('en-IN');;

  const date = new Date();
  let today = moment(date).format('DD/MM/YYYY');
 
  //CHECKING IF NO DATA THEN CLEAR TABLE
  const sendTableData=()=>{ 
    let TABLE_DATA= data.map((e)=>{ 
       let CardDate=e.date 
      //  let cardDateGet = new Date(Cardtime)
      //  let cardDate=moment(cardDateGet).format('DD/MM/YYYY')
       if(CardDate==today){
         let requiredTableData={title:e.title,timerHour:e.timer.h,timerMinute:e.timer.m}
         return requiredTableData
       }
       else{return Cardtime}
     })
    // console.log(TABLE_DATA); //yahan se TABLE DATA DISPATCH HUGA
     //console.log(data);
     let filteredArray = TABLE_DATA.filter(element => element !== undefined);
     dispatch(storeTableData(filteredArray))
   }
  useEffect(() => {
    if(data.length==0){
      sendTableData()
     // console.log('hi');
    }
  }, [data.length==0]
  )
 
const TOTAL_TIME=()=>{
  let timeH=todayTableData.map((e)=>{
  return e.timerHour
})
let totalH = 0;
for (const number of timeH) {
totalH += number;
}
let timeMin=todayTableData.map((e)=>{
  return e.timerMinute
})
let totalM = 0;
for (const number of timeMin) {
totalM += number;
}
let total_time = (totalH + totalM/60)
const hoursInt = Math.floor(total_time);
const minutes = (total_time - hoursInt) * 60;
return `${hoursInt}:${minutes<10? '0'+ minutes.toFixed(0):minutes.toFixed(0)}`
}

  return (
    <SafeAreaView style={styles.Mconatiner}>
       <View style={styles.datecontainer}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'800'}}>
        {today}
        </Text>
       </View>
    <View style={styles.conatiner}>
    <View style={{backgroundColor:'#051B36',height:300,padding:10}}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={styles.fieldHeading} >Activity</Text>
      <Text style={styles.fieldHeading}>Total-Time</Text>
      </View>
     
    <FlatList
    data={todayTableData}
    renderItem={({ item }) => (
      <View style={styles.row}>
        <View style={styles.cellField}>
        <Text style={styles.cellData}>{item.title}</Text>
        </View>
        <View style={[styles.cellField,{display:'flex',flexDirection:'row',justifyContent:'center'}]}>
        <Text style={{fontSize:20,color:'white'}}>{item.timerHour}</Text>
        <Text style={{color:'white',marginTop:4,paddingTop:2}}>h</Text>
        <Text style={{fontSize:20,color:'white'}}>{item.timerMinute}</Text>
        <Text style={{color:'white',marginTop:4,paddingTop:2}}>m</Text>
        </View>
      </View>
    )}
  />
  </View>
    </View>
    <View style={styles.totalTime}>
      <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'700'}}>
         TOTAL TIME INVESTED </Text>
    </View>
    <View style={styles.totalHour}>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Text style={{fontSize:27,color:'white'}}>{TOTAL_TIME()}</Text>
        <Text style={{fontSize:20,color:'white',paddingTop:6}}>(h)</Text>
        </View>
    </View>
    </SafeAreaView>
  )
}
export default Table
const styles = StyleSheet.create({
  Mconatiner:{
    backgroundColor:'#1F2A37',flex:1,alignItems:'center',padding:20
  },
  conatiner:{
    backgroundColor:'#1F2A37',padding:10
  },
  datecontainer:{
    height:35,width:330,backgroundColor:'#3167A6'
    ,borderRadius:100,justifyContent:'center'
  },
  row:{
    backgroundColor:'#051B36',margin:3,display:'flex',flexDirection:'row',
    width:300,
  },
  fieldHeading:{
    color:'white',fontSize:23,fontWeight:'700',width:150,backgroundColor:'#06244a',textAlign:'center',
    borderWidth:2
  },
  cellField:{
    backgroundColor:'#093163',width:150,alignItems:'center',borderWidth:2
  },
  cellData:{
    fontSize:18,color:'white'
  },
  totalTime:{
    width: 319,justifyContent:'center',
    height: 66,backgroundColor:'#083365',borderRadius:100,

  },
  totalHour:{
    width:120,height:60,backgroundColor:'#083365',marginTop:20,borderRadius:100,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8
,alignItems:'center',justifyContent:'center'
  }
})