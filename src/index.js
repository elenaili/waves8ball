import Signer from "@waves/signer";
import Provider from "@waves.exchange/provider-web";
import { nodeInteraction } from "@waves/waves-transactions";


const nodeUrl = 'https://nodes-testnet.wavesnodes.com';
const faucetAddress = '3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn';
const ballAddress = '3MqDhjXwvCbFCpkA3o6BQkTWtD59267HhXA';

const signer = new Signer({NODE_URL: nodeUrl});
const provider = new Provider();

signer.setProvider(provider);

document.querySelector(".js-invoke").addEventListener("click", async function () {
    try {
        let question = document.getElementById('questionInput').value + Date.now();
        console.log('The question is '+ question);

        const user = await signer.login();
        document.querySelector(".address").innerHTML = `Your address is: ${user.address}`;

        // Call faucet function of wavesexplorer.com/tesnet/address/3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn/script dApp
        // Top up the user's balance, but only once

        try {
            signer.invoke({
                dApp: faucetAddress,
                call: {
                    function: "faucet"
                }
            }).broadcast().then(resp => console.log(resp));
        } catch (e) {
            console.error('Top-up error')
        }; 

        // Call tellme function of wavesexplorer.com/tesnet/address/3MqDhjXwvCbFCpkA3o6BQkTWtD59267HhXA/script dApp
        // Generate an answer and write it to the dApp data storage

        try {
            signer.invoke({
                dApp: ballAddress,
                call: {
                    function: "tellme",
                    args:[{"type": "string", "value": question}]
                }
            }).broadcast().then(resp => console.log(resp));

        // Read an answer from dApp data storage

            let answer = await nodeInteraction.accountDataByKey('3MsFfbs2dCeJaeUWeoBNdPRb6y3fBvAJNNw_a',ballAddress,nodeUrl);
            document.querySelector(".answer").innerHTML = `Your answer is: ${answer.value}`;
        } catch (e) {
            console.error('Question denied')
        }; 

    } catch (e) {
        console.error('Login rejected')
    };

});