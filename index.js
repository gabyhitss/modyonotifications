//const urlToken = 'https://hitss.modyo.cloud/auth/openidc/access_token';
//const urlInfo = 'https://setrainingmodyo.herokuapp.com/auth/realms/master/protocol/openid-connect/userinfo';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

const corsOption = {
    origin: '*'
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.send("Peticion con exito");
});

app.post("/", async function (req, res) {
    var config = {
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    };
    var body = {
        to: req.body.user,
        body: "Esto es una notificacion",
        subject: "Choose delicious",
    };
    var respuesta = await axios.post("https://hitss.modyo.cloud/api/v1/messaging/notifications", body, config).then(function(r){
        return r;
    }).catch(err =>{
       return err;
    });
    res.status(respuesta.status || respuesta.response.status).send("Enviada");
});

app.listen(process.env.PORT, () => {
    console.log("Esta escuchando");
});
