import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet ,View, Text, KeyboardAvoidingView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Input } from 'react-native-elements'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import {
    Montserrat_300Light,
} from '@expo-google-fonts/montserrat';


function InscriptionScreen4(props) {

  console.log(props.newUser)

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
});

const [signUpSportsHabits, setSignUpSportsHabits] = useState("")
const [signUpSportsHoursStart, setSignUpSportsHoursStart] = useState("")
const [signUpSportsHoursEnd, setSignUpSportsHoursEnd] = useState("")
const [listErrorsSignup, setErrorsSignup] = useState([])
const [image, setImage] = useState(null);

  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }

  var GoToNextStepSignUp = (signUpSportsHabits, signUpSportsHoursStart, signUpSportsHoursEnd ) => {
    console.log(signUpSportsHabits, signUpSportsHoursStart, signUpSportsHoursEnd)

if (signUpSportsHabits && signUpSportsHoursStart && signUpSportsHoursEnd ) {

    console.log('je passe dans la condition');

    let user = {habits :signUpSportsHabits, hoursStart:signUpSportsHoursStart, hoursEnd : signUpSportsHoursEnd
    };
    console.log(user);

    props.UserFourInfo(user)

    HandleClickchangeStep(); 
    
  }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
} else {
  return (
    <View style={styles.container}>
    <View style={styles.iconBack}>
    <Icon
        raised
        name='ios-arrow-back'
        type='ionicon'
        color='#7C4DFF'
        onPress={() => props.navigation.navigate('InscriptionScreen3')}
        size={30}
      />
</View>
<View style={styles.content}>
    <Text h3 style={{marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center' }}>Quand pratiques-tu tes activités préférées ?</Text>
    <Text style={{marginBottom: 20, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center'}}>Tu pratiques tes activités :</Text>
    <View style={{
          borderColor: '#7C4DFF',
          borderWidth: 2,
          borderRadius:17,
        }}>
    <RNPickerSelect style={pickerStyle}
    placeholder={{ label: "Choisis la fréquence", value: null }}
            onValueChange={(value) => setSignUpSportsHabits(value)}
            items={[
              { label: 'En semaine', value: 'En semaine' },
              { label: 'Le weekend', value: 'Le weekend' },
              { label: 'Tous les jours', value: 'Tous les jours' },
            ]}
        />
        </View>
        <Text style={{marginBottom: 20,marginTop: 40, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign:'center'}}>Tu es disponible :</Text>
        <View style={{ flexDirection: "row", }}>
        
        <View style={{
          borderBottomColor: '#dfe6e9',
          borderBottomWidth: 1,
          borderRadius:1,
        }}>
          
          <RNPickerSelect style={DatePicker}
          placeholder={{ label: "Heure", value: null }}
            onValueChange={(value) => setSignUpSportsHoursStart(value)}
            items={[
              { label: '00h', value: '00h' },
              { label: '01h', value: '01h' },
              { label: '02h', value: '02h' },
              { label: '03h', value: '03h' },
              { label: '04h', value: '04h' },
              { label: '05h', value: '05h' },
              { label: '06h', value: '07h' },
              { label: '08h', value: '08h' },
              { label: '09h', value: '09h' },
              { label: '10h', value: '10h' },
              { label: '11h', value: '11h' },
              { label: '12h', value: '12h' },
              { label: '13h', value: '13h' },
              { label: '14h', value: '14h' },
              { label: '15h', value: '15h' },
              { label: '16h', value: '16h' },
              { label: '17h', value: '17h' },
              { label: '18h', value: '18h' },
              { label: '19h', value: '19h' },
              { label: '20h', value: '20h' },
              { label: '21h', value: '21h' },
              { label: '22h', value: '22h' },
              { label: '23h', value: '23h' },
            ]}
        />
 </View>
 <View style={{alignItems:'center', justifyContent:'center'}}>
<Text style={{ marginBottom: 10, fontSize:17, }}> à  </Text>
</View>
<View style={{
          borderBottomColor: '#dfe6e9',
          borderBottomWidth: 1,
          borderRadius:1,
        }}>

<RNPickerSelect style={DatePicker}
placeholder={{ label: "Heure", value: null }}
            onValueChange={(value) => setSignUpSportsHoursEnd(value)}
            items={[
              { label: '00h', value: '00h' },
              { label: '01h', value: '01h' },
              { label: '02h', value: '02h' },
              { label: '03h', value: '03h' },
              { label: '04h', value: '04h' },
              { label: '05h', value: '05h' },
              { label: '06h', value: '07h' },
              { label: '08h', value: '08h' },
              { label: '09h', value: '09h' },
              { label: '10h', value: '10h' },
              { label: '11h', value: '11h' },
              { label: '12h', value: '12h' },
              { label: '13h', value: '13h' },
              { label: '14h', value: '14h' },
              { label: '15h', value: '15h' },
              { label: '16h', value: '16h' },
              { label: '17h', value: '17h' },
              { label: '18h', value: '18h' },
              { label: '19h', value: '19h' },
              { label: '20h', value: '20h' },
              { label: '21h', value: '21h' },
              { label: '22h', value: '22h' },
              { label: '23h', value: '23h' },
            ]}
        />
        </View>
        </View>
<View>
      <Button
      buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17,  marginTop: 50 }}
        title="Suivant"
        onPress={() => {GoToNextStepSignUp(signUpSportsHabits, signUpSportsHoursStart, signUpSportsHoursEnd)}}
        titleStyle={{
          fontFamily: 'Nunito_400Regular',
          marginLeft: 15,
          marginRight: 15   
      }}
      >
      </Button>
      </View>
      </View>
    </View>
  );
}}

function mapDispatchToProps(dispatch) {
  return {
    UserFourInfo: function (user) {
      console.log(user);
      dispatch({ type: 'addInfoFourStep', newUser : user })
    }
  }
};

function mapStateToProps(state) {
  return { newUser : state.newUser}
 };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionScreen4);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconBack:{
    marginTop: 50,
    marginRight: 300,
  },
  content:{
    marginTop:40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const pickerStyle = {
  inputIOS: {
    fontSize:15,
      color: '#7C4DFF',
      paddingHorizontal: 40,
      paddingVertical: 15,
      backgroundColor: '#fff',
      borderRadius: 17,
  },
  placeholder: {
      color: '#7C4DFF',
      fontSize:15,
    },
  inputAndroid: {
    fontSize:15,
      color: 'white',
      paddingHorizontal: 10,
      backgroundColor: 'red',
      borderRadius: 5,
  },
};

const DatePicker = {
  inputIOS: {
    fontSize:17,
      color: '#7C4DFF',
      paddingHorizontal: 40,
      paddingVertical: 15,
      backgroundColor: '#white',
      borderRadius: 17,
  },
  placeholder: {
      color: '#7C4DFF',
      fontSize:17,
    },
  inputAndroid: {
    fontSize:15,
      color: 'white',
      paddingHorizontal: 10,
      backgroundColor: 'red',
      borderRadius: 5,
  },
};