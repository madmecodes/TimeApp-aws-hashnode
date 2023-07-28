import { Modal,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from 'react-native-dropdown-select-list';

const TargetTime = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHr, setSelectedHr] = useState(props.targetTime?props.targetTime.h:0)
  const [selectedMin, setSelectedMin] = useState(props.targetTime?props.targetTime.m:0)
  //const targetData={h:selectedHr,m:selectedMin}
  

  const dataHour=[
    
    {key:'1',value:'0'},{key:'2',value:'1'},{key:'3',value:'2'},{key:'4',value:'3'},
    {key:'5',value:'4'},{key:'6',value:'5'},{key:'7',value:'6'},{key:'8',value:'7'},
    {key:'9',value:'8'},{key:'10',value:'9'},{key:'11',value:'10'},{key:'12',value:'11'},
    {key:'13',value:'12'},{key:'14',value:'13'},{key:'15',value:'14'},{key:'16',value:'15'},
    {key:'17',value:'16'},{key:'18',value:'17'},{key:'19',value:'18'},{key:'20',value:'19'},
    {key:'21',value:'20'},{key:'22',value:'21'},{key:'23',value:'22'},{key:'24',value:'23'},
   
  ]

  const dataMin=[
    
    {key:'1',value:'0'},{key:'2',value:'5'},{key:'3',value:'10'},{key:'4',value:'15'},{key:'5',value:'20'},
    {key:'6',value:'25'},{key:'7',value:'30'},{key:'8',value:'35'},{key:'9',value:'40'},
    {key:'10',value:'45'},{key:'11',value:'50'},{key:'12',value:'55'}
  ]

  const changeModalVisibility =(bool)=>{
    setModalVisible(bool)
  }
  const DoneTime=()=>{
    props.gettingTargetTime({h:selectedHr,m:selectedMin})
    //console.log(targetData);
    changeModalVisibility(false)
  }

  return (
    <View>
      <TouchableOpacity style={{display:'flex',flexDirection:'row',backgroundColor:'grey',padding:3,
    borderRadius:30,}}  onPress={() => changeModalVisibility(true)}>

        <MaterialCommunityIcons name="target" size={20} color='white'/>
       
         <Text style={{color:'white'}}> {selectedHr}hr </Text>
         <Text style={{color:'white'}}> {selectedMin}min</Text>
      
      
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => changeModalVisibility(false)}>

          <View style={{backgroundColor:'#000000aa',flex:1,alignItems:'center'}}>
          <View style={{alignItems:'center',marginTop:200,backgroundColor:'#23395d',width:300,borderRadius:20}}>
        <Text style={{margin:5,fontWeight:'800',fontSize:20,color:'white'}}>SET TARGET TIME</Text>
         {/* chossing time drop down */}
        <View  style={{width:300,height:250,justifyContent:'center',flexDirection:'row',paddingTop:40}}>
        <Text style={{fontSize:15,fontWeight:'400',margin:10,color:'white'}}>Hr</Text>
        <SelectList data={dataHour} setSelected={(val) => setSelectedHr(val)}
         searchicon={<MaterialCommunityIcons name="target" size={20} color={'white'} />} 
         search={true} 
         save="value"
         maxHeight={150}
         boxStyles={{borderRadius:0,width:70,backgroundColor:'#dadada'}} //override default styles
         defaultOption={{ key:'0', value:'0' }} 
        />
       
      <Text style={{fontSize:15,fontWeight:'400',margin:10,color:'white'}}>min</Text>
      <SelectList data={dataMin}  setSelected={(val) => setSelectedMin(val)}
        searchicon={<MaterialCommunityIcons name="target" size={20} color={'white'} />} 
        search={true}
        save="value"
        maxHeight={150}
        boxStyles={{borderRadius:0,width:70,backgroundColor:'#dadada'}} //override default styles
      defaultOption={{ key:'0', value:'0' }} />
        </View>

        <View style={{display:'flex',flexDirection:'row',width:300,alignItems:'center',justifyContent:'center'}}>
          
        <TouchableOpacity onPress={DoneTime}>
            <Text style={{backgroundColor:'#0096c7',borderRadius:20,padding:10
          ,color:'white',margin:10,width:90,textAlign:'center'
          }}>DONE</Text>
          </TouchableOpacity>
          
          </View>
        </View>
        </View>
      </Modal>
    </View>
  )
}

export default TargetTime

const styles = StyleSheet.create({

})