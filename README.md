## Repo Description
This repo is mainly used to run a Quorum DLT network on Azure Blockchain as a Service (ABS) specifically and web services for all the orgnizations in a Linux or Mac machine as to set up a local development environment for developers. It can work with my [ReactApp repo](https://github.com/yunxi-zhang/ReactApp) together to be used as a simple DLT demo.

## Prerequisites
To run this repo, a user has to install the below tools on a local machine.
1. **OS**: MacOS 10.14.6 (properly tested) or Unix/Linux(not properly tested yet).
2. **node version**: 10.17.0.

# ABS-Quorum 
Run following command to redeploy all smart contracts to an ABS-Quorum network 
```
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT} PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD} ADDRESS=${ABS_NODE_MEMBER_ACCOUNT} truffle migrate --reset --network bankBuyerSeller
```

## Shell files: StageX_{step description} - from stage1 to stage7
1. **stage1_deploySmartContracts.sh** is a shell file that will deploy the two Solidity smart contracts by using Truffle commands.
2. **stage2_runWebServer.sh** will run 3 web servers for 3 organisations respectively.

## Web Servers
A folder called webapp in this repo works as a template of a web server for each org.
Basically, each org will have its own web server that will receive HTTP requests from a frontend first, then the web server will access its own org's blockchain/DLT ledger(i.e. the Fabric peer node for each org) to either query or update data on the ledger and send HTTP responses to the frontend.

**Note**: Practically, running a web server is isloated from a blockchain environment, but make the right REST apis calls to the web server from a frontend does require that the blockchain environment is already setup successfully.