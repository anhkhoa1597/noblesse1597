import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { bindHeaderBarActions } from '../../../redux/actions/headerbar';
import DialogTab from './DialogTab';
import SVGTab from './SVGTab';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
              { key: 'first', title: 'Dialog' },
              { key: 'second', title: 'SVG' },
            ]
        };
    }
    componentDidMount() {
        this.props.headerBarActions.setTitle("HOME");
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: DialogTab,
                    second: SVGTab
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
};

export default connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(HomeScreen);