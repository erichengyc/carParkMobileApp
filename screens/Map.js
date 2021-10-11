import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";

const { height, width } = Dimensions.get("screen");

const parkings = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    location: {
      lat: 37.78845,
      lng: -122.4344,
    },
  },
  {
    id: 2,
    title: "Parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    location: {
      lat: 37.78815,
      lng: -122.4314,
    },
  },
  {
    id: 3,
    title: "Parking 3",
    price: 10,
    rating: 4.9,
    spots: 50,
    free: 25,
    location: {
      lat: 37.78835,
      lng: -122.4334,
    },
  },
];

export default class Map extends Component {
  state = {
    hours: {},
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
    );
  }

  renderParking(item) {
    const { hours } = this.state;

    return (
      <View key={"parking-${item.id}"} style={styles.parking}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>
            x {item.spots} {item.title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>${item.price}</Text>
          <Text>{item.rating}</Text>
          <TouchableWithoutFeedback style={styles.buy}>
            <View>
              <View>
                <Text>${item.price * 2}</Text>
                <Text>
                  ${item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View>
                <Text>&gt;</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderParkings() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        onScroll={(props) => console.log("onScroll", props)}
        style={styles.parkings}
      >
        {parkings.map((parking) => this.renderParking(parking))}
      </ScrollView>
    );
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
        {this.renderParkings()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.5,
    // alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 24,
  },
  parking: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 24,
    marginHorizontal: 24,
    width: width - 24 * 2,
  },
});
