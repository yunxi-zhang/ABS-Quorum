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

stepInfo "Run npm install in the webapp as a template web server"
cd ./webapp
npm install
cd ..

stepInfo "Show current path before creating new web server"
pwd

stepInfo "Creating A Web Server for Bank"
cp -r ./webapp ./webappbank
stepInfo "Show files in webappbank"
cd ./webappbank
cp -r ./lib/config ./bank
cp -r ./lib/web3 ./bank
rm -rf ./lib
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappbank"
ls -al server.js package.json
stepInfo "Delete seller and buyer folders"
rm -rf seller buyer
stepInfo "Show seller and buyer folders are gone"
ls -al seller buyer
stepInfo "Go to bank folder"
cd ./bank
stepInfo "Show the new server.js and package.json in webappbank"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd

stepInfo "Creating A Web Server for Buyer"
cp -r ./webapp ./webappbuyer
stepInfo "Show files in webappbank"
cd ./webappbuyer
cp -r ./lib/config ./buyer
cp -r ./lib/web3 ./buyer
rm -rf ./lib
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappbuyer"
ls -al server.js package.json
stepInfo "Delete seller and bank folders"
rm -rf seller bank
stepInfo "Show seller and bank folders are gone"
ls -al seller bank
stepInfo "Go to buyer folder"
cd ./buyer
stepInfo "Show the new server.js and package.json in webappbank"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd

stepInfo "Creating A Web Server for Seller"
cp -r ./webapp ./webappseller
stepInfo "Show files in webappseller"
cd ./webappseller
cp -r ./lib/config ./seller
cp -r ./lib/web3 ./seller
rm -rf ./lib
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappbank"
ls -al server.js package.json
stepInfo "Delete bank and buyer folders"
rm -rf bank buyer
stepInfo "Show bank and buyer folders are gone"
ls -al bank buyer
stepInfo "Go to seller folder"
cd ./seller
stepInfo "Show the new server.js and package.json in webappseller"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd

figlet Complete Setting Up Web Servers