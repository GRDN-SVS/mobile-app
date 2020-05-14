import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text as TextReact } from 'react-native-elements'

import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

import Colors from '../constants/Colors';

export default function ResultsScreen() {
  const keys = ['How I met your mother', 'Game of Thrones', 'MR. Robot', 'Greys Anatomy', 'The Crown', '13 Reasons Why'];
  const values = [15, 25, 35, 45, 55, 10];
  // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
  
  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#d982f6', '#ecb3ff']

  const data = keys.map((key, index) => {
    return {
      key,
      amount: values[index],
      svg: { fill: colors[index] },
      onPress: () => selectedSlice({ selectedSlice: { label: key, value: values[index] } } )
    }
  })

  const Labels = ({ slices, height, width }) => {
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

  const [state, setState] = useState(null);

  function selectedSlice(slice) {
    if ((state != null) && (state.props.title === slice.selectedSlice.label)) {
      setState(null);
    }
    else {
      setState(Info(slice.selectedSlice));
    }
  }
 
  function Info(slice) {
    let porcentaje = 185 / slice.value;

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
      <PieChart style={{ height: 400 }} valueAccessor={({ item }) => item.amount} data={data} spacing={0}>
        <Labels/>
      </PieChart>
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
