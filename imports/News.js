import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
export default class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            detailHtml:''
        }
    }
    static navigationOptions=((props)=>{
        return {
            title:props.navigation.state.params.title
        }
    });
    componentDidMount() {
        this.getNewsDetail()
    }

    render(){
        return (
            <WebView
                automaticallyAdjustContentInsets={true}
                source={{html: this.state.detailHtml, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
        )
    }

    getNewsDetail(){
        let newsId=this.props.navigation.state.params.id;
        let url='http://c.3g.163.com/nc/article/' + newsId + '/full.html';
        fetch(url).then(response=>response.json())
            .then((responseJson)=>{
                let detail=responseJson[newsId];
                let imgArr=detail.img;
                let rawHtml=detail.body;
                imgArr.forEach((imgItem)=>{
                    let imgHtml='<img src="'+imgItem.src+'" width="100%">';
                    rawHtml=rawHtml.replace(imgItem.ref,imgHtml);
                });
                this.setState({
                    detailHtml:rawHtml
                });
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}