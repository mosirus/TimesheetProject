import React, {Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, RefreshControl,} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Axios from 'axios';
import * as Resources from '../../config/resource';
import {useIsFocused} from '@react-navigation/native';

export default function ProjectList({navigation}) {
  const isFocused = useIsFocused();
  const [projectname, setProjectname] = useState([]);

  useEffect(() => {
    getProjectList();
  }, [isFocused]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProjectList = () => {
    Resources.getProjectList()
      .then((r) => {
        console.log(r);
        console.log('Data Project List Dapat Ditampilkan')
        setProjectname(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          width: 122,
          height: 34,
          backgroundColor: '#26BF64',
          marginTop: 20,
          alignSelf: 'flex-end',
          marginRight: 21,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewProject')}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'Nunito-SemiBold',
              textAlign: 'center',
              paddingTop: 3,
            }}>
            Add New Project
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 5,
          height: 30,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 125,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            flex: 1,
          }}>
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Project Name</Text>
        </View>
      </View>
      <View
        style={{
          height: 500,
        }}>
        <FlatList
          data={projectname}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 2,
                height: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 5}}>{item.projectName}</Text>
              </View>
              <View
                style={{
                  width: 55,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1A446E'
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('ProjectDetail', item)}>
                  <Text style={{color: '#FFFFFF'}}>Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}