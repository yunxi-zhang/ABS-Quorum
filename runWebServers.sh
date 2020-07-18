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
cd ./webapps/bank
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappbank"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd

stepInfo "Creating A Web Server for Buyer"
cd ./webapps/buyer
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappbuyer"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd

stepInfo "Creating A Web Server for Seller"
cd ./webapps/seller
pwd
ls -al 
stepInfo "Show the new server.js and package.json in webappseller"
ls -al server.js package.json
stepInfo "Run npm start in the background"
nohup npm start &
stepInfo "go back to the root path"
cd ../..
pwd
figlet Complete Setting Up Web Servers