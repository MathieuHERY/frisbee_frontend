import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
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



function InscriptionScreen2(props) {

  console.log(props.newUser)

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Nunito_400Regular,
  });

  const [signUpAge, setSignUpAge] = useState("")
  const [signUpDescription, setSignUpDescription] = useState("")

  var HandleClickchangeStep = () => {
    props.HandleClickParentchangeStep()
  }

  var GoToNextStepSignUp = (signUpAge, signUpDescription) => {
    console.log(signUpAge, signUpDescription)

    if (signUpDescription && signUpAge) {

      console.log('je passe dans la condition');

      let user = {
        age: signUpAge, description: signUpDescription
      };
      console.log(user);

      props.UserSecondInfo(user)

      HandleClickchangeStep();

    }
  }




  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.iconBack}>
            <Icon
              raised
              name='ios-arrow-back'
              type='ionicon'
              color='#7C4DFF'
              onPress={() => props.navigation.navigate('InscriptionScreen1')}
              size={30}
            />
          </View>
          <View style={styles.content}>
            <Text h3 style={{ marginBottom: 40, fontSize: 25, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Allez, parles-nous un peu de toi ... </Text>

            <Text style={{ marginBottom: 20, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Toujours aussi jeune, hein : </Text>

            <View style={{
              borderColor: '#dfe6e9',
              borderWidth: 2,
              borderRadius: 17,
            }}>
              <RNPickerSelect style={pickerStyle}
                placeholder={{ label: "Ta tranche d'âge", value: null }}
                onValueChange={(value) => setSignUpAge(value)}
                items={[
                  { label: '18 - 25 ans', value: '18 - 25 ans' },
                  { label: '26 - 35 ans', value: '26 - 35 ans' },
                  { label: '36 - 45 ans', value: '36 - 45 ans' },
                  { label: '46 - 55 ans', value: '46 - 55 ans' },

                ]}
              />
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}>

              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 20, marginTop: 30, fontSize: 16, width: "70%", fontFamily: 'Montserrat_300Light', textAlign: 'center' }}>Vends-nous du rêve ! </Text>
              </View>
              <View>
                <TextInput style={{ borderColor: '#dfe6e9', borderWidth: 1, borderRadius: 5, height: 100, width: 250 }}
                  editable
                  multiline
                  numberOfLines={10}
                  maxLength={500}
                  onChangeText={(value) => setSignUpDescription(value)}
                  placeholder="Une petite description s'impose à toi :)"
                />
              </View>

            </KeyboardAvoidingView>

            <Button
              buttonStyle={{ backgroundColor: "#00CEC9", titleStyle: 'Montserrat_300Light', borderRadius: 17, marginTop: 40 }}
              title="Suivant"
              onPress={() => { GoToNextStepSignUp(signUpAge, signUpDescription) }}
              titleStyle={{
                fontFamily: 'Nunito_400Regular',
                marginLeft: 15,
                marginRight: 15
              }}
            >
            </Button>
          </View>
        </ScrollView>
      </View>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UserSecondInfo: function (user) {
      console.log(user);
      dispatch({ type: 'addInfoSecondStep', newUser: user })
    }
  }
}

function mapStateToProps(state) {
  return { newUser: state.newUser }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionScreen2);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconBack: {
    marginTop: 50,
    marginRight: 300,
  },
  content: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const pickerStyle = {
  inputIOS: {
    color: '#838383',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 17,
  },
  placeholder: {
    color: '#838383',
  },
  inputAndroid: {
    color: '#ffffff',
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
};

