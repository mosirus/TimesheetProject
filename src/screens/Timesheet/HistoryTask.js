import React, {Component, useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, Picker, Image, TextInput} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import PlayItem from '../../../image/playButton.png';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from 'react-native-paper';
import moment from 'moment';
import {SearchBar} from 'react-native-elements';
// import {Picker} from '@react-native-community/picker';
import * as Resources from '../../config/resource';
import AsyncStorage from '@react-native-community/async-storage';

export default function HistoryTask({navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [choosedate, setChooseDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || choosedate;
    setShow(Platform.OS === 'ios');
    // setChooseDate(currentDate.substr(0, 15));
    setChooseDate(currentDate);
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

  const tanggal = moment(choosedate).format('DD/MM/YYYY');
  const [taskname, setTaskname] = useState([]);
  const [tempTask, setTempTask] = useState([]);
  const [search, setSearch] = useState(null);
  const [dateText, setDateText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [pickerValueProject, SetPickerValueProject] = useState([]);
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    getProjectList();
    getHistoryTask();
  }, [getHistoryTask, getProjectList, selectedValue]);

  const getProjectList = useCallback(() => {
    Resources.getProjectList()
      .then(r => {
        console.log(r);
        // setProjectname(r);
        SetPickerValueProject(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const getHistoryTask = useCallback(() => {
    Resources.getTaskTimesheet(selectedValue)
      .then(r => {
        console.log(r);
        // setProjectname(r);
        setTaskname(r);
        setTempTask(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  // const filterTaskName = taskText => {
  //   setTaskText(() => {
  //     if ('' == taskText) {
  //       setTaskname(tempTask);
  //       return;
  //     }
  //     setTaskname(
  //       tempTask
  //         .filter(function(item) {
  //           return item.Task_name.toLowerCase().includes(
  //             taskText.toLowerCase(),
  //           );
  //         })
  //         .map(function({Task_name, StarDate, StartTime, EndTime, Duration}) {
  //           return {Task_name, StarDate, StartTime, EndTime, Duration};
  //         }),
  //     );
  //   });
  // };

  // const filterDate = dateText => {
  //   setDateText(() => {
  //     if ('' == dateText) {
  //       setTaskname(tempTask);
  //       return;
  //     }
  //     setTaskname(
  //       tempTask
  //         .filter(function(item) {
  //           return moment(item.StarDate)
  //             .format('DD/MM/YYYY')
  //             .includes(dateText.toLowerCase());
  //         })
  //         .map(function({Task_name, StarDate, StartTime, EndTime, Duration}) {
  //           return {Task_name, StarDate, StartTime, EndTime, Duration};
  //         }),
  //     );
  //   });
  // };

  return (
    <ScrollView>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
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
              mode={'dropdown'}
              selectedValue={selectedValue}
              style={{height: 20, width: 220}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
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
        {/* <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
          Task Name :
        </Text>
        <TextInput
          placeholder="Search By Task Name"
          style={{borderWidth: 1, height: 35, marginLeft: 20, width: 150}}
          value={taskText}
          onChangeText={filterTaskName}
        />
      </View> */}
        {/* <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
          marginTop: 10
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
          Date                :
        </Text>
        <TextInput
          placeholder="DD/MM/YY"
          style={{borderWidth: 1, height: 35, marginLeft: 20, width: 150, marginLeft:68}}
          value={dateText}
          onChangeText={filterDate}
        />
      </View> */}
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
                value={choosedate}
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
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: 50,
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Task</Text>
          </View>
          <View
            style={{
              width: 60,
              borderLeftWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 12}}>
              StartDate
            </Text>
          </View>
          <View
            style={{
              width: 60,
              borderLeftWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>EndDate</Text>
          </View>
          <View
            style={{
              width: 70,
              borderLeftWidth: 1,
              justifyContent: 'center',
              borderLeftWidth: 1,
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Time</Text>
          </View>
          <View
            style={{
              width: 60,
              borderLeftWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Duration</Text>
          </View>
        </View>
        <View
          style={{
            height: 350,
          }}>
          <FlatList
            data={taskname}
            keyExtractor={item => item.TimeSheetId}
            renderItem={({item}) =>
              moment(item.StarDate).format('DD/MM/YYYY') === tanggal ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    height: 30,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      width: 50,
                      justifyContent: 'center',
                    }}>
                    <Text style={{marginLeft: 3, fontSize: 10}}>
                      {item.Task_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 60,
                      justifyContent: 'center',
                    }}>
                    <Text style={{marginLeft: 5, fontSize: 10}}>
                      {moment(item.StarDate).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 60,
                      justifyContent: 'center',
                      marginLeft: 5,
                    }}>
                    <Text style={{marginLeft: 5, fontSize: 10}}>
                      {moment(item.EndDate).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 75,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 10, marginLeft: 5}}>
                      {item.StartTime} - {item.EndTime}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 10}}>{item.Duration}</Text>
                  </View>
                </View>
              ) : null
            }
          />
        </View>
        {/* <TouchableOpacity
        style={{
          marginTop: 140,
          width: 325,
          height: 40,
          borderWidth: 0.5,
          backgroundColor: '#26BF64',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Report')}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
          R E P O R T
        </Text>
      </TouchableOpacity> */}
      </View>
    </ScrollView>
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
