import React from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, StyleSheet, Text, ImageBackground } from 'react-native';
import { bindDialogActions } from '../redux/actions/dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    dialogBackground: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dialogContainer: {
        width: 300,
        height: 200,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#fff'
    },
    infoText: {
        color:'white',
        textAlign: 'center',
        fontSize: 12,
    },
    closeIcon: {
        padding: 5,
        left: 15,
    }
});

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
    }
    
    renderConfirm() {
        const { dialogActions } = this.props;
        const { confirmVisible } = this.props.dialog;
        const { title, message, confirmCallback } = this.props.dialog.data;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmVisible}
                onRequestClose={dialogActions.hide}>

                {/* <View style={styles.dialogBackground}>
                    <View style={styles.dialogContainer}>
                        <Text style={{ fontSize: 20 }}>{ title }</Text>
                        <Text>{ message }</Text>

                        <TouchableOpacity
                            onPress={() => { setTimeout(dialogActions.hide, 10); confirmCallback(); }}>
                            <Text>OK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            >                            
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View
                    style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "rgba(48, 48, 48, 0.5)"
                    }}
                >
                    <TouchableOpacity
                        style={{
                        width: "100%",
                        backgroundColor: "transparent"
                        }}
                    />
                    <ImageBackground source={require("../../assets/background.png")} style={{width: '100%', height: '100%'}}>
                        <View>
                            <TouchableOpacity onPress={() => setTimeout(dialogActions.hide, 10) }>
                            <Icon
                                name="angle-left"
                                size={35}
                                color={"rgba(164,172,193,1)"}
                                style={styles.closeIcon}
                            />
                            </TouchableOpacity>
                        </View>
                        <View style={{padding: 10, alignItems:'center', justifyContent:'center', flex:1}}>
                            <Text style={[styles.infoText, {fontWeight: 'bold', fontSize: 14,}]}>LẠC VIỆT ĐỘN TOÁN</Text>
                            <Text></Text>
                            <Text style={styles.infoText}>Trung Tâm Nghiên Cứu Lý Học Đông Phương</Text>
                            <Text style={styles.infoText}>www.lyhocdongphuong.org.vn</Text>
                            <Text style={styles.infoText}>Địa chỉ: số 9 ngõ 195 Ngọc Thủy Long Biên - Hà Nội</Text>
                            <Text style={styles.infoText}>Điện thoại: 0965059666</Text>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        )
    }
    render() {
        return (
            <>
            { this.renderConfirm() }
            </>
        );
    }
}

export default connect(
    (state) => ({ dialog: state.dialog }),
    (dispatch) => bindDialogActions({}, dispatch)
)(Dialog);