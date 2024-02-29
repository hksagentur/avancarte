# AvanCarte

## Development

Use Docker Compose to setup and run a development environment. This will start the Development Server shipping with Eleventy and the Netlify CMS proxy. Both  can be accessed via <http://localhost:3000> or <http://localhost:3000/admin> once the services are up and running.

```sh
docker compose up --detach
```

> [!NOTE]
> The Docker Compose configuration uses a named volume to keep the node dependencies installed within the service while mounting the application code to the same directory. Without this volume the dependencies would be shadowed by the application code. This could only be avoided by using another package manager. NPM does not allow to change the path of the node_modules folder (unlike yarn or pnpm). As a consequence you have to delete the named volume (`docker volume rm avancarte-node_modules`) and rebuild your image if the dependencies change outside of your service (`git pull`).
