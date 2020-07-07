import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, Picker, Image} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import moment from 'moment';
// import {Picker} from '@react-native-community/picker';

export default function Task({navigation}) {
  const [selectedValue, setSelectedValue] = useState('JavaScript');
  const [task, settask] = useState([
    {name: 'joged 1', time: '6:00AM-6:30AM', duration: '00:30:00', key: '1'},
    {name: 'joged 2', time: '6:00AM-6:31AM', duration: '00:31:00', key: '2'},
    {name: 'joged 3', time: '6:00AM-6:32AM', duration: '00:32:00', key: '3'},
    {name: 'joged 4', time: '6:00AM-6:33AM', duration: '00:33:00', key: '4'},
    {name: 'joged 5', time: '6:00AM-6:34AM', duration: '00:34:00', key: '5'},
    {name: 'joged 6', time: '6:00AM-6:35AM', duration: '00:35:00', key: '6'},
    {name: 'joged 7', time: '6:00AM-6:36AM', duration: '00:36:00', key: '7'},
    {name: 'joged 8', time: '6:00AM-6:37AM', duration: '00:37:00', key: '8'},
    {name: 'joged 9', time: '6:00AM-6:30AM', duration: '00:30:00', key: '9'},
    {name: 'joged 10', time: '6:00AM-6:31AM', duration: '00:31:00', key: '10'},
    {name: 'joged 11', time: '6:00AM-6:32AM', duration: '00:32:00', key: '11'},
    {name: 'joged 12', time: '6:00AM-6:33AM', duration: '00:33:00', key: '12'},
    {name: 'joged 13', time: '6:00AM-6:34AM', duration: '00:34:00', key: '13'},
    {name: 'joged 14', time: '6:00AM-6:35AM', duration: '00:35:00', key: '14'},
    {name: 'joged 15', time: '6:00AM-6:36AM', duration: '00:36:00', key: '15'},
    {name: 'joged 16', time: '6:00AM-6:37AM', duration: '00:37:00', key: '16'},
  ]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [choosedate, setChooseDate] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate.toString();
    setShow(Platform.OS === 'ios');
    setChooseDate(currentDate.substr(0, 15));
    setDate(selectedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const tanggal = moment(choosedate).format('MM/DD/YYYY');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
          Project Name :
        </Text>
        <View
          style={{
            borderWidth: 1,
            height: 25,
            width: 220,
            marginLeft: 20,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
          }}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 20, width: 230}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Joged1-8" value="js" />
            <Picker.Item label="Joged9-16" value="java" />
          </Picker>
        </View>
      </View>
      <View style={styles.datePicker}>
        <View
          style={{
            height: 30,
            width: 35,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity onPress={showDatepicker}>
            <Image source={calendarItem} style={{width: 21, height: 21}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 30,
            width: 90,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: 'center',
            paddingLeft: 6,
            backgroundColor: '#FFFFFF',
          }}>
          {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        )}
          <Text>{tanggal}</Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          height: 25,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 125,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Task</Text>
        </View>
        <View
          style={{
            width: 120,
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Time</Text>
        </View>
        <View
          style={{
            width: 110,
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Duration</Text>
        </View>
      </View>
      <View
        style={{
          height: 350,
        }}>
        <FlatList
          data={task}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 2,
                height: 25,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 125,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 5}}>{item.name}</Text>
              </View>
              <View
                style={{
                  width: 120,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 5, fontSize: 12}}>{item.time}</Text>
              </View>
              <View
                style={{
                  width: 110,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{marginLeft: 5}}>{item.duration}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 100,
          width: 325,
          height: 40,
          borderWidth: 0.5,
          backgroundColor: '#26BF64',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Report')}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF',}}>R E P O R T</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOn: {
    flexDirection: 'row',
    width: 175,
    height: 30,
    backgroundColor: '#265685',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#707070',
    borderWidth: 0.5,
  },
  buttonOff: {
    flexDirection: 'row',
    width: 175,
    height: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#707070',
    borderWidth: 0.5,
  },
  timeSheet: {
    margin: 20,
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#D3D3D3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  container: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  datePicker: {
    marginHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#265685',
  },
});