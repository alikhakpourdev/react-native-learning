import { useLocation } from '@/hooks/use-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 50,
        fontFamily: 'YekanBakh',
    },

    preview: {
        width: '100%',
        height: 240,
        marginTop: 16,
    },
});

export default function Test() {
    const [fontsLoaded] = useFonts({
        YekanBakh: require('../../assets/Fonts/YekanBakh-ExtraBlack.ttf'),
    });

    const [image, setImage] = useState(null);

    const selectImage = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                alert('Permission for access to photos was denied');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1,
            });

            if (result.canceled) {
                return;
            }

            const uri = result.assets?.[0]?.uri;
            if (!uri) {
                return;
            }

            console.log(result);
            setImage(uri);
        } catch (error) {
            console.log(error);
        }
    };

    const { location } = useLocation();

    if (!fontsLoaded) {
        return (
            <View style={myStyles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={myStyles.container}>
            <Text style={myStyles.text}>
                ازت متنفرم!
            </Text>

            <AntDesign name="check-circle" size={50} color="red" />

            <Button title="Select Image" onPress={selectImage} />
            {image ? (
                <Image
                    source={{ uri: image }}
                    style={myStyles.preview}
                    resizeMode="contain"
                />
            ) : null}
            {location ? (
                <Text>
                    {`lat : ${location.coords.latitude}\nlong : ${location.coords.longitude}`}
                </Text>
            ) : (
                <Text>Location not found</Text>
            )}
        </View>
    );
}
