import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, Image, Picker} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

export default function AddNewProject({navigation}) {
  const [selectedValue, setSelectedValue] = useState('Active');
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          flex:1,
          height: 34,
          marginTop: 10,
          alignSelf: 'flex-start',
          marginRight: 21,
          marginHorizontal: 20,
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold', textAlign: 'center', paddingTop: 3,}}>
          Please Fill This Forms
        </Text>
      </View>
      <View style={{marginTop:16, marginHorizontal:20,}}>
        <Text style={styles.textSM}>Project Name</Text>
        <TextInput style={styles.inputText} maxLength={40} />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Client Name</Text>
        <TextInput style={styles.inputText} maxLength={40} />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>PO/Contact Number</Text>
        <TextInput style={styles.inputText} maxLength={40} />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Work Type</Text>
        <TextInput style={styles.inputText} maxLength={40} />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Work Type</Text>
        <View style={styles.viewPicker}>
          <Picker
            selectedValue={selectedValue}
            mode={'dropdown'}
            style={{fontFamily:'Nunito-Light', marginTop:-5, }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Active" value="js" />
            <Picker.Item label="Not Active" value="java" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 80,
          width: 325,
          height: 40,
          borderWidth: 0.5,
          backgroundColor: '#1A446D',
          alignSelf: 'center',
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius:5,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: 'Nunito-SemiBold',
          }}>
          A D D
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textSM: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Nunito-Light',
  },
  inputText:{
    textAlignVertical: 'top', borderWidth: 1, borderRadius:5, width:'100%', height:40, backgroundColor:'white', fontSize:18, fontFamily:'Nunito', fontWeight:'600', paddingLeft:2, paddingRight:10,
    borderColor:'#505050', fontFamily:'Nunito-Regular', fontWeight:'600', 
  },
  viewPicker:{
    width:'40%', height:40, borderRadius:5, borderColor:'#505050', borderWidth:1, backgroundColor:'white'
  },
})
