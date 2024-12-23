import { bip39 } from "@okxweb3/crypto-lib";
import { EthWallet, MessageTypes } from "@okxweb3/coin-ethereum";

let wallet = new EthWallet();

//生成ETH支持的地址
async function getNewAddress() {

		// get mnemonic
		let mnemonic = bip39.generateMnemonic();
		// get derived key
		const hdPath = await wallet.getDerivedPath({ index: 0 });
		let	derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });
		// get new address
		let newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });
		return {privateKey:derivePrivateKey,address:newAddress}
}

async function signMessage(derivePrivateKey,timestampString){
	let data = {
		type: MessageTypes.PERSONAL_SIGN,
		message: timestampString
	};
	let signParams = {
		privateKey: derivePrivateKey,
		data: data
	}
	return await wallet.signMessage(signParams);
}

export default {getNewAddress,signMessage}