#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Kill any backend app proceses if they are running by using the runAllStepsInOne.sh script"
#killall command doesn't work on redhat
killall node
#below commands work on redhat
kill `lsof -t -i:3001`
kill `lsof -t -i:3002`
kill `lsof -t -i:3003`

stepInfo "-------------- Start Party Bank --------------"
stepInfo "Copy smart contracts to webappbank"
mkdir -p ./webappbank/quorum/build
mkdir -p ./webappbank/quorum/contractAddresses
cp -r ./quorum/build/* ./webappbank/quorum/build
cp -r ./quorum/contractAddresses/* ./webappbank/quorum/contractAddresses

stepInfo "Remove old bank backend app docker image if it exists"
docker rmi dlt-demo-backend-app-bank:0.1
stepInfo "Build a new bank backend app docker image"
docker build -f ./Dockerfile -t dlt-demo-backend-app-bank:0.1 ./webappbank
stepInfo "Run the bank backend app as a docker container"
docker run -dt -p 3001:3001 -v ${PWD}/webappbank/.env:/app/.env --name dlt-demo-backend-app-bank dlt-demo-backend-app-bank:0.1
stepInfo "-------------- Complete Party Bank --------------"

stepInfo "-------------- Start Party Buyer --------------"
stepInfo "Copy smart contracts to webappbuyer"
mkdir -p ./webappbuyer/quorum/build
mkdir -p ./webappbuyer/quorum/contractAddresses
cp -r ./quorum/build/* ./webappbuyer/quorum/build
cp -r ./quorum/contractAddresses/* ./webappbuyer/quorum/contractAddresses

stepInfo "Remove old buyer backend app docker image if it exists"
docker rmi dlt-demo-backend-app-buyer:0.1
stepInfo "Build a new buyer backend app docker image"
docker build -f ./Dockerfile -t dlt-demo-backend-app-buyer:0.1 ./webappbuyer
stepInfo "Run the buyer backend app as a docker container"
docker run -dt -p 3002:3002 -v ${PWD}/webappbuyer/.env:/app/.env --name dlt-demo-backend-app-buyer dlt-demo-backend-app-buyer:0.1
stepInfo "-------------- Complete Party Buyer --------------"

stepInfo "-------------- Start Party Seller --------------"
stepInfo "Copy smart contracts to webappseller"
mkdir -p ./webappseller/quorum/build
mkdir -p ./webappseller/quorum/contractAddresses
cp -r ./quorum/build/* ./webappseller/quorum/build
cp -r ./quorum/contractAddresses/* ./webappseller/quorum/contractAddresses

stepInfo "Remove old seller backend app docker image if it exists"
docker rmi dlt-demo-backend-app-seller:0.1
stepInfo "Build a new seller backend app docker image"
docker build -f ./Dockerfile -t dlt-demo-backend-app-seller:0.1 ./webappseller
stepInfo "Run the seller backend app as a docker container"
docker run -dt -p 3003:3003 -v ${PWD}/webappseller/.env:/app/.env --name dlt-demo-backend-app-seller dlt-demo-backend-app-seller:0.1
stepInfo "-------------- Complete Party Seller --------------"