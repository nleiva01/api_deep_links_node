import { Express, Request, Response } from 'express';
import fs from 'fs';
import { Helper } from '../helper';
const dataFilePath = 'devices-data.json';

export class DeviceRequest {

// Device Database
  static readDataFromFile() {
    Helper.createFileIfNotExist(dataFilePath);
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  }

  static writeDataToFile(data: any) {
    Helper.createFileIfNotExist(dataFilePath);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  }

  public static setup(app: Express): void {

    app.post('/data', (req: Request, res: Response) => {
      const newData = req.body;
      newData.created_at = new Date();
      newData.ip_address = req.ip;

      const existingData = DeviceRequest.readDataFromFile();

      newData._id = Date.now().toString();

      existingData.push(newData);

      DeviceRequest.writeDataToFile(existingData);

      res.json(newData);
    });

    app.get('/data', (req: Request, res: Response) => {
      const data = DeviceRequest.readDataFromFile();
      res.json(data);
    });

    app.get('/data/:id', (req: Request, res: Response) => {
      const data = DeviceRequest.readDataFromFile();
      const id = req.params.id;
      const result = data.find((item: any) => item._id === id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });

    app.put('/data/:id', (req: Request, res: Response) => {
      const data = DeviceRequest.readDataFromFile();
      const id = req.params.id;
      const updatedData = req.body;

      const index = data.findIndex((item: any) => item._id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedData };
        DeviceRequest.writeDataToFile(data);
        res.json(data[index]);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });


    app.post('/clearData', (req: Request, res: Response) => {
      
      try {
        const data = DeviceRequest.readDataFromFile();
        DeviceRequest.writeDataToFile([]);
        res.json([]);

      }catch (e: any) {
        res.status(404).json({ message: 'it was not possible to clear the table' });
      }
    });

  }
}