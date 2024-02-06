import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');



const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '7d'
        }, (err: any, token: any) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })
}


export default generarJWT;

