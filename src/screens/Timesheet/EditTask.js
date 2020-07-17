import React, {Component, useState, useEffect} from 'react';
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
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Resources from '../../config/resource';

export default function EditTask({route, navigation}) {
  // const {projectName} = route.params;
  // const {projectID} = route.params;
  // const {name} = route.params;
  // const {assignee} = route.params;
  // const {difficulty} = route.params;
  // const {taskPriority} = route.params;
  // const {startDate} = route.params;
  // const {endDate} = route.params;
  // const {description} = route.params;
  // const {status} = route.params;
  // const {key} = route.params;

  const [selectedValue, setSelectedValue] = useState();
  const [value, onChangeText] = useState();

  const [date, setDate] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [mode2, setMode2] = useState('date');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [choosedate, setChooseDate] = useState();

  const {TaskId} = route.params;
  const {TaskName} = route.params;
  const {EmployeeName} = route.params;
  const {TaskDifficulty} = route.params;
  const {TaskPriority} = route.params;
  const {TaskStatus} = route.params;
  const {StartDate} = route.params;
  const {EndDate} = route.params;
  const {ManHour} = route.params;
  const {TaskDescription} = route.params;
  const {projectID} = route.params;

  const [taskname, setTaskname] = useState(TaskName);
  const [asignee, setAsignee] = useState(EmployeeName);
  const [difficulty, setDifficulty] = useState(TaskDifficulty);
  const [priority, setPriority] = useState(TaskPriority);
  const [valueStatus, setValueStatus] = useState(TaskStatus);
  const [startdate, setStartdate] = useState(new Date());
  const [choosestartdate, setChoosestartdate] = useState(StartDate);
  const [enddate, setEnddate] = useState(new Date());
  const [estimation, setEstimation] = useState(ManHour);
  const [chooseenddate, setChooseenddate] = useState(EndDate);
  const [desc, setDesc] = useState(TaskDescription);

  const body = {
    TaskName: taskname,
    EmployeeName: asignee,
    TaskDifficulty: difficulty,
    TaskPriority: priority,
    TaskStatus: valueStatus,
    StartDate: choosestartdate,
    EndDate: chooseenddate,
    ManHour: estimation,
    ProjectId: projectID,
    TaskDescription: desc,
  };

  const editTask = () => {
    Resources.editTask(body, TaskId)
      .then(res => {
        resetForm();
        Alert.alert('Edit Task Success');
        navigation.navigate('TaskManagement');
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const resetForm = () => {
    setTaskname('');
    setAsignee('');
    setDifficulty('');
    setPriority('');
    setChoosestartdate('');
    setChooseenddate('');
    setDesc('');
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const [employee, setEmployee] = useState([]);

  const getEmployee = () => {
    Resources.getEmployee()
      .then((r) => {
        console.log(r.data);
        // setProjectname(r);
        setEmployee(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const onChangeStartDate = (event, selectedDate) => {
    const currentDate1 = selectedDate.toString();
    setChoosestartdate(currentDate1.substr(0, 15));
    setStartdate(selectedDate);
    setShow1(false);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate2 = selectedDate.toString();
    setChooseenddate(currentDate2.substr(0, 15));
    setEnddate(selectedDate);
    setShow2(false);
  };

  // const showMode1 = currentMode1 => {
  //   setShow1(true);
  //   setMode1(currentMode1);
  // };

  // const showMode2 = currentMode2 => {
  //   setShow2(true);
  //   setMode2(currentMode2);
  // };

  const showDatepicker1 = () => {
    // showMode1('date');
    setShow1(true);
  };

  const showDatepicker2 = () => {
    // showMode2('date');
    setShow2(true);
  };

  const start = moment(choosestartdate).format('MM/DD/YYYY');
  const end = moment(chooseenddate).format('MM/DD/YYYY');
  return (
    <View>
      <View style={{margin: 20, marginVertical: 10}}>
        <Text style={[styles.text, {opacity: 0.6, fontWeight: 'bold'}]}>
          Please Fill this form {projectID}
        </Text>
      </View>
      <View style={{marginLeft: 20, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Task Name </Text>

        <TextInput
          placeholder="Input Task Name"
          style={styles.textInput}
          value={taskname}
          onChangeText={taskname => setTaskname(taskname)}
        />
      </View>
      <View style={{marginLeft: 20, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Assignee</Text>

        {/* <TextInput
          placeholder="Input Assignee Name"
          style={styles.textInput}
          value={asignee}
          onChangeText={asignee => setAsignee(asignee)}
        /> */}
        <View style={styles.pickerView2}>
        <Picker
            mode={'dropdown'}
            selectedValue={asignee}
            style={{height: 20, width: '100%', marginTop:5}}
            onValueChange={(itemValue, itemIndex) => setAsignee(itemValue)}>
            {employee.map((item, key) => (
              <Picker.Item
                label={item.username}
                value={item.username}
                key={key}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginLeft: 20, marginVertical: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Difficulty</Text>
          <View style={styles.pickerView}>
            <Picker
              mode={'dropdown'}
              selectedValue={difficulty}
              style={{height: 20, width: 130}}
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
            Start Date
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
                value={startdate}
                mode={'date'}
                is24Hour={true}
                display={'calendar'}
                onChange={onChangeStartDate}
              />
            )}
          </View>
        </View>
        <View style={{marginRight: 20, marginVertical: 10}}>
          <Text style={[styles.text, {fontSize: 16}]}>Task Priority</Text>
          <View style={[styles.pickerView, {width: 90}]}>
            <Picker
              selectedValue={priority}
              style={{height: 20, width: 100}}
              onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
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
            End Date
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
                value={enddate}
                mode={'date'}
                display={'calendar'}
                onChange={onChangeEndDate}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20,}}>
        <View style={{ marginVertical: 5}}>
          <Text style={[styles.text, {fontSize: 16}]}>Task Status</Text>
          <View style={styles.pickerView}>
            <Picker
              mode={'dropdown'}
              selectedValue={valueStatus}
              style={{height: 20, width: 130}}
              onValueChange={(itemValue, itemIndex) => setValueStatus(itemValue)}>
              <Picker.Item label="To Do" value={1} />
              <Picker.Item label="In Progress" value={2} />
              <Picker.Item label="Done" value={3} />
              <Picker.Item label="Not Done" value={4} />
            </Picker>
          </View>
        </View>
        <View style={{marginVertical: 5}}>
          <Text style={[styles.text, {fontSize: 16}]}>Estimation Time</Text>
          <View style={styles.textInputEsti}>
            <TextInput
              placeholder="Estimation"
              value={estimation}
              onChangeText={estimation => setEstimation(estimation)}
            />
          </View>
        </View>
      </View>
      <View style={{marginLeft: 20, marginTop: 15, marginBottom: 10}}>
        <Text style={[styles.text, {fontSize: 16}]}>Task Description</Text>
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
          onPress={editTask}
          style={{
            marginTop: 20,
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
  },
  pickerView2: {
    borderWidth: 1,
    height: 38,
    borderColor: 'gray',
    width: '95%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  pickerStatus: {
    borderWidth: 1,
    height: 25,
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    marginLeft: 20,
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
