import { format } from 'path';
import express from 'express';
import { Index } from './routes/';
class App {
  public app!: express.Application;
  public indexRoutes: Index = new Index();

  public constructor() {
    this.app = express();
    this.app.use(express.json());
    this.indexRoutes.routes(this.app);
  }
}

export default new App().app;
