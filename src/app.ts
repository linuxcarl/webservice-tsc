import { format } from 'path';
import express from 'express';

class App {
  public app!: express.Application;

  public constructor() {
    this.app = express();
    this.app.use(express.json());
  }
}

export default new App().app;
