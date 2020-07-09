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

export default function TaskManagement({navigation}) {
  const [selectedValue, setSelectedValue] = useState();
  const [task, setTask] = useState([
    {
      projectName: 'Joged1-8',
      projectID: '1',
      name: 'joged 1',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Medium',
      taskPriority: '1',
      startDate: '07/03/2020',
      endDate: '08/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '1',
    },
    {
      projectName: 'Joged1-8',
      projectID: '1',
      name: 'joged 2',
      status: 'todo',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '07/03/2020',
      endDate: '09/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '2',
    },
    {
      projectName: 'Joged1-8',
      projectID: '1',
      name: 'joged 3',
      status: 'in Progress',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '07/03/2020',
      endDate: '10/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '3',
    },
    {
      projectName: 'Joged1-8',
      projectID: '1',
      name: 'joged 4',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '06/03/2020',
      endDate: '07/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '4',
    },
    {
      projectName: 'Joged1-8',
      projectID: '1',
      name: 'joged 5',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '05/03/2020',
      endDate: '11/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '5',
    },
    {
      projectName: 'Joged9-16',
      projectID: '2',
      name: 'joged 6',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '04/03/2020',
      endDate: '05/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '6',
    },
    {
      projectName: 'Joged9-16',
      projectID: '2',
      name: 'joged 7',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '01/03/2020',
      endDate: '06/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '7',
    },
    {
      projectName: 'Joged9-16',
      projectID: '2',
      name: 'joged 8',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '08/03/2020',
      endDate: '12/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '8',
    },
    {
      projectName: 'Joged9-16',
      projectID: '2',
      name: 'joged 9',
      status: 'Ongoing',
      assignee: 'joko',
      difficulty: 'Low',
      taskPriority: '1',
      startDate: '03/03/2020',
      endDate: '12/03/2020',
      description: 'task untuk membuat timehsheet',
      key: '9',
    },
  ]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Project Name :</Text>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 20, width: 230}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Joged1-8" projectID="1" />
            <Picker.Item label="Joged9-16" projectID="2" />
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
          onPress={() => navigation.navigate('AddTask')}>
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
          height: 350,
        }}>
        <FlatList
          data={task}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 2,
                height: 25,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 150,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 5}}>{item.name}</Text>
              </View>
              <View
                style={{
                  width: 150,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <View
                  style={[
                    styles.pickerView,
                    {
                      width: 110,
                      height: 23,
                      marginLeft: 1,
                      backgroundColor: '#6289AF',
                      borderRadius: 10,
                    },
                  ]}>
                  <Picker
                    text={item.status}
                    selectedValue={selectedValue}
                    style={{height: 20, width: 120, color: '#FFFFFF'}}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }>
                    <Picker.Item label="Joged1-8" projectID="1" />
                    <Picker.Item label="Joged9-16" projectID="2" />
                  </Picker>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: 1,
                  width: 50,
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1A446E',
                }}
                onPress={() => navigation.navigate('DetailTask', item)}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'}}>
                  Detail
                </Text>
              </TouchableOpacity>
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

// export default function Task() {
//   const [selectedValue, setSelectedValue] = useState('JavaScript');
//   const [task, settask] = useState([
//     {name: 'joged 1', time: '6:00AM-6:30AM', duration: '00:30:00', key: '1'},
//     {name: 'joged 2', time: '6:00AM-6:31AM', duration: '00:31:00', key: '2'},
//     {name: 'joged 3', time: '6:00AM-6:32AM', duration: '00:32:00', key: '3'},
//     {name: 'joged 4', time: '6:00AM-6:33AM', duration: '00:33:00', key: '4'},
//     {name: 'joged 5', time: '6:00AM-6:34AM', duration: '00:34:00', key: '5'},
//     {name: 'joged 6', time: '6:00AM-6:35AM', duration: '00:35:00', key: '6'},
//     {name: 'joged 7', time: '6:00AM-6:36AM', duration: '00:36:00', key: '7'},
//     {name: 'joged 8', time: '6:00AM-6:37AM', duration: '00:37:00', key: '8'},
//     {name: 'joged 9', time: '6:00AM-6:30AM', duration: '00:30:00', key: '9'},
//     {name: 'joged 10', time: '6:00AM-6:31AM', duration: '00:31:00', key: '10'},
//     {name: 'joged 11', time: '6:00AM-6:32AM', duration: '00:32:00', key: '11'},
//     {name: 'joged 12', time: '6:00AM-6:33AM', duration: '00:33:00', key: '12'},
//     {name: 'joged 13', time: '6:00AM-6:34AM', duration: '00:34:00', key: '13'},
//     {name: 'joged 14', time: '6:00AM-6:35AM', duration: '00:35:00', key: '14'},
//     {name: 'joged 15', time: '6:00AM-6:36AM', duration: '00:36:00', key: '15'},
//     {name: 'joged 16', time: '6:00AM-6:37AM', duration: '00:37:00', key: '16'},
//   ]);

//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [choosedate, setChooseDate] = useState();

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate.toString();
//     setShow(Platform.OS === 'ios');
//     setChooseDate(currentDate.substr(0, 15));
//     setDate(selectedDate);
//   };

//   const showMode = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   const tanggal = moment(choosedate).format('MM/DD/YYYY');
//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 20,
//           marginHorizontal: 20,
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
//           Project Name :
//         </Text>
//         <View
//           style={{
//             borderWidth: 1,
//             height: 25,
//             width: 220,
//             marginLeft: 20,
//             backgroundColor: '#FFFFFF',
//             borderRadius: 3,
//           }}>
//           <Picker
//             selectedValue={selectedValue}
//             style={{height: 20, width: 230}}
//             onValueChange={(itemValue, itemIndex) =>
//               setSelectedValue(itemValue)
//             }>
//             <Picker.Item label="Joged1-8" value="js" />
//             <Picker.Item label="Joged9-16" value="java" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.datePicker}>
//         <View
//           style={{
//             height: 30,
//             width: 35,
//             borderTopLeftRadius: 5,
//             borderBottomLeftRadius: 5,
//             borderWidth: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//           }}>
//           <TouchableOpacity onPress={showDatepicker}>
//             <Image source={calendarItem} style={{width: 21, height: 21}} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             height: 30,
//             width: 90,
//             borderTopRightRadius: 5,
//             borderBottomRightRadius: 5,
//             borderWidth: 1,
//             borderLeftWidth: 0,
//             justifyContent: 'center',
//             paddingLeft: 6,
//             backgroundColor: '#FFFFFF',
//           }}>
//           {show && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={date}
//               mode={mode}
//               is24Hour={true}
//               display="default"
//               onChange={onChange}
//             />
//           )}
//           <Text>{tanggal}</Text>
//         </View>
//       </View>
//       <View
//         style={{
//           marginHorizontal: 20,
//           marginTop: 20,
//           height: 25,
//           flexDirection: 'row',
//         }}>
//         <View
//           style={{
//             width: 125,
//             borderWidth: 1,
//             justifyContent: 'center',
//             backgroundColor: '#FFFFFF',
//           }}>
//           <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Task</Text>
//         </View>
//         <View
//           style={{
//             width: 120,
//             borderWidth: 1,
//             borderLeftWidth: 0,
//             justifyContent: 'center',
//             backgroundColor: '#FFFFFF',
//           }}>
//           <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Time</Text>
//         </View>
//         <View
//           style={{
//             width: 110,
//             borderWidth: 1,
//             borderLeftWidth: 0,
//             justifyContent: 'center',
//             backgroundColor: '#FFFFFF',
//           }}>
//           <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Duration</Text>
//         </View>
//       </View>
//       <View
//         style={{
//           height: 350,
//         }}>
//         <FlatList
//           data={task}
//           renderItem={({item}) => (
//             <View
//               style={{
//                 marginHorizontal: 20,
//                 marginVertical: 2,
//                 height: 25,
//                 flexDirection: 'row',
//               }}>
//               <View
//                 style={{
//                   width: 125,
//                   borderBottomWidth: 1,
//                   justifyContent: 'center',
//                 }}>
//                 <Text style={{marginLeft: 5}}>{item.name}</Text>
//               </View>
//               <View
//                 style={{
//                   width: 120,
//                   borderBottomWidth: 1,
//                   justifyContent: 'center',
//                 }}>
//                 <Text style={{marginLeft: 5, fontSize: 12}}>{item.time}</Text>
//               </View>
//               <View
//                 style={{
//                   width: 110,
//                   borderBottomWidth: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Text style={{marginLeft: 5}}>{item.duration}</Text>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//       <TouchableOpacity
//         style={{
//           marginTop: 100,
//           width: 325,
//           height: 40,
//           borderWidth: 0.5,
//           backgroundColor: '#26BF64',
//           alignSelf: 'center',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={() => navigation.navigate('Report')}>
//         <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>
//           R E P O R T
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   buttonOn: {
//     flexDirection: 'row',
//     width: 175,
//     height: 30,
//     backgroundColor: '#265685',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#707070',
//     borderWidth: 0.5,
//   },
//   buttonOff: {
//     flexDirection: 'row',
//     width: 175,
//     height: 30,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#707070',
//     borderWidth: 0.5,
//   },
//   timeSheet: {
//     margin: 20,
//     width: 100,
//     height: 100,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     shadowColor: '#D3D3D3',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   container: {
//     marginBottom: 20,
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   datePicker: {
//     marginHorizontal: 20,
//     marginVertical: 50,
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignContent: 'center',
//     flexDirection: 'row',
//   },
//   text: {
//     fontFamily: 'Nunito-SemiBold',
//     fontSize: 20,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     color: '#265685',
//   },
// });
