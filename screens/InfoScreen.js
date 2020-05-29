import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements'

import Colors from '../constants/Colors';
import { API_URL } from '../env';
import * as axios from 'react-native-axios'

function Candidate(props) {
  return (
      <Card title={props.nombre}>
      {
        <View>
          <Text><Text style={styles.bold}>Nombre:  </Text>{props.nombre}</Text>
          <Text><Text style={styles.bold}>Numero:  </Text>{props.numero}</Text>
          <Text><Text style={styles.bold}>partido:  </Text>{props.partido}</Text>
          <Text><Text style={styles.bold}>Antecedentes:  </Text>{props.antecedentes}</Text>
          <Text><Text style={styles.bold}>Propuestas:  </Text>{props.propuestas}</Text>
        </View>
      }
      </Card>
    )
}

export default function InfoScreen() {

  const [options, setOptions] = useState(null);
  const [optionsRequested, setOptionsRequested] = useState(false);
  
  if (!optionsRequested) {
    getOptions()
  }

  function getOptions() {
    axios.get(`${API_URL}/grdn/api/election/getOptions`)
      .then(function(result) {
        setOptions(result.data);
        return setOptionsRequested(true);
      })
  }

  if (options != null && optionsRequested) {
    const list = options.map((item, index) => {
      return (
        <Candidate key={index} 
                  id={item['option_id']} 
                  nombre={item['name']} 
                  numero={item['number']} 
                  partido={item['party']} 
                  antecedentes={item['background']} 
                  propuestas={item['proposals']} 
        />
      )
    })
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {list}
      </ScrollView>
    );
  }
  else {
    return (
      <View></View>
    )
  }
}
  
  const styles = StyleSheet.create({
    container: {
      // padding: 20,
    },
    containerScroll: {
      backgroundColor: "white",
    },
    bold: {
      fontWeight: "bold"
    },
    candidateTitle: {
      textAlign: "center",
      textDecorationLine: "underline",
      // backgroundColor: Colors.secondary,
    },
    margin: {
      padding: 20,
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginBottom: 10
    }
  });

candidates = [
  {
    id: 1,
    nombre: "How I met your mother",
    nacimiento: new Date(),
    numero: 5,
    partido: "CBS",
    antecedentes: "Es muy charra, mejor serie de la vida",
    propuestas: "Contarle a los hijos la historia de como conoció la esposa para preguntar si puede salir con alguien mas"
  },
  {
    id: 2,
    nombre: "Game Of Thrones",
    nacimiento: new Date(),
    numero: 100,
    partido: "HBO",
    antecedentes: "Es inigualable",
    propuestas: "Mostrar el conflicto entre poderes en un mundo medieval"
  },
  {
    id: 3,
    nombre: "MR. Robot",
    nacimiento: new Date(),
    numero: 9,
    partido: "Usa network",
    antecedentes: "Es muy tecnologica y psicologica",
    propuestas: "Hacerte creer una cosa para despues explotarte la mente"
  },
  {
    id: 4, 
    nombre: "Greys Anatomy", 
    nacimiento: new Date(),
    numero: 17,
    partido: "ABC",
    antecedentes: "Es infinita",
    propuestas: "Hacer que te enamores de un personaje para luego matarlo"
  },
  {
    id: 5,
    nombre: "The Crown",
    nacimiento: new Date(),
    numero: 13,
    partido: "ABC Studios",
    antecedentes: "Es muy educativa",
    propuestas: "Enseñar sobre la historia de inglaterra y empoderar a la mujer"
  },
  {
    id: 6, 
    nombre: "13 Reasons Why",
    nacimiento: new Date(),
    numero: 66,
    partido: "Eskmo",
    antecedentes: "Es plenamente psicologica y depresiva",
    propuestas: "Mostrar la historia de una mujer que fue demasiado bullyniada"
  }
]
