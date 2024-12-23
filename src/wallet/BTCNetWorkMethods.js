import { BtcWallet } from "@okxweb3/coin-bitcoin";
import okxReq from "@/utils/okxReq";

const wallet = new BtcWallet();
//生成btc的地址
async function getNewAddress(netWork,privateKey,timestampString) {
	let addressType = '';
	if (netWork === 'Legacy') {
		addressType = 'Legacy'
	} else if (netWork === 'Taproot') {
		addressType = 'segwit_taproot'
	}
	let derivePrivateKey = privateKey;
	if(!derivePrivateKey){
		derivePrivateKey =await wallet.getRandomPrivateKey();
	}
	let address = await wallet.getNewAddress({ privateKey: derivePrivateKey, addressType: addressType });
	return {privateKey:derivePrivateKey,address:address}
}

async function testsignMessage(){

	let now = new Date();

	let timestamp = now.getTime();

	let timestampString = timestamp.toString();
	console.log('timestampString', timestampString)
	let wallet = new BtcWallet()

	const privateKey = await wallet.getRandomPrivateKey();

	//Legacy
	let account = await wallet.getNewAddress({privateKey: privateKey,addressType: "Legacy"})
	console.log('account', account)

	let signParams = {
		privateKey: privateKey,
		data: {
			type: 0,
			address: account.address,
			message: timestampString,
		}
	};

	console.log("signParams",signParams);

	// let signature = await wallet.signMessage(signParams)
	// console.info('signed result', signature)
	//
	// const addresses = [
	// 	{
	// 		"chainIndex": "0",
	// 		"address": account.address,
	// 		"publicKey": account.publicKey,
	// 		"signature": signature
	// 	}
	// ];
	//
	// const getCreateAccountBody = {
	// 	addresses: addresses,
	// 	signMessage: timestampString, // UNIX Timestamp in millisecond
	// };
	//
	// const getRequestPath = '/api/v5/wallet/account/create-account';
	//
	// const {code,data,msg} =  await okxReq.sendPostRequest(getRequestPath,getCreateAccountBody)
	// console.log('1234',code,data,msg);


}



export default {getNewAddress,testsignMessage}