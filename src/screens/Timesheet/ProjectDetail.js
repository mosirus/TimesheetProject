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

export default function ProjectDetail({route,navigation}) {
  const {name} = route.params;
  const {clientName} = route.params;
  const {PO} = route.params;
  const {worktype} = route.params;
  const {status} = route.params;
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
            <TouchableOpacity onPress={() => navigation.navigate('EditProject', {name: name , clientName: clientName, PO: PO, worktype: worktype, status: status})}>
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
            <TouchableOpacity onPress={() => Alert.alert('Are You Sure to Delet this ?')}>
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
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {name}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Client Name              :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {clientName}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>PO/Contact Number  :</Text>
          <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {PO}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Work Type                 :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {worktype}</Text>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 30, flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Light',fontSize: 15,}}>Status                        :</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Nunito-Light',fontSize: 15,}}> {status}</Text>
      </View>
    </View>
  );
}

