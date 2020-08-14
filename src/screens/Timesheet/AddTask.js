import React, {Component, useState, useEffect, useCallback} from 'react';
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
  Alert,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Resources from '../../config/resource';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function AddTask({navigation, route}) {
  const [selectedValue, setSelectedValue] = useState();
  const [value, onChangeText] = useState();

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [mode1, setMode1] = useState('date');
  const [mode2, setMode2] = useState('date');

  const {projectID} = route.params;
  const [taskname, setTaskname] = useState('');
  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [difficulty, setDifficulty] = useState('Low');
  const [priority, setPriority] = useState(1);
  const [valueStatus, setValueStatus] = useState(1);
  const [startdate, setStartdate] = useState(new Date());
  const [choosestartdate, setChoosestartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [chooseenddate, setChooseenddate] = useState(new Date());
  const [estimation, setEstimation] = useState();
  const [desc, setDesc] = useState('');

  const [employee, setEmployee] = useState([]);

  const body = {
    TaskName: taskname,
    EmployeeId: employeeId,
    EmployeeName: employeeName,
    TaskDifficulty: difficulty,
    TaskPriority: priority,
    TaskStatus: 1,
    StartDate: choosestartdate,
    EndDate: chooseenddate,
    ManHour: estimation,
    ProjectId: projectID,
    TaskDescription: desc,
  };

  const addTask = () => {
    if (
      taskname === '' ||
      employeeId === null ||
      employeeName === '' ||
      difficulty === '' ||
      priority === null ||
      choosestartdate === '' ||
      chooseenddate === '' ||
      estimation === '' ||
      desc === ''
    ) {
      Alert.alert('All form must be filled!');
      console.log(taskname);
      console.log(employeeId);
      console.log(employeeName);
    } else {
      Resources.createTask(body)
        .then(res => {
          resetForm();
          Alert.alert('Add Task Success');
          navigation.navigate('TaskManagement');
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  };

  useEffect(() => {
    getEmployeeId();
    getEmployee();
  }, [employeeId, getEmployeeId]);

  const getEmployee = () => {
    Resources.getEmployee()
      .then(r => {
        console.log(r.data);
        // setProjectname(r);
        setEmployee(r.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getEmployeeId = useCallback(() => {
    Resources.getEmployeeId(employeeId)
      .then(r => {
        // console.log(r.data.profile.firstname);
        console.log(r.data.username);
        // setProjectname(r);
        // setEmployeeName(
        //   r.data.profile.firstname + ' ' + r.data.profile.lastname,
        // );
        setEmployeeName(r.data.username);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const onPickerChange = itemValue => {
    setEmployeeId(itemValue);
    getEmployeeId();
  };

  const resetForm = () => {
    setTaskname('');
    // setAsignee('');
    setDifficulty('');
    setPriority('');
    setChoosestartdate('');
    setChooseenddate('');
    setDesc('');
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate1 = selectedDate || choosestartdate;
    setShow1(Platform.OS === 'ios');
    // setChoosestartdate(currentDate1.substr(0, 15));
    // setStartdate(selectedDate);
    // setShow1(false);
    setChoosestartdate(currentDate1);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate2 = selectedDate || chooseenddate;
    setShow2(Platform.OS === 'ios');
    // setChooseenddate(currentDate2.substr(0, 15));
    // setEnddate(selectedDate);
    // setShow2(false);
    setChooseenddate(currentDate2);
  };

  const showMode1 = currentMode1 => {
    setShow1(true);
    setMode1(currentMode1);
  };

  const showDatepicker1 = () => {
    // showMode1('date');
    showMode1('date');
  };

  const showMode2 = currentMode2 => {
    setShow2(true);
    setMode2(currentMode2);
  };

  const showDatepicker2 = () => {
    // showMode2('date');
    showMode2('date');
  };

  const start = moment(choosestartdate).format('DD/MM/YYYY');
  const end = moment(chooseenddate).format('DD/MM/YYYY');
  return (
    <ScrollView>
      <View>
        <View style={{margin: 20, marginVertical: 10}}>
          <Text style={[styles.text, {opacity: 0.6, fontWeight: 'bold'}]}>
            Please Fill this form
          </Text>
        </View>
        <View style={{marginLeft: 20, marginBottom: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Task Name *</Text>
          <TextInput
            placeholder="Input Task Name"
            style={styles.textInput}
            value={taskname}
            onChangeText={taskname => setTaskname(taskname)}
          />
        </View>
        <View style={{marginLeft: 20, marginBottom: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Assignee *</Text>
          {/* <TextInput
          placeholder="Input Assignee Name"
          style={styles.textInput}
          value={asignee}
          onChangeText={asignee => setAsignee(asignee)}
        /> */}
          <View style={styles.pickerView2}>
            <Picker
              mode={'dropdown'}
              selectedValue={employeeId}
              style={{height: 20, width: '100%', marginTop: 5}}
              onValueChange={(itemValue, itemIndex) =>
                onPickerChange(itemValue)
              }>
              {employee.map((item, key) => (
                <Picker.Item
                  // label={item.profile.firstname + ' ' + item.profile.lastname}
                  label={item.username}
                  value={item._id}
                  key={key}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginLeft: 20, marginVertical: 10}}>
            <Text style={[styles.text, {fontSize: 16}]}>Difficulty *</Text>
            <View style={styles.pickerView}>
              <Picker
                mode={'dropdown'}
                selectedValue={difficulty}
                style={{height: 20, width: 120}}
                onValueChange={(itemValue, itemIndex) =>
                  setDifficulty(itemValue)
                }>
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
            <Text
              style={[
                styles.text,
                {fontSize: 16, marginVertical: 20, marginBottom: 1},
              ]}>
              Start Date *
            </Text>
            <View style={styles.datePicker}>
              <View style={{justifyContent: 'center', margin: 5}}>
                <Text>{start}</Text>
              </View>
              <TouchableOpacity
                style={{justifyContent: 'center', margin: 5}}
                onPress={showDatepicker1}>
                <FontAwesome5 name="calendar" size={25} color="#1A446D" />
              </TouchableOpacity>
              {show1 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={choosestartdate}
                  mode={mode1}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeStartDate}
                />
              )}
            </View>
          </View>
          <View style={{marginRight: 20, marginVertical: 10}}>
            <Text style={[styles.text, {fontSize: 16}]}>Task Priority *</Text>
            <View style={[styles.pickerView, {width: 90}]}>
              <Picker
                selectedValue={priority}
                mode={'dropdown'}
                style={{height: 20, width: 90}}
                onValueChange={(itemValue, itemIndex) =>
                  setPriority(itemValue)
                }>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </View>
            <Text
              style={[
                styles.text,
                {fontSize: 16, marginVertical: 20, marginBottom: 1},
              ]}>
              End Date *
            </Text>
            <View style={styles.datePicker}>
              <View style={{justifyContent: 'center', margin: 5}}>
                <Text>{end}</Text>
              </View>
              <TouchableOpacity
                style={{justifyContent: 'center', margin: 5}}
                onPress={showDatepicker2}>
                <FontAwesome5 name="calendar" size={25} color="#1A446D" />
              </TouchableOpacity>
              {show2 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={chooseenddate}
                  mode={mode2}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {/* <View style={{marginVertical: 5}}>
            <Text style={[styles.text, {fontSize: 16}]}>Task Status</Text>
            <View style={styles.pickerView}>
              <Picker
                mode={'dropdown'}
                selectedValue={valueStatus}
                style={{height: 20, width: 130}}
                onValueChange={(itemValue, itemIndex) =>
                  setValueStatus(itemValue)
                }>
                <Picker.Item label="To Do" value={1} />
                <Picker.Item label="In Progress" value={2} />
                <Picker.Item label="Done" value={3} />
                <Picker.Item label="Not Done" value={4} />
              </Picker>
            </View>
          </View> */}
          <View style={{marginVertical: 5}}>
            <Text style={[styles.text, {fontSize: 16}]}>Estimation Time *</Text>
            <View style={styles.textInputEsti}>
              <TextInput
                placeholder="Estimation"
                value={estimation}
                onChangeText={estimation => setEstimation(estimation)}
              />
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20, marginTop: 15}}>
          <Text style={[styles.text, {fontSize: 16}]}>Task Description *</Text>
          <TextInput
            placeholder="Input Task Description"
            style={[styles.textInput, {height: 150}]}
            onChangeText={desc => setDesc(desc)}
            value={desc}
            multiline={true}
            textAlignVertical={'top'}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={addTask}
            style={{
              marginTop: 50,
              width: 325,
              height: 40,
              borderWidth: 0.5,
              backgroundColor: '#1A446E',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  textInputEsti: {
    height: 38,
    width: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    alignContent: 'center',
  },
  pickerView: {
    borderWidth: 1,
    height: 25,
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    color: '#060606',
  },
  pickerView2: {
    borderWidth: 1,
    height: 38,
    borderColor: 'gray',
    width: '95%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
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
  sTextItem: {
    height: 50,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
