import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, TextInput, Button, TouchableOpacity , Vibration} from "react-native";
import { StatusBar } from "react-native";
import { object, number } from "yup";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const passSchema = object().shape({
  passlength: number()
    .min(4, 'Password should be atleast 4 charecter long')
    .max(30, 'Password should be atmost 30 charecter long')
    .required("Password length is required")
})

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};


export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIssPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [num, setNum] = useState(false)
  const [symbol, setSymbol] = useState(false)

  function generatePassString(passlength: any) {
    let passString = ''
    const upperCaseChars = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    const lowerCaseChars = 'qwertyuiopasdfghjklzxcvbnm'
    const numberChars = '1234567890'
    const symbolChars = '`~!#$%^&*()_-<>??|'

    if (lowerCase) {
      passString += lowerCaseChars
    }
    if (upperCase) {
      passString += upperCaseChars
    }
    if (num) {
      passString += numberChars
    }
    if (symbol) {
      passString += symbolChars
    }    
    const generatedPass = createPassword(passString, passlength)
    setPassword(generatedPass)
    setIssPassGenerated(true)
    console.log("Password is : ",generatedPass);
    
  }

  function createPassword(password: String, passlength: any) {
    let result = ''
    for (let i = 0; i < passlength; i++) {
      let index = Math.round(Math.random() * password.length)
      result += password.charAt(index)
    }
    return result;
  }

  function resetPassword() {
    setPassword('')
    setIssPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNum(false)
    setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, { alignSelf: 'center' }]}>Password Generator</Text>
          <Formik
            initialValues={{ passlength: number }}
            validationSchema={passSchema}
            onSubmit={values => {
              generatePassString(Number(values.passlength))
            }}
          >
            {({ handleChange, handleSubmit, values, handleReset, isValid }) => (
              <>
                <View style={[styles.inputWrapper, { paddingHorizontal: 50 }]}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length : </Text>
                  </View>
                  <TextInput style={[styles.inputStyle]}
                    value={values.passlength}
                    onChangeText={handleChange('passlength')}
                    placeholder= '0'
                    keyboardType="numeric" />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#33e885">

                  </BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include uppercase :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#f564d6">
                  </BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={num}
                    onPress={() => setNum(!num)}
                    fillColor="#33e885">
                  </BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include special chars :</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setSymbol(!symbol)}
                    fillColor="#f564d6">
                  </BouncyCheckbox>
                </View>
                <View style={[styles.cardElevated,{paddingVertical:6 , marginVertical : 16 , borderRadius:4  , paddingHorizontal:6 , flex : 1 ,alignContent : "center" , justifyContent:"center" }]}>
                  <TextInput style={{alignSelf:'center' , fontSize: 16 , fontWeight : '500'}} value={isPassGenerated ? password : ""} />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() =>handleSubmit()}
                  ><Text>Generate Password</Text></TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset()
                      resetPassword()
                    }}
                  ><Text>Reset Password </Text></TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
      {/* <Button title="Vibrate Once" onPress={()=> ReactNativeHapticFeedback.trigger("impactLight", hapticOptions)} /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600'
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 60,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#52f2f7',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    padding: 2,
    borderRadius: 8,
    marginHorizontal: 2,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    borderColor:'#52f2f7',
    borderWidth:1,
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});