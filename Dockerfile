# syntax=docker/dockerfile:1.4

ARG DEBIAN_RELEASE="bullseye"
ARG NODE_VERSION="16.14.2"

FROM node:${NODE_VERSION}-${DEBIAN_RELEASE}-slim

LABEL maintainer="Daniel Weidner <d.weidner@hks-agentur.de>"

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="node"
LABEL org.label-schema.description="A minimal node development environment with npm"
LABEL org.label-schema.vendor="H&K+S Agentur für Werbung"
LABEL org.label-schema.docker.cmd="docker run -d -v .:/app -v /app/node_modules node"

ARG NODE_VERSION
ARG NODE_ENV="production"
ARG UID=1000
ARG GID=1000

ENV NODE_VERSION="${NODE_VERSION}"
ENV NODE_ENV="${NODE_ENV}"

RUN <<-EOR
	set -e
	groupmod -g "${GID}" node
	usermod -u "${UID}" -g "${GID}" node
EOR

USER node
WORKDIR /app

COPY --link --chown=node:node package*.json ./

RUN <<-EOR
	set -e
	npm clean-install --include=dev
	npm cache clean --force
EOR

CMD ["node"]
