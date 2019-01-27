/**
 *App.js -- React Native APP
 * By_Themaxmaxmax
 * TheNewsDemo
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Home from './imports/Home'
import cover from './imports/Cover'
import Message from './imports/Message'
import Mine from './imports/Mine'
export default TabNavigator(
    {
        Home:{screen:Home},
        Discover:{screen:cover},
        Message:{screen:Message},
        Mine:{screen:Mine}
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        initialRouteName:'Home',
        tabBarOptions: {
            style: {
                height:60,
                backgroundColor: '#FFFFFF',
            },
            showIcon:true,
            activeTintColor:'orange',
        }
    }
)
