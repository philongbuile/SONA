import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connect, set } from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {dbConnection} from './api/v1/database/database';
import {Route} from './api/v1/routes/app.routes';
import {ServerConfig} from './config/config';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

    constructor(routes: Route[]) {
    this.app = express();
    this.env = ServerConfig.env || 'development';
    this.port = ServerConfig.port || 3000;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private connectToTheDatabase(): void {
    if (this.env === 'production') {
      set('debug', false);
    }

    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares(): void {
    if (this.env === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    ));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(cors()); 
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}
