import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SplashScreens from "../screens/SplashScreens";
import WorkHome from "../screens/WorkHome";
import OverworkForm from "../screens/OverworkForm";
import WorkClient from "../screens/WorkClient";
import Dayoff from "../screens/DayOff"
import Meetings from "../screens/Meetings"
import TaskDone from "../screens/TaskDone"
import Sick from "../screens/Sick"
import Approval from '../screens/ApprovalPage'
import ClockInHistory from '../screens/ClockInHistory'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomNavBar from './BottomNavBar'
import BottomNavBarHD from './BottomNavBarHD'
import Eworkplace3 from '../../image/eworkplace3.svg'
import Timer from '../screens/Timesheet/Timer';
import HistoryTask from '../screens/Timesheet/HistoryTask';
import Report from '../screens/Timesheet/Report';
import ProjectList from '../screens/Timesheet/ProjectList';
import AddNewProject from '../screens/Timesheet/AddNewProject';
import ProjectDetail from '../screens/Timesheet/ProjectDetail';
import EditProject from '../screens/Timesheet/EditProject';
import TaskManagement from '../screens/Timesheet/TaskManagement';
import AddTask from '../screens/Timesheet/AddTask';
import DetailTask from '../screens/Timesheet/DetailTask';
import EditTask from '../screens/Timesheet/EditTask';


const Stack = createStackNavigator();
function HeaderRight () {
  return(
    <View style={{alignSelf: 'flex-end', paddingRight: 20}}>
    <Button 
      icon={<FontAwesome5
        name="bell"
        size={25}
        color="white"
        solid       
      />}
      buttonStyle={{backgroundColor:'#1A446D'}}
      onPress={()=>{alert('Under Development!')}}  
    />
      
    </View>
  )
}

function HeaderLeft () {
  return(
    <View style={{marginLeft:15}}>
      <Eworkplace3 width={120} height={45}/> 
    </View>
  )
}

function MyStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerTintColor:'#FFFFFF',
        headerStyle:{backgroundColor: '#1A446D'},
        safeAreaInsets: { top: 5 },
        headerTitleAlign:'center',
        headerTitleStyle:{fontFamily:'Nunito-SemiBold'}
      }}
      
      initialRouteName='SplashScreen'
    >
      <Stack.Screen name="SplashScreen" component={SplashScreens} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={BottomNavBar} 
      options={{
        headerRight:()=>{
          return(
            <HeaderRight />
          )
        },
        headerLeft:()=>{
          return(
            <HeaderLeft />
          )
        },
        headerTitle:null,  
        }}
      />
      <Stack.Screen name="HomeHD" component={BottomNavBarHD} 
      options={{
        headerRight:()=>{
          return(
            <HeaderRight />
          )
        },
        headerLeft:()=>{
          return(
            <HeaderLeft />
          )
        },
        headerTitle:null,  
        }}
      />
      <Stack.Screen name="WHome" component={WorkHome} options={{headerTitle:'Work From Home', }}/>
      <Stack.Screen name="WClient" component={WorkClient} options={{headerTitle:'Work at Client Office',}}/>  
      <Stack.Screen name="DayOff" component={Dayoff} options={{headerTitle:'Day Off',}}/>  
      <Stack.Screen name="Sick" component={Sick} options={{headerTitle:'Sick',}}/>
      <Stack.Screen name="Approval" component={Approval} options={{headerTitle:'Approval',}}/>
      <Stack.Screen name="ClockinHistory" component={ClockInHistory} options={{headerTitle:'Clock In History'}}/>  
      <Stack.Screen name="OverworkForm" component={OverworkForm} options={{headerTitle:'Overwork Form'}}/> 
      <Stack.Screen name="Meetings" component={Meetings} options={{headerTitle:'Meetings',}}/>
      <Stack.Screen name="TaskDone" component={TaskDone} options={{headerTitle:'Task Done',}}/>  
      <Stack.Screen name="Timers" component={Timer} options={{headerTitle:'Timer',}}/>
      <Stack.Screen name="HistoryTask" component={HistoryTask} options={{headerTitle:'History Task',}}/>
      <Stack.Screen name="Report" component={Report} options={{headerTitle:'Report',}}/>   
      <Stack.Screen name="ProjectList" component={ProjectList} options={{headerTitle:'Project List',}}/>     
      <Stack.Screen name="AddNewProject" component={AddNewProject} options={{headerTitle:'Add New Project',}}/>
      <Stack.Screen name="ProjectDetail" component={ProjectDetail} options={{headerTitle:'ProjectDetail',}}/>
      <Stack.Screen name="EditProject" component={EditProject} options={{headerTitle:'EditProject',}}/>
      <Stack.Screen name="TaskManagement" component={TaskManagement} options={{headerTitle: 'Task Management'}}/>
      <Stack.Screen name="AddTask" component={AddTask} options={{headerTitle: 'Add New Task'}}/>
      <Stack.Screen name="DetailTask" component={DetailTask} options={{headerTitle: 'Task Detail'}}/>
      <Stack.Screen name="EditTask" component={EditTask} options={{headerTitle: 'Edit Task Detail'}}/>
    </Stack.Navigator>
  );
}
export default (MyStack)