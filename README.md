# AvanCarte

## Development

Use Docker Compose to setup and run a development environment. This will start the Development Server shipping with Eleventy and the Netlify CMS proxy. Both  can be accessed via <http://localhost:3000> or <http://localhost:3000/admin> once the services are up and running.

```sh
docker compose up -d
```

If you want to generate a production build you can run a one-off command on the node service:

```sh
docker compose run --rm --env="NODE_ENV=production" node npm run build
```
