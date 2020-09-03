#!/bin/bash

mkdir -p ./webappbank/quorum/build
mkdir -p ./webappbank/quorum/contractAddresses
cp -r ./quorum/build/* ./webappbank/quorum/build
cp -r ./quorum/contractAddresses/* ./webappbank/quorum/contractAddresses
docker rmi dlt-backend-app-bank:0.1
docker build -f ./Dockerfile-bank -t dlt-backend-app-bank:0.1 ./webappbank
docker run -dt -p 3001:3001 -v ${PWD}/webappbank/.env:/app/.env --name dlt-backend-app-bank dlt-backend-app-bank:0.1