import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {Card} from 'react-native-elements';
import Calendar from '../../../image/calendar.png';
import ProjectList from '../../../image/ProjectList.png';
import ReportIcon  from '../../../image/ReportIcon.png';
import moment from 'moment';

export default function ManagementSM({navigation}) {
  // const [timeStart, setTimeStart] = useState('');
  // const [timeEnd, setTimeEnd] = useState('');
  // const [hourStart, setHourStart] = useState('');
  // const [minuteStart, setMinuteStart] = useState('');
  // const [secondStart, setSecondStart] = useState('');
  // const [secondstartTotal, setSecondstartTotal] = useState('');

  // const secondTotal = () => {
  //   var hms = timeStart;
  //   var a = hms.split(':');

  //   var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  //   setSecondstartTotal(seconds);
  // }

  // const clockStart = () => {
  //   // const hour = moment().format('hh:mm:ss');
  //   const hour = moment().format('hh');
  //   const minutes = moment().format('mm');
  //   const second = moment().format('ss');
  //   setHourStart(hour);
  //   setMinuteStart(minutes);
  //   setSecondStart(second);
  //   const timeStart = hourStart + ':' + minuteStart + ':' + secondStart;
  //   setTimeStart(timeStart);
  //   const hms = timeStart;
  //   const a = hms.split(':');

  //   const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  //   setSecondstartTotal(seconds);
  // }
  // const clockEnd = () => {
  //   const end = moment().format('hh:mm:ss');
  //   setTimeEnd(end);
  // }
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:40}}>
        <Card containerStyle={styles.card}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('ProjectList')}>
            <Image source={Calendar} style={{width: 70, height: 70}} />
            <Text style={styles.text}>Project List</Text>
          </TouchableOpacity>
        </Card>
        <Card containerStyle={styles.card}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('TaskManagement')}>
            <Image source={ProjectList} style={{width: 70, height: 70}} />
            <Text style={styles.text}>Task Management</Text>
          </TouchableOpacity>
        </Card>
      </View>
      <View style={{flex:1 ,flexDirection: 'row', alignItems: 'flex-start',}}>
      <Card containerStyle={styles.card}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('Report')}>
            <Image source={ReportIcon} style={{width: 70, height: 70}} />
            <Text style={[styles.text, {marginRight: 15}]}>Report</Text>
          </TouchableOpacity>
        </Card>
      </View>
      {/* <View>
        <Button 
          title='ClockStart'
          color="#f194ff"
          onPress={clockStart}
        />
        <Button 
          title='ClockEnd'
          color="#f194ff"
          onPress={clockEnd}
        />
        <Text style={{marginTop:20, marginBottom: 20}}>TimeStart : {timeStart}, {secondstartTotal}</Text>
        <Text style={{marginTop:20, marginBottom: 20}}>TimeEnd : {timeEnd}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
  },
  card: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 7,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    color: '#505050',
    paddingTop: 13,
  },
  text2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 5,
    color: '#505050',
    paddingTop: 13,
  },
})