<template>
	<div class="recharge-page" @click="closeDropdown">
		<img class="element" src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />




    <div v-show="step1">
      <h2>{{$t('sysText.home_send')}}</h2>
    <!-- 第一个输入框 -->
    <div class="input-row">
      <p class="input-label">{{$t('sysText.payee_receive')}}</p>
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
font-style: normal;">{{$t('sysText.recharge_transaction_fee')}}{{ fee }}{{  payCurrency }}</div>
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
      <div style="height: 5px"></div>

    </div>

    <!-- 第二个输入框 -->
    <div class="input-row">
			<div style="padding-bottom: 15px"></div>
			<div style="float: right ;margin-top: 5px;
height: 20px;
font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #364A63;
line-height: 20px;
text-align: center;
font-style: normal; ">{{$t('home.availableBalance')}}：{{bannel}}</div>
      <p class="input-label">{{$t('sysText.you_payee')}}</p>
      <div style="padding-bottom: 4px"></div>
      <div style="position: relative;">
        <el-input
            v-model="payAmount"
            placeholder="0.0"
						disabled="true"
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
    <el-button :loading="this.loading" class="confirm-button"  type="primary" @click="confirm">{{$t('sysText.payee_continue')}}</el-button>
    </div>



<!--    收款人页面-->
    <div v-show="step2">
      <h2>{{$t('sysText.select_payee')}}</h2>
      <div class="main_right_content">
        <div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #364A63;
line-height: 20px;
text-align: left;
margin-bottom: 4px;
font-style: normal;">{{$t("remittance.remittanceTable")}}</div>
        <!-- 添加按钮 没有收款人 -->

        <div class="payment-container" v-if="Object.keys(selectedPayee).length ===  0" @click.stop="switchStep">
          <div class="payment-header">
            <img src="@/assets/images/SketchPng2a421861d4698b6e0c24a2a2047c1c7ecb1cce32a75943e56013883661983e18.png" alt="Payment Icon" class="payment-icon" />
            <span class="payment-label">{{$t("remittance.remittanceTable")}}</span>
          </div>
          <div class="add-button">
            <span class="add-text">{{$t("manage.add")}}</span>
          </div>
        </div>
        <!-- 选中收款人的显示 -->
        <div v-if="Object.keys(selectedPayee).length > 0" class="selected-method" @click.stop="showDropdown = !showDropdown">
          <div class="selected-method-div-selected" @click="selectPaymentMethod(method)">
            <div class="column-one">
              <img :src="selectedPayee.icon"  alt="Payment Method Icon" />
              <div class="selected-method-div">
                <span class="selected-method-span-two">{{ selectedPayee.title }}</span>
                <span class="selected-method-span-two-two">{{ selectedPayee.value }}</span>
              </div>
            </div>
            <div>
              <div v-if="true" class="selected-icon">
                <img src="@/assets/images/checkmark-image.png" alt="Checkmark" class="icon-image">
              </div>
            </div>

          </div>

        </div>
      </div>
      <!-- 下拉列表 -->

      <div class="input-wrapper" v-if="showDropdown">
        <div class="dropdown">
          <div class="dropdown-ul" v-for="method in payeeList" :key="method.value" @click="selectPayee(method)">
            <div class="column-one">
              <img :src="method.icon"  alt="Payment Method Icon" />
              <div class="selected-method-div">
                <span class="selected-method-span-two">{{ method.title }}</span>
                <span class="selected-method-span-two-two">{{ method.value }}</span>
              </div>
            </div>
            <div>
              <div v-if="method === selectedPayee" class="selected-icon">
                <img src="@/assets/images/checkmark-image.png" alt="Checkmark" class="icon-image">
              </div>
            </div>

          </div>

          <div class="fixed-text" @click="gotoPayee()">+ {{$t("remittance.addRemittance")}}</div>

        </div>

      </div>

<!--      <div class="input-row">
        <p class="input-label">{{$t('sysText.payee')}}</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="item in payeeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>-->
      <!-- 确认按钮 -->
      <el-button :loading="this.loading" class="confirm-button"  type="primary" @click="addWithdraw()">{{$t('sysText.payee_continue')}}</el-button>
    </div>


    <div v-show="step3" >
      <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="height: 216px"></div>

        <img src="@/assets/images/chulizhong-wi.png" alt="Checkmark" class="icon-image-wi">
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
import { getAccountBalance, getCurrRate, getPayMethodList, checkStandPay,getPayeeList } from "@/api/home";
import { addwithdraw,getRateAndBankInfo} from "@/api/Settlement";

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
			selectedPayee:{},
      showDropdown:false,
      isOne:true,
      isTwo: false,
      isThree: false,
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
      step1:true,
      step2:false,
      step3:false,
      bannel:0,
      payeeList:[],
			currencyDropdownVisible: false,
			payCurrencyDropdownVisible: false,
			paymentMethods: [
				// 信用卡0 1支付宝2  union3 wechat4 usdt5 bankTransfer6 pix7 gcash8

			],
      merAccount:[],
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
			},

		};
	},
	created() {
		this.getIPAddress()
		this.getNeedPayMethodList()
		this.getNeedPayCurrency()
	},
	methods: {
    addWithdraw(){
			this.loading=true;
      const body = {
					amount:this.paymentAmount
      };
      body.merNo= sessionStorage.getItem('merNo');
        body.id=this.selectedPayee.id;
        if(this.selectedPayee.type  !=2){
        if(this.selectedPayee.benediciary ==1 ){
          body.bank = this.selectedPayee.bankName;
          body.bankNumber = this.selectedPayee.cardNo;
          body.name = this.selectedPayee.name;
          body.sourceCurrency = this.payCurrency;
          body.targetCurrency = this.selectedCurrency;
          body.type= 1 ;
          body.country = this.selectedPayee.country;
          body.province = this.selectedPayee.province;
          body.city = this.selectedPayee.city;
          body.postCode = this.selectedPayee.postCode;
          body.address = this.selectedPayee.address;
					body.benediciary = this.selectedPayee.benediciary;
					body.swift=this.selectedPayee.swift;
					body.destinationType = this.selectedPayee.type;
        }else{
          body.type=1
          body.country=this.selectedPayee.country
          body.bankNumber=this.selectedPayee.cardNo;
          body.name=this.selectedPayee.name;
          body.swift=this.selectedPayee.swift
					body.sourceCurrency = this.payCurrency;
					body.targetCurrency = this.selectedCurrency;
          body.province = this.selectedPayee.province;
          body.city = this.selectedPayee.city;
          body.postCode = this.selectedPayee.postCode;
          body.address = this.selectedPayee.address;
					body.benediciary = this.selectedPayee.benediciary
					body.destinationType = this.selectedPayee.type;
        }

      }else{
        body.bank = 'TRC20';
        body.bankNumber=this.selectedPayee.cardNo;
        body.name = this.selectedPayee.name;
				body.sourceCurrency = this.payCurrency;
				body.targetCurrency = this.selectedCurrency;
				body.destinationType = this.selectedPayee.type;
        body.type= 0

      }
        body.lastName=this.selectedPayee.lastName;
        body.bankName=this.selectedPayee.bankName;

        console.log("111",body);
      addwithdraw(body).then(res=>{
        if (res.status === 200) {
          this.step1=false;
          this.step2 = false;
          this.step3 = true;
					this.loading=false;

        }else{
					this.loading=false;
          this.$message.error()
        }
      }).catch(e=>{
				this.loading=false;
        console.info(e)
        this.disabled = false;
      })
    },
    gotoPayee(){
      this.$router.push({path: "/collection"});
    },
    getpayeeList(){
      getPayeeList({currency:this.selectedCurrency}).then(res=>{
        console.log("payee",res.data);

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
          this.payeeList.push({
            title:this.$maskString(obj.bankCard),
            cardNo:obj.bankCard,
            lable:obj.id,
            value:obj.name,
						name:obj.name,
            icon:icon,
            province:obj.province,
            city:obj.city,
            postCode:obj.postcode,
            address:obj.address,
            country:obj.country,
            type:obj.type,
            swift:obj.swift,
              id:obj.id,
            bankName:obj.bankName,
            benediciary:obj.benediciary,
          })
        })
        console.log(this.payeeList);
      }).catch(error=>{

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
			// this.getToCurrRate()

		},
    switchStep(){
      this.showDropdown =!this.showDropdown;
      // this.selectedPayee = this.payeeList[0];
    },
    selectPayee(method){
			console.log(method);
      this.selectedPayee = method;
      this.showDropdown=false;
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
						{ label: 'GCash', value: '8', isDisplayed: true, icon: '/payWays/gCash.png' }
					];
						// / 根据后端开关状态修改支付方式的显示状态
					if (response.data.creditCardSwitch === 0) {
						this.paymentMethods[0].isDisplayed = false;
					}
					if (response.data.creditCardOnlieSwitch === 0) {
						this.paymentMethods[0].isDisplayed = false;
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


					this.paymentMethods= this.paymentMethods.filter(method => method.isDisplayed);
					console.log(this.paymentMethods);
				}
			})

		},
		getNeedPayCurrency(){
			const merNo = sessionStorage.getItem('merNo');
			getAccountBalance({merNo:merNo,isAll:1,currency:'all'}).then(res => {
				if (res.status === 200) {
					this.merAccount = res.data.merAccount;
					// 定义要去除的货币
					// const currenciesToRemove = ["USDT", "ETH", "BTC", "USDC"];
					// 	res.data.merAccount = res.data.merAccount.filter(item => !currenciesToRemove.includes(item.currency));

					this.currencyImagesOne = res.data.merAccount.map(currency => {
            // console.log(currency.currency);
						return {
							filename: `/currency/${currency.currency}.png`,
							title: currency.currency
						};
					});


						if(this.$route.query.currency) {
            this.selectedCurrency=this.$route.query.currency
            this.selectedCurrencyIcon=`/currency/${this.$route.query.currency}.png`
            this.payCurrency=this.$route.query.currency
            this.payCurrencyIcon=`/currency/${this.$route.query.currency}.png`
          } else {
            this.selectedCurrency=res.data.merAccount[0].currency
            this.selectedCurrencyIcon=`/currency/${res.data.merAccount[0].currency}.png`
            this.payCurrency="USDC"
            this.payCurrencyIcon=`/currency/USDC.png`
				}
				this.merAccount.forEach(data=>{
					if(data.currency === this.payCurrency){
						this.bannel = data.overAmount;
					}
				})
					if (this.selectedCurrency==='USDT'){this.selectedPaymentMethod='5'}

					this.currencyImagesTwo = res.data.merAccount.map(currency => {
            return {
              filename: `/currency/${currency.currency}.png`,
              title: currency.currency
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
				amount:this.paymentAmount == '' ? 0:this.paymentAmount,
			}).then(res => {
				if (res.status === 200) {
					this.payAmount=res.data.receivedAmount;
					this.exchangeRate=res.data.rate;
					// "rate": 0.900000,
					// 	"tradeFee": 0.0,
					// 	"receivedAmount": 0.900000,
					// 	"forRate": 0.0
				}
				const merNo = sessionStorage.getItem('merNo');
				getRateAndBankInfo({merNo:merNo,sourceCurrency:this.selectedCurrency,targetCurrency:this.payCurrency,amount:this.paymentAmount == '' ? 0:this.paymentAmount }).then(
					res => {
						this.fee = res.data.fee;
					}
				)
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
			// 移除第一位0
			if (this.paymentAmount.charAt(0) === '0') {
				this.paymentAmount = this.paymentAmount.substring(1);
			}
			// 移除非数字和小数点之外的字符
			this.paymentAmount = this.paymentAmount.replace(/[^0-9.]/g, '');
			// 限制只能输入一个小数点
			this.paymentAmount = this.paymentAmount.replace(/[.\D]/g, '');
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
			if( this.paymentAmount === 0){
				this.$message({
					type: "error",
					message: this.$t('remittance.yebnwk')
				});
				return;
			}
      this.step2=true;
      this.step1=false;
			this.getpayeeList();
      return;
		},
		toggleCurrencyDropdown() {
			this.payCurrencyDropdownVisible=false;
			this.currencyDropdownVisible = !this.currencyDropdownVisible;
		},
		selectCurrency(currency) {
			this.selectedCurrency = currency.title;
			this.selectedCurrencyIcon = currency.filename;
			this.currencyDropdownVisible = false;
			if (this.selectedCurrency==='USDT'){this.selectedPaymentMethod='5'}

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
      this.merAccount.forEach(date=>{
        if(date.currency == currency.title){
          this.bannel = date.overAmount;
        }
      })
			// this.getFromCurrRate()
			this.getToCurrRate()
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
	margin-bottom:10px;
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
.fixed-text {
    position: absolute; /* 底部文本绝对定位 */
    bottom: 11px; /* 距离底部11px */
    left: 0; /* 左侧边距0 */
    right: 0; /* 右侧边距0 */
    text-align: center; /* 文字居中 */
    cursor: pointer;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #7F8DFF;
    line-height: 20px;
    font-style: normal;
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
.selected-icon .icon-image {
    width: 18px;
    height: 18px;
    background-color: transparent;
}

.icon-image-wi {
	width: 176px;
	height: 130px;
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
.main_right_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;

    /*align-content: center;*/
}
.dropdown-ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    list-style: none;
    padding: 15px 15px;
    margin: 0;
    cursor: pointer;


}
.selected-method-div-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;

    list-style: none;
    padding: 15px 15px;
    margin: 0;
    width: 100%;
    cursor: pointer;


}
.dropdown-ul:hover {
    background: #F6F8FE;

}

.dropdown img {
    width: 44px;
    height: 44px;
    margin-right: 11px;
    /*padding: 10px;*/
    object-fit: contain;

    border-radius: 50%; /* 将图像变为圆形 */
    background-color: #E7EBF5;
}

.selected-method img {
    width: 44px;
    height: 44px;
    margin-right: 11px;
    /*padding: 10px;*/
    object-fit: contain;

    border-radius: 50%; /* 将图像变为圆形 */
    background-color: #E7EBF5;
}

.selected-method {
    display: flex;
    align-items: center;
    width: 516px;
    height: 72px;

    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #DBDFEA;
}

.selected-method-img-one {
    width: 44px;
    height: 44px;
    margin-right: 12px;
    object-fit: contain;

    border-radius: 50%; /* 将图像变为圆形 */
    background-color: #E7EBF5;

}
.selected-method-span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #364A63;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}

.selected-method-div {
    display: flex;
    flex-direction: column;

}
.column-one {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

}
.row-one {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

}
.selected-method-span-two {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #364A63;
    line-height: 16px;
    text-align: left;
    font-style: normal;
    margin-bottom: 4px;

}
.selected-method-span-two-two {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #526484;
    line-height: 14px;
    text-align: left;
    font-style: normal;

}

.selected-method img:last-child {
    margin-left: auto;
}


.text_6 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    /*color: #8C8C8C;*/
    line-height: 19px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    padding: 8px 16px 8px 16px;

}
.dropdown {
    width: 514px;
    height: 258px;

    margin-top: 5px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #DBDFEA;
    cursor: pointer;
    overflow-y: auto;
}
.selected-method {
    width: 514px;
    height: 72px;

    margin-top: 5px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #DBDFEA;
    cursor: pointer;
    overflow-y: auto;
}
.payment-container {
    width: 516px;
    height: 72px;
    padding: 0 16px;
    background: #F7F9FE;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #DBDFEA;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
.payment-icon {
    width: 40px;
    height: 40px;
}

.payment-label {
    margin-left: 11px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #364A63;
    line-height: 20px;
    text-align: left;
    font-style: normal;

}

.add-button {
    width: 64px;
    height: 32px;

    background: #E7EBF5;
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.add-button:hover {
    /*width: 80px;*/
    /*background: #D5D9E3;*/
}

.add-text {
    font-size: 14px;
    color: #333333;
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

.page {
  position: relative;
  width: 1440px;
  height: 900px;
  overflow: hidden;
}

.group_1 {
  background-color: rgba(255, 255, 255, 1);
  width: 1440px;
  height: 900px;
    align-items: center;
    justify-content: center;

}

.image-wrapper_3 {
  width: 81px;
  height: 19px;
  margin: 224px 0 0 681px;
}

.thumbnail_1 {
  width: 6px;
  height: 6px;
  margin-top: 9px;
}

.thumbnail_2 {
  width: 14px;
  height: 19px;
}

.image-wrapper_4 {
  width: 130px;
  height: 98px;
  margin: 3px 0 0;
}

.thumbnail_3 {
  width: 5px;
  height: 7px;
  margin-top: 44px;
}

.image_1 {
  width: 98px;
  height: 98px;
  margin-left: 15px;
}

.thumbnail_4 {
  width: 8px;
  height: 10px;
  margin: 20px 0 0 4px;
}

.text-group_2 {
  width: 145px;
  height: 54px;
  margin: 20px 0 0 653px;
}

.text_1 {
  width: 144px;
  height: 26px;
  overflow-wrap: break-word;
  color: rgba(54, 74, 99, 1);
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  line-height: 26px;
  margin-left: 1px;
}

.text_2 {
  width: 135px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(128, 148, 174, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 8px;
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


</style>