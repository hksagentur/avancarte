# syntax=docker/dockerfile:1.4

FROM node:16.14.2-slim
LABEL maintainer="Daniel Weidner <d.weidner@hks-agentur.de>"

ARG NODE_ENV="production"
ARG UID=1000
ARG GID=1000

RUN <<-EOR
	set -e
	groupmod -g "${GID}" node
	usermod -u "${UID}" -g "${GID}" node
EOR

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci && npm cache clean --force
ENV PATH="/app/node_modules/.bin:${PATH}"

ENV NODE_VERSION="16.14.2"
ENV NODE_ENV="${NODE_ENV}"

COPY --chown=node:node . .

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
