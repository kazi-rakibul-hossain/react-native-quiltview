'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity } = React;
var SlateURI = require('../SlateURI');
var RNCellView = requireNativeComponent('RNCellView', null);

var NormalCell = React.createClass({
    propTypes: {
        widthRatio: React.PropTypes.number,
        heightRatio: React.PropTypes.number
    },

    getInitialState() {
        return {width:0, height:0};
    },

    getDefaultProps() {
        return {
            widthRatio: 4,
            heightRatio: 1,
        };
    },

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        if (!data) {
            return <RNCellView style={styles.cell}  {...this.props} />;
        }

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var image = eval("data." + m["image"]);
        var title = eval("data." + m["title"]);
        var subtitle = eval("data." + m["subtitle"]);
        var url = eval("data." + m["url"]);

        var uri = "demo://news/" + title + "/" + url;

        // 渲染
        return <RNCellView
                     style={this._cellStyles()} 
                     onSizeChange={(event)=>{this.setState(event.nativeEvent.size)}}
                     {...this.props} >
                    <TouchableOpacity onPress={()=>SlateURI.openURI(uri)} style={styles.touch}>
                        <Image style={this._imageStyles()} source={{uri: image}} />
                        <View>
                            <Text style={this._titleStyles()}>{title}</Text>
                            <Text style={styles.desc}>{subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                </RNCellView>;
    },

    _cellStyles() {
        return {
            position: 'absolute',
            backgroundColor: 'lightgray',
            top: 0,
            left: 0,
            width: this.state.width,
            height: this.state.height
        };
    },

    _titleStyles() {
        var imageWidth = this.state.height - 24;
        return {
            textAlign: 'left',
            color: '#333333',
            marginTop: 10,
            marginLeft: 12,
            width: this.state.width - 4 - 12 - imageWidth - 12
        };
    },

    _imageStyles() {
        var width = this.state.height - 24;
        var height = width;
        return {
            marginLeft: 12,
            marginTop: 10,
            width: width,
            height: height,
        };
    }
});

var styles = StyleSheet.create({
  touch : {
    flex: 1,
    flexDirection: 'row',
  },
  desc: {
    textAlign: 'left',
    color: '#333333',
    marginLeft: 12,
  },
});

module.exports = NormalCell;
