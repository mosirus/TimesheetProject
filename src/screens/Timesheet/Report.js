import React, {Component, useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import calendarItem from '../../../image/calendarItem.png';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {Picker} from '@react-native-community/picker';
import * as Resources from '../../config/resource';
import moment from 'moment';
import {
  writeFile,
  readFile,
  DocumentDirectoryPath,
  DownloadDirectoryPath,
} from 'react-native-fs';
import XLSX from 'xlsx';

export default function Report(navigation) {
  const [taskname, setTaskname] = useState([]);
  const [pickerValueProject, SetPickerValueProject] = useState([]);
  const [ID_Project, setID_Project] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [projectbyid, setprojectbyid] = useState([]);
  const [asignee, setAsignee] = useState();
  const [employee, setEmployee] = useState([]);

  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getProjectList();
    // getProjectTask();
    getProjectId();
    getEmployee();
    getProjectTaskemp();
  }, [
    getProjectId,
    ID_Project,
    getEmployee,
    getProjectTaskemp,
    asignee,
    getProjectList,
  ]);

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

  // const getProjectTask = useCallback(() => {
  //   Resources.getTaskTimesheet(selectedValue)
  //     .then(r => {
  //       console.log(r);
  //       // setProjectname(r);
  //       setTaskname(r);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // });
  const getProjectTaskemp = useCallback(() => {
    Resources.getTaskTimesheetbyemp(ID_Project, asignee)
      .then(r => {
        console.log(r);
        // setProjectname(r);
        setTaskname(r);
      })
      .catch(e => {
        console.log(e);
      });
  });
  const getProjectId = useCallback(() => {
    Resources.getProjectId(ID_Project)
      .then(r => {
        console.log(r);
        // setProjectname(r);
        setprojectbyid(r.ClientName);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const submitReport = () => {
    var i;
    for (i = 0; i < taskname.length; i++) {
      Resources.submitReport(ID_Project, taskname[i].TimeSheetId)
        .then(r => {
          console.log('sukses Submit');
        })
        .catch(e => {
          console.log(e);
        });
      if (i === taskname.length - 1) {
        Alert.alert('Submit Succes');
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const excelExport = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Need Pemission to yourstorage',
          message: 'This app, need access to your storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Access Granted');
      } else {
        console.log('Access Denied');
      }
    } catch (err) {
      console.warn(err);
    }
    if (taskname[0] != null) {
      const output = str => str;
      var ws = XLSX.utils.json_to_sheet(taskname);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Prova');

      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
      var RNFS = require('react-native-fs');
      var file =
        RNFS.DownloadDirectoryPath +
        '/Report_' +
        ID_Project +
        '_' +
        taskname[0].EmployeeName +
        '.xlsx';
      writeFile(file, output(wbout), 'ascii')
        .then(res => {
          Alert.alert('exportFile success', 'Exported to ' + file);
        })
        .catch(err => {
          Alert.alert('exportFile Error', 'Error ' + err.message);
        });
    } else {
      Alert.alert(
        'Nothing to export, this employee does not have any task in this project !',
      );
    }
  };

  const start = moment(date).format('DD/MM/YYYY');
  // const end = moment(taskname.EndDate).format('MM/DD/YYYY');
  return (
    <ScrollView>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Nunito-SemiBold'}}>
            Project Name
          </Text>
          <Text>:</Text>
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
              selectedValue={ID_Project}
              style={{height: 20, width: 220}}
              onValueChange={(itemValue, itemIndex) =>
                setID_Project(itemValue)
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Nunito-SemiBold'}}>
            Client Name
          </Text>
          <Text style={{marginLeft: 6}}>:</Text>
          <View
            style={{
              borderWidth: 1,
              height: 25,
              width: 220,
              marginLeft: 20,
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
            }}>
            <Text style={{marginLeft: 5}}> {projectbyid}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Nunito-SemiBold'}}>
            Employee Name
          </Text>
          <Text style={{marginLeft: -20}}>:</Text>
          <View style={styles.pickerView2}>
            <Picker
              mode={'dropdown'}
              selectedValue={asignee}
              style={{height: 20, width: 220}}
              onValueChange={(itemValue, itemIndex) => setAsignee(itemValue)}>
              {employee.map((item, key) => (
                <Picker.Item label={item.username} value={item._id} key={key} />
              ))}
            </Picker>
          </View>
        </View>
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
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                // onChange={(event, selectedDate) => {
                //   const date = selectedDate.toString();
                //   setDate(selectedDate);
                // }}
                onChange={onChange}
              />
            )}
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
            <Text>{start}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 20,
            height: 25,
            borderWidth: 1,
            flexDirection: 'row',
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
            renderItem={({item}) =>
              moment(item.StarDate).format('DD/MM/YYYY') == start ? (
                <View
                  style={{
                    // marginHorizontal: 20,
                    // marginVertical: 2,
                    // height: 25,
                    // flexDirection: 'row',
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
                      {item.StartTime}-{item.EndTime}
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: 20,
            width: 130,
            height: 30,
            borderWidth: 0.5,
            backgroundColor: '#1A446D',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginRight: 50,
            borderRadius: 5,
          }}>
          <TouchableOpacity onPress={excelExport}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontFamily: 'Nunito-SemiBold',
              }}>
              EXPORT TO EXCEL
            </Text>
          </TouchableOpacity>
        </View>
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
  pickerView2: {
    borderWidth: 1,
    height: 25,
    width: 220,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});
