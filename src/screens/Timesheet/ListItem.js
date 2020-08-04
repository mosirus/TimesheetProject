import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
} from 'react-native';
import PlayItem from '../../../image/playButton.png';
import PauseItem from '../../../image/Pause.png';

export default function ListItem() {

  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);
  const [startBool, setStartBool] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState();

  return (
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
        {item.TaskStatus === 1 && <Text style={{marginLeft: 5}}>To Do</Text>}
        {item.TaskStatus === 2 && (
          <Text style={{marginLeft: 5}}>In Progress</Text>
        )}
        {item.TaskStatus === 3 && <Text style={{marginLeft: 5}}>Done</Text>}
        {item.TaskStatus === 4 && <Text style={{marginLeft: 5}}>Not Done</Text>}
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
      <TouchableOpacity onPress={toggleStopWatch} style={{marginLeft: 10}}>
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
    </View>
  );
}
