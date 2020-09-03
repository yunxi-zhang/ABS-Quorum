#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Deploy Smart Contracts"
cd ./quorum
npm install
truffle migrate --reset --network bankBuyerSeller