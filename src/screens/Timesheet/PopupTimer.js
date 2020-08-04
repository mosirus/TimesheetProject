import React, {Component, useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableHighlight,
  Button,
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import PlayItem from '../../../image/playButton.png';
import PauseItem from '../../../image/Pause.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import * as Resources from '../../config/resource';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

export default function PopupTimer({route, navigation}) {
  const {TaskId} = route.params;
  const {TaskName} = route.params;
  const {EmployeeId} = route.params;
  const {EmployeeName} = route.params;
  const {TaskDifficulty} = route.params;
  const {TaskPriority} = route.params;
  const {TaskStatus} = route.params;
  const {StartDate} = route.params;
  const {EndDate} = route.params;
  const {ManHour} = route.params;
  const {TaskDescription} = route.params;
  const {projectID} = route.params;
  const {statusPopup} = route.params;

  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);
  const [startBool, setStartBool] = useState(false);
  const [statusPostHistory, setStatusPostHistory] = useState(false);

  const [disable, setDisable] = useState(false);
  const [disable2, setDisable2] = useState(true);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');

  const [slideAnimationDialog, setSlideAnimationDialog] = useState(statusPopup);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   addToTimesheet();
  // }, [addToTimesheet, isFocused]);

  const toggleStopWatch = () => {
    // this.setState({isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
    setStopwatchStart(!stopwatchStart);
    const clockStart = moment().format('hh:mm:ss');
    const clockEnd = moment().format('hh:mm:ss');
    if (stopwatchStart === false) {
      setStartTime(clockStart);
      setStartBool(true);
      setDisable(true);
      if (startBool === true) {
        setStartTime(startTime);
      }
    } else {
      setDisable(true);
      setDisable2(false);
      setEndTime(clockEnd);
    }
    setStopwatchReset(false);
  };

  const resetStopwatch = () => {
    // this.setState({isStopwatchStart: false, resetStopwatch: true});
    setStopwatchStart(false);
    setStartBool(false);
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
    EmployeeId: EmployeeId,
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
    EmployeeId: EmployeeId,
    TaskDifficulty: TaskDifficulty,
    TaskPriority: TaskPriority,
    TaskStatus: 3,
    StartDate: StartDate,
    EndDate: EndDate,
    ManHour: ManHour,
    ProjectId: projectID,
    TaskDescription: TaskDescription,
  };

  const addToTimesheet = () => {
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
        console.log('Task Save To History');
        // navigation.navigate('Task');
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
        console.log('Your Task Done And Save To History');
        // navigation.navigate('Task');
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <Dialog
      onDismiss={() => {
        setSlideAnimationDialog(false);
      }}
      onTouchOutside={() => {
        setSlideAnimationDialog(false);
      }}
      visible={slideAnimationDialog}
      dialogTitle={<DialogTitle title={TaskName} />}
      dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
      footer={
        <DialogFooter>
          <DialogButton
            text="CANCEL"
            bordered
            disabled={disable}
            onPress={() => {
              setSlideAnimationDialog(false);
              navigation.goBack();
            }}
            key="button-1"
          />
          <DialogButton
            text="OK"
            bordered
            disabled={disable2}
            onPress={() => {
              addToTimesheet();
              setSlideAnimationDialog(false);
              navigation.goBack();
            }}
            key="button-2"
          />
        </DialogFooter>
      }>
      <DialogContent>
        <View
          style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light', fontSize: 15, width: 100}}>
            Duration
          </Text>
          <Text> :</Text>
          <View style={{flexDirection: 'row', marginLeft: 10, marginTop: -3}}>
            <Stopwatch
              start={stopwatchStart}
              reset={stopwatchReset}
              options={options}
              getTime={time => setDuration(time)}
            />
            <TouchableOpacity
              onPress={toggleStopWatch}
              style={{marginLeft: 10}}>
              {/* <Text style={{fontSize: 20}}>{!stopwatchStart ? "Start" : "Stop"}</Text> */}
              {!stopwatchStart ? (
                <Image
                  source={PlayItem}
                  style={{width: 30, height: 30, marginLeft: 5}}
                />
              ) : (
                <Image
                  source={PauseItem}
                  style={{width: 30, height: 30, marginLeft: 5}}
                />
              )}
            </TouchableOpacity>
            {/* <TouchableHighlight
              onPress={resetStopwatch}
              style={{marginLeft: 10}}>
              <Text style={{fontSize: 20}}>Reset</Text>
            </TouchableHighlight> */}
          </View>
        </View>
        <View
          style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light', fontSize: 15, width: 100}}>
            Start Time
          </Text>
          <Text
            style={{marginLeft: 10, fontFamily: 'Nunito-Light', fontSize: 15}}>
            : {startTime}
          </Text>
        </View>
        <View
          style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light', fontSize: 15, width: 100}}>
            End Time
          </Text>
          <Text
            style={{marginLeft: 10, fontFamily: 'Nunito-Light', fontSize: 15}}>
            : {endTime}
          </Text>
        </View>
        <TouchableOpacity
          disabled={disable2}
          onPress={() => {
            taskDone();
            setSlideAnimationDialog(false);
            navigation.goBack();
          }}>
          <View
            style={{
              backgroundColor: '#1A446E',
              width: 90,
              height: 30,
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 200,
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Light',
                fontSize: 15,
                textAlign: 'center',
                color: '#FFFF'
              }}>
              Task Done
            </Text>
          </View>
        </TouchableOpacity>
      </DialogContent>
    </Dialog>
  );
}

// const options = {
//   container: {
//     height: 30,
//     width: 80,
//     borderRadius: 5,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const options = {
  container: {
    height: 30,
    width: 80,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
};
