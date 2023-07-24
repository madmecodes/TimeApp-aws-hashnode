import { StyleSheet, Text, TextInput, TouchableOpacity, View,KeyboardAvoidingView,Dimensions,Alert, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useDispatch,useSelector } from 'react-redux'
import { addTodo } from './stopwatch/redux/cardSlice'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteTodo } from './stopwatch/redux/cardSlice'
import CheckBox  from 'react-native-check-box'
import { toggleComplete } from './stopwatch/redux/cardSlice'

const Todo = () => {
   const WIDTH = Dimensions.get('window').width;
  const dispatch=useDispatch()
  const [value, setvalue] = useState('')

const handleCheck=(ID,status)=>{
  dispatch(toggleComplete({id:ID,completed:!status}))
}

  const handleDelete=(ID)=>{
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this Todo",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(deleteTodo({id:ID}))
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

  const onDone=()=>{
    if(value){
    dispatch(addTodo({title:value}))
    setvalue('')
  }
  }
  
  const todos=useSelector((e)=>e.todos)
  return (
    <SafeAreaView style={styles.Mconatiner}>
      <View style={styles.conatiner}>

     <FlatList
      data={todos}
      renderItem={(e)=>{
          return(
            <View style={{flex:1,margin:10,position:'relative'}}> 
            
            {/* TODO TEXT AND CHECKBOX */}
            <View style={styles.todoStyle}>

              <View style={{position:'absolute'}}>
            <CheckBox isChecked={e.item.completed} checkedColor='grey'  style={{flex: 1, padding: 10}}
            onClick={()=>handleCheck(e.item.id,e.item.completed)} />
            </View>
            <TouchableOpacity  onPress={()=>handleCheck(e.item.id,e.item.completed)}>
            <Text style={[{fontSize:17,marginRight:15,fontWeight:'400',color:'white',marginLeft:40,paddingHorizontal:5},e.item.completed==true?
            styles.completed:styles.notcompleted  
          ]}>
                {e.item.title}
                </Text> 
                </TouchableOpacity>
              
            {/* DELETE BUTTON */}
            <View style={{position:'absolute',right:5,top:0,marginTop:4}}>
       <MaterialCommunityIcons name="trash-can-outline" size={21} color='#130341'
       onPress={()=>handleDelete(e.item.id)}/>
         </View>
         </View>
            </View>
          )
      }}
     />
      </View>
     
      <KeyboardAvoidingView 
    
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
        style={[styles.writeTaskWrapper,Platform.OS === "ios" ? 
        {backgroundColor:'#083365',top:10,width:WIDTH-30,marginLeft:10,borderRadius:20
      } : {bottom:0,  backgroundColor:'#083365'}]}
      >
    <TextInput style={[styles.input,Platform.OS === "ios" ?
    { width:WIDTH-90}:{ width:WIDTH-60}
  ]}
     placeholder={'Enter your task here...'} value={value} 
    onChangeText={text => setvalue(text)} scrollEnabled={true} 
    placeholderTextColor='#ffffffaa' placeholderOpacity={0.5} />

      {value==''? <Text></Text>:
        <TouchableOpacity onPress={onDone} 
      style={{padding:5,marginRight:15,position:'absolute',right:0,borderRadius:100}}>
        <FontAwesome5 name='check' size={30} color='grey'/>
      </TouchableOpacity>
      }
   </KeyboardAvoidingView>
  
    </SafeAreaView>
  )
}

export default Todo

const styles = StyleSheet.create({
  Mconatiner:{
    backgroundColor:'#1F2A37',flex:1
  },
  conatiner:{
    backgroundColor:'#1F2A37',padding:10,flex:1,marginBottom:60,marginHorizontal:10
  },
  input: {
    padding:5,
    
   color:'white',
   fontSize:20,
   
   
  },
  writeTaskWrapper: {
    position:'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:5,
    backgroundColor:'#083365'
  },
  todoStyle:{
    backgroundColor:'#3167A5B7',
   borderRadius:20,flex:1,flexDirection:'row',
    alignItems:'center',position:'relative',padding:3,
  },
  completed:{
    textDecorationLine:'line-through',color:'grey',
  },
  notcompleted:{
    color:'white'
  }
})