## Repo Description
This repo is mainly used to run a Quorum DLT network on Azure Blockchain as a Service (ABS) specifically and web services for all the orgnizations in a Linux or Mac machine as to set up a local development environment for developers. It can work with my [ReactApp repo](https://github.com/yunxi-zhang/ReactApp) together to be used as a simple DLT demo.

## Prerequisites
To run this repo, a user has to install the below tools on a local machine.
1. **OS**: MacOS 10.14.6 (properly tested) or Unix/Linux(not properly tested yet).
2. **node version**: 10.17.0.
3. A user has an Azure account and already set up a Quorum network with at least with one ABS member. 

# ABS-Quorum Configuration
In order to quickly use this repo to deploy smart contracts to a ABS Quorum network, a .env file is required to be created inside the "quorum" folder as well as inside the "webapp" folder.
The contents of a .env file must have 3 key values pair as shown below:
```
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT}
PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD}
ADDRESS=${ABS_NODE_MEMBER_ACCOUNT}
```

## Shell files: StageX_{step description}
1. **stage1_deploySmartContracts.sh** is a shell file that will deploy the two Solidity smart contracts by using Truffle commands.
2. **stage2_runWebServer.sh** will run 3 web servers for 3 organisations respectively.

## Web Servers
A folder called webapp in this repo works as a template of a web server for each org.
Basically, each org will have its own web server that will receive HTTP requests from a frontend first, then the web server will access its own org's blockchain/DLT ledger(i.e. the Fabric peer node for each org) to either query or update data on the ledger and send HTTP responses to the frontend.

**Note**: Practically, running a web server is isloated from a blockchain environment, but make the right REST apis calls to the web server from a frontend does require that the blockchain environment is already setup successfully.