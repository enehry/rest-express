import { Express, Request, Response } from 'express';
import { createUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import deserializeUser from './middleware/deserialize-user';
import requireUser from './middleware/require-user';
import validateResource from './middleware/validate-resource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express){
  app.get('/health-check', (req: Request, res: Response) => {
    res.send('OK');
  });

  app.post('/api/users',
   validateResource(createUserSchema), createUserHandler);

   app.post('/api/sessions', 
   validateResource(createSessionSchema), 
   createUserSessionHandler);

   app.get('/api/sessions',requireUser,getUserSessionsHandler);
   
}

export default routes;