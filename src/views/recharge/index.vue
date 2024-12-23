<template>
	<div class="recharge-page" @click="closeDropdown">
		<img class="element" src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />
		<h2>{{$t('sysText.home_add_money')}}</h2>


		<!-- 第一个输入框 -->
		<div class="input-row">
			<p class="input-label">{{$t('sysText.recharge_you_will_pay')}}</p>
			<div style="padding-bottom: 4px"></div>

			<div style="position: relative;">
				<el-input
					v-model="paymentAmount"
					@input="updatePayAmount"
					placeholder="0.0"
				/>
				<div v-if="selectedCurrencyIcon" @click.stop="toggleCurrencyDropdown" style="position: absolute; right: 16px; cursor: pointer;top: 50%; transform: translateY(-50%); height: 30px">
					<div style="display: flex;justify-content: center;align-items: center">
						<img :src="selectedCurrencyIcon" alt="Your Image" style="width: 30px;height: 30px;"/>
						<div style="width:8px;"></div>
						<span class="text-currery-sel"> {{selectedCurrency}}</span>
						<div style="width:22px;"></div>
						<img class="icon-currery-sel" :class="{ rotated: currencyDropdownVisible }" src="../../assets/images/down-to.png" alt="下" />

					</div>

				</div>
				<div v-show="currencyDropdownVisible" class="currency-dropdown">
					<div class="select-currency-back"
						v-for="currency in currencyImagesOne"
						:key="currency.title"
						@click="selectCurrency(currency)"
					>
						<img :src="currency.filename" alt="Currency Icon" class="currency-icon" />
						<div style="width: 8px"></div>

						<span class="text-currery-sel"> {{ currency.title }}</span>

					</div>
				</div>

			</div>

			<div style="padding-bottom: 15px"></div>


		</div>


		<!-- 支付方式选择 -->


		<div class="input-row">
			<div class="input-field">
				<div style="display: flex;align-items: center;justify-content: start">
					<div class="circle" style="margin-left: 10px;margin-right: 5px"></div>
					<p class="input-label" >{{$t('sysText.recharge_choose_payment_methods')}}</p>

				</div>
				<div style="padding-bottom: 6px"></div>

				<div class="payment-methods">
					<div
						v-for="method in paymentMethods"
						:key="method"
						:class="['payment-method', { 'selected': selectedPaymentMethod === method.value }]"
						@click="selectPaymentMethod(method.value)"
					>
						<div style="display: flex;flex-direction:column; justify-content: space-between">
							<img :src="method.icon" alt="tp" style="width: 20px;height: 18px;margin-bottom: 4px">
							<span :class="['payment-method-text', { 'selected': selectedPaymentMethod === method.value }]">{{ method.label }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 手续费和汇率显示 -->
		<div class="fee-rate">
			<div style="display: flex;align-items: center;justify-content: start">
				<div class="circle" style="margin-left: 10px;margin-right: 5px"></div>
				<div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">{{$t('sysText.recharge_transaction_fee')}}{{ fee }}</div>
			</div>
			<div style="height: 5px"></div>
			<div style="display: flex;align-items: center;justify-content: start">
				<div class="circle" style="margin-left: 10px;margin-right: 5px"></div>
				<div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">{{$t('sysText.recharge_exchange_rate')}}{{
					'1'+selectedCurrency+'='+exchangeRate+payCurrency
					}}</div>
			</div>
		</div>

		<!-- 第二个输入框 -->
		<div class="input-row">
			<p class="input-label">{{$t('sysText.recharge_amount_to_add')}}</p>
			<div style="padding-bottom: 4px"></div>
			<div style="position: relative;">
				<el-input
					v-model="payAmount"
					@input="updatePaymentAmount"
					placeholder="0.0"
				/>
				<div v-if="selectedCurrencyIcon" @click.stop="togglePayCurrencyDropdown" style="position: absolute; right: 16px; top: 50%;cursor: pointer; transform: translateY(-50%); height: 30px">
					<div style="display: flex;justify-content: center;align-items: center">
						<img :src="payCurrencyIcon" alt="Your Image" style="width: 30px;height: 30px;"/>
						<div style="width:8px;"></div>
						<span class="text-currery-sel"> {{payCurrency}}</span>
						<div style="width:22px;"></div>
						<img class="icon-currery-sel" :class="{ rotated: payCurrencyDropdownVisible }" src="../../assets/images/down-to.png" alt="下" />

					</div>

				</div>
				<div v-show="payCurrencyDropdownVisible" class="currency-dropdown">
					<div class="select-currency-back"
							 v-for="currency in currencyImagesTwo"
							 :key="currency.title"
							 @click="selectPayCurrency(currency)"
					>
						<img :src="currency.filename" alt="Currency Icon" class="currency-icon" />
						<div style="width: 8px"></div>

						<span class="text-currery-sel"> {{ currency.title }}</span>

					</div>
				</div>

			</div>

		</div>

		<!-- 确认按钮 -->
			<el-button :loading="this.loading" class="confirm-button"  type="primary" @click="confirm">{{$t('sysText.create_payment_requests_continue')}}</el-button>
	</div>
</template>

<script>
import { getPayCurrency, getCurrRate, getPayMethodList, checkStandPay } from "@/api/home";
import md5 from "md5";

export default {
	data() {
		return {
			currencyImages: [
				{ filename: '/currency/AUD.png', title: 'AUD' },
				{ filename: '/currency/BRL.png', title: 'BRL' },
				{ filename: '/currency/CAD.png', title: 'CAD' },
				{ filename: '/currency/CHF.png', title: 'CHF' },
				{ filename: '/currency/CNY.png', title: 'CNY' },
				{ filename: '/currency/DKK.png', title: 'DKK' },
				{ filename: '/currency/EUR.png', title: 'EUR' },
				{ filename: '/currency/GBP.png', title: 'GBP' },
				{ filename: '/currency/HKD.png', title: 'HKD' },
				{ filename: '/currency/INR.png', title: 'INR' },
				{ filename: '/currency/JPY.png', title: 'JPY' },
				{ filename: '/currency/KRW.png', title: 'KRW' },
				{ filename: '/currency/MOP.png', title: 'MOP' },
				{ filename: '/currency/MYR.png', title: 'MYR' },
				{ filename: '/currency/NOK.png', title: 'NOK' },
				{ filename: '/currency/NZD.png', title: 'NZD' },
				{ filename: '/currency/PHP.png', title: 'PHP' },
				{ filename: '/currency/RUB.png', title: 'RUB' },
				{ filename: '/currency/SEK.png', title: 'SEK' },
				{ filename: '/currency/SGD.png', title: 'SGD' },
				{ filename: '/currency/THB.png', title: 'THB' },
				{ filename: '/currency/TWD.png', title: 'TWD' },
				{ filename: '/currency/USD.png', title: 'USD' },
				{ filename: '/currency/USDT.png', title: 'USDT' },
				{ filename: '/currency/VND.png', title: 'VND' },
			],
			currencyImagesOne:[],
			currencyImagesTwo:[],
			selectedCurrency: '',
			selectedCurrencyIcon: '',
			paymentAmount: '',
			paymentCurrency: '',
			selectedPaymentMethod: '1',
			fee: '0.0',
			exchangeRate: '0.0',
			payAmount: '',
			payCurrency: '',
			payCurrencyIcon: '',
			loading: false,
			ipAddress: '192.168.120.120',

			currencyDropdownVisible: false,
			payCurrencyDropdownVisible: false,
			paymentMethods: [
				// 信用卡0 1支付宝2  union3 wechat4 usdt5 bankTransfer6 pix7 gcash8

			],
			supportPaymentMethod: {
				creditCardOnlieSwitch: 0,
				creditCardSwitch: 0,
				alipaySwitch: 0,
				unionSwitch: 0,
				wechatSwitch: 0,
				usdtPaySwitch: 0,
				bankTransferSwitch: 0,
				pixSwitch: 0,
				gcashSwitch:0,
				sepaPaySwitch:0,
			},

		};
	},
	created() {
		this.getIPAddress()
		this.getNeedPayMethodList()
		this.getNeedPayCurrency()

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
		updateCurrencyIcon() {
			const selectedCurrency = this.selectedCurrency;
			const currency = this.currencyImages.find((c) => c.title === selectedCurrency);
			if (currency) {
				this.selectedCurrencyIcon = currency.filename;
			} else {
				this.selectedCurrencyIcon = '';
			}
		},
		goToBack(){
			// this.$router.back();
			history.go(-1);

		},
		selectPaymentMethod(methodValue) {

			this.selectedPaymentMethod = methodValue;
			if (methodValue==='5'){
				this.selectedCurrency='USDT';
				this.selectedCurrencyIcon='/currency/USDT.png';
			}
			this.getToCurrRate()

		},
		getNeedPayMethodList(){
			const merNo = sessionStorage.getItem('merNo');
			// businessType 1充值
			getPayMethodList({
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
					this.supportPaymentMethod = obj
					// 信用卡0 1支付宝2  union3 wechat4 usdt5 bankTransfer6 pix7 8gacsh
					this.paymentMethods=[
						// 信用卡0 1支付宝2  union3 wechat4 usdt5 bankTransfer6 pix7 gcash8
						{ label: 'Credit Card', value: '0', isDisplayed: true, icon: '/payWays/creditCard.png' },
						{ label: 'Credit Card', value: '1', isDisplayed: true, icon: '/payWays/onlineCreditCard.png' },
						{ label: 'Alipay', value: '2', isDisplayed: true, icon: '/payWays/Alipay.png' },
						{ label: 'UnionPay', value: '3', isDisplayed: true, icon: '/payWays/UnionPay.png' },
						{ label: 'Wechat', value: '4', isDisplayed: true, icon: '/payWays/wechat.png' },
						{ label: 'USDT', value: '5', isDisplayed: true, icon: '/payWays/usdt.png' },
						{ label: 'Bank Transfer', value: '6', isDisplayed: true, icon: '/payWays/bankTransfer.png' },
						{ label: 'PIX', value: '7', isDisplayed: true, icon: '/payWays/PIX.png' },
						{ label: 'GCash', value: '8', isDisplayed: true, icon: '/payWays/gCash.png' },
						{ label: 'SEPA', value: '9', isDisplayed: true, icon: '/payWays/sepa.png' }
					];
						// / 根据后端开关状态修改支付方式的显示状态
					if (response.data.creditCardSwitch === 0) {
						this.paymentMethods[0].isDisplayed = false;
					}
					if (response.data.creditCardOnlieSwitch === 0) {
						this.paymentMethods[1].isDisplayed = false;
					}
					if (response.data.alipaySwitch === 0) {
						this.paymentMethods[2].isDisplayed = false;
					}
					if (response.data.unionSwitch === 0) {
						this.paymentMethods[3].isDisplayed = false;
					}
					if (response.data.wechatSwitch === 0) {
						this.paymentMethods[4].isDisplayed = false;
					}
					if (response.data.usdtPaySwitch === 0) {
						this.paymentMethods[5].isDisplayed = false;
					}
					if (response.data.bankTransferSwitch === 0) {
						this.paymentMethods[6].isDisplayed = false;
					}
					if (response.data.pixSwitch === 0) {
						this.paymentMethods[7].isDisplayed = false;
					}
					if (response.data.gcashSwitch === 0) {
						this.paymentMethods[8].isDisplayed = false;
					}
					if (response.data.sepaPaySwitch === 0) {
						this.paymentMethods[9].isDisplayed = false;
					}


					this.paymentMethods= this.paymentMethods.filter(method => method.isDisplayed);
					if (this.paymentMethods.length > 0) {
						this.selectedPaymentMethod=this.paymentMethods[0].value
					}
					console.log(this.paymentMethods);
				}
			})

		},
		getNeedPayCurrency(){
			getPayCurrency().then(res => {
				if (res.status === 200) {
					this.currencyImagesOne = res.data.currencyList.map(currency => {
						return {
							filename: `/currency/${currency}.png`,
							title: currency
						};
					});
					if(this.$route.query.currency) {
						this.selectedCurrency=this.$route.query.currency
						this.selectedCurrencyIcon=`/currency/${this.$route.query.currency}.png`
						this.payCurrency=this.$route.query.currency
						this.payCurrencyIcon=`/currency/${this.$route.query.currency}.png`
					} else {
						this.selectedCurrency='USD'
						this.selectedCurrencyIcon=`/currency/USD.png`
						this.payCurrency='USD'
						this.payCurrencyIcon=`/currency/USD.png`
					}

					if (this.selectedCurrency==='USDT'){this.selectedPaymentMethod='5'}

					this.currencyImagesTwo = res.data.settleCurrencyList.map(currency => {
						return {
							filename: `/currency/${currency}.png`,
							title: currency
						};
					});
				}
			})

		},
		getToCurrRate(){
				this.loading=true;
			getCurrRate({
				sourceCurrency:this.selectedCurrency,
				targetCurrency:this.payCurrency,
				paymentType:this.selectedPaymentMethod,

				amount:this.paymentAmount,
			}).then(res => {
				if (res.status === 200) {
					this.payAmount=res.data.receivedAmount;
					this.exchangeRate=res.data.rate;
					this.fee=res.data.handlingCharge;
					// "rate": 0.900000,
					// 	"tradeFee": 0.0,
					// 	"receivedAmount": 0.900000,
					// 	"forRate": 0.0
				}
				this.loading=false;

			})
		},
		getFromCurrRate(){
			this.loading=true;

			getCurrRate({
				sourceCurrency:this.payCurrency,
				targetCurrency:this.selectedCurrency,
				paymentType:this.selectedPaymentMethod,
				amount:this.payAmount,
			}).then(res => {
				if (res.status === 200) {
					this.paymentAmount=res.data.receivedAmount;
					this.exchangeRate=res.data.rate;
					this.fee=res.data.handlingCharge;
					// "rate": 0.900000,
					// 	"tradeFee": 0.0,
					// 	"receivedAmount": 0.900000,
					// 	"forRate": 0.0

				}
				this.loading=false;

			})
		},
		closeDropdown() {
			this.currencyDropdownVisible = false;
			this.payCurrencyDropdownVisible = false;
		},
		updatePayAmount() {
			// 移除非数字和小数点之外的字符
			this.paymentAmount = this.paymentAmount.replace(/[^0-9.]/g, '');
			// 限制只能输入一个小数点
			const decimalCount = (this.paymentAmount.match(/\./g) || []).length;
			if (decimalCount > 1) {
				this.paymentAmount = this.paymentAmount.slice(0, this.amount.lastIndexOf('.'));
			}
			// 限制小数点后最多两位
			const decimalIndex = this.paymentAmount.indexOf('.');
			if (decimalIndex !== -1) {
				const decimalPart = this.paymentAmount.substring(decimalIndex + 1);
				if (decimalPart.length > 2) {
					this.paymentAmount = this.paymentAmount.slice(0, decimalIndex + 3);
				}
			}
			this.getToCurrRate();
		},
		updatePaymentAmount() {
			// 移除非数字和小数点之外的字符
			this.payAmount = this.payAmount.replace(/[^0-9.]/g, '');
			// 限制只能输入一个小数点
			const decimalCount = (this.payAmount.match(/\./g) || []).length;
			if (decimalCount > 1) {
				this.payAmount = this.payAmount.slice(0, this.amount.lastIndexOf('.'));
			}
			// 限制小数点后最多两位
			const decimalIndex = this.payAmount.indexOf('.');
			if (decimalIndex !== -1) {
				const decimalPart = this.payAmount.substring(decimalIndex + 1);
				if (decimalPart.length > 2) {
					this.payAmount = this.payAmount.slice(0, decimalIndex + 3);
				}
			}
			this.getFromCurrRate()
		},
		confirm() {
			this.loading=true;
			// 处理确认按钮点击事件
			// 可以在这里进行提交操作或其他相关逻辑处理。
				const merNo = sessionStorage.getItem('merNo');
				const merOrderNo =  Date.now().toString();
				const sourceAmount = this.paymentAmount;
				const returnUrl = "https://merchant.onlinepay.ai";
				const notifyUrl = "https://merchant.onlinepay.ai";
				const version = "1";
				const currencyCode = this.selectedCurrency;

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
					settleCurrency:this.payCurrency,
					paymentType:this.selectedPaymentMethod,
					conversionAmount:this.payAmount,

				}).then(res =>{

					if (res.status === 200){

						window.open(res.data.payUrl)
					}
					this.loading=false;

				}).catch(err => {
					this.loading=false;

				});

		},
		toggleCurrencyDropdown() {
			this.payCurrencyDropdownVisible=false;
			this.currencyDropdownVisible = !this.currencyDropdownVisible;
		},
		selectCurrency(currency) {
			this.selectedCurrency = currency.title;
			this.selectedCurrencyIcon = currency.filename;
			this.currencyDropdownVisible = false;
			const hasUSDT = this.paymentMethods.some(option => option.value === '5');
			if (this.selectedCurrency==='USDT' && hasUSDT ){
				this.selectedPaymentMethod='5'
			}
			this.getToCurrRate()
		},
		togglePayCurrencyDropdown() {
			this.currencyDropdownVisible=false;
			this.payCurrencyDropdownVisible = !this.payCurrencyDropdownVisible;
		},
		selectPayCurrency(currency) {
			this.payCurrency = currency.title;
			this.payCurrencyIcon = currency.filename;
			this.payCurrencyDropdownVisible = false;
			this.getFromCurrRate()
		}
	},

};
</script>

<style scoped>
.recharge-page {
	/*max-width: 400px;*/
	/*margin: 0 auto;*/
	/*padding: 20px;*/
	/*background-color: #f5f5f5;*/
	/*border-radius: 5px;*/
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
h2 {
	margin-top: 99px;
	margin-bottom: 25px;
	text-align: center;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	font-size: 28px;
	color: #364A63;
	line-height: 36px;
	font-style: normal;
}

.fee-rate {
	margin-bottom: 12px;
	text-align: start;
	width: 516px;
;
}

.input-row {
	/*display: flex;*/
	align-items: center;
	width: 516px;
}

.input-label {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}

.input-field {
	flex: 1;
}

.input-wrapper {
	position: relative;
}

.circle {
	width: 10px;height: 10px;background: #C5CAD4;border-radius: 50%
}

.text-input {
	width: 516px;
	height: 60px;

	background: #FFFFFF;
	border-radius: 10px;
	border: 1px solid #DBDFEA;
}

.currency-display {
	position: relative;
}

.currency-icon {
	width: 30px;
	height: 30px;
	cursor: pointer;
}

.currency-dropdown {
	width: 120px;
	position: absolute;
	top: calc(100% + 5px);
	right: 0;
	padding: 5px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	list-style: none;
	z-index: 2;
	max-height: 400px; /* 设置最大高度为200像素 */
	overflow-y: auto; /* 当内容超过容器高度时显示滚动条 */
}
.payment-methods {
	display: flex;
	flex-wrap: wrap;
	margin-left: 19px; /* 设置水平间距为 10px */

}

.payment-method {
	width: 116px;
	height: 52px;
	background: #FFFFFF;
	border-radius: 8px;
	border: 1px solid #DBDFEA;
	cursor: pointer;
	box-sizing: border-box;
	margin-left: 8px; /* 设置水平间距为 10px */
	margin-bottom: 8px; /* 设置垂直间距为 20px */
	padding: 7px 10px;
}

.payment-method.selected {
	border: 2px solid #7F8DFF;
}
.payment-method-text {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: left;
	font-style: normal;


}
.payment-method-text.selected {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #7F8DFF;
	line-height: 16px;
	text-align: left;
	font-style: normal;

}

.currency-dropdown li {
	display: flex;
	align-items: center;
	padding: 5px;
	cursor: pointer;
}
.select-currency-back{
	display: flex;justify-content: start;padding: 10px 0;align-items: center;
	cursor: pointer;
}
.select-currency-back:hover{
	display: flex;justify-content: start;padding: 10px 0;align-items: center;
	cursor: pointer;
	background-color: #F6F8FE;
}
.text-currery-sel {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 26px;
	text-align: left;
	font-style: normal;
}

.icon-currery-sel {
	width: 14px;
	height: 8px;
	transition: transform 0.3s; /* 添加过渡效果，使旋转更平滑 */
}

.rotated {
	transform: rotate(180deg); /* 应用180度的旋转变换 */
}
.confirm-button {
	margin-top: 24px;
	width: 516px;
	height: 44px;

	/*border-radius: 4px;*/
	/*text-align: center;*/
}
/deep/ .el-input__inner {
	width: 516px;
	height: 60px;
	/*background: #FFFFFF;*/
	border-radius: 10px;
	/*border: 1px solid #DBDFEA;*/
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 36px;
	text-align: left;
	font-style: normal;

}


</style>