import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Session() {
    const router = useRouter()
    const { title } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={() => router.push({ pathname: 'session6' })} style={{ fontSize: 120, color: 'black', fontFamily: 'YekanBakh' }}>
                {title ?? 'No title'}
            </Text>

            <Link href="/session6">
                <Text style={{ fontSize: 20, color: 'blue', fontFamily: 'YekanBakh' }}>
                    Go to Session 6
                </Text>
            </Link>
        </View>
    );
}