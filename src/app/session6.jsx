import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View
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

    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default function Test() {
    const [fontsLoaded] = useFonts({
        YekanBakh: require('../../assets/Fonts/YekanBakh-ExtraBlack.ttf'),
    });
    const router = useRouter();

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
                ریکت نیتیو!!!
            </Text>

            <AntDesign name="android" size={200} color="green" />

            <Pressable onPress={() => router.push({pathname: 'session/[title]', params: {title: 'تست'}})} style={myStyles.button}>
                <Text style={myStyles.buttonText}>فصل قبلی</Text>
            </Pressable>
        </View>
    );
}
