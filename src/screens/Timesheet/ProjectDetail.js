/* eslint-disable prettier/prettier */
import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import Calendar from '../../../image/calendar.png';
import clockwhite from '../../../image/clock.png';
import menuBlack from '../../../image/menu.png';
import calendarItem from '../../../image/calendarItem.png';
import {TextInput} from 'react-native-paper';
import PlayItem from '../../../image/playButton.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import * as Resources from '../../config/resource';

export default function ProjectDetail({route,navigation}) {
  const {projectName} = route.params;
  const {ClientName} = route.params;
  const {contract} = route.params;
  const {workType} = route.params;
  const {status} = route.params;
  const {Id} = route.params;

  const deleteProject = () => {
    Resources.deleteProject(Id)
        .then((r) => {
          Alert.alert('Are You Sure to Delet this ?');
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10, marginTop:30}}> 
        <View
          style={{
            width: 122,
            height: 34,
            backgroundColor: '#26BF64',
            marginRight: 21,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProject', {id: Id, name: projectName , clientNames: ClientName, PO: contract, worktype: workType, status: status})}>
            <Text
                style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Nunito-SemiBold',
                textAlign: 'center',
                paddingTop: 3,
                }}>
                Edit Project
            </Text>
            </TouchableOpacity>
        </View>
        <View
            style={{
            width: 122,
            height: 34,
            backgroundColor: '#DC3545',
            }}>
            <TouchableOpacity onPress={deleteProject}>
            <Text
                style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Nunito-SemiBold',
                textAlign: 'center',
                paddingTop: 3,
                }}>
                Delete
            </Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Project Name            :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {projectName}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Client Name              :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {ClientName}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>PO/Contact Number  :</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {contract}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Work Type                 :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {workType}</Text>
      </View>
      {status === 0 && (
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Status                        :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> Not Active</Text>
      </View>
      )}
      {status === 1 && (
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Status                        :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> Active</Text>
      </View>
      )}
    </View>
  );
}

