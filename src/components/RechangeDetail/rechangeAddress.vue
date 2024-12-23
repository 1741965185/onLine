<template>
	<div class="recharge-page">
		<img class="element" src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />
		<div class="recharge-card">
			<h2 class="card-title">{{$t('rechangeDetail.rechangeCrypto')}}</h2>
			<div class="currency-info">
				<div class="currency-icon">
					<img :src="currencyIcon" :alt="currencyName">
				</div>
				<div class="currency-details">
					<div class="currency-name">{{ currencyName }}</div>
					<div class="network-div">
						<div class="currency-network">{{ network }}</div>
					</div>
				</div>
			</div>
			<div class="address-container">
				<div class="address">{{ address }}</div>
				<div class="copy-icon" @click="copyAddress" title="复制地址">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
					</svg>
				</div>
			</div>
			<div class="xian"></div>
			<div class="network-info">仅支持接受 {{ network }} 网络资产</div>
<!--			<div class="qr-container">-->
<!--				<div class="qr-wrapper">-->
<!--					<div class="qr-corner-dot top-left"></div>-->
<!--					<div class="qr-corner-dot top-right"></div>-->
<!--					<div class="qr-corner-dot bottom-left"></div>-->
<!--					<div class="qr-corner-dot bottom-right"></div>-->
<!--					<QrcodeVue :size="240" :value="address"  level="L" />-->
<!--				</div>-->
<!--			</div>-->
			<div class="border-qr">
				<div class="qr-corner-dot top-left"></div>
				<div class="qr-corner-dot top-right"></div>
				<div class="qr-corner-dot bottom-left"></div>
				<div class="qr-corner-dot bottom-right"></div>
				<div class="qr-container">
					<QrcodeVue :size="240" :value="address"  level="L" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import ETHNetWorkMethods from '@/wallet/ETHNetWorkMethods'
import BTCNetWorkMethods from '@/wallet/BTCNetWorkMethods'
import TRCNetWorkMethods from '@/wallet/TRCNetWorkMethods'
import { getAccount, getAddress, insertAddress } from "@/api/home";
import okxReq from "@/utils/okxReq";

export default {
	name: 'DigitalCurrencyRechargePage',
	components:{QrcodeVue},
	data() {
		return {
			currencyIcon: require('/src/assets/images/USDC.png'), // 替换为实际的图标路径
			currencyName: 'USDC',
			network: 'Ethereum',
			address: '',
			qrCodeUrl: ''
		}
	},
	mounted() {
		this.currencyName = this.$route.query.currency;
		this.currencyIcon  = require('/src/assets/images/'+this.currencyName+'.png')
		this.network = this.$route.query.network;
		console.log(this.currencyName, this.network);
		this.getAddress()
	},
	methods: {
		async getAddress() {
				let {status,msg,data}  = await getAddress({netWork:this.network});
				if(status === 200 && data){
					this.address = data
				}else {
						let privateKey ,address;
						if (this.network === 'ERC20' ||  this.network  === 'Polygon') {
							({privateKey,address} = await ETHNetWorkMethods.getNewAddress(this.network));
						} else if (this.network === 'Legacy' || this.network === 'Taproot' ) {
							({privateKey,address} =await BTCNetWorkMethods.getNewAddress(this.network));
						}else if(this.network === 'TRC20') {
							({privateKey,address} = await TRCNetWorkMethods.getNewAddress(this.network))
						}
						this.address = address.address;
						await insertAddress({address:this.address,network:this.network,privatekey:privateKey,publickey:address.publicKey})

					// let addresses = [];
					// var netWorkAddress = [];
					// var privateKey, address , signature;
					// let now = new Date();
					//
					// let timestamp = now.getTime();
					//
					// let timestampString = timestamp.toString();
					//
					//
					// // await BTCNetWorkMethods.testsignMessage();
					//
					// // 生成ERC20
					// ({privateKey, address} = await ETHNetWorkMethods.getNewAddress());
					// // signature =  await ETHNetWorkMethods.signMessage(privateKey,timestampString);
					//
					// // addresses.push({
					// // 	"chainIndex": "1",
					// // 	"address": address.address,
					// // 	"publicKey": address.publicKey,
					// // 	"signature": signature
					// // });
					//
					// netWorkAddress.push({
					// 			'address': address.address,
					// 			'network': "ERC20",
					// 			'privatekey': privateKey,
					// 			'publickey': address.publicKey,
					// })
					//
					// //Polygon 地址
					// ({privateKey, address} = await ETHNetWorkMethods.getNewAddress(privateKey));
					//
					// // signature =await ETHNetWorkMethods.signMessage(privateKey);
					//
					// // addresses.push({
					// // 	"chainIndex":"137",
					// // 	"address":address.address,
					// // 	"publicKey":address.publicKey,
					// // 	"signature":signature
					// // });
					//
					// netWorkAddress.push({
					// 	'address': address.address,
					// 	'network': "Polygon",
					// 	'privatekey': privateKey,
					// 	'publickey': address.publicKey,
					// })
					//
					//
					//
					// //Legacy 地址生成
					// ({privateKey, address} = await BTCNetWorkMethods.getNewAddress("Legacy","",timestampString));
					//
					// // addresses.push({
					// // 	"chainIndex":"0",
					// // 	"address":address.address,
					// // 	"publicKey":address.publicKey,
					// // 	"signature":signature
					// // });
					//
					// netWorkAddress.push({
					// 	address: address.address,
					// 	network: "Legacy",
					// 	privatekey: privateKey,
					// 	publickey: address.publicKey,
					// })
					//
					//
					//
					// // Taproot 地址生成
					// ({ privateKey, address} = await BTCNetWorkMethods.getNewAddress("Taproot",privateKey,timestampString));
					//
					//
					// // addresses.push({
					// // 	"chainIndex":"0",
					// // 	"address":address.address,
					// // 	"publicKey":address.publicKey,
					// // 	"signature":signature
					// // });
					//
					// netWorkAddress.push({
					// 	address: address.address,
					// 	network: "Taproot",
					// 	privatekey: privateKey,
					// 	publickey: address.publicKey,
					// })
					//
					//
					// // TRC20 地址生成
					// ({ privateKey, address } = await TRCNetWorkMethods.getNewAddress("TRC20"))
					// // signature = await TRCNetWorkMethods.signMessage(privateKey,address.address,timestampString);
					// // addresses.push({
					// // 	"chainIndex":"195",
					// // 	"address":address.address,
					// // 	"publicKey":address.publicKey,
					// // 	"signature":signature
					// // });
					//
					// netWorkAddress.push({
					// 	address: address.address,
					// 	network: "TRC20",
					// 	privatekey: privateKey,
					// 	publickey: address.publicKey,
					// })
					//
					//
					// //
					// //
					// // const getCreateAccountBody = {
					// // 	addresses: addresses,
					// // 	signMessage: timestampString, // UNIX Timestamp in millisecond
					// // };
					// //
					// // const getRequestPath = '/api/v5/wallet/account/create-account';
					// //
					// // const {code,data,msg} =  await okxReq.sendPostRequest(getRequestPath,getCreateAccountBody)
					// // console.log('1234',code,data,msg);
					// //
					// // console.log("[]=",addresses,netWorkAddress);
					// //
					// // //循环把accountId 补充上
					// // netWorkAddress.forEach(e=>{
					// // 	e.accountId = data[0].accountId;
					// // })
					// //
					// await insertAddress(netWorkAddress)
					// //
					// console.log(netWorkAddress);
					// this.address = netWorkAddress.filter(item=>item.netWork === this.network).map(item=>item.address);




					// let privateKey, address;
					// if (this.network === 'ERC20' || this.network === 'Polygon') {
					// 	({ privateKey, address } = await ETHNetWorkMethods.getNewAddress(this.network));
					// } else if (this.network === 'Legacy' || this.network === 'Taproot') {
					// 	({ privateKey, address } = await BTCNetWorkMethods.getNewAddress(this.network));
					// } else if (this.network === 'TRC20') {
					// 	({ privateKey, address } = await TRCNetWorkMethods.getNewAddress(this.network))
					// }
					// this.address = address.address;
					// await insertAddress({
					// 	address: this.address,
					// 	network: this.network,
					// 	privatekey: privateKey,
					// 	publickey: address.publicKey,
					// 	accountId: accountId
					// })
				}
			// }else{
			// 	let privateKey ,address;
			// 	if (this.network === 'ERC20' ||  this.network  === 'Polygon') {
			// 		({privateKey,address} = await ETHNetWorkMethods.getNewAddress(this.network));
			// 	} else if (this.network === 'Legacy' || this.network === 'Taproot' ) {
			// 		({privateKey,address} =await BTCNetWorkMethods.getNewAddress(this.network));
			// 	}else if(this.network === 'TRC20') {
			// 		({privateKey,address} = await TRCNetWorkMethods.getNewAddress(this.network))
			// 	}
			// 	this.address = address.address;
			// 	await insertAddress({
			// 		address:this.address,
			// 		network:this.network,
			// 		privatekey:privateKey,
			// 		publickey:address.publicKey,
			// 		accountId:accountId
			// 	})


				// let {status,msg,data}  = await getAddress({netWork:this.network});
				// if(status === 200 && data){
				// 	this.address = data
				// }else {

					// await insertAddress({address:this.address,network:this.network,privatekey:privateKey,publickey:address.publicKey,accountId:accountId})
			// 	}
			// }
			// await getAddress({netWork:this.network});
			// if(data){
			// 	this.address = data
			// }else{
			// 	let privateKey ,address;
			// 	if (this.network === 'ERC20' ||  this.network  === 'Polygon') {
			// 		({privateKey,address} = await ETHNetWorkMethods.getNewAddress(this.network));
			// 	} else if (this.network === 'Legacy' || this.network === 'Taproot' ) {
			// 		({privateKey,address} =await BTCNetWorkMethods.getNewAddress(this.network));
			// 	}else if(this.network === 'TRC20') {
			// 		({privateKey,address} = await TRCNetWorkMethods.getNewAddress(this.network))
			// 	}
			// 	this.address = address.address;
			// 	await insertAddress({address:this.address,network:this.network,privatekey:privateKey,publickey:address.publicKey,accountId:accountId})
			// }
		},
		goToBack() {
			history.go(-1);
		},
		copyAddress() {
			navigator.clipboard.writeText(this.address).then(() => {
				this.$message.success('地址已复制到剪贴板');
			}).catch(err => {
				console.error('复制失败:', err);
				this.$message.error('复制失败，请手动复制');
			});
		},
	}
}
</script>

<style scoped>
.qr-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.qr-wrapper {
	position: relative;
	padding: 15px;
	border-radius: 18px;
	background: #fff;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.qr-code {
	width: 200px;
	height: 200px;
	display: block;
}

.qr-corner-dot {
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #e0e0ff;
}

.qr-corner-dot.top-left {
	top: -5px;
	left: -5px;
}

.qr-corner-dot.top-right {
	top: -5px;
	right: -5px;
}

.qr-corner-dot.bottom-left {
	bottom: -5px;
	left: -5px;
}

.qr-corner-dot.bottom-right {
	bottom: -5px;
	right: -5px;
}

/* 添加一个微妙的内阴影效果 */
.qr-wrapper::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 18px;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
	pointer-events: none;
}
.xian{
	border: 1px dashed #DBDFEA;
	margin-bottom:19px;
}
.recharge-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.element {
	position: absolute;
	cursor: pointer;
	left: 121px;
	top: 17px;
}
.recharge-card {
	margin-top: 99px;
	width: 480px;
	background: #FFFFFF;
	border-radius: 16px;
	border: 1px solid #DBDFEA;
	padding: 19px 30px 58px 30px;
}

.card-title {
	font-size: 18px;
	color: #333;
	margin-bottom: 10px;
	text-align: center;
}

.currency-info {
	display:flex;
	margin-bottom: 15px;
	margin-top: 50px;
}

.currency-icon img {
	width: 44px;
	height: 44px;
	margin-right: 15px;
}

.currency-details {
	display: flex;
	align-items:flex-start;
}

.currency-name {
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 26px;
	text-align: left;
	font-style: normal;
	margin-right: 14px;
}

.currency-network {
	font-weight: 400;
	font-size: 13px;
	color: #526484;
	line-height: 16px;
	text-align: left;
	font-style: normal;
	padding:3px 8px
}

.network-div{
	background: #F6F8FE;
	border-radius: 4px;
	align-content: center;
}

.address-container {
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 8px;
	padding: 10px;
	margin-bottom: 10px;
	margin-left: 50px;
	margin-top:-35px
}

.address {
	flex-grow: 1;
	word-break: break-all;
	font-weight: 400;
	font-size: 16px;
	color: #8094AE;
	line-height: 22px;
	text-align: left;
	font-style: normal;
}

.copy-icon {
	cursor: pointer;
	margin-left: 10px;
}

.copy-icon:hover {
	opacity: 0.7;
}

.network-info {
	margin-bottom: 20px;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 20px;
	text-align: center;
	font-style: normal;
}
.qr-container{
	display: flex;
	justify-content:center;
}
.border-qr{
	border: 3px solid rgba(127, 141, 255, 0.3);
	width:280px;
	height: 280px;
	margin:0 auto;
	padding-top: 20px;
}
</style>