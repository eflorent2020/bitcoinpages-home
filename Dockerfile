FROM debian:jessie

EXPOSE 2368
#ENV NODE_ENV production

RUN apt-get update -qy
RUN apt-get upgrade -qy
RUN apt-get install -qy zip build-essential wget curl sudo git

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt install -y nodejs
RUN npm install -g knex-migrator
RUN npm install -g webpack
RUN mkdir /usr/src/bitcoinpage-home
ADD . /usr/src/bitcoinpage-home
WORKDIR /usr/src/bitcoinpage-home
RUN npm i
RUN npm run build
ENTRYPOINT ["/usr/bin/node", "server/server.js"]

