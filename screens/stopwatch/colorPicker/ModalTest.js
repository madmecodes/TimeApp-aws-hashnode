import React, { useState } from "react";
import {  Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import ModalPicker from "./ModalPicker";

const ModalTest = (props) => {
    const [chooseColor, setchooseColor] = useState(props.colordata?props.colordata:'white')
  const [modalVisible, setModalVisible] = useState(false);
  const changeModalVisibility =(bool)=>{
    setModalVisible(bool)
  }
  const setData=(item)=>{
    setchooseColor(item)
    props.gettingColorData(item)
    // console.log(item)
  }
  return (
    <View style={styles.centeredView}>
        <View>{props.colordata? <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>
          Change-Color</Text>
      :<Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Set-Color</Text>
        }
    </View>
    <TouchableOpacity
        style={[styles.buttonOpen,{backgroundColor:chooseColor}]}
        onPress={() => changeModalVisibility(true)}
      >
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => changeModalVisibility(false)}>

            <ModalPicker changeModalVisibility={changeModalVisibility} setData={setData}
       
            />
        
      </Modal>
    
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOpen: {
  width:33,height:33,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  centeredView: {
    flex: 1,flexDirection:'row',
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ModalTest;