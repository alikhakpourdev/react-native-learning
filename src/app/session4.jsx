import { useDeviceOrientation } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import {
    Button,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function showAlert(title, message, buttons = []) {
    if (Platform.OS === 'web') {
        const ok = window.confirm([title, message].filter(Boolean).join('\n'));
        const btn = ok
            ? buttons.find((b) => b.style !== 'cancel') ?? buttons[0]
            : buttons.find((b) => b.style === 'cancel') ?? buttons[1];
        btn?.onPress?.();
        return;
    }
    Alert.alert(title, message, buttons);
}

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
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    }
});

export default function Test() {
    const insets = useSafeAreaInsets();
    const orientation = useDeviceOrientation();
    const [boxHeight, setBoxHeight] = useState('100vh');

    useEffect(() => {
        setBoxHeight(orientation === 'portrait' ? '25vh' : '50vh');
    }, [orientation]);

    return (<>
        <View style={{ backgroundColor: 'blue', flex: 1 }}></View>
        <View style={{ backgroundColor: 'orange', flex: 1 }}></View>
        <StatusBar hidden barStyle="dark-content" />
        <Button title="Click me" onPress={() => {
            showAlert('Hello', JSON.stringify(Dimensions.get('screen')));
        }} />

        <View style={{ width: '100%', height: boxHeight, backgroundColor: 'black' }}></View>



    </>);
}