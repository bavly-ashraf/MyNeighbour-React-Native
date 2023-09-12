import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({navigation}) {

  const [countries,setCountries] = useState('');
  const [neighbours,setNeighbours] = useState([]);
  const [error,setError] = useState('')

  const getCountry = async()=> {
    try{
      setError('');
      setNeighbours([]);
      const response = await fetch(`https://restcountries.com/v3.1/name/${countries}`);
      const data = await response.json();
      if(data.status) throw new Error('Sorry can\'t find this country in the database')
      getNeighbours(data[0].borders)
    }catch(e){
      setError(e.message)
    }
  }

  const getNeighbours = (neighbouringCountries)=> {
    try{
      setError('')
      const neighboursFlags= [];
      for(let i=0;i<neighbouringCountries.length;i++){
        (async function(){
          const response = await fetch(`https://restcountries.com/v3.1/name/${neighbouringCountries[i]}`);
          const data = await response.json();
          if(!data.status){
            neighboursFlags.push(data[0]);
          }
          if(i == neighbouringCountries.length-1){
            setNeighbours(neighboursFlags);
          }
        })()
      }
    }catch(e){
      setError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.txtView}>
      <Text style={styles.header}>Who is my neighbour?</Text>
      <TextInput placeholder='Enter a country name in english' style={styles.input} onChangeText={text=>setCountries(text)}/>
      <Button color='red' title='Find neighbours' onPress={getCountry} />
      {!error && <Text style={styles.foundTxt}>found {neighbours.length == 1? `${neighbours.length} neighbour`:`${neighbours.length} neighbours`}</Text>}
      {error && <Text style={styles.header}>{error}</Text>}
      </View>
      <View style={{flex:2,width:'100%'}}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {neighbours && neighbours.map(el=><TouchableOpacity style={{width:'100%'}} key={el?.name?.common} onPress={()=>navigation.navigate('Country', {country: el})}><View key={el?.name?.common} style={{flex:1,alignItems:'center'}}><Image style={styles.img} key={el?.name?.common} source={{uri:el?.flags?.png}} /></View></TouchableOpacity>)}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
  },
  scrollView:{
    width:'100%',
    borderTopColor:'grey',
    borderTopWidth:2
  },
  scrollViewContent:{
    alignItems:'center'
  },
  header:{
    color:'purple',
    fontSize:26
  },
  foundTxt:{
    marginTop:10
  },
  input:{
    borderColor:'blue',
    padding:12,
    borderWidth:2,
    width:'80%',
    height:40,
    margin:30
  },
  img:{
    margin:5,
    height:200,
    width:'80%'
  }
});
