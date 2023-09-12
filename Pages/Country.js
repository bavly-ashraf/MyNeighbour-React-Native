import React from 'react'
import {View,Text, StyleSheet, Image} from 'react-native';

const Country = ({navigation,route}) => {
    const {country} = route.params;
    console.log(country);

    return ( 
        <View style={styles.container}>
            <Text style={styles.countryTxt}>{country?.name?.common}</Text>
            <Image source={{uri:country?.flags?.png}} style={styles.img} />
            <Text style={{width:'80%'}}>*{country?.flags?.alt}</Text>
            <Text>Coordinates(lat,long): {country?.latlng?.toString()}</Text>
            <Text style={styles.popTxt}>Capital: {country?.capital[0]}</Text>
            <Text style={{width:'80%'}}>Capital Info: {country?.capitalInfo?.latlang?.toString()}</Text>
            <Text style={styles.popTxt}>Population: {country?.population}</Text>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Coat of arms : </Text>
                <Image source={{uri:country?.coatOfArms?.png}} style={{width:100,height:100}} />
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:50,
    },
    countryTxt:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:20
    },
    popTxt:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:20
    },
    img:{
        width:'80%',
        height:200
    },
})
 
export default Country;