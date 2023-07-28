import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconPicker from "react-native-icon-picker"
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Icons(props) {
   const [showIconPicker, setShowIconPicker] = useState(false);
   const [iconname,seticonname]=useState('hourglass')
   
  const onSelect = (icon) => {
    setShowIconPicker(false);
    props.gettingIconData(icon.icon)
    seticonname(icon.icon)
    return(
      
      seticonname(icon.icon)
     
      )
      
  };
        
  return (
   <View style={styles.container}>

      <IconPicker
        showIconPicker={showIconPicker}
        toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
        iconDetails={[
          {
           family: "Ionicons",
            icons: ["code","barbell","desktop","headset","school","laptop","journal-outline","library-sharp","mic-outline","server","logo-playstation","newspaper","musical-notes","logo-electron","logo-xbox","logo-youtube","logo-whatsapp","logo-github","logo-instagram","logo-google","magnet","paw","logo-javascript","logo-nodejs","logo-snapchat","logo-wordpress","logo-windows","man","phone-portrait-sharp","medkit-sharp","medal","medical","mic","people","pin","pizza","phone-landscape","play","pulse","radio","shield","shirt","skull","speedometer",
            "headset-outline","desktop-outline","easel","game-controller","heart","heart-dislike",
            "baseball","bed","book","brush-outline","pencil",'book-outline',"color-filter","receipt","download-sharp",'code-slash-sharp',"bookmark","color-fill","caret-forward-circle","briefcase","build","bulb","bulb-outline","cloud","power","cog-sharp","restaurant","color-palette-sharp","disc","flask","flashlight","football","gift","glasses","glasses-outline","golf","hammer","happy","hourglass",
            "bed-outline","bicycle","body","body-outline",
              "american-football","analytics",'beaker',"aperture-outline","apps","archive", "call","barbell-outline","barbell-sharp","barcode",
            "airplane","alarm","albums","alert","bandage","bar-chart","basket","basketball",'beer',"battery-full","battery-half-outline","boat","bonfire","bonfire-outline","browsers","brush","bus","bulb-sharp","bug","business","cafe","home","calculator","calendar","camera","cart","camera-outline","car","car-sport","card","cash","cellular","chatbox","chatbubble","chatbubbles","checkmark","clipboard","compass","clipboard-outline","code-working-outline","construct","construct-outline","create-sharp","cube","cut-outline","earth","earth-outline",
            "ellipsis-horizontal-outline", "eye","eye-off","ellipsis-vertical","ellipsis-horizontal-sharp",
            "eyedrop","eyedrop-outline","fast-food","hourglass","film-sharp","flag","flame","flash-sharp","key","key-outline","language","leaf-sharp","location","logo-android","logo-apple","logo-bitcoin","logo-css3","musical-note","logo-chrome","logo-capacitor","logo-facebook","rocket","sad","rose","rose-outline","search","tennisball","terminal","tablet-portrait-sharp","text","videocam","tv-sharp","walk","water","watch-sharp","ios-desktop"
          ],
           },
          ]}
        onSelect={onSelect}
        
        content={ <Ionicons name={iconname} color="black"  size={23}/>}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    width:35,height:35,
    borderRadius: 20,
    alignItems:'center',justifyContent:'center',
     backgroundColor:'white'
   
    
  },
 
})