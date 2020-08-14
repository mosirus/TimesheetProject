/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import * as Resources from '../../config/resource';
import {useIsFocused} from '@react-navigation/native';

export default function TaskManagement({navigation, route}) {
  const [taskname, setTaskname] = useState([]);
  const [pickerValueProject, SetPickerValueProject] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [projectid, setProjectid] = useState([]);
  const [statusTask, setStatusTask] = useState(1);

  const [task, setTask] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getProjectList();
    getProjectTask();
  }, [selectedValue, isFocused]);

  const getProjectList = () => {
    Resources.getProjectList()
      .then(r => {
        console.log(r);
        // setProjectname(r);
        SetPickerValueProject(r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getProjectTask = useCallback(() => {
    Resources.getTask(selectedValue)
      .then(r => {
        console.log(r);
        // setProjectname(r);
        console.log('List Task Dapat Ditampilkan');
        setTaskname(r);
      })
      .catch(e => {
        console.log(e);
        getProjectTask();
      });
  });

  const onPickerChange = itemValue => {
    setSelectedValue(itemValue);
    getProjectTask();
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Project Name :</Text>
        <View style={styles.pickerView}>
          <Picker
            mode={'dropdown'}
            selectedValue={selectedValue}
            style={{height: 20, width: 220}}
            onValueChange={(itemValue, itemIndex) => onPickerChange(itemValue)}>
            {pickerValueProject.map((item, key) => (
              <Picker.Item label={item.projectName} value={item.Id} key={key} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', margin: 20}}>
        <TouchableOpacity
          style={{
            marginTop: 50,
            width: 125,
            height: 40,
            borderWidth: 0.5,
            backgroundColor: '#26BF64',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('AddTask', {projectID: selectedValue})
          }>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'}}>
            Add New Task
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, flexDirection: 'row', marginBottom: 0}}>
        <View style={[styles.tableTitleView]}>
          <Text style={[styles.text, styles.tableTitle]}>Task Name</Text>
        </View>
        <View style={[styles.tableTitleView, {borderRightWidth: 1}]}>
          <Text style={[styles.text, styles.tableTitle]}>Status</Text>
        </View>
      </View>
      <View
        style={{
          height: 500,
        }}>
        <FlatList
          data={taskname}
          keyExtractor={item => item.TaskId}
          // data={task}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                marginHorizontal: 20,
                marginVertical: 2,
                height: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  width: 150,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 5, marginBottom: 2}}>
                  {item.TaskName}
                </Text>
              </View>
              <View
                style={{
                  width: 150,
                  justifyContent: 'center',
                }}>
                <View
                  style={[
                    styles.pickerView,
                    {
                      width: 110,
                      height: 23,
                      backgroundColor: '#6289AF',
                      borderRadius: 10,
                      marginLeft: -25,
                    },
                  ]}>
                  {/* <Picker
                    mode={'dropdown'}
                    text={item.status}
                    selectedValue={statusTask}
                    style={{height: 20, width: 120, color: '#FFFFFF'}}
                    onValueChange={(itemValue, itemIndex) =>
                      setStatusTask(itemValue)
                    }>
                    <Picker.Item label="To Do" value={1} />
                    <Picker.Item label="In Progress" value={2} />
                    <Picker.Item label="Done" value={3} />
                    <Picker.Item label="Not Done" value={4} />
                  </Picker> */}
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
              </View>
              <View
                style={{
                  width: 55,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1A446E',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailTask', {
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
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Detail
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pict: {
    width: 100,
    height: 100,
    margin: 5,
  },
  pictView: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    margin: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
  },
  pickerView: {
    borderWidth: 1,
    height: 25,
    width: 220,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  tableTitle: {
    marginLeft: 5,
  },
  tableTitleView: {
    width: 150,
    borderWidth: 1,
    borderRightWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
