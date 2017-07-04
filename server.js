import app                               from './app';
import { connectDatabase }               from './app/db';
import { development, test, production } from './app/db/config';

const port = process.env.PORT || 4000;
const databaseConfig = process.env.NODE_ENV === 'production' ? production : development;

(async() => {
    try {
        const info = await connectDatabase(databaseConfig);
console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
} catch (error) {
    console.error('Unable to connect to database', error);
}

await app.listen(port);
console.log(`Server started on port ${port}`);
})();
