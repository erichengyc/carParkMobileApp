import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as theme from "../theme";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const parkings = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78735,
      longitude: -122.4344,
    },
  },
  {
    id: 2,
    title: "Parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4314,
    },
  },
  {
    id: 3,
    title: "Parking 3",
    price: 10,
    rating: 4.9,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4334,
    },
  },
];

class Map extends Component {
  state = {
    hours: {},
    active: null,
  };

  componentDidMount() {
    const hours = {};

    parkings.map((parking) => {
      hours[parking.id] = 1;
    });
    this.setState({ hours });
  }

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
      <TouchableWithoutFeedback
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>
              x {item.spots} {item.title}
            </Text>
            <View
              style={{
                width: 100,
                borderRadius: 6,
                borderColor: theme.COLORS.gray,
                borderWidth: 0.5,
                padding: 4,
              }}
            >
              <Text style={{ fontSize: 16 }}>05:00</Text>
            </View>
          </View>
          <View style={styles.parkingInfoContainer}>
            <View style={styles.parkingInfo}>
              <View style={styles.parkingIcon}>
                <Ionicons
                  name="ios-pricetag"
                  size={theme.SIZES.icon}
                  color={theme.COLORS.gray}
                />
                <Text> ${item.price} </Text>
              </View>
              <View style={styles.parkingIcon}>
                <Ionicons
                  name="ios-star"
                  size={theme.SIZES.icon}
                  color={theme.COLORS.gray}
                />
                <Text> {item.rating} </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buy}>
              <View style={styles.buyTotal}>
                <Text style={styles.buyTotalPrice}>${item.price * 2}</Text>
                <Text style={{ color: theme.COLORS.white }}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View style={styles.buyBtn}>
                <Text
                  style={{
                    fontSize: theme.SIZES.base * 2,
                    color: theme.COLORS.white,
                  }}
                >
                  &gt;
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderParkings() {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        onScroll={(props) => console.log("onScroll", props)}
        style={styles.parkings}
        data={parkings}
        keyExtractor={(item, index) => "$(item.id)"}
        renderItem={({ item }) => this.renderParking(item)}
      />
    );
  }

  render() {
    const { currentPositionm, parkings } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={}
          style={styles.map}
        >
          {parkings.map((parking) => (
            <Marker key={"marker-${parking.id"} coordinate={parking.coordinate}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: parking.id })}
              >
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null,
                  ]}
                >
                  <Text style={styles.markerPrice}>${parking.price}</Text>
                  <Text style={styles.markerStatus}>
                    ({parking.free}/{parking.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>

        {this.renderParkings()}
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
  },
  header: {
    flex: 0.5,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.SIZES.base * 2,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2,
  },
  parking: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: 12,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - 24 * 2,
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    backgroundColor: theme.COLORS.red,
    borderRadius: 6,
  },
  buyTotal: {
    flex: 1,
    justifyContent: "center",
  },
  buyTotalPrice: {
    fontSize: theme.SIZES.base * 2,
    color: theme.COLORS.white,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  markerPrice: {
    color: theme.COLORS.red,
    fontWeight: "bold",
  },
  markerStatus: { 
      color: theme.COLORS.gray 
    },
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 24,
  },
  active: {
    borderColor: theme.COLORS.red,
  },
  hours: {
    flex: 1,
    flexDirection: "column",
  },
  hoursTitle: {
    fontSize: theme.SIZES.font,
  },
  parkingInfoContainer: {
    flex: 1.5,
    flexDirection: "row",
  },
  parkingInfo: {
    flex: 0.5,
    justifyContent: "center",
    marginHorizontal: theme.SIZES.base * 2,
  },
  parkingIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
