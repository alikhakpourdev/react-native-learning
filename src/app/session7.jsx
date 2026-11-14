import NetInfo from '@react-native-community/netinfo';
import { Text, View } from "react-native";

export default function Session() {
    
    // const [netInfoStatus, setNetInfoStatus] = useState(false);

    // NetInfo.fetch().then(state => {
    //     setNetInfoStatus(state.isConnected);
    //     console.log(state);
    //     console.log('Connection type', state.type);
    //     console.log('Is connected?', state.isConnected);
    // });

    // const unsubscribe = NetInfo.addEventListener(state => {
    //     setNetInfoStatus(state.isConnected);
    //     console.log(state);
    //     console.log('Connection type', state.type);
    //     console.log('Is connected?', state.isConnected);
    // });

    const netInfo = NetInfo.useNetInfo();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 20, color: 'black', fontFamily: 'YekanBakh' }}>
                NetInfoStatus: {netInfoStatus ? 'Connected' : 'Disconnected'}
            </Text> */}
            <Text style={{ fontSize: 20, color: 'black', fontFamily: 'YekanBakh' }}>
                NetInfoStatus: {netInfo.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
            <Text style={{ fontSize: 20, color: 'black', fontFamily: 'YekanBakh' }}>
                NetInfoStatus: {netInfo.type}
            </Text>
        </View>
    );
}