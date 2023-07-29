import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { BarChart, Grid } from 'react-native-chart-kit';
import { groupBy, sumBy } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';

const Stats = () => {
  let data=[
    {"color": "white", "date": "29/7/2023", "icon": "book", "id": 1690625070553, "isRunning": false, "targetTime": {"h": 3, "m": 0}, "timeElapsed": 1300, "title": "STUDY"},
     {"color": "white", "date": "29/7/2023", "icon": "barbell", "id": 1690625070563, "isRunning": false, "targetTime": {"h": 1, "m": 15}, "timeElapsed": 5000, "title": "WORKOUT"},
    {"color": "white", "date": "30/7/2023", "icon": "code", "id": 1690625070564, "isRunning": false, "targetTime": {"h": "0", "m": "0"}, "timeElapsed": 3000, "title": "CODING"},
    {"color": "white", "date": "31/7/2023", "icon": "code", "id": 1690625070564, "isRunning": false, "targetTime": {"h": "0", "m": "0"}, "timeElapsed": 3600, "title": "CODING"},
    {"color": "white", "date": "1/7/2023", "icon": "code", "id": 1690625070564, "isRunning": false, "targetTime": {"h": "0", "m": "0"}, "timeElapsed": 2600, "title": "CODING"},
    {"color": "white", "date": "2/8/2023", "icon": "code", "id": 1690625070564, "isRunning": false, "targetTime": {"h": "0", "m": "0"}, "timeElapsed": 6600, "title": "CODING"},
    {"color": "white", "date": "3/8/2023", "icon": "code", "id": 1690625070564, "isRunning": false, "targetTime": {"h": "0", "m": "0"}, "timeElapsed": 0, "title": "CODING"}
    
    ]
  const groupedData = Object.values(groupBy(data, 'date')).map((items) => ({
    date: items[0].date,
    timeElapsed: sumBy(items, 'timeElapsed')
    
  }));

 // Convert timeElapsed to hours and minutes
const dataPoints = groupedData.map((item) => {
  const totalMinutes = Math.floor(item.timeElapsed / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}.${String(minutes)}`;
  return {
    x: item.date,
    y: formattedTime,
  };
});

  return (
    <View style={styles.Mconatiner}>
      <View style={styles.statsHeading}>
      <Text style={{color:'white',fontSize:22,textAlign:'center',fontWeight:'700'}}>
       "Keep a Track :)"
        </Text>
    </View>
    <ScrollView horizontal style={styles.Mcontainer2}>
      <View style={styles.container}>
      <BarChart
        data={{
          labels: dataPoints.map((item) => item.x),
          datasets: [
            {
              data: dataPoints.map((item) => item.y),
            },
          ],
        }}
        width={dataPoints.length * 100}
        height={350}
        chartConfig={{
          backgroundGradientFrom: '#1D2951',
          backgroundGradientTo: '#002366',
          decimalPlaces: 0, // Show only whole numbers on the y-axis
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        yAxisSuffix="h" // Y-axis label suffix
        withInnerLines={true}
        withHorizontalLabels={false}
        withVerticalLabels={true}
        withHorizontalLines={true}
        withShadow={false}
        withDots={true}
        withGrid={true}
        style={styles.chart}
        showBarTops={true} // Hide the top of the bars
        showValuesOnTopOfBars={true} // Show the values on top of the bars
      />
    </View>
      </ScrollView>
      </View>
  )
}

export default Stats

const styles = StyleSheet.create({
  Mconatiner:{
    backgroundColor:'#1F2A37',flex:1,alignItems:'center',padding:20
  },
  Mcontainer2:{
    backgroundColor:'#1F2A37',padding:10
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    
  },
  statsHeading:{
    width: 219,justifyContent:'center',
    height: 66,backgroundColor:'#083365',borderRadius:100,

  },
})

