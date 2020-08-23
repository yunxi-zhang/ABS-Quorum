#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Prepare Web Servers for 3 Orgs"

stepInfo "Kill existing node process if they exist"

#killall command doesn't work on redhat
killall node
#below commands work on redhat
kill `lsof -t -i:3001`
kill `lsof -t -i:3002`
kill `lsof -t -i:3003`

stepInfo "Delete webappbank if it exists"
if [ -d webappbank ]; then
    rm -rf webappbank
fi
ls -al webappbank

stepInfo "Delete webappseller if it exists"
if [ -d webappseller ]; then
    rm -rf webappseller
fi
ls -al webappseller

stepInfo "Delete webappbuyer if it exists"
if [ -d webappbuyer ]; then
    rm -rf webappbuyer
fi
ls -al webappbuyer

stepInfo "Creating A Web Server for Bank"
cp -r ./webapp/bank ./webappbank
cp -r ./webapp/lib/config ./webappbank
cp -r ./webapp/lib/web3 ./webappbank
cp ./webapp/package.json ./webappbank
stepInfo "Show files in webappbank"
cd ./webappbank
rm -rf ./lib
pwd
ls -al 
stepInfo "Go to bank folder and install npm dependencies"
npm install
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ..
pwd

stepInfo "Creating A Web Server for Buyer"
cp -r ./webapp/buyer ./webappbuyer
cp -r ./webapp/lib/config ./webappbuyer
cp -r ./webapp/lib/web3 ./webappbuyer
stepInfo "Show files in webappbank"
cd ./webappbuyer
rm -rf ./lib
pwd
ls -al 
stepInfo "Go to buyer folder and install npm dependencies"
npm install
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ..
pwd

stepInfo "Creating A Web Server for Seller"
cp -r ./webapp/seller ./webappseller
cp -r ./webapp/lib/config ./webappseller
cp -r ./webapp/lib/web3 ./webappseller
stepInfo "Show files in webappseller"
cd ./webappseller
rm -rf ./lib
pwd
ls -al 
stepInfo "Go to seller folder and install npm dependencies"
npm install
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ..
pwd

figlet Complete Setting Up Web Servers