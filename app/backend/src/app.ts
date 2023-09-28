import * as express from 'express';
import mainRouter from './routers';

require('express-async-errors');

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.routers();

    this.app.use(App.errorHandler);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routers(): void {
    this.app.use(mainRouter);
  }

  private static errorHandler(
    _error: express.ErrorRequestHandler,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) {
    res.status(500).json({ message: 'Internal error' });
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
