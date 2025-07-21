# syntax=docker/dockerfile:1.4

ARG DEBIAN_RELEASE="bullseye"
ARG NODE_VERSION="16.14.2"

FROM node:${NODE_VERSION}-${DEBIAN_RELEASE}-slim as base

ARG UID=1000
ARG GID=1000

RUN <<-EOR
	set -e
	groupmod -g "${GID}" node
	usermod -u "${UID}" -g "${GID}" node
EOR

USER node
WORKDIR /app

FROM base as development

ARG UID
ARG GID

ENV NODE_ENV="development"

COPY --link --chown=${UID}:${GID} package*.json ./

ENV NODE_ENV="development"

COPY --link --chown=${UID}:${GID} package*.json ./

RUN <<-EOR
	set -e
	npm clean-install --include=dev
	npm cache clean --force
EOR

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start"]

FROM base as production

ENV NODE_ENV="production"

COPY --link --chown=node:node package*.json ./

RUN <<-EOR
	set -e
	npm clean-install --omit=dev
	npm cache clean --force
EOR

COPY --link --chown=node:node . .

CMD ["npm", "run", "build"]
