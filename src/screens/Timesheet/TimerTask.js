/* eslint-disable prettier/prettier */
import React, {Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import PauseItem from '../../../image/Pause.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import * as Resources from '../../config/resource';
import { Stopwatch} from 'react-native-stopwatch-timer';
import moment from 'moment';

export default function TimerTask({route,navigation}) {
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

    const [stopwatchStart, setStopwatchStart] = useState(false);
    const [stopwatchReset, setStopwatchReset] = useState(false);
    const [startBool, setStartBool] = useState(false);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState();  

    const toggleStopWatch = () => {
        // this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
        setStopwatchStart(!stopwatchStart);
        const clockStart = moment().format('hh:mm:ss');
        const clockEnd = moment().format('hh:mm:ss');
        if(stopwatchStart === false) {
          setStartTime(clockStart);
          setStartBool(true);
          if(startBool === true) {
            setStartTime(startTime);
          }
        } else {
          setEndTime(clockEnd);
        }
        setStopwatchReset(false);
    };

    const resetStopwatch = () => {
        // this.setState({isStopwatchStart: false, resetStopwatch: true});
        setStopwatchStart(false);
        setStopwatchReset(true);
      };


      const body = {
        StartTime: startTime,
        EndTime: endTime,
        Duration: duration,
        ProjectId: projectID,
        TaskManagementId: TaskId,
      };

      const body1 = {
        TaskName: TaskName,
        EmployeeName: EmployeeName,
        TaskDifficulty: TaskDifficulty,
        TaskPriority: TaskPriority,
        TaskStatus: 2,
        StartDate: StartDate,
        EndDate: EndDate,
        ManHour: ManHour,
        ProjectId: projectID,
        TaskDescription: TaskDescription,
      };

      const body2 = {
        TaskName: TaskName,
        EmployeeName: EmployeeName,
        TaskDifficulty: TaskDifficulty,
        TaskPriority: TaskPriority,
        TaskStatus: 3,
        StartDate: StartDate,
        EndDate: EndDate,
        ManHour: ManHour,
        ProjectId: projectID,
        TaskDescription: TaskDescription,
      };

      const start = moment(StartDate).format('MM/DD/YYYY');
      const end = moment(EndDate).format('MM/DD/YYYY');

      const addToHistory = () => {
        Resources.editTask(body1, TaskId)
          .then(res => {
            console.log('Change Status To In Progress');
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
        Resources.taskDone(body)
          .then(res => {
            // resetForm();
            Alert.alert('Task Save To History');
            navigation.navigate('Task');
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      };

      const taskDone = () => {
        Resources.editTask(body2, TaskId)
          .then(res => {
            console.log('Change Status To Done');
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
        Resources.taskDone(body)
          .then(res => {
            // resetForm();
            Alert.alert('Your Task Done And Save To History');
            navigation.navigate('Task');
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      };

      

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Task Name </Text>
        <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {TaskName}, {TaskStatus}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Diffilcuty     </Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {TaskDifficulty}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Task Priority</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {TaskPriority}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Start Date</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {start}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>End Date</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {end}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Duration</Text>
          <Text>   :</Text>
          <View style={{flexDirection: 'row', marginLeft: 10, marginTop:-3}}>
            <Stopwatch  start={stopwatchStart}
              reset={stopwatchReset}
              options={options}
              getTime={(time) => setDuration(time)}
            />
          <TouchableOpacity onPress={toggleStopWatch} style={{marginLeft: 10}}>
            {/* <Text style={{fontSize: 20}}>{!stopwatchStart ? "Start" : "Stop"}</Text> */}
            {!stopwatchStart ?
            <Image
            source={PlayItem}
            style={{width: 30, height: 30, marginLeft: 5}}/> 
            :
            <Image
            source={PauseItem}
            style={{width: 30, height: 30, marginLeft: 5}}/>
            }
          </TouchableOpacity>
          <TouchableHighlight onPress={resetStopwatch} style={{marginLeft: 10}}>
            <Text style={{fontSize: 20}}>Reset</Text>
          </TouchableHighlight>
          </View>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Start Time</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {startTime}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>End Time</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {endTime}</Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', marginTop: 100}}>
        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#1A446E',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={taskDone}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Task Done
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#26BF64',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={addToHistory}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            Add To History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const options = {
  container: {
    height: 30,
            width: 80,
            borderRadius: 5,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
  }
};

