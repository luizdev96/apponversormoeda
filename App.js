import  { useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { api } from './src/Services/api'
import { Piker } from './src/Piker';

export default function App() {

  const [loading, setLoading] = useState(true)
  const [moedas, setMoedas] = useState([])
  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
const [moedaBValor, setMoedaBValor] = useState("")

  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0) 

   useEffect( () => {

    async function loadMoedas(){
      const response = await api.get("all")
      
      let moedasArray = [];
      Object.keys(response.data).map( (key) => {
          moedasArray.push({
            key: key,
            label: key,
            value: key
          })
      })

      setMoedas(moedasArray)
      setMoedaSelecionada(moedasArray[0].key)
      setLoading(false)
    }

    loadMoedas();

   }, [])

   async function converter(){

    const response = await api.get(`/all/${moedaSelecionada}-BRL`)
    console.log(response.data)

    let result = ( response.data[moedaSelecionada].ask * parseFloat(moedaBValor))
    setValorConvertido(`${result.toLocaleString("pt-br", { style: "currency", currency: "BRL"})}`)
    setValorMoeda(moedaBValor)
    setMoedaBValor("")
    Keyboard.dismiss()
  }

    if(loading){
      return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
          <Text style={{ marginBottom: 10}}>Carregando..</Text>
          <ActivityIndicator color="#3333" size="large" />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
          
          <View style={styles.boxCoin}>
              <Text style={styles.textCoin}>Selecione sua moeda</Text>
              <Piker
                moedas={moedas}
                moedaSelecionada={moedaSelecionada}
                onChange={ (moeda) => { setMoedaSelecionada(moeda)}}
              />
          </View>

          <View style={styles.boxValue}>
              <Text style={styles.textCoin}> Digite um valor para converter em (R$)</Text>
              <TextInput 
              style={styles.input}
              placeholder="Ex: 1.43"
              keyboardType="number-pad"
              value={moedaBValor}
              onChangeText={ (value) => setMoedaBValor(value)}
              />
          </View>

          <TouchableOpacity style={styles.buttomC} onPress={converter}>
            <Text style={styles.textC}>Converter</Text>
          </TouchableOpacity>

          {valorConvertido !== 0 && (
            <View style={styles.boxResult}>

              <Text style={styles.valueC}>
                {valorMoeda} {moedaSelecionada}
              </Text>

              <Text style={styles.textCc}>
                corresponde a
              </Text>

              <Text style={styles.valueC}>
                {valorConvertido}
              </Text>

            </View>
          )}
          
        </View>
      );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 60,
    alignItems: "center",
  },

  boxCoin:{
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },

  textCoin:{
    fontSize: 16,
    color: "#121212",
    marginBottom: 10
  },

  boxValue:{
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
  },

  input:{
    padding: 8,
    borderWidth: 1,
    borderColor: "#cccc",
    fontSize: 18,
    color: "#101215",
  },

  buttomC:{
    width: "90%",
    height: 45,
    backgroundColor: "#fb4b57",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },

  textC:{
    fontSize: 16,
    color: "#fff"
  },

  boxResult:{
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 34,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  valueC:{
    fontSize: 28,
    color: "#101215",
    fontWeight: "bold",
    marginBottom: 10
  },

  textCc:{
    fontSize: 18,
    color: "#999",
    marginBottom: 10
  }

});
