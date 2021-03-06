## Repo Description
This repo is mainly used to run a Quorum DLT network on Azure Blockchain as a Service (ABS) specifically and web services for 3 orgnizations in a Linux or Mac machine so as to set up a local development environment for developers. It can work with my [DLT-Demo-Frontend-App repo](https://github.com/yunxi-zhang/DLT-Demo-Frontend-App) together as a simple DLT demo.

## Prerequisites
To run this repo, a user has to install the below tools on a local machine.
1. **OS**: MacOS 10.14.6 (properly tested) or Unix/Linux(not properly tested yet).
2. **node version**: 10.17.0.
3. A user has an Azure account and already set up a Quorum network with at least with one ABS member.
4. A ".env" file is required to be created inside the "quorum" folder as well as inside each party's folder in the "webapp" folder respectively.
The contents of a .env file inside the "quorum" folder must have 3 key values pair as shown below:
```
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT}
PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD}
ADDRESS=${ABS_NODE_MEMBER_ACCOUNT}
```

The contents of a .env file inside each party folder must have 3 key values pair as shown below:
```
PORT={port number for a service}
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT}
PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD}
ADDRESS=${ABS_NODE_MEMBER_ACCOUNT}
APPINSIGHTS_INSTRUMENTATIONKEY={Azure app service instrumentation key} (only needed for a bank service)
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
    |__ <b>bank</b>: a folder that contains all files related to a bank service.
        |__ <b>.env</b>: a .env file will be created by a user explicitly. This is stated as point 4 in the prerequsites, and the information will be sensitive, so it is ignored in the gitignore file.
    |__ <b>buyer</b>: a folder that contains all files related to a buyer service.
        |__ <b>.env</b>: a .env file will be created by a user explicitly. This is stated as point 4 in the prerequsites, and the information will be sensitive, so it is ignored in the gitignore file.
    |__ <b>seller</b>: a folder that contains all files related to a seller service.
        |__ <b>.env</b>: a .env file will be created by a user explicitly. This is stated as point 4 in the prerequsites, and the information will be sensitive, so it is ignored in the gitignore file.
|__ <b>common.sh</b>: This shell script defines the styling of information printed out. It is used by other shell script files.
|__ <b>runAllStepsInOne.sh</b>: This is a shell file that will run all other shell files named in a way like "stageX_{step description}.sh".
|__ <b>stageX_{step description}.sh</b>: These files are mainly used to automate the setup of a Fabric network in a local machine to quickly set up a local development environment. Details are given in a seperate section later.
|__ <b>Dockerfile</b>: a file to create docker images for all 3 parties.
|__ <b>useLocalDockerImage.sh</b>: a shell script file that will build docker images for all 3 parties by using the Dockerfile and auto run the 3 parties' backend apps as docker containers.
</pre>

## Shell files: StageX_{step description}
1. **stage1_deploySmartContracts.sh** is a shell file that will deploy the two Solidity smart contracts by using Truffle commands.
2. **stage2_runWebServer.sh** will run 3 web servers for 3 organisations respectively.

## Run 3 Web Services as Docker Containers
<b>Prerequesite Step</b>: Run a script file called "runAllStepsInOne.sh", as it will create necessary folders to be used by docker containers.
```
./runAllStepsInOne.sh
```
1. <b>Optoin 1</b>: Run the following script to auto run this app by using a docker compose file. The docker compose file will pull pre-built docker images from the docker hub for all 3 parties. 
```
./useRemoteDockerImages.sh
```
2. <b>Option 2</b>: Run another script file called "useLocalDockerImage.sh", it will build docker images locally and run docker containers based on the docker images for all 3 parties.
```
./useLocalDockerImages.sh
```

## Web Servers
A folder called webapp in this repo works as a template of a web server for each org.
Basically, each org will have its own web server that will receive HTTP requests from a frontend first, then the web server will access its own org's blockchain/DLT ledger(i.e. the Fabric peer node for each org) to either query or update data on the ledger and send HTTP responses to the frontend.

**Note**: Practically, running a web server is isloated from a blockchain environment, but make the right REST apis calls to the web server from a frontend does require that the blockchain environment is already setup successfully.

## Web Server Port Numbers (Regardless of whether they run as purely NodeJS web servers or Docker Containers)
| Orgnaization     | Port |
| ----------- | ----------- |
| Bank | 3001 |
| Buyer | 3002 |
| Seller | 3003 |

## Testing ##
To test if a Fabric Blockchain network as well as Web Servers are up and running, one can type in the below API for Bank in a browser or a tool like Postman for testing.
```
http://localhost:3001/sellerBalance
http://localhost:3001/buyererBalance
http://localhost:3002/balance
http://localhost:3003/balance
```