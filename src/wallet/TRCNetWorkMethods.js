import { TrxWallet } from "@okxweb3/coin-tron";
import { SignTxParams } from "@okxweb3/coin-base";
import okxReq from "@/utils/okxReq";

let wallet = new TrxWallet();

//生成TRC支持的地址
async function getNewAddress(netWork) {

		let derivePrivateKey = await wallet.getRandomPrivateKey();

		// get new address
		let newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });
		return {privateKey:derivePrivateKey,address:newAddress}
}


//生成ETH支持的地址
async function signMessage(privateKey,address,timestampString) {
	let message = timestampString;
	message = "0x" + Buffer.from(message, "utf8").toString("hex");

	const params = {
		privateKey: privateKey,
		data: {
			type: "hex",
			message: message
		}
	};
	return await wallet.signMessage(params);
}

//生成ETH支持的地址
async function testsignMessage() {


	let wallet = new TrxWallet();

	let now = new Date();

	let timestamp = now.getTime();

	let timestampString = timestamp.toString();

	let derivePrivateKey = await wallet.getRandomPrivateKey();

	// get new address
	let newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });
	console.log(newAddress);

	let message = timestampString;
	message = "0x" + Buffer.from(message, "utf8").toString("hex");

	const params = {
		privateKey: derivePrivateKey,
		data: {
			type: "hex",
			message: message
		}
	};

	console.log(params);
	var signature =await wallet.signMessage(params);

	console.log(signature);

	const addresses = [
		{
			"chainIndex": "195",
			"address": newAddress.address,
			"publicKey": newAddress.publicKey,
			"signature": signature
		}
	];

	const getCreateAccountBody = {
		addresses: addresses,
		signMessage: timestampString, // UNIX Timestamp in millisecond
	};

	const getRequestPath = '/api/v5/wallet/account/create-account';

	const {code,data,msg} =  await okxReq.sendPostRequest(getRequestPath,getCreateAccountBody)
	console.log('1234',code,data,msg);
}


export default {getNewAddress,signMessage,testsignMessage}