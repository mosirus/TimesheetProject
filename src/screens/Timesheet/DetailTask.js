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
} from 'react-native';

export default function DetailTask({route, navigation}) {
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
              projectName: projectName,
              projectID: projectID,
              name: name,
              assignee: assignee,
              difficulty: difficulty,
              taskPriority: taskPriority,
              startDate: startDate,
              endDate: endDate,
              description: description,
              status: status,
              key: key,
            })
          }>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Edit Task
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
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
          <Text style={[styles.Text, {fontSize: 18}]}>: {name}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Assignee</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {assignee}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Difficulty</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {difficulty}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Priority</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {taskPriority}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Start Date</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {startDate}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>End Date</Text>
          </View>
          <Text style={[styles.Text, {fontSize: 18}]}>: {endDate}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: 150}}>
            <Text style={[styles.Text, {fontSize: 18}]}>Task Description</Text>
          </View>
          <Text
            style={[styles.Text, {width: 200, fontSize: 18, flexWrap: 'wrap'}]}>
            : {description}
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
