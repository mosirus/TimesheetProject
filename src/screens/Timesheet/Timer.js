import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import UnderDevelopment from '../../../image/UnderDevelopment.svg';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import moment from 'moment';

export default function Task({route, navigation}) {
  const [task, setTask] = useState([]);

  const [laps, setLaps] = useState([]);
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);

  const{ status } = route.params;


  const Timer = ({interval}) => {
    const pad = n => (n < 10 ? '0' + n : n);
    const duration = moment.duration(interval);
    const centisecond = Math.floor(duration.milliseconds() / 10);
    return (
      <View style={styles.timerContainer}>
        <Text>{pad(duration.hours())}:</Text>
        <Text>{pad(duration.minutes())}:</Text>
        <Text>{pad(duration.seconds())}</Text>
        {/* <Text style={style}>{pad(centisecond)}</Text> */}
      </View>
    );
  }

  const Lap = ({number, interval}) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 2,
          height: 25,
          flexDirection: 'row',
        }}>
        <Text
        style={{
            width: 125,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          Lap {number}
        </Text>
        <Text style={{
          width: 100,
          borderBottomWidth: 1,
          justifyContent: 'center',
          }}>
          6:00AM-6:30AM
        </Text>
        <Timer style={{
          width: 100,
          borderBottomWidth: 1,
            justifyContent: 'center',
          }}
          interval={interval}
        />
      </View>
    );
  }

  const LapsTable = ({laps, timer}) => {
    return (
      <ScrollView>
        {laps.map((lap, index) => (
          <Lap
            number={laps.length - index}
            key={laps.length - index}
            interval={index === 0 ? timer + lap : lap}
          />
        ))}
      </ScrollView>
    );
  }

  const Start = () => {
    const now = new Date().getTime();
    setStart(now, now);
    setLaps([0]);
    let timer = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);
  };

  const timer = now - start;

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.timeSheet}>
        <Image source={Calendar} style={{margin: 10, width: 50, height: 50}} />
        <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 15}}>
          Timesheet
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonOn}>
          <Image source={clockwhite} style={{width: 20, height: 20}} />
          <Text style={{marginLeft: 10, color: '#FFFFFF', fontWeight: 'bold'}}>
            Timer
          </Text>
        </View>
        <View style={styles.buttonOff}>
          <Image source={menuBlack} style={{width: 25, height: 25}} />
          <Text style={{marginLeft: 10, color: '#000000', fontWeight: 'bold'}}>
            Manual
          </Text>
        </View>
      </View>
      <Text style={{marginTop: 20, marginLeft: 20, fontSize: 18}}>
        Project Name : E-workplace
      </Text>
      <Text style={{marginVertical: 10, marginLeft: 20, fontSize: 18}}>
        Task Name :
      </Text>
      <View
        style={{
          borderRadius: 5,
          height: 30,
          width: 350,
          marginLeft: 20,
          borderWidth: 1,
          justifyContent: 'center',
          backgroundColor: '#B5D4FF',
        }}>
        <Text style={{marginLeft: 5}}>{status}</Text>
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
          <Image source={calendarItem} style={{width: 21, height: 21}} />
        </View>
        <View
          style={{
            height: 30,
            width: 87,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: 'center',
            paddingLeft: 6,
            backgroundColor: '#FFFFFF',
          }}>
          <Text>30/01/2020</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', margin: 20}}>
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
        </View>
        <TouchableOpacity onPress={Start}>
          <Image
            source={PlayItem}
            style={{width: 30, height: 30, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 350,
          height: 30,
          borderBottomWidth: 1,
          marginLeft: 20,
        }}>
        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 18}}>
          History Today
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 5,
          height: 25,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 125,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
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
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Time</Text>
        </View>
        <View
          style={{
            width: 100,
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Duration</Text>
        </View>
      </View>
      <View
        style={{
          height: 200,
        }}>
        <LapsTable laps={laps} timer={timer} />
      </View>
    </View>
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
    margin: 20,
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