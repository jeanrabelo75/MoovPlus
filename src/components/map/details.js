import Axios from 'axios';
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Container, TypeTitle} from '../css/details';
import LineChart from 'react-native-chart-kit/src/line-chart';

export default class Details extends Component {
  state = {
    results: [],
  };

  constructor(props) {
    super(props);
  }

  async componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    const wayPoints = this.props.waypoints;
    const API_KEY = 'AIzaSyDqnA4clAnRQs89qfNdccBWv7KACcgDc04';
    let waypointsAPI = '';

    for (let i = 0; i < wayPoints.length; i++) {
      waypointsAPI +=
        wayPoints[i].latitude + ',' + wayPoints[i].longitude + '|';
    }

    try {
      const url =
        'https://maps.googleapis.com/maps/api/elevation/json?path=' +
        waypointsAPI.substring(0, waypointsAPI.length - 1) +
        '&samples=' +
        wayPoints.length +
        '&key=' +
        API_KEY;

      await Axios.get(url).then((response) => {
        this.getElevationData(response.data.results);
      });
    } catch (e) {
      console.log(e);
    }
  }

  getElevationData(results) {
    let elevationData = [];

    for (let i = 0; i < results.length; i++) {
      elevationData.push(results[i].elevation.toFixed(2));
    }

    this.setState({results: elevationData});
  }

  render() {
    const {results} = this.state;

    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => '#1173D2',
      strokeWidth: 2,
      barPercentage: 0.5,
      useShadowColorFromDataset: false,
    };

    const data = {
      labels: ['', '', 'Elevações em Metros de Altitude', ''],
      datasets: [
        {
          data: results,
          color: (opacity = 1) => '#00FAE1',
          strokeWidth: 2,
        },
      ],
    };

    return (
      <Container>
        {results.length > 1 ? (
          <LineChart
            data={data}
            height={170}
            width={Dimensions.get('window').width}
            chartConfig={chartConfig}
            withInnerLines={false}
          />
        ) : (
          <TypeTitle>Elevações</TypeTitle>
        )}
      </Container>
    );
  }
}
