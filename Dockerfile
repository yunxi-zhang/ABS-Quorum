FROM node:10.14-alpine

WORKDIR /app
COPY ./quorum ../quorum
COPY ./config ./config
COPY ./invokeContracts ./invokeContracts
COPY ./routes ./routes
COPY ./web3 ./web3
COPY ./server.js ./
COPY ./package.json ./
COPY ./docker_cmd.sh ./

CMD ./docker_cmd.sh