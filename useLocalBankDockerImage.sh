#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Kill any backend app proceses if they are running by using the runAllStepsInOne.sh script"
#killall command doesn't work on redhat
killall node
#below commands work on redhat
kill `lsof -t -i:3001`

stepInfo "Copy smart contracts"
mkdir -p ./webappbank/quorum/build
mkdir -p ./webappbank/quorum/contractAddresses
cp -r ./quorum/build/* ./webappbank/quorum/build
cp -r ./quorum/contractAddresses/* ./webappbank/quorum/contractAddresses

stepInfo "Remove old bank backend app docker image if it exists"
docker rmi dlt-backend-app-bank:0.1
stepInfo "Build a new bank backend app docker image"
docker build -f ./Dockerfile-bank -t dlt-backend-app-bank:0.1 ./webappbank
stepInfo "Run the bank backend app as a docker container"
docker run -dt -p 3001:3001 -v ${PWD}/webappbank/.env:/app/.env --name dlt-backend-app-bank dlt-backend-app-bank:0.1