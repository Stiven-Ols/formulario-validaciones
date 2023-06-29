export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    };

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo no puedo estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puedo estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo no puedo estar vacio',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'Este campo no puedo estar vacio',
        customError: 'Debes tener al menos 18 años'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato es xxxxxxxxxx'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La dirección debe tener de 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe tener de 10 a 40 caracteres'
    },
    departamento: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El departamento debe tener de 10 a 40 caracteres'
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorEdad(fechaCliente);
    let mensaje = '';
    if (!mayorEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años';
    };
    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
};