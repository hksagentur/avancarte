# syntax=docker/dockerfile:1.4

ARG DEBIAN_RELEASE="bullseye"
ARG NODE_VERSION="16.14.2"

FROM node:${NODE_VERSION}-${DEBIAN_RELEASE}-slim

LABEL maintainer="Daniel Weidner <d.weidner@hks-agentur.de>"

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="eleventy"
LABEL org.label-schema.description="Run 11ty a simpler static site generator in node"
LABEL org.label-schema.vendor="H&K+S Agentur für Werbung"
LABEL org.label-schema.docker.cmd="docker run -d -p 3000:3000 -v .:/app -v node_modules:/app/node_modules eleventy"

ARG NODE_VERSION
ARG NODE_ENV="production"
ARG UID=1000
ARG GID=1000

ENV NODE_VERSION="${NODE_VERSION}"
ENV NODE_ENV="${NODE_ENV}"

RUN <<-EOR
	set -e
	apt-get update
	apt-get install --yes --no-install-recommends build-essential=12.9
	apt-get clean
	rm -rf /var/lib/apt/lists/* use/share/doc /usr/share/man
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

COPY --link --chown=node:node . .

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
