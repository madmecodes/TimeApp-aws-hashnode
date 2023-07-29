import { StyleSheet, Text, View,Button ,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment';

const Table = () => {
  const data=useSelector((state)=>state.cards)
  
  let today = moment(new Date()).format('DD/MM/YYYY');
  // Filter the data to only include items with the present date
  const filteredData = data.filter((item) => item.date === today);
  // Sum up all the timeElapsed values
  const totalTimeElapsedInSeconds = filteredData.reduce((total, item) => total + item.timeElapsed, 0);
  // Calculate hours and minutes from the total timeElapsed
  const totalHours = Math.floor(totalTimeElapsedInSeconds / 3600);
  const totalMinutes = Math.floor((totalTimeElapsedInSeconds % 3600) / 60);
  // Format the total timeElapsed as "hr:min"
  const totalTimeFormatted = `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
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
    data={filteredData}
    renderItem={({ item }) => (
      <View style={styles.row}>
        <View style={styles.cellField}>
        <Text style={styles.cellData}>{item.title}</Text>
        </View>
        <View style={[styles.cellField,{display:'flex',flexDirection:'row',justifyContent:'center'}]}>
        <Text style={{fontSize:20,color:'white'}}>
        {`${Math.floor(item.timeElapsed / 3600)}h ${Math.floor((item.timeElapsed % 3600) / 60)}m`}
          </Text>
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
        <Text style={{fontSize:27,color:'white'}}>
          {totalTimeFormatted}
        </Text>
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