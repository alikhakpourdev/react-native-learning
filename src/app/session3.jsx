import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PAGE_SIZE = 4;

const DATA = [
    {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://picsum.photos/seed/1/600',
        thumbnailUrl: 'https://picsum.photos/seed/1/150',
    },
    {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://picsum.photos/seed/2/600',
        thumbnailUrl: 'https://picsum.photos/seed/2/150',
    },
    {
        albumId: 1,
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://picsum.photos/seed/3/600',
        thumbnailUrl: 'https://picsum.photos/seed/3/150',
    },
    {
        albumId: 1,
        id: 4,
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: 'https://picsum.photos/seed/4/600',
        thumbnailUrl: 'https://picsum.photos/seed/4/150',
    },
    {
        albumId: 1,
        id: 5,
        title: 'natus nisi omnis corporis facere molestiae rerum in',
        url: 'https://picsum.photos/seed/5/600',
        thumbnailUrl: 'https://picsum.photos/seed/5/150',
    },
    {
        albumId: 1,
        id: 6,
        title: 'accusamus ea aliquid et amet sequi nemo',
        url: 'https://picsum.photos/seed/6/600',
        thumbnailUrl: 'https://picsum.photos/seed/6/150',
    },
    {
        albumId: 1,
        id: 7,
        title: 'officia delectus consequatur vero aut veniam explicabo molestias',
        url: 'https://picsum.photos/seed/7/600',
        thumbnailUrl: 'https://picsum.photos/seed/7/150',
    },
    {
        albumId: 1,
        id: 8,
        title: 'aut porro officiis laborum odit ea laudantium corporis',
        url: 'https://picsum.photos/seed/8/600',
        thumbnailUrl: 'https://picsum.photos/seed/8/150',
    },
    {
        albumId: 1,
        id: 9,
        title: 'qui eius qui autem sed',
        url: 'https://picsum.photos/seed/9/600',
        thumbnailUrl: 'https://picsum.photos/seed/9/150',
    },
    {
        albumId: 1,
        id: 10,
        title: 'beatae et provident et ut vel',
        url: 'https://picsum.photos/seed/10/600',
        thumbnailUrl: 'https://picsum.photos/seed/10/150',
    },
    {
        albumId: 1,
        id: 11,
        title: 'nihil at amet non hic quia qui',
        url: 'https://picsum.photos/seed/11/600',
        thumbnailUrl: 'https://picsum.photos/seed/11/150',
    },
    {
        albumId: 1,
        id: 12,
        title: 'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores',
        url: 'https://picsum.photos/seed/12/600',
        thumbnailUrl: 'https://picsum.photos/seed/12/150',
    },
    {
        albumId: 1,
        id: 13,
        title: 'repudiandae iusto deleniti rerum',
        url: 'https://picsum.photos/seed/13/600',
        thumbnailUrl: 'https://picsum.photos/seed/13/150',
    },
    {
        albumId: 1,
        id: 14,
        title: 'est necessitatibus architecto ut laborum',
        url: 'https://picsum.photos/seed/14/600',
        thumbnailUrl: 'https://picsum.photos/seed/14/150',
    },
    {
        albumId: 1,
        id: 15,
        title: 'harum dicta similique quis dolore earum ex qui',
        url: 'https://picsum.photos/seed/15/600',
        thumbnailUrl: 'https://picsum.photos/seed/15/150',
    },
];

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

export default function Test() {
    const [modalVisible, setModalVisible] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);
    const insets = useSafeAreaInsets();

    const visibleData = DATA.slice(0, visibleCount);
    const hasMore = visibleCount < DATA.length;

    const loadMore = () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((count) => Math.min(count + PAGE_SIZE, DATA.length));
            setLoadingMore(false);
        }, 4000);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text>{item.title}</Text>
                <Image source={{ uri: item.url }} style={{ width: '100%', height: 400 }} />
            </View>
        );
    };


    return (
        <ScrollView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
             <ActivityIndicator size="large" color="blue" />
            <Pressable
                onPress={() => {
                    showAlert('clicked!', 'you clicked the button', [
                        {
                            text: 'Yes',
                            onPress: () => {
                                console.log('yes clicked');
                            },
                        },
                        {
                            text: 'No',
                            style: 'cancel',
                            onPress: () => {
                                console.log('no clicked');
                            },
                        },
                    ]);
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>click me!</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Open Modal</Text>
            </Pressable>

            <FlatList
                data={visibleData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={
                    loadingMore ? <ActivityIndicator style={styles.footerLoader} color="blue" /> : null
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalText}>test</Text>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
        width: 120,
        marginVertical: 30,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    item: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    footerLoader: {
        marginVertical: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        minWidth: 200,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 16,
    },
});