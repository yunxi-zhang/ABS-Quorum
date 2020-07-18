#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Deploy Smart Contracts"
cd ./quorum
truffle migrate --reset --network bankBuyerSeller