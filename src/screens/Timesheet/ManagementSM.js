import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Card } from 'react-native-elements'
import Calendar from '../../../image/calendar.png'
import ProjectList from '../../../image/ProjectList.png'

export default function ManagementSM({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginLeft: 25}}>
        <Text style={styles.text2}>Management Scrum Master</Text>
      </View>
      <View style={{flex: 15, flexDirection: 'row', alignSelf: 'center'}}>
        <Card containerStyle={styles.card}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ProjectList')}>
            <Image source={Calendar} style={{width:70, height: 70}} /> 
            <Text style={styles.text}>Project List</Text>
          </TouchableOpacity>
        </Card>
        <Card containerStyle={styles.card}>
          <TouchableOpacity style={styles.Button} >
          <Image source={ProjectList} style={{width:70, height: 70}} /> 
            <Text style={styles.text}>Task Management</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
  },
  card: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 7,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    color: '#505050',
    paddingTop: 13,
  },
  text2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 5,
    color: '#505050',
    paddingTop: 13,
  },
})