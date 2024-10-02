import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
//import * as Location from 'expo-location';

export default function Map(props) {

   /* useEffect(() => {
        (async() => {
            getUserPosition();
        })(); }, []);
    */
        
    return (
        <MapView
        style={styles.map}
        region={props.location}
        />
    )

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});
}