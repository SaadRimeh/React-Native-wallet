import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles.js'
import { COLORS } from '../../constants/colors.js'


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
const [error,setError]=useState("")

const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      
      setPendingVerification(true)
    } catch (err) { 
     if(err.errors?.[0]?.code === "form_identifier_exists"){
        setError("That email address is already in use. Please try another.")
      }else{
        setError("An error occurred. Try another email or Password");
      }
      
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name='alert-circle' size={20} color={COLORS.expense} /> 
             <Text style={styles.errorText}>{error}</Text>
             <TouchableOpacity onPress={()=> setError("")}>
            <Ionicons name='close' size={20} color={COLORS.textLight}/>
             </TouchableOpacity>
          </View>
        ): null}

        <TextInput
        style={[styles.verificationInput , error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView 
    style={{flex:1}}
    contentContainerStyle={{flexGrow:1}}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    extraScrollHeight={50}
    >
      <View style={styles.container}> 
        <Image source={require("../../assets/images/signuppage.png")}
        style={styles.illustration}
        />
          <Text style={styles.title}>Create Account</Text>

             {error ? (
          <View style={styles.errorBox}>
            <Ionicons name='alert-circle' size={20} color={COLORS.expense} /> 
             <Text style={styles.errorText}>{error}</Text>
             <TouchableOpacity onPress={()=> setError("")}>
            <Ionicons name='close' size={20} color={COLORS.textLight}/>
             </TouchableOpacity>
          </View>
        ): null}

        <TextInput
          style={[styles.input , error && styles.errorInput]}
          autoCapitalize='none'
          value={emailAddress}
          placeholderTextColor='#9A8478'
          placeholder='Enter email'
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
        style={[styles.input , error && styles.errorInput]}
          autoCapitalize='none'
           placeholderTextColor='#9A8478'
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

<View style={styles.footerContainer}>

<Text style={styles.footerText}>Already have an account?</Text>
<TouchableOpacity onPress={()=> router.back()}>
  <Text style={styles.linkText}>Sing in</Text>
</TouchableOpacity>
</View>
        
        </View>
    </KeyboardAwareScrollView>
  )
}