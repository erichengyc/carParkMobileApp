import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Picker,
  FlatList,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

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

  componentDidMount() {
    const hours = {};

    parkings.map((parking) => {
      hours[parking.id] = 1;
    });
    this.setState({ hours })
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
      <View key={"parking-${item.id}"} style={styles.parking}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{ fontSize: 16 }}>
            x {item.spots} {item.title}
          </Text>
          {/* <Picker
            selectedValue={this.state.hours[item.id || 1 ]}
            style={{ height: 50, width: 100 }}
            itemStyle={{ color: 'red'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                horus: { ...this.state.hours, [item.id]: itemValue },
              })
            }
          >
            <Picker.Item label="01:00" value={1} />
            <Picker.Item label="02:00" value={2} />
            <Picker.Item label="03:00" value={3} />
            <Picker.Item label="04:00" value={4} />
            <Picker.Item label="05:00" value={5} />
            <Picker.Item label="06:00" value={6} />
            <Picker.Item label="07:00" value={7} />
          </Picker> */}

          <View
            style={{
              width: 100,
              borderRadius: 6,
              borderColor: "grey",
              borderWidth: 0.5,
              padding: 4,
            }}
          >
            <Text style={{ fontSize: 16 }}>05:00</Text>
          </View>
        </View>
        <View style={{ flex: 1.5, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              marginHorizontal: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Ionicons name="ios-pricetag" size={16} color="#7D818A" />
              <Text> ${item.price} </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Ionicons name="ios-star" size={16} color="#7D818A" />
              <Text> {item.rating} </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buy}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 25, color: "white" }}>
                ${item.price * 2}
              </Text>
              <Text style={{ color: "white" }}>
                {item.price}x{hours[item.id]} hrs
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>&gt;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
            keyExtractor={(item, index) => '$(item.id)'}
            renderItem={({ item }) => this.renderParking(item) }
        />


    //   <ScrollView>
    //     {parkings.map((parking) => this.renderParking(parking))}
    //   </ScrollView>
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
    padding: 12,
    marginHorizontal: 24,
    width: width - 24 * 2,
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#D25260",
    borderRadius: 6,
  },
});
