import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const geoLocation = async () => {
            try {
                const { granted } = await Location.requestForegroundPermissionsAsync();
                if (!granted) {
                    console.log('Permission for access to location was denied');
                    return;
                }

                const currentPosition = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest,
                });
                setLocation(currentPosition);
            } catch (error) {
                console.log(error);
            }
        };

        geoLocation();
    }, []);

    return { location };
};