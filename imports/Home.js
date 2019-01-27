import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import News from './News';
import ImageHome from './ImageHome'


const DevWidth=require('Dimensions').get('window').width;

class HomeList extends Component {
    static defaultProps={
        newsUrl:"http://c.m.163.com/nc/article/headline/T1348647853363/0-25.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=20&version=8.1&spever=false&net=wifi&lat=5OtqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jKlRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311&sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore",
        newsKey:"T1348647853363"
    };

    static navigationOptions={
        title:'TheNewsAppDemo',
    };

    constructor(props){
        super(props);
        this.state={
            headerNews:[],
            rowNews:[],
            refreshing:false,
            _navigation:{}
        };
    }

    componentDidMount() {
        this.getNewsData();
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageHome headerNews={this.state.headerNews} navigation={this.props.navigation}/>
                <FlatList
                    ref={ref=>flatList=ref}
                    keyExtractor = {(item, index) => index.toString()}
                    data={this.state.rowNews}
                    renderItem={this.renderItem.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
    getNewsData(){
        fetch(this.props.newsUrl)
            .then((response)=>response.json())
            .then((responseJson)=>{
                let rawData=responseJson[this.props.newsKey];
                this.setState({
                    headerNews:rawData.slice(0,4),
                    rowNews:rawData.slice(4)
                });
            })
            .catch((err)=>{
                console.log(err);
            })
    }


    renderItem(item){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>this.showDetail(item.item)}>
                <View style={styles.newsItem}>
                    <Image style={styles.newsImg} source={{uri:item.item.imgsrc}} />
                    <View style={styles.newsText}>
                        <Text style={styles.newsTitle}>{item.item.title}</Text>
                        <Text style={styles.newsDigest}>{item.item.digest}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    showDetail(item){
        this.props.navigation.navigate('Detail',{id:item.id,title:item.title});
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getNewsData();
        this.setState({refreshing:false});
    }
}


function renderIcon(tab,component){
    let iconSrc='';
    if (tab.focused){
        iconSrc=component+'_highlighted';
    }else{
        iconSrc='tabbar_'+component;
    }
    return <Image source={{uri:'asset:/TabBar/'+iconSrc+'.png'}} style={{width:30,height:30}} />
}

export default Home=StackNavigator(
    {
        List:{screen:HomeList},
        Detail:{screen:News}
    },
    {
        navigationOptions:{
            tabBarLabel:'主页',
            tabBarIcon:(tab)=>renderIcon(tab,'home'),
            headerStyle:{
                backgroundColor: '#FFFFFF',
            },
            headerTitleStyle:{
                color: '#ff935c'
            }
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    newsItem:{
        width:DevWidth,
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginBottom:10
    },
    newsText:{
        width:DevWidth*0.6,
        height:80,
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,
    },
    newsImg:{
        width:100,
        height:80
    },
    newsTitle:{
        fontSize:16,
        marginBottom:5,
        marginTop:5
    },
    newsDigest:{
        fontSize:12
    }
});
