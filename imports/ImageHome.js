import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const DevWidth=require('Dimensions').get('window').width;

export default class ScrollImage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
        }
    }

    componentDidMount() {
        this.setTimer();
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
        return(
            <View style={styles.banner}>
                <ScrollView ref="scrollView"   horizontal={true}
                            pagingEnabled={true} showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={(e)=>this.slide(e)}
                            onTouchEnd={()=>this.bannerDetail()}
                            onScrollBeginDrag={()=>{this.stopTimer()}}
                            onScrollEndDrag={()=>{this.setTimer()}}
                >
                    {}
                    {this.renderBanner()}
                </ScrollView>
                <View style={styles.indicateBar}>
                    {}
                    {this.renderIndicate()}
                </View>
            </View>
        )
    }


    renderBanner(){
        return this.props.headerNews.map((item,index)=>
            <View key={index} style={styles.bannerItem}>
                <Image source={{uri:item.imgsrc}} style={styles.itemImage} />
                <Text style={styles.bannerTitle}>{item.title}</Text>
            </View>
        )
    }
    renderIndicate(){
        let jsx=[];
        let index=this.state.pageIndex;
        for (let i=0;i<this.props.headerNews.length;i++){

            if (i===index){
                jsx.push(<Text key={i} style={{fontSize:15,color:'#5cb0ff'}}>●</Text>)
            }else {
                jsx.push(<Text key={i} style={{fontSize:15,color:'#9c9c9c'}}>●</Text>)
            }
        }
        return jsx;
    }
    slide(){
        let offset=e.nativeEvent.contentOffset.x;
        let index=Math.floor(offset/DevWidth);
        this.setState({
            pageIndex:index
        });
    }
    setTimer(){
        this.timer=setInterval(()=>{
            this.setState((preState)=>{
                if(preState.pageIndex>=(this.props.headerNews.length-1)){
                    return {pageIndex:0}
                }else {
                    return {pageIndex:preState.pageIndex+1}
                }
            });

            let offset=this.state.pageIndex*DevWidth;
            this.refs.scrollView.scrollTo({x:offset,y:0,animated:true});
        },3000)
    }
    stopTimer(){
        console.log('停止计时');
        clearInterval(this.timer);
    }
    bannerDetail(){
        let item=this.props.headerNews[this.state.pageIndex];
        console.log(this.props.navigation);
        this.props.navigation.navigate('Detail',{id:item.id,title:item.title});
    }
}

const styles = StyleSheet.create({
    banner:{
        width:DevWidth,
        height:DevWidth*0.5
    },
    bannerItem:{
        width:DevWidth,
    },
    itemImage:{
        width:DevWidth,
        height:DevWidth*0.6
    },
    bannerTitle:{
        width:DevWidth,
        height:25,
        lineHeight:25,
        color:'#fff',
        backgroundColor:'#FFFFFF',
        alignItems:'flex-end',
        position:'absolute',
        bottom:0
    },
    indicateBar:{
        width:DevWidth,
        height:25,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
});