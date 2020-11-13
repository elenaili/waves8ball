# Waves Magic 8 Ball dApp Example

This is a simple app that generates a pseudorandom answer to your question and writes the answer to the dApp data storage on Waves Testnet.

The example illustrates the [dApp development tutorial](https://docs.waves.tech/en/building-apps/smart-contracts/writing-dapps). It uses the following functions:

* `invoke` from [Signer](https://docs.waves.tech/en/building-apps/waves-api-and-sdk/client-libraries/signer) library to create an invoke script transaction and thereby call the dApp function;
* `accountDataByKey` from [waves-transactions](https://wavesplatform.github.io/waves-transactions/index.html) library to retrieve the data entry from dApp data storage.

## How to Launch

```shell
npm i 
npm run build
npm run start
```
