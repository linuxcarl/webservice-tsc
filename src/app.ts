import { format } from 'path';
import express from 'express';
import { Index } from './routes/';
import { APIRoute } from './routes/api';
import { UserRoute } from './routes/user';
import { OrderRoute } from './routes/order';
class App {
  public app!: express.Application;
  public indexRoutes: Index = new Index();
  public apiRoutes: APIRoute = new APIRoute();
  public userRoutes: UserRoute = new UserRoute();
  public orderRoutes: OrderRoute = new OrderRoute();

  public constructor() {
    this.app = express();
    this.app.use(express.json());
    this.indexRoutes.routes(this.app);
    this.apiRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.orderRoutes.routes(this.app);
  }
}

export default new App().app;
