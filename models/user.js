import t from 'tcomb-form-native';
import Colors from '../constants/Colors';
var _ = require('lodash');

const User = t.struct({
    name: t.String,
    surname: t.String,
    id: t.Number
})


const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.controlLabel.error.color = Colors.alert;
stylesheet.errorBlock.color = Colors.alert;
stylesheet.textbox.error.borderColor = Colors.alert;


export const options = {
    fields: {
        name: {
            label: 'Nombre Completo',
            error: 'Nombre necesario para realizar el registro',
        },
        surname: {
            label: 'Apellidos',
            error: 'Apellidos necesarios para realizar el registro',
        },
        id: {
            label: 'Documento de Identidad',
            error: 'Identificación necesaria para realizar el registro',
        }
    },
    stylesheet: stylesheet,
}

export default User;