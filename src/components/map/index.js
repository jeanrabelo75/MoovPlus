import {StyleSheet, Image, View, PermissionsAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

import React, {Fragment} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Search from '../map/search';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

import Directions from '../map/directions';
import Details from '../map/details';
import {getPixelSize} from '../utils';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from '../css/map';

Geocoder.init('');

export default class Main extends React.Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
    permissionGranted: true,
    waypoints: null,
  };

  async componentDidMount() {
    const {currentUser} = auth();
    this.setState({currentUser});

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message: 'Você deseja deixar o MOV + acessar sua localização?',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      this.setState({permissionGranted: false});
    }

    if (this.state.permissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
            },
          });
          Geocoder.from(
            position.coords.latitude,
            position.coords.longitude,
          ).then((json) => {
            const address = json.results[0].formatted_address;
            const location = address.substring(0, address.indexOf(','));
            this.setState({location});
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }

  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  handleBack = () => {
    this.setState({destination: null});
  };

  getWaypoints = (coordinates) => {
    let samplesWaypoints = [];
    const totalWaypoints = Math.floor(coordinates.length * 0.1);
    const intervalWaypoints = Math.floor(coordinates.length / totalWaypoints);

    for (let i = 0; i < coordinates.length; i += intervalWaypoints) {
      samplesWaypoints.push(coordinates[i]);
    }

    this.setState({waypoints: samplesWaypoints});
  };

  render() {
    const {region, destination, duration, location} = this.state;

    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
          ref={(element) => (this.mapView = element)}>
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  this.setState({duration: Math.floor(result.duration)});
                  this.getWaypoints(result.coordinates);
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(350),
                      left: getPixelSize(350),
                      top: getPixelSize(350),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />

              <Marker
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{x: 0, y: 0}}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>

                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>

                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>

            <Details waypoints={this.state.waypoints} />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
