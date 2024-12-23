<template>
	<div  class="recharge-page">
		<img class="element" src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />
		<div v-show="!step3" class="crypto-exchange">
			<div class="tab-container">
				<button
					@click="tableClick('buy')"
					:class="['tab-button', { active: mode === 'buy' }]"
				>
					{{$t("buyAndSell.buy")}}
				</button>
				<button
					@click="tableClick('sell')"
					:class="['tab-button', { active: mode === 'sell' }]"
				>
					{{$t("buyAndSell.sell")}}
				</button>
			</div>

			<div class="exchange-form">
				<div class="input-group">
					<label style="padding-left: 12px;">{{mode === 'buy'?'支付':'收款'}}</label>
					<div class="input-with-select">
						<el-input
							v-model="amount"
							type="text"
							placeholder="0.0"
							@input="updatePayAmount"
						/>
						<CustomSelect  :currencies="currencyImagesOne"
													 :initialCurrency="oneCurrency"
													 @currency-changed="handleCurrencyChange"
						/>
					</div>
				</div>

				<div class="input-group1">
					<label style="padding-left: 12px;">{{mode === 'buy'?'收款':'支付'}}</label>
					<div class="input-with-select">
						<el-input
							v-model="receivedAmount"
							type="text"
							disabled
							placeholder="0.0"
						/>
						<CustomSelect  :currencies="currencyImagesTwo"
													 :initialCurrency="twoCurrency"
													 @currency-changed="handleCurrencyChange1"
						/>
					</div>
				</div>

				<div class="exchange-rate">
					{{$t("buyAndSell.rate")}}：1 {{oneCurrency}}={{ exchangeRate }} {{twoCurrency}}
				</div>

				<div class="fee">
					{{$t("buyAndSell.fees")}}：{{fee}}
				</div>

				<div class="payment-container">
					<label class="payment-container-lable">{{mode === 'buy'?$t("buyAndSell.payType"):$t("buyAndSell.receivePerson")}}</label>
					<!-- 支付方式按钮 -->
					<div v-if="!selectedPaymentMethod" class="payment-header" @click="toggleDropdown">
						<div class="payment-title">
							<img src="/icon/add.png" alt="add" class="icon" /> <!-- 替换为实际路径 -->
							<span>{{$t("buyAndSell.receivePerson")}}</span>
						</div>
						<button class="add-button">{{$t("buyAndSell.select")}}</button>
					</div>
					<!-- 支付方式按钮 -->
					<div v-if="selectedPaymentMethod" class="payment-header" @click="toggleDropdown">
						<div class="payment-title">
							<img :src="selectedPaymentMethod.icon" alt="add" class="icon" /> <!-- 替换为实际路径 -->
							<div>
								<div class="dropdown-one-lable">{{ selectedPaymentMethod.label }}</div>
<!--								<div class="dropdown-two-lable">{{selectedPaymentMethod.name === null ? '' : selectedPaymentMethod.name}}</div>-->
							</div>
						</div>
					</div>

					<!-- 支付方式选择列表||收款人选择列表 -->
					<div v-if="showDropdown" class="payment-dropdown" >
						<div v-for="method in paymentMethods" :key="method.value" class="payment-method" 	@click="selectPaymentMethod(method)">
							<img :src="method.icon" :alt="method.name" class="method-icon" />
							<div>
								<div class="dropdown-one-lable">{{ method.label }}</div>
<!--								<div class="dropdown-two-lable">{{method.name === null ? '' : method.name}}</div>-->
							</div>
						</div>
					</div>


					<!-- 支付方式选择列表||收款人选择列表 -->
					<div v-if="showDropdown && paymentMethods.length === 0" class="payment-dropdown1" >
						<div class="no-data" @click="gotoPayee()">+ {{$t("remittance.addRemittance")}}</div>
					</div>

				</div>

				<el-button :loading="this.loading" @click="submitClick()" class="confirm-button">{{$t("remittance.submit")}}</el-button>
			</div>
		</div>
		<div v-show="step3" >
			<div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<div style="height: 216px"></div>

				<img src="../../assets/images/chulizhong-wi.png" alt="Checkmark" class="icon-image-wi">
				<div style="height: 18px"></div>

				<div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 24px;
color: #364A63;
line-height: 26px;
text-align: center;
font-style: normal;">{{$t("remittance.chulizhong")}}</div>
				<div style="height: 8px"></div>
				<div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 14px;
color: #8094AE;
line-height: 20px;
text-align: center;
font-style: normal;">{{$t("remittance.tishi1")}}</div>
				<div style="height: 25px"></div>

				<div class="text-wrapper_2 flex-col" @click="goToBack()">
					<div style="height: 10px"></div>
					<span class="text_4" >{{$t("translations.return")}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>


import CustomSelect from "@/components/CustomSelect/CustomSelect.vue";
import { checkStandPay, getCurrRate, getPayCurrency, getPayeeList, getPayMethodList } from "@/api/home";
import { addwithdraw, getRateAndBankInfo } from "@/api/Settlement";
import md5 from "md5";

export default {
	components:{CustomSelect},
	data() {
		return {
			loading : false,
			oneCurrency:'USD',
			twoCurrency:'USDC',
			mode: 'buy',
			amount: '',
			receivedAmount: '',
			paymentMethod: '信用卡',
			currencyImagesOne: [
				{ code: 'USD', flag: '/currency/USD.png' },
			],
			currencyImagesTwo: [
				{ code: 'BTC', flag: '/currency/BTC.png' },
				{ code: 'ETH', flag: '/currency/ETH.png' },
				{ code: 'USDT', flag:'/currency/USDT.png'  },
				{ code: 'USDC', flag: '/currency/USDC.png' },
			],
			showDropdown: false,
			paymentMethods: [
				// { label: 'Credit Card', value: '0', isDisplayed: true, icon: '/payWays/creditCard.png' },
				// { label: 'Credit Card', value: '1', isDisplayed: true, icon: '/payWays/onlineCreditCard.png' },
				// { label: 'Alipay', value: '2', isDisplayed: true, icon: '/payWays/Alipay.png' },
				// { label: 'UnionPay', value: '3', isDisplayed: true, icon: '/payWays/UnionPay.png' },
				// { label: 'Wechat', value: '4', isDisplayed: true, icon: '/payWays/wechat.png' },
				// { label: 'USDT', value: '5', isDisplayed: true, icon: '/payWays/usdt.png' },
				// { label: 'Bank Transfer', value: '6', isDisplayed: true, icon: '/payWays/bankTransfer.png' },
				// { label: 'PIX', value: '7', isDisplayed: true, icon: '/payWays/PIX.png' },
				// { label: 'GCash', value: '8', isDisplayed: true, icon: '/payWays/gCash.png' },
				// { label: 'SEPA', value: '9', isDisplayed: true, icon: '/payWays/sepa.png' }
			],
			selectedPaymentMethod:null,
			exchangeRate:'',
			fee:'',
			ipAddress: '192.168.120.120',
			step3:false,

		};
	},
	created(){
		this.getIPAddress();
		this.initMethods();
	},
	methods: {
		getIPAddress() {
			fetch("https://api.ipify.org?format=json")
				.then((response) => response.json())
				.then((data) => {
					this.ipAddress = data.ip;
				})
				.catch((error) => {
					console.error("获取 IP 地址失败:", error);
				});
		},
		gotoPayee(){
			this.$router.push({path: "/collection"});
		},
		async initMethods(){
			await this.getNeedPayCurrency();
			await this.getNeedPayMethodList()
			await this.getToCurrRate();
		},
		async getNeedPayMethodList(){
			const merNo = sessionStorage.getItem('merNo');
			// businessType 1充值
		 await getPayMethodList({
				merNo:merNo,
				businessType:'1'
			}).then(response => {
				if (response.status === 200) {
					const obj = {}
					Object.keys(response.data).forEach(key => {
						if (response.data[key] === 0 || response.data[key] === 1) {
							obj[key] = response.data[key];
						}
					});
					// 信用卡0 1支付宝2  union3 wechat4 usdt5 bankTransfer6 pix7 8gacsh
					this.paymentMethods = [
						// 原有的数组保持不变
						{ label: 'Credit Card', value: '0', isDisplayed: true, icon: '/payWays/creditCard.png', name: 'creditCardSwitch' },
						{ label: 'Credit Card', value: '1', isDisplayed: true, icon: '/payWays/onlineCreditCard.png', name: 'creditCardOnlineSwitch' },
						{ label: 'Alipay', value: '2', isDisplayed: true, icon: '/payWays/Alipay.png', name: 'alipaySwitch' },
						{ label: 'UnionPay', value: '3', isDisplayed: true, icon: '/payWays/UnionPay.png', name: 'unionSwitch' },
						{ label: 'Wechat', value: '4', isDisplayed: true, icon: '/payWays/wechat.png', name: 'wechatSwitch' },
						{ label: 'USDT', value: '5', isDisplayed: true, icon: '/payWays/usdt.png', name: 'usdtPaySwitch' },
						{ label: 'Bank Transfer', value: '6', isDisplayed: true, icon: '/payWays/bankTransfer.png', name: 'bankTransferSwitch' },
						{ label: 'PIX', value: '7', isDisplayed: true, icon: '/payWays/PIX.png', name: 'pixSwitch' },
						{ label: 'GCash', value: '8', isDisplayed: true, icon: '/payWays/gCash.png', name: 'gcashSwitch' },
						{ label: 'SEPA', value: '9', isDisplayed: true, icon: '/payWays/sepa.png', name: 'sepaPaySwitch' },
						{ label: 'BPI', value: '11', isDisplayed: true, icon: '/payWays/bpi.png', name: 'bpiSwitch' },
						{ label: 'TrueMoney', value: '12', isDisplayed: true, icon: '/payWays/trueMoney.png', name: 'trueMoneySwitch' },
						{ label: 'Rabbit-line Pay', value: '13', isDisplayed: true, icon: '/payWays/RabbitlinePay.png', name: 'rabbitSwitch' },
						{ label: 'Touch n Go', value: '14', isDisplayed: true, icon: '/payWays/TouchnGo.png', name: 'touchSwitch' },
						{ label: 'Boost', value: '15', isDisplayed: true, icon: '/payWays/Boost.png', name: 'boostSwitch' },
						{ label: 'DANA', value: '16', isDisplayed: true, icon: '/payWays/DANA.png', name: 'danaSwitch' },
						{ label: 'SPEI', value: '17', isDisplayed: true, icon: '/payWays/SPEI.png', name: 'speiPaySwitch' },
						{ label: 'PER Transfer', value: '19', isDisplayed: true, icon: '/payWays/PER.png', name: 'perSwitch' }
					];

					// 修改判断
					this.paymentMethods.forEach(method => {
						if (response.data[method.name] === 0) {
							method.isDisplayed = false;
						}
					});

					this.paymentMethods= this.paymentMethods.filter(method => method.isDisplayed);
					if (this.paymentMethods.length > 0) {
						this.selectedPaymentMethod=this.paymentMethods[0]
					}
				}
			})
		},
		submitClick(){
			if(this.mode === 'buy'){
				this.confirm();
			}else{
				this.addWithdraw()
			}
		},
		addWithdraw(){
			this.loading=true;
			const body = {
				amount:this.amount
			};
			body.merNo= sessionStorage.getItem('merNo');
			body.id=this.selectedPaymentMethod.id;

			console.log(this.selectedPaymentMethod);
			if(this.selectedPaymentMethod === null){
				this.loading=false;
				return this.$message.error(this.i18n.t('buyAndSell.selectReceive'))
			}
				if(this.selectedPaymentMethod.benediciary ==1 ){
					body.sourceCurrency = this.twoCurrency;
					body.targetCurrency = this.oneCurrency;
				}else{
					body.sourceCurrency = this.oneCurrency;
					body.targetCurrency = this.twoCurrency;
				}
			console.log("111",body);
			addwithdraw(body).then(res=>{
				if (res.status === 200) {
					this.step3 = true;
					this.loading=false;

				}else{
					this.loading=false;
					this.$message.error()
				}
			}).catch(e=>{
				this.loading=false;
				console.info(e)
			})
		},
		confirm() {
			this.loading=true;
			// 处理确认按钮点击事件
			// 可以在这里进行提交操作或其他相关逻辑处理。
			const merNo = sessionStorage.getItem('merNo');
			const merOrderNo =  Date.now().toString();
			const sourceAmount = this.amount;
			const returnUrl =  "https://merchant.onlinepay.ai";
			const notifyUrl = "https://merchant.onlinepay.ai";
			const version = "1";
			const currencyCode = this.oneCurrency;

			const secretKey = sessionStorage.getItem('secret');
			const signString = merNo + merOrderNo + currencyCode + sourceAmount + secretKey;
			const md5 = require('md5');
			const sign = md5(signString).toUpperCase();
			const productInfoList = [{sku: "1", productName: "PLAYDB - 1025", price: "1.00", quantity: "1"}];
			// let requestUrl = process.env.VUE_APP_BASE_API + "/cashier/checkStandPay";
			// 	requestUrl = process.env.VUE_APP_BASE_API + "/cashier/checkStandPay";
			checkStandPay( {
				merNo: merNo,
				userId:merNo,
				merOrderNo: merOrderNo,
				sourceAmount: sourceAmount,
				returnUrl: returnUrl,
				ipAddress: this.ipAddress,
				sign: sign,
				version: version,
				currencyCode: currencyCode,
				businessType: "1",
				notifyUrl: notifyUrl,
				productInfoList: productInfoList,
				type:'1',
				settleCurrency:this.twoCurrency,
				paymentType:this.selectedPaymentMethod.value,
				conversionAmount:this.receivedAmount,
			}).then(res =>{

				if (res.status === 200){

					window.open(res.data.payUrl)
				}
				this.loading=false;

			}).catch(err => {
				this.loading=false;

			});

		},


		tableClick(tableName){
			this.mode = tableName;
			if(tableName==='buy'){
				this.selectedPaymentMethod = null;
				this.paymentMethods = [];
				this.amount= '';
				this.receivedAmount ='';
				this.initMethods();
			}else{
				//交换
				this.selectedPaymentMethod = null;
				this.paymentMethods = [];
				this.amount= '';
				this.receivedAmount ='';
				this.getpayeeList()
				this.getToCurrRate();
			}
		},
		updatePayAmount() {
			let value = this.amount;

			// 使用正则表达式验证输入格式
			const regex = /^(0|[1-9]\d{0,8})(\.\d*)?$/;

			// 如果不符合条件，去掉最后一个输入的字符
			if (!regex.test(value)) {
				this.amount = value.slice(0, -1);
			}
			if (this.mode === 'buy') {
				// 移除非数字和小数点之外的字符
				this.amount = this.amount.replace(/[^0-9.]/g, '');
				// 限制只能输入一个小数点
				const decimalCount = (this.amount.match(/\./g) || []).length;
				if (decimalCount > 1) {
					this.amount = this.amount.slice(0, this.amount.lastIndexOf('.'));
				}
				// 限制小数点后最多两位
				const decimalIndex = this.amount.indexOf('.');
				if (decimalIndex !== -1) {
					const decimalPart = this.amount.substring(decimalIndex + 1);
					if (decimalPart.length > 2) {
						this.amount = this.amount.slice(0, decimalIndex + 3);
					}
				}
				this.getToCurrRate();
			} else {
// 移除第一位0
				if (this.amount.charAt(0) === '0') {
					this.amount = this.amount.substring(1);
				}
				// 移除非数字和小数点之外的字符
				this.amount = this.amount.replace(/[^0-9.]/g, '');
				// 限制只能输入一个小数点
				this.amount = this.amount.replace(/[.\D]/g, '');
				this.getToCurrRate();
			}
		},
		selectPaymentMethod(methodValue) {
			this.selectedPaymentMethod = methodValue;
			this.showDropdown = !this.showDropdown;
			this.getToCurrRate()

		},
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},
		 getNeedPayCurrency(){
			 getPayCurrency().then(res => {
				if (res.status === 200) {
					this.currencyImagesOne = res.data.currencyList.map(currency => {
						return {
							flag: `/currency/${currency}.png`,
							code: currency
						};
					});
				}
			})
		},
		getToCurrRate(){
			this.loading=true;
			getCurrRate({
				sourceCurrency:this.oneCurrency,
				targetCurrency:this.twoCurrency,
				paymentType:this.selectedPaymentMethod === null ? '1':this.selectedPaymentMethod.value,
				amount:this.amount,
			}).then(res => {
				if (res.status === 200) {
					console.info("this.amount",this.amount);
	        if(this.amount) {
						if(this.twoCurrency === 'ETH' ||this.twoCurrency === 'BTC'){
							this.receivedAmount = (this.amount * res.data.rate).toFixed(8);
						}else {
							this.receivedAmount = res.data.receivedAmount;
						}
					}
					this.exchangeRate=res.data.rate;
					if(this.mode === 'buy') {
						this.fee = res.data.handlingCharge;
					}
					// "rate": 0.900000,
					// 	"tradeFee": 0.0,
					// 	"receivedAmount": 0.900000,
					// 	"forRate": 0.0
				}
				this.loading=false;
				if(this.mode !== 'buy'){
					const merNo = sessionStorage.getItem('merNo');
					getRateAndBankInfo({merNo:merNo,sourceCurrency:this.oneCurrency,targetCurrency:this.twoCurrency,amount:this.amount === '' ? 0:this.amount }).then(
						res => {
							this.fee = res.data.fee;
						}
					)
				}
			})
		},

// { label: 'SEPA', value: '9', isDisplayed: true, icon: '/payWays/sepa.png' }
	async	getpayeeList(){
			await getPayeeList({currency:this.oneCurrency}).then(res=>{
				this.paymentMethods = [];
				console.log("payee",res.data);
				if(res.data.length === 0){
					this.selectedPaymentMethod  = null;
				}
				res.data.forEach( obj => {
					let icon = '/currency/card.png';
					if(obj.type === 2){
						icon = '/currency/shuzi.png'
					}else if(obj.type === 3){
						icon = '/payWays/bankTransfer.png'
					}else if(obj.type === 4){
						icon = '/payWays/PIX.png'
					}else if(obj.type === 5){
						icon = '/payWays/PER.png'
					}else if(obj.type === 6){
						icon = '/payWays/SPEI.png'
					}
					this.paymentMethods.push({
						title:this.$maskString(obj.bankCard),
						label:obj.bankCard,
						province:obj.province,
						cardNo:obj.bankCard,
						city:obj.city,
						postCode:obj.postcode,
						address:obj.address,
						country:obj.country,
						name:obj.name,
						type:obj.type,
						swift:obj.swift,
						bankName:obj.bankName,
						id:obj.id,
						benediciary:obj.benediciary,
						icon: icon,
						value : 1,
					})
				})
			})
		},
		$maskString(str) {
			if (str.length <= 8) {
				return str; // 字符串长度小于等于8，无需处理
			} else {
				let prefix = str.substring(0, 4); // 获取前4个字符
				let suffix = str.substring(str.length - 4); // 获取后4个字符
				let masked = '*'.repeat(str.length - 8); // 生成需要替换的*字符
				return prefix + masked + suffix; // 组合处理后的字符串
			}
		},
		goToBack(){
			// this.$router.back();
			history.go(-1);

		},
		handleCurrencyChange(currency) {
			this. oneCurrency= currency.code;
			this.getToCurrRate()
			if(this.mode !== 'buy'){
				this.getpayeeList()
			}
		},
		handleCurrencyChange1(currency) {
			this.twoCurrency = currency.code;
			this.getToCurrRate()
		},
	}
};
</script>

<style scoped>

.payment-container {

}
.dropdown-two-lable{
	font-weight: 400;
	font-size: 13px;
	color: #999999;
	line-height: 14px;
	text-align: left;
	font-style: normal;
}
.dropdown-one-lable{
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 24px;
	text-align: left;
	font-style: normal;
}
.payment-container-lable{
	padding-bottom:4px
}

.payment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 14px 20px;
	background: #F7F9FE;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	cursor: pointer;
}

.payment-title {
	display: flex;
	align-items: center;
}

.text-wrapper_2 {
	background-color: rgba(127, 141, 255, 1);
	border-radius: 4px;
	height: 40px;
	width: 180px;
	cursor: pointer;
}

.text_4 {
	width: 28px;
	height: 20px;
	overflow-wrap: break-word;
	color: rgba(255, 255, 255, 1);
	font-size: 14px;
	font-family: Roboto-Medium;
	font-weight: 500;
	text-align: right;
	white-space: nowrap;
	line-height: 16px;
	margin: 30px 0 0 75px;
	cursor: pointer;
}

.icon {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	padding: 10px;
	object-fit: contain;
	border-radius: 50%; /* 将图像变为圆形 */
	background-color: #E7EBF5;
}

.add-button {
	background-color: #f4f5f7;
	border: none;
	color: #007bff;
	font-size: 14px;
	cursor: pointer;
}

.payment-dropdown {
	position: absolute;
	max-height: 187px;
	width: 467px;
	margin-top: 5px;
	background: #FFFFFF;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	cursor: pointer;
	overflow-y: auto;
}


.payment-dropdown1 {
	position: absolute;
	height: 70px;
	width: 467px;
	margin-top: 5px;
	background: #FFFFFF;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	cursor: pointer;
	text-align: center;
	overflow-y: auto;
}

.no-data{
	margin-top: 25px;
	font-size:14px;
	text-align: center; /* 文字居中 */
	cursor: pointer;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	color: #7F8DFF;
	line-height: 20px;
	font-style: normal;
}


.payment-method {
	display: flex;
	align-items: center;
	list-style: none;
	padding: 9px 14px;
	margin: 0;
	cursor: pointer;
	width: 100%;
}

.payment-method:hover {
	background: #F6F8FE;
}

.method-icon {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	padding: 10px;
	object-fit: contain;
	border-radius: 50%; /* 将图像变为圆形 */
	background-color: #E7EBF5;
}
.payment-method span{
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}


.dropdown-menu li {
	padding: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: background-color 0.3s;
}

.dropdown-menu li:hover {
	background-color: #f0f0f0;
}


.element {
	position: absolute;
	cursor: pointer;
	left: 121px;
	top: 17px;
}
.crypto-exchange {
	width: 516px;
	background: #FFFFFF;
	border-radius: 16px;
	border: 1px solid #DBDFEA;
	margin: 0 auto;
	margin-top: 120px	;
}

.tab-container {
	display: flex;
	margin-bottom: 16px;
	justify-content: center;
}
.exchange-form{
	padding:24px;
}

.tab-button {
	flex: 1;
	padding: 8px 0;
	border: none;
	cursor: pointer;
	width: 257px;
	height: 72px;
	background: #F7F9FE;
	font-weight: 600;
	font-size: 24px;
	color: #8094AE;
	line-height: 36px;
	font-style: normal;
}

.tab-button:first-child {
	border-top-left-radius: 16px;
	border-bottom-left-radius: 16px;
}

.tab-button:last-child {
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
}

.tab-button.active {
	background: #FFFFFF;
	color: #364A63;
}

.input-group {
	width: 468px;
	height: 86px;
	background: #FFFFFF;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	margin-bottom:16px;
}

.input-group1 {
	width: 468px;
	height: 86px;
	background: #F5F7FA;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
	margin-bottom:16px;
}

.input-group:hover{
	border: 1px solid #7F8DFF;
}

label {
	display: block;
	padding:12px 12px 6px 0px ;
	font-weight: 400;
	font-size: 14px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}

.input-with-select {
	display: flex;
	border-radius: 8px;
}

/deep/.el-input__inner{
	padding: 12px;
	border: none;
	outline: none;
	flex-grow: 1;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 30px;
	text-align: left;
	font-style: normal;
}

input, select {
	padding: 12px;
	font-size: 16px;
	border: none;
	outline: none;
}

input {
	flex-grow: 1;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 30px;
	text-align: left;
	font-style: normal;
}

select {
	background-color: white;
	color: #333;
	cursor: pointer;
}

.exchange-rate, .fee {
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	text-align: left;
	font-style: normal;
	margin-bottom: 8px;
}

.payment-select select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 468px;
	height: 72px;
	background: #F7F9FE;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
}




.confirm-button {
	margin-top: 24px;
	width: 100%;
	padding: 14px;
	background-color: #5b7fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	font-style: normal;
}

.confirm-button:hover {
	background-color: #4a6ae5;
}
</style>
