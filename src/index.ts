import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { AdsRequest } from './ads';
import { DeviceRequest } from './devices';
import { AllDataRequest } from './allData';

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use(cors());
AdsRequest.setup(app)
DeviceRequest.setup(app)
AllDataRequest.setup(app)

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
