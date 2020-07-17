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
  Alert,
} from 'react-native';
import * as Resources from '../../config/resource';
import moment from 'moment';

export default function DetailTask({route, navigation}) {
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

  const deleteTask = () => {
    Resources.deleteTask(TaskId)
      .then(r => {
        Alert.alert('Delete Succes');
        console.log(r);
        navigation.navigate('TaskManagement');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const AlertDelete = () =>
    Alert.alert(
      "Delete",
      "Are You Sure To Delete This ? \nNote: Project Must Not Be Available",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: 'OK',
          onPress: () => {
            deleteTask();
          },
        },
      ],
      {cancelable: false},
    );

  const start = moment(StartDate).format('MM/DD/YYYY');
  const end = moment(EndDate).format('MM/DD/YYYY');
  return (
    <View style={{margin: 20, marginTop: 75}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#26BF64',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('EditTask', {
              // projectName: projectName,
              // projectID: projectID,
              // name: name,
              // assignee: assignee,
              // difficulty: difficulty,
              // taskPriority: taskPriority,
              // startDate: startDate,
              // endDate: endDate,
              // description: description,
              // status: status,
              // key: key,
              TaskId: TaskId,
              TaskName: TaskName,
              EmployeeName: EmployeeName,
              TaskDifficulty: TaskDifficulty,
              TaskPriority: TaskPriority,
              TaskStatus: TaskStatus,
              StartDate: StartDate,
              EndDate: EndDate,
              ManHour: ManHour,
              TaskDescription: TaskDescription,
              projectID: projectID,
            })
          }>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Edit Task
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={AlertDelete}
          style={{
            width: 150,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#DC3545',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Name</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>
            : {TaskName}, {projectID}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Assignee</Text>
          </View>
        <Text style={[styles.Text, {fontSize: 18}]}>: {EmployeeName}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Difficulty</Text>
          </View>
        <Text style={[styles.Text, {fontSize: 18}]}>: {TaskDifficulty}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Priority</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {TaskPriority}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Status</Text>
          </View>
          {TaskStatus === 1 &&(
            <Text style={[styles.Text, {fontSize: 18}]}>: To Do</Text>
          )}
          {TaskStatus === 2 && (
            <Text style={[styles.Text, {fontSize: 18}]}>: In Progress</Text>
          )}
          {TaskStatus === 3 && (
            <Text style={[styles.Text, {fontSize: 18}]}>: Done</Text>
          )}
          {TaskStatus === 4 && (
            <Text style={[styles.Text, {fontSize: 18}]}>: Not Done</Text>
          )}
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Start Date</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {start}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>End Date</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {end}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Estimation Time</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {ManHour}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Description</Text>
          </View>
          <Text
            style={[styles.Text, {width: 200, fontSize: 18, flexWrap: 'wrap'}]}>
            : {TaskDescription}
          </Text>
        </View>
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
