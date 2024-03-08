import {StyleSheet} from 'react-native'
import { Picker } from '@react-native-picker/picker'

export function Piker(props){

    let moedasItem = props.moedas.map( (item, index) => {
        return <Picker.Item value={item.key} key={index} label={item.key}/>
    })

    return(
        <Picker
        selectedValue={props.moedaSelecionada}
        onValueChange={ (valor) => props.onChange(valor) }
        style={styles.piker}
        >
        {moedasItem}
        </Picker>
    )
}

const styles = StyleSheet.create({

    piker:{
        padding: 8,
        fontSize: 16
    }
})