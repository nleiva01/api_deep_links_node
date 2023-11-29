import { Express, Request, Response } from 'express';
import fs from 'fs';
import { Helper } from '../helper';
const adsFilePath = 'ads-data.json';

export class AdsRequest {

// Device Adbase
  static readAdsFromFile() {
    Helper.createFileIfNotExist(adsFilePath);
    const data = fs.readFileSync(adsFilePath, 'utf-8');
    return JSON.parse(data);
  }

  static writeAdsToFile(data: any) {
    Helper.createFileIfNotExist(adsFilePath);
    fs.writeFileSync(adsFilePath, JSON.stringify(data, null, 2));
  }

  public static setup(app: Express): void {

    app.post('/ads', (req: Request, res: Response) => {
      const newAd = req.body;
      newAd.created_at = new Date();
      newAd.ip_address = req.ip;

      const existingAd = AdsRequest.readAdsFromFile();

      newAd._id = Date.now().toString();

      existingAd.push(newAd);

      AdsRequest.writeAdsToFile(existingAd);

      res.json(newAd);
    });

    app.get('/ads', (req: Request, res: Response) => {
      const data = AdsRequest.readAdsFromFile();
      res.json(data);
    });


    app.get('/generateAd', (req: Request, res: Response) => {
      try {
        const data = AdsRequest.readAdsFromFile(); // Asumiendo que esto devuelve un arreglo de anuncios
    
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Ads not availables.');
        }
    
        const randomIndex = Math.floor(Math.random() * data.length);
    
        const randomAd = data[randomIndex];
    
        res.json(randomAd);
      } catch (error: any) {
        // Manejar posibles errores
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/ads/:id', (req: Request, res: Response) => {
      const data = AdsRequest.readAdsFromFile();
      const id = req.params.id;
      const result = data.find((item: any) => item._id === id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });

    app.put('/ads/:id', (req: Request, res: Response) => {
      const data = AdsRequest.readAdsFromFile();
      const id = req.params.id;
      const updatedAd = req.body;

      const index = data.findIndex((item: any) => item._id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedAd };
        AdsRequest.writeAdsToFile(data);
        res.json(data[index]);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });

  }
}