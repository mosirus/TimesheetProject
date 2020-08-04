import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import PlayItem from '../../../image/playButton.png';
import PauseItem from '../../../image/Pause.png';
import {FlatList} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as Resources from '../../config/resource';
import {useIsFocused} from '@react-navigation/native';
import {Stopwatch} from 'react-native-stopwatch-timer';
// import {Picker} from '@react-native-community/picker';

export default function Task({navigation}) {
  const [taskname, setTaskname] = useState([]);
  const [pickerValueProject, SetPickerValueProject] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [projectid, setProjectid] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getProjectList();
    getProjectTask();
    getDataUser();
  }, [selectedValue, isFocused, getProjectTask]);

  const getProjectList = () => {
    Resources.getProjectList()
      .then(r => {
        console.log("ProjectList Dipilih");
        SetPickerValueProject(r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const getProjectTask = useCallback(() => {
  //   Resources.getTask(selectedValue)
  //     .then(r => {
  //       console.log("List Dapat Ditampilkan");
  //       setTaskname(r);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // });

  const getProjectTask = useCallback(() => {
    Resources.getTaskUser(selectedValue, 60)
      .then(r => {
        console.log("List Dapat Ditampilkan");
        setTaskname(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const getDataUser = () => {
    Resources.getDataUser()
      .then(r => {
        console.log(r.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onPickerChange = itemValue => {
    setSelectedValue(itemValue);
    getProjectTask();
  };

  // const [laps, setLaps] = useState([]);
  // const [start, setStart] = useState(0);
  // const [now, setNow] = useState(0);

  // const timer = now - start;

  var day = moment().format('dddd');
  var monthYear = moment().format('D MMMM YYYY');

  // const Timer = ({interval}) => {
  //   const pad = n => (n < 10 ? '0' + n : n);
  //   const duration = moment.duration(interval);
  //   const centisecond = Math.floor(duration.milliseconds() / 10);
  //   return (
  //     <View style={styles.timerContainer}>
  //       <Text>{pad(duration.hours())}:</Text>
  //       <Text>{pad(duration.minutes())}:</Text>
  //       <Text>{pad(duration.seconds())}</Text>
  //       {/* <Text style={style}>{pad(centisecond)}</Text> */}
  //     </View>
  //   );
  // };

  // const Start = () => {
  //   const now = new Date().getTime();
  //   setStart(now, now);
  //   setLaps([0]);
  //   const timer = setInterval(() => {
  //     setNow(new Date().getTime());
  //   }, 100);
  // };

  // const Stop = () => {
  //   clearInterval(timer);
  //   // const [firstLap, ...other] = laps;
  //   // setLaps([0, firstLap + now - start, ...other]);
  //   setStart(0);
  //   setNow(0);
  // };

  // const resume = () => {
  //   const now = new Date().getTime();
  //   setStart(now, now);
  //   const timer = setInterval(() => {
  //     setNow(new Date().getTime());
  //   }, 100);
  // };

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
    if (stopwatchStart === false) {
      setStartTime(clockStart);
      setStartBool(true);
      if (startBool === true) {
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

  return (
    <ScrollView>
      <View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 22, fontFamily: 'Nunito-SemiBold'}}>
            {' '}
            {day}, {monthYear}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Nunito-SemiBold'}}>
            Project Name :
          </Text>
          <View
            style={{
              borderWidth: 1,
              height: 25,
              width: 230,
              marginLeft: 20,
              backgroundColor: '#FFFFFF',
              borderRadius: 3,
            }}>
            <Picker
              mode={'dropdown'}
              selectedValue={selectedValue}
              style={{height: 20, width: 230}}
              onValueChange={(itemValue, itemIndex) =>
                onPickerChange(itemValue)
              }>
              {pickerValueProject.map((item, key) => (
                <Picker.Item
                  label={item.projectName}
                  value={item.Id}
                  key={key}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          {/* <Text
          style={{marginTop: 4, fontSize: 15, fontFamily: 'Nunito-SemiBold'}}>
          Duration :{' '}
        </Text>
        <View
          style={{
            height: 30,
            width: 80,
            borderRadius: 5,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Timer interval={timer} />
        </View> */}
          {/* <Text style={{fontFamily: 'Nunito-Light', fontSize: 15, width: 100}}>
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
          </View> */}
        </View>
        <View
          style={{
            borderWidth: 1,
            marginTop: 10,
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              height: 35,
            }}>
            <View
              style={{
                width: 180,
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                marginTop: 5,
                marginLeft: 13,
              }}>
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Task</Text>
            </View>
            <View
              style={{
                width: 100,
                borderWidth: 1,
                borderLeftWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                marginTop: 5,
              }}>
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Status</Text>
            </View>
          </View>
          <View
            style={{
              height: 350,
            }}>
            <FlatList
              data={taskname}
              keyExtractor={item => item.TaskId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PopupTimer', {
                      TaskId: item.TaskId,
                      TaskName: item.TaskName,
                      EmployeeId: item.EmployeeId,
                      EmployeeName: item.EmployeeName,
                      TaskDifficulty: item.TaskDifficulty,
                      TaskPriority: item.TaskPriority,
                      TaskStatus: item.TaskStatus,
                      ManHour: item.ManHour,
                      StartDate: item.StartDate,
                      EndDate: item.EndDate,
                      TaskDescription: item.TaskDescription,
                      projectID: selectedValue,
                      statusPopup: true,
                    })
                  }>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 4,
                      height: 25,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 180,
                        borderBottomWidth: 1,
                        justifyContent: 'center',
                      }}>
                      <Text style={{}}>{item.TaskName}</Text>
                    </View>
                    <View
                      style={{
                        width: 90,
                        borderBottomWidth: 1,
                        justifyContent: 'center',
                      }}>
                      {item.TaskStatus === 1 && (
                        <Text style={{marginLeft: 5}}>To Do</Text>
                      )}
                      {item.TaskStatus === 2 && (
                        <Text style={{marginLeft: 5}}>In Progress</Text>
                      )}
                      {item.TaskStatus === 3 && (
                        <Text style={{marginLeft: 5}}>Done</Text>
                      )}
                      {item.TaskStatus === 4 && (
                        <Text style={{marginLeft: 5}}>Not Done</Text>
                      )}
                    </View>
                    {/* <TouchableOpacity onPress={Start}>
                    <Image source={PlayItem} style={{width: 30, height: 30}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 30,
                      backgroundColor: '#FF1100',
                      marginLeft: 5,
                    }}
                    onPress={resume}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 5,
                      }}>
                      STOP
                    </Text>
                  </TouchableOpacity> */}
                    {/* <TouchableOpacity
                    onPress={toggleStopWatch}
                    style={{marginLeft: 10}}>
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
                  </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: 325,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#26BF64',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('HistoryTask')}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
            H I S T O R Y T A S K
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
};

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
  timerContainer: {
    flexDirection: 'row',
  },
});