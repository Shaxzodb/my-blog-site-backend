import { Router } from 'express';
import _ from 'lodash';
import { graphqlHTTP } from 'express-graphql'; // for GraphQL
// import { graphqlUploadExpress } from 'graphql-upload'

import schema from './RootSchema';
const router: Router = Router();

router.use('/',
    // graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

export default router;