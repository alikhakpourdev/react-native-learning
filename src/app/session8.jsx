import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Session() {

    const [status, setStatus] = useState(null);

    const requestPermissions = async () => {
       try{
        const { status } = await Notifications.requestPermissionsAsync();
        setStatus(status);

        if (status === 'granted') {
            const { data: token } = await Notifications.getExpoPushTokenAsync();
            console.log('Token:', token);
        }
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(() => {
        requestPermissions();
        Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        </View>
    );
}