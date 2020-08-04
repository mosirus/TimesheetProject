import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  Alert,
  ScrollView,
} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import * as Resources from '../../config/resource';
import axios from 'axios';
import {API_URL1} from '../../config/URL';
import ProjectList from './ProjectList';

export default function AddNewProject({navigation}) {
  const [selectedValue, setSelectedValue] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [workType, setWorkType] = useState('');
  const [status, setStatus] = useState();

  const body = {
    projectName: projectName,
    contract: contactNumber,
    status: selectedValue,
    workType: workType,
    ClientName: clientName,
    Active: true,
  };

  const addProject = () => {
    if (
      projectName === '' ||
      contactNumber === '' ||
      selectedValue === null ||
      workType === '' ||
      clientName === ''
    ) {
      Alert.alert('All form must be filled!');
    } else {
      Resources.createProject(body)
        .then(res => {
          resetForm();
          console.log('Project Berhasil Ditambahkan');
          Alert.alert('Add Project Success');
          navigation.navigate('ProjectList');
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  };

  // const addProjects = () => {
  //   const Headers = {
  //     'accept' : 'application/json',
  //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicHJvZmlsZSI6eyJmaXJzdG5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoiYWRtaW4iLCJnZW5kZXIiOiJNYWxlIiwiZG9iIjoiMjAyMC0wMy0yN1QwMDowMDowMCswMDowMCIsImVtYWlsIjoiYWRtaW5AbW9vbmxheS5jb20ifSwicGVybWlzc2lvbiI6eyJTQURNSU4iOjEsImFwcCI6OTl9LCJpYXQiOjE1OTQxMDMxMTl9.3jkqWMc_WlA7kJ4uxWEGyPoMwpA0Y0qlmdVZYw7mTjc`,
  //     'Content-type': 'application/json',
  //   };

  //   const Data = {
  //     projectName: projectName,
  //     contract: contactNumber,
  //     status: 0,
  //     workType: workType,
  //     ClientName: clientName,
  //     Active: true,
  //   };

  //   axios({
  //     method: 'POST',
  //     url: API_URL1,
  //     headers: Headers,
  //     data: JSON.stringify({
  //       projectName: projectName,
  //       contract: contactNumber,
  //       status: 0,
  //       workType: workType,
  //       ClientName: clientName,
  //       Active: true,
  //     }),
  //   })
  //     .then(data => {
  //       console.log(data.data);
  //       resetForm();
  //       Alert('Add Project Success');
  //     })
  //     .catch(err => {
  //       console.log(JSON.stringify(err));
  //     });
  // };

  const resetForm = () => {
    setProjectName("");
    setClientName("");
    setContactNumber("");
    setWorkType("");
  };

  return (
    <ScrollView>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            height: 34,
            marginTop: 10,
            alignSelf: 'flex-start',
            marginRight: 21,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Nunito-SemiBold',
              textAlign: 'center',
              paddingTop: 3,
            }}>
            Please Fill This Forms
          </Text>
        </View>
        <View style={{marginTop: 16, marginHorizontal: 20}}>
          <Text style={styles.textSM}>Project Name</Text>
          <TextInput
            style={styles.inputText}
            maxLength={40}
            value={projectName}
            onChangeText={projectName => setProjectName(projectName)}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.textSM}>Client Name</Text>
          <TextInput
            style={styles.inputText}
            maxLength={40}
            value={clientName}
            onChangeText={clientName => setClientName(clientName)}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.textSM}>PO/Contact Number</Text>
          <TextInput
            style={styles.inputText}
            maxLength={40}
            value={contactNumber}
            onChangeText={contactNumber => setContactNumber(contactNumber)}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.textSM}>Work Type</Text>
          <TextInput
            style={styles.inputText}
            maxLength={40}
            value={workType}
            onChangeText={workType => setWorkType(workType)}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.textSM}>Status</Text>
          <View style={styles.viewPicker}>
            <Picker
              selectedValue={selectedValue}
              mode={'dropdown'}
              style={{fontFamily: 'Nunito-Light', marginTop: -5}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Active" value={1} />
              <Picker.Item label="Not Active" value={2} />
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
            borderRadius: 5,
          }}
          onPress={addProject}>
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
    </ScrollView>
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
  inputText: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    fontSize: 18,
    fontFamily: 'Nunito',
    paddingLeft: 2,
    paddingRight: 10,
    borderColor: '#505050',
    fontFamily: 'Nunito-Regular',
  },
  viewPicker: {
    width: '40%',
    height: 40,
    borderRadius: 5,
    borderColor: '#505050',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});
