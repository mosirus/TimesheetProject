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


    const [timerStart, setTimerStart] = useState(false);
    const [stopwatchStart, setStopwatchStart] = useState(false);
    const [totalDuration, setTimerDuration] = useState(90000);
    const [timerReset, setTimerReset] = useState(false);
    const [stopwatchReset, setStopwatchReset] = useState(false);

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [msec, setMsec] = useState();
    const [duration, setDuration] = useState();

    const hour = moment().format('hh:mm:ss');

    // const resDur = duration.format('hh:mm:ss');
    

    // let duration = moment(this.state.startTime+":00 01/01/1991");
        
    // let duration2 = moment(this.state.endTime+":00 01/01/1991");
    // let kurang = moment.utc(duration2.diff(duration)).format("HH:mm:ss");

    const coba = new Date().getHours();
    const coba1 = new Date().getMinutes();
    //Start Time
    const [hoursStart, setHoursStart] = useState();
    const [minutesStart, setMinutesStart] = useState();

    //End Time
    const [hoursEnd, setHoursEnd] = useState();
    const [minutesEnd, setMinutesEnd] = useState();

    // function formatAMPM (date) {
    //   var hours = date.getHours();
    //   var minutes = date.getMinutes();
    //   var ampm = hours >= 12 ? 'PM' : 'AM';
    //   hours = hours % 12;
    //   hours = hours ? hours : 12; // the hour '0' should be '12'
    //   minutes = minutes < 10 ? '0'+minutes : minutes;
    //   // var strTime = hours + ':' + minutes + ' ' + ampm;
    //   setHoursStart(hours);
    //   setMinutesStart(minutes);
    //   // return strTime;
    //  }

    // var clockStart = formatAMPM(new Date())
    
      // var milliseconds = parseInt((duration % 1000) / 100),
      //   seconds = Math.floor((duration / 1000) % 60),
      //   minutes = Math.floor((duration / (1000 * 60)) % 60),
      //   hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
      // hours = (hours < 10) ? "0" + hours : hours;
      // minutes = (minutes < 10) ? "0" + minutes : minutes;
      // seconds = (seconds < 10) ? "0" + seconds : seconds;

    // const toggleTimer = () => {
    //     setTimerStart(!timerStart);
    //     setTimerReset(false);
    //   }
    // const resetTimer = () => {
    //     // this.setState({isTimerStart: false, resetTimer: true});
    //     setTimerStart(false);
    //     setTimerReset(true);
    //   }

    const toggleStopWatch = () => {
        // this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
        setStopwatchStart(!stopwatchStart);
        setStopwatchReset(false);
      }
    const resetStopwatch = () => {
        // this.setState({isStopwatchStart: false, resetStopwatch: true});
        setStopwatchStart(false);
        setStopwatchReset(true);
      };


      const body = {
        StartTime: hour,
        EndTime: hour,
        Duration: duration,
        ProjectId: projectID,
        TaskManagementId: TaskId,
      };

      const taskDone = () => {
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

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>Task Name </Text>
        <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {TaskName}</Text>
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
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {StartDate}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>End Date</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {EndDate}</Text>
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
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {hour}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15, width: 100}}>End Time</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}>: {hour}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 200,
          width: 325,
          height: 40,
          borderWidth: 0.5,
          backgroundColor: '#26BF64',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={taskDone}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
          Add To History
        </Text>
      </TouchableOpacity>
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

