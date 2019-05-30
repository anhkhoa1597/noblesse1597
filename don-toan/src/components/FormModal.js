import React, { Component } from "react";
import {
  Dimensions,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon from 'react-native-vector-icons/FontAwesome';


class FormModal extends Component {
  static defaultProps = {
    height: 300, // 100% is a full
    backgroundColor: 'rgba(11,19,36,1)',
    closeIcon: true,
    visible: false,
    justifyContent: "flex-end", //
    width: "100%",
    toogleModal: () => {} //on off modal
  };

  handleModal = () => {
    const { toogleModal } = this.props;
    toogleModal && toogleModal();
  };

  caculateHeightOutside = () => {
    const { height, justifyContent } = this.props;
    const totalHeight = Dimensions.get("window").height;
    let heightOutside = totalHeight - height;
    if (isNaN(heightOutside)) {
      return 0;
    }
    if (justifyContent === "center") {
      heightOutside = heightOutside / 2;
    }
    return heightOutside;
  };

  render() {
    const {
      visible,
      height,
      closeIcon,
      children,
      justifyContent,
      width,
      backgroundColor
    } = this.props;
    const heightOutside = this.caculateHeightOutside();
    // console.log("heightOutside>>", heightOutside);
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent,
              alignItems: "center",
              backgroundColor: "rgba(48, 48, 48, 0.5)"
            }}
          >
            {!!heightOutside && (
              <TouchableOpacity
                onPress={this.handleModal}
                style={{
                  width: "100%",
                  height: heightOutside,
                  backgroundColor: "transparent"
                }}
              />
            )}
            <SafeAreaView
              style={{
                height,
                backgroundColor: 'rgba(11,19,36,1)',
                width
              }}
            >
              <View
                style={{
                  position: "relative"
                }}
              >
                {closeIcon && (
                  <TouchableOpacity onPress={this.handleModal}>
                    <Icon
                      name="angle-left"
                      size={35}
                      color={"rgba(164,172,193,1)"}
                      style={styles.closeIcon}
                      
                    />
                  </TouchableOpacity>
                )}
                {children}
              </View>
            </SafeAreaView>
            {!!(heightOutside && justifyContent === "center") && (
              <TouchableOpacity
                onPress={this.handleModal}
                style={{
                  width: "100%",
                  height: heightOutside,
                  backgroundColor: "transparent"
                }}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeIcon: {
    padding: 0,
    lineHeight: 50,
    position: "absolute",
    left: 15,
    zIndex: 3
  }
});

export default FormModal;
