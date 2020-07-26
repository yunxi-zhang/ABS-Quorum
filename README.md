## Repo Description
This repo is mainly used to run a Quorum DLT network on Azure Blockchain as a Service (ABS) specifically and web services for 3 orgnizations in a Linux or Mac machine so as to set up a local development environment for developers. It can work with my [ReactApp repo](https://github.com/yunxi-zhang/ReactApp) together to be used as a simple DLT demo.

## Prerequisites
To run this repo, a user has to install the below tools on a local machine.
1. **OS**: MacOS 10.14.6 (properly tested) or Unix/Linux(not properly tested yet).
2. **node version**: 10.17.0.
3. A user has an Azure account and already set up a Quorum network with at least with one ABS member.
4. A ".env" file is required to be created inside the "quorum" folder as well as the "webapp" folder respectively.
The contents of a .env file must have 3 key values pair as shown below:
```
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT}
PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD}
ADDRESS=${ABS_NODE_MEMBER_ACCOUNT}
```

## Repo Structure ##
This section clarifies what are the purposes of folders and files used in this repo.
<pre>
|__ <b>quorum</b>: This folder contains all the solidity smart contracts and the truffle deployment files.
    |__ <b>config</b>: This folder contains a config file that will read environment parameters from .env file.
    |__ <b>contractAddresses</b>: This folder contains txt files. Each will have a deployed smart contract address, which might be useful to a user when needed. The txt files are ignored by gitignore file, as the files are always generated on the fly, when the smart contracts are deployed to a Quorum network in the ABS.
    |__ <b>contracts</b>: This folder contains smart contract files.
    |__ <b>migrations</b>: This folder contains smart contract deploy files.
    |__ <b>test</b>: This folder will have files for unit tests.
    |__ <b>.env</b>: a .env file will be created by a user explicitly. This is stated as point 4 in the prerequsites, and the information will be sensitive, so it is ignored in the gitignore file.
|__ <b>webapp</b>: This folder contains all the files for each organisation to run as Web Services.
    |__ <b>.env</b>: a .env file will be created by a user explicitly. This is stated as point 4 in the prerequsites, and the information will be sensitive, so it is ignored in the gitignore file.
|__ <b>common.sh</b>: This shell script defines the styling of information printed out. It is used by other shell script files.
|__ <b>runAllStepsInOne.sh</b>: This is a shell file that will run all other shell files named in a way like "stageX_{step description}.sh".
|__ <b>stageX_{step description}.sh</b>: These files are mainly used to automate the setup of a Fabric network in a local machine to quickly set up a local development environment. Details are given in a seperate section later.
</pre>

## Shell files: StageX_{step description}
1. **stage1_deploySmartContracts.sh** is a shell file that will deploy the two Solidity smart contracts by using Truffle commands.
2. **stage2_runWebServer.sh** will run 3 web servers for 3 organisations respectively.

## Web Servers
A folder called webapp in this repo works as a template of a web server for each org.
Basically, each org will have its own web server that will receive HTTP requests from a frontend first, then the web server will access its own org's blockchain/DLT ledger(i.e. the Fabric peer node for each org) to either query or update data on the ledger and send HTTP responses to the frontend.

**Note**: Practically, running a web server is isloated from a blockchain environment, but make the right REST apis calls to the web server from a frontend does require that the blockchain environment is already setup successfully.