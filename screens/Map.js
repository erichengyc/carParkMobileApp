import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export default class Map extends Component {
  renderHeader() {
    return <View style={styles.header}>
        <Text>Header</Text>
    </View>;
  }

  render() {
    return (
      <View style={styles.container}>
          {this.renderHeader()}
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flex: 1,
    height: 100,
  },
  map: {
    flex: 1,
    // width: 100,
    // height: 100,
  },
});
