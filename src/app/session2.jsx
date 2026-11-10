import { ImageBackground } from 'expo-image';
import { useState } from 'react';
import {
  Image, Platform, Pressable,
  ScrollView,
  StatusBar,
  StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { backgroundColor: 'red' },
      android: { backgroundColor: 'blue' },
      web: { backgroundColor: 'white' },
      default: { backgroundColor: 'orange' },
    }),
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    resizeMode: 'contain',
  },
  imgBg: {
    width: 300,
    height: 300,
    resizeMode: 'repeat',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  }
});

export default function Test() {
  const [input, SetInput] = useState('');
  const handleInputChange = (text) => {
    SetInput(text);
  }
  const insets = useSafeAreaInsets();
  return (<>
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>

      <StatusBar hidden={true} />
      <ScrollView style={myStyles.container} contentContainerStyle={myStyles.content}>
        <ImageBackground
          source={require('@/assets/images/bg.jpg')}
          style={myStyles.imgBg}
        >
          <Text style={myStyles.text}>iam in</Text>
        </ImageBackground>
        <View>
          <Image
            source={{
              uri: 'https://adsinoo.com/wp-content/uploads/2026/07/%D9%84%D9%88%DA%AF%D9%88-%D8%AA%DB%8C%D8%B1%D9%87-1.png',
            }}
            style={myStyles.img}
          />
        </View>

        <View>
          <Image
            source={require('@/assets/images/icon.png')}
            style={myStyles.img}
          />
        </View>

        <TextInput
          placeholder='Enter your name'
          style={myStyles.input}
          value={input}
          onChangeText={handleInputChange}
        />

        <Text numberOfLines={2} style={myStyles.text}>
          {input}
        </Text>

        <View>
          <TouchableWithoutFeedback onPress={() => {
            SetInput('');
          }}>
            <Text style={{
              color: '#fff',
              backgroundColor: 'black',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 20,
              cursor: 'pointer',
            }}>Clear</Text>
          </TouchableWithoutFeedback>

          <TouchableHighlight onPress={() => {
            SetInput('');
          }}>
            <Text style={{
              color: '#fff',
              backgroundColor: 'black',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 20,
              cursor: 'pointer',
            }}>Clear</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={() => {
            SetInput('');
          }}>
            <Text style={{
              color: '#fff',
              backgroundColor: 'black',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 20,
              cursor: 'pointer',
            }}>Clear</Text>
          </TouchableOpacity>

          <Pressable
            onPressIn={() => {
              SetInput('in');
            }}
            onPressOut={() => {
              SetInput('out');
            }}
            onLongPress={() => {
              SetInput('long');
            }}
          >
            <Text style={{
              color: 'black',
              backgroundColor: 'yellow',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              marginTop: 20,
              cursor: 'pointer',
            }}>Pressable</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>

  </>);
}