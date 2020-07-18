# ABS-Quorum
Run following command to redeploy all smart contracts to an ABS-Quorum network 
```
PROVIDER=${ABS_TRANSACTION_NODE_ACCESS_KEYS_HTTPS_ENDPOINT} PASSWORD=${ABS_TRANSACTION_NODE_SETUP_PASSWORD} ADDRESS=${ABS_NODE_MEMBER_ACCOUNT} truffle migrate --reset --network bankBuyerSeller
```