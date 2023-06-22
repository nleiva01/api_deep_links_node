import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json(req.headers);
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
