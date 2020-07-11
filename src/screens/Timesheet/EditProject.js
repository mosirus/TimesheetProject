import React, {Component, useState,useEffect} from 'react';
import {Text, View, StyleSheet, Image, Picker,Alert} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import * as Resources from '../../config/resource';

export default function EditProject({route,navigation}) {
  const [selectedValue, setSelectedValue] = useState(status);

  const {name} = route.params;
  const {clientNames} = route.params;
  const {PO} = route.params;
  const {worktype} = route.params;
  const {status} = route.params;
  const {id} = route.params;

  const [projectName, setProjectName] = useState(name);
  const [clientName, setClientName] = useState(clientNames);
  const [contactNumber, setContactNumber] = useState(PO);
  const [workType, setWorkType] = useState(worktype);
  const [value, setValue] = useState(status);
  const [active, setActive] = useState(true);

  const body = {
    projectName: projectName,
    contract: contactNumber,
    status: value,
    workType: workType,
    ClientName: clientName,
    Active: active,
  };

  const editProject = () => {
    Resources.editProject(body, id)
      .then(res => {
        resetForm();
        Alert.alert('Edit Project Success');
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const resetForm = () => {
    setProjectName("");
    setClientName("");
    setContactNumber("");
    setWorkType("");
  };

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
        <TextInput
          style={styles.inputText}
          maxLength={40}
          value={projectName}
          onChangeText={projectName => setProjectName(projectName)}
        />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Client Name</Text>
        <TextInput
          style={styles.inputText}
          maxLength={40}
          value={clientName}
          onChangeText={clientName => setClientName(clientName)}
        />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>PO/Contact Number</Text>
        <TextInput
          style={styles.inputText}
          maxLength={40}
          value={contactNumber}
          onChangeText={contactNumber => setContactNumber(contactNumber)}
        />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Work Type</Text>
        <TextInput
          style={styles.inputText}
          maxLength={40}
          value={workType}
          onChangeText={workType => setWorkType(workType)}
        />
      </View>
      <View style={{marginHorizontal:20,}}>
        <Text style={styles.textSM}>Status</Text>
        <View style={styles.viewPicker}>
          <Picker
            selectedValue={value}
            mode={'dropdown'}
            style={{fontFamily:'Nunito-Light', marginTop:-5, }}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
            <Picker.Item label="Active" value={1} />
            <Picker.Item label="Not Active" value={0} />
          </Picker>
        </View>
      </View>
      <TouchableOpacity onPress={editProject}
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
          S A V E
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
