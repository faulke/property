# property
A demo property management app built with React-Redux and ASP.NET Core 2.2

Front end:

- `npm install`
- create .env file in root dir

```
REACT_APP_API=http://localhost:5000
REACT_APP_MAPS_API_KEY={Google Places API key}
```

- `npm start`

DB and migrations:

- `cd PropertyApi`
- `docker-compose -f docker-compose.migrate.yml run migrate`

API:

- `docker-compose up`
