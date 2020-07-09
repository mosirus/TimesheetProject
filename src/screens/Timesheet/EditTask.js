import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditTask({route, navigation}) {
  const {projectName} = route.params;
  const {projectID} = route.params;
  const {name} = route.params;
  const {assignee} = route.params;
  const {difficulty} = route.params;
  const {taskPriority} = route.params;
  const {startDate} = route.params;
  const {endDate} = route.params;
  const {description} = route.params;
  const {status} = route.params;
  const {key} = route.params;

  const [selectedValue, setSelectedValue] = useState();
  const [value, onChangeText] = useState();

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
      <View style={{margin: 20, marginVertical: 10}}>
        <Text style={[styles.text, {opacity: 0.6, fontWeight: 'bold'}]}>
          Please Fill this form
        </Text>
      </View>
      <View style={{marginLeft: 20, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Task Name</Text>

        <TextInput
          placeholder="Input Task Name"
          style={styles.textInput}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={{marginLeft: 20, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Assignee</Text>

        <TextInput
          placeholder="Input Assignee Name"
          style={styles.textInput}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginLeft: 20, marginVertical: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Difficulty</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={selectedValue}
              style={{height: 20, width: 130}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Joged1-8" projectID="1" />
              <Picker.Item label="Joged9-16" projectID="2" />
            </Picker>
          </View>
          <Text
            style={[
              styles.text,
              {fontSize: 16, marginVertical: 50, marginBottom: 1},
            ]}>
            Start Date
          </Text>
          <View style={styles.datePicker}>
            <View style={{justifyContent: 'center', margin: 5}}>
              <Text>{tanggal}</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', margin: 5}}
              onPress={showDatepicker}>
              <FontAwesome5 name="calendar" size={25} color="#1A446D" />
            </TouchableOpacity>
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
          </View>
        </View>
        <View style={{marginRight: 20, marginVertical: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Task Priority</Text>
          <View style={[styles.pickerView, {width: 90}]}>
            <Picker
              selectedValue={selectedValue}
              style={{height: 20, width: 100}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Joged1-8" projectID="1" />
              <Picker.Item label="Joged9-16" projectID="2" />
            </Picker>
          </View>
          <Text
            style={[
              styles.text,
              {fontSize: 16, marginVertical: 50, marginBottom: 1},
            ]}>
            End Date
          </Text>
          <View style={styles.datePicker}>
            <View style={{justifyContent: 'center', margin: 5}}>
              <Text>{tanggal}</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', margin: 5}}
              onPress={showDatepicker}>
              <FontAwesome5 name="calendar" size={25} color="#1A446D" />
            </TouchableOpacity>
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
          </View>
        </View>
      </View>
      <View style={{marginLeft: 20, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Task Description</Text>
        <TextInput
          placeholder="Input Task Description"
          style={[styles.textInput, {height: 150}]}
          onChangeText={text => onChangeText(text)}
          value={value}
          multiline={true}
          textAlignVertical={'top'}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            marginTop: 100,
            width: 325,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#1A446E',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textInput: {
    height: 38,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  pickerView: {
    borderWidth: 1,
    height: 25,
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  datePicker: {
    height: 35,
    width: 120,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
});
