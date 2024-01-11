import { Express, Request, Response } from 'express';
import fs from 'fs';
import { Helper } from '../helper';
const dataFilePath = 'all-data.json';

export class AllDataRequest {

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

    app.all('*', (req: Request, res: Response) => {
      const newData = {
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
        created_at: new Date(),
        ip_address: req.ip,
        _id: Date.now().toString()
      };
    
      const existingData = AllDataRequest.readDataFromFile();
      existingData.push(newData);
      AllDataRequest.writeDataToFile(existingData);
    
      res.json(newData);
    });

    app.get('/alldata', (req: Request, res: Response) => {
      const data = AllDataRequest.readDataFromFile();
      res.json(data);
    });


  }
}