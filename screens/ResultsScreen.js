import React, { useState } from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import { Card, Text as TextReact } from 'react-native-elements'

import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

import Colors from '../constants/Colors';
import { API_URL } from '../env';
import * as axios from 'react-native-axios'

export default function ResultsScreen() {

  const [state, setState] = useState(null);
  const [chart, setChart] = useState(null);
  
  let chartData;
  let numVotes = 0;

  if (chartData == null && chart == null) {
    init();
  }

  function init() {
    if (chartData == null && chart == null) {
      getResults();
    }
  }

  function getElectionResults() {
    return axios.get(`${API_URL}/grdn/api/election/getResults`);
  }

  function getElectionOptions() {
    return axios.get(`${API_URL}/grdn/api/election/getOptions`);
  }

  function getResults() {
    if (chartData == null) {
      axios.all([getElectionResults(), getElectionOptions()])
        .then(axios.spread(function (result, options) {
          result = result.data;
          options = options.data;
          let results = {
            keys: [],
            values: []
          }

          result.results.forEach((option, index) => {
            if (options[index].option_id == option.option_id){
              results.keys.push(options[index].name);
            }
            else {
              options.forEach(element => {
                  if (element.option_id == option.option_id) {
                    results.keys.push(options[index].name);
                  }
              });
            }
            results.values.push(option.result);
            numVotes += option.result;
          });
  
          chartData = results.keys.map((key, index) => {
            return {
              key,
              amount: results.values[index],
              svg: { fill: colors[index] },
              onPress: () => selectedSlice({ selectedSlice: { label: key, value: results.values[index] } } )
            }
          })
          setChart(Chart())
        }));
    }
  } 

  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#d982f6', '#ecb3ff']

  const Labels = ({ slices, height, width }) => {
    if (chartData != null) {
      return slices.map((slice, index) => {
          const { labelCentroid, pieCentroid, data } = slice;
          return (
              <Text
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'white'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={24}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.amount}
              </Text>
          )
      })
    }
  }

  function selectedSlice(slice) {
    if ((state != null) && (state.props.title === slice.selectedSlice.label)) {
      setState(null);
    }
    else {
      setState(Info(slice.selectedSlice));
    }
  }

  function Chart() {
      return (
        <PieChart style={{ height: 400 }} valueAccessor={({ item }) => item.amount} data={chartData} spacing={0}>
          <Labels/>
        </PieChart>
      )
  }
 
  function Info(slice) {
    let porcentaje = (slice.value * 100) / numVotes;

    return (
      <Card title={slice.label}>
      {
        <View>
          <TextReact><TextReact style={styles.bold}>Número de votos: </TextReact>{slice.value}</TextReact>
          <TextReact><TextReact style={styles.bold}>Porcentaje: </TextReact>{porcentaje.toFixed(2)}%</TextReact>
      </View>
      }
      </Card>
    )
  }


  return (
    <View style={styles.container}>
      {chart}
      {state}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bold: {
    fontWeight: "bold"
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
