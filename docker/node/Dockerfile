# syntax=docker/dockerfile:1

FROM node:16.14.2-slim

RUN <<EOF
apt-get update
apt-get upgrade --yes
apt-get install --yes --no-install-recommends dumb-init
EOF

WORKDIR /app
RUN chown node:node ./
USER node

ARG NODE_ENV=development

ENV NODE_ENV $NODE_ENV

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "start"]
