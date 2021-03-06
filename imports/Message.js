import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
function renderIcon(tab,component){
    let iconSrc='';
    if (tab.focused){
        iconSrc=component+'_highlighted';
    }else{
        iconSrc='tabbar_'+component;
    }
    return <Image source={{uri:'asset:/TabBar/'+iconSrc+'.png'}} style={{width:30,height:30}} />
}

export default class Message extends Component {
    static navigationOptions=((props)=>{
        return {
            title:'消息',
            tabBarIcon:(tab)=>renderIcon(tab,'message')
        }
    });
    render() {
        return (
            <View style={styles.container}>
                <Text>消息</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
});