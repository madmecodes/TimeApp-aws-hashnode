import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const OPTIONS=[
'red','purple','yellow','white','grey',
'#CAF0F8','#ADE8F4','#90E0EF','#48CAE4','#00B4D8','#0096C7','#0077B6','#023E8A',
'#03045E','#FFDAB9','#FBC4AB','#F8AD9D','#F4978E','#F08080','#344E41','#3A5A40',
'#588157','#A3B18A','#DAD7CD','#EAAC8B','#E56B6F','#B56576','#6D597A','#355070',
'#0F4C5C','#E36414','#FB8B24','#9A031E','#5F0F40','#9D4EDD','#9D4EDD','#5A189A','blue','green',
'#3C096C','#240046','#10002B','#AD2831','#640D14','#38040E','#800E13','#250902','#F2F2F2','#CCCCCC','#A5A5A5','#7F7F7F','#595959','#FE7F2D','#FCCA46','#619B8A','#233D4D','#892B64','#27a300','#ff0000','#751717','#b497d6','#144552','#eeef20','#b8336a','#dcc9b6','#96c0b7','#A01A58','#723C70','#B7094C','#1780A1','#2E6F95','#5C4D7D','#80ed99','#ffc300','#f2542d','#b9faf8',

]
const ModalPicker = (props) => {
  
    const onPressItem=(item)=>{
      props.changeModalVisibility(false)
      props.setData(item)
    }

    const option =OPTIONS.map((item,index)=>{
    return(  
      <View key={index} >
    <TouchableOpacity style={[styles.btnchoose,{backgroundColor:item}]} onPress={()=>onPressItem(item)}>
      </TouchableOpacity>
      </View>
    )
    })
  return (
    <View style={styles.colorContainer}>
    <View style={[styles.modalView,{height:HEIGHT-200,width:WIDTH-60,}]}>
    <Text style={{fontSize:20,marginBottom:10,color:'white'}}> CHOOSE A COLOR</Text> 
          <ScrollView style={{width:WIDTH-90,borderRadius:20}}>  
          
          <View style={{backgroundColor:'white',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',borderRadius:20}}>
         
          {option}  
           </View> 
          </ScrollView> 
          <TouchableOpacity onPress={()=>props.changeModalVisibility(false)}>
            <Text style={{backgroundColor:'#0096c7',borderRadius:20,padding:10,justifyContent:'flex-start'
          ,color:'white',marginTop:10
          }}>CLOSE</Text>
          </TouchableOpacity>
          </View>
           </View>
  )
}

export default ModalPicker

const styles = StyleSheet.create({
      modalView: {
        marginTop:100,
        backgroundColor: "grey",
        borderRadius: 20,
        shadowColor: "#000",
        alignItems:'center',padding:20,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      btnchoose:{
        width:45,height:45,
        borderRadius: 100,margin:20,
        padding: 10,
        elevation: 2,borderWidth:1,borderColor:'grey',margin:10,alignItems:'center'
      },
      colorContainer:{
         display:'flex',flexDirection:'row',flex:1,backgroundColor:'#000000aa',
          justifyContent:'space-around',padding:20,
      }
})