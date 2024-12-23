<template>
	<div class="app-container">

		<div class="handle-title">
			<div v-if="identity === 0" style="width: 900px;
height: 40px;
display: 	flex;
background: rgba(255,143,31,0.12);
align-items: center;
cursor: pointer;
margin-bottom: 24px;
border-radius: 8px;" @click="gotoCertification">
				<img style="width: 20px; height: 20px;margin-left: 16px;margin-right: 8px" src="../assets/images/gantanhao.png" @click="hideModal" alt="" />
				<div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #FF8F1F;
line-height: 20px;
text-align: left;
font-style: normal;">{{$t('translations.completeAuthentication')}} ></div>

			</div>
				<div class="page-titles">{{$t('sysText.home_total_balance')}} (USDC)</div>
				<div style="padding-bottom: 10px"></div>
				<span v-if="accountBalance.totalAmount" style="font-family: Roboto, Roboto;
font-weight: 500;
font-size: 36px;
color: #364A63;
line-height: 36px;
text-align: left;
font-style: normal;">
					{{accountBalance.totalAmount}}
					<img src="/icon/shuju.png" @click="isShuju=true" style="width: 31px;height:31px;cursor: pointer;" />
				</span>

			<div style="padding-bottom: 24px"></div>
<!--			<div style="display: flex;">-->
<!--				<div>-->
<!--					<span style="font-family: PingFangSC, PingFang SC;-->
<!--font-weight: 500;-->
<!--font-size: 14px;-->
<!--color: #8094AE;-->
<!--line-height: 20px;-->
<!--text-align: left;-->
<!--font-style: normal;">{{$t('home.withdrawableBalance')}}</span>-->
<!--					<div class="text-wrapper_16 flex-row justify-between">-->
<!--						<span class="new-style">{{accountBalance.amount}}</span>-->
<!--						<span class="new-two-style"> {{accountBalance.currency}}</span>-->
<!--					</div>-->
<!--				</div>-->
<!--				<div style="-->
<!--height: 48px;-->
<!--border: 0.5px solid #E9ECF3;margin: 0 60px"></div>-->
<!--				<div>-->
<!--					<span style="font-family: PingFangSC, PingFang SC;-->
<!--font-weight: 500;-->
<!--font-size: 14px;-->
<!--color: #8094AE;-->
<!--line-height: 20px;-->
<!--text-align: left;-->
<!--font-style: normal;">{{$t('sysText.unsettledBalance')}}</span>-->
<!--					<div class="text-wrapper_16 flex-row justify-between">-->
<!--						<span class="new-style">{{accountBalance.uncheckedAmount}}</span>-->
<!--						<span class="new-two-style"> {{accountBalance.currency}}</span>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div style="padding-bottom: 32px"></div>-->

			<!--只提现//充值-->
			<div style="display: flex">
				<div class="chongzhi-button" @click="showDialog('buyAndSell')">

					<svg-icon class="svg-tabs" icon-class="buyandsell"/>

					<span class="btn-text-te">{{$t('sysText.home_buy_and_sell_with_cash')}}</span>
				</div>

				<div class="chongzhi-button2" @click="showDialog('recharge')">

					<svg-icon class="svg-tabs" icon-class="congzhi"/>

					<span class="btn-text-te2">{{$t('sysText.home_deposit')}}</span>

				</div>
				<div class="chongzhi-button2" @click="showDialog('withdraw')" v-if="merType === 0">

					<svg-icon class="svg-tabs" icon-class="tixian"/>

					<span class="btn-text-te2">{{$t('sysText.home_withdraw')}}</span>
				</div>

<!--				<div class="chongzhi-button2" @click="showDialog('share')">-->
<!--					<svg-icon class="svg-tabs" icon-class="fengxiang-mian"/>-->

<!--					<span class="btn-text-te2">{{$t('sysText.home_create_payment_requests')}}</span>-->
<!--				</div>-->

			</div>


			<div class="scrollable-container">
				<div class="content">
					<div class="item" @click="goToDetails(item.currency)" v-for="item in accountBalance.merAccount" :key="item">
						<div style="display: flex;align-items: center;margin-bottom: 102px">
							<img style="width: 48px; height: 48px" :src="`/currency/${item.currency}.png`">
							<span style="font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: 18px;
          color: #364A63;
          line-height: 16px;
          text-align: left;
          font-style: normal;padding-left: 12px">
          {{ item.flag }}
        </span>
						</div>
						<span style="font-family: Roboto, Roboto;
        font-weight: bold;
        font-size: 24px;
        color: #364A63;
        line-height: 26px;
        text-align: left;
        font-style: normal;">
        {{ item.overAmount }}
      </span>
					</div>

					<!-- 新的币种项 -->
					<div class="item" @click="showDialog('newCurrency')">
						<div style="display: flex;align-items: center;margin-bottom: 102px">
							<img style="width: 48px; height: 48px" src="/currency/new_currency.png">
							<span style="font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: 18px;
          color: #364A63;
          line-height: 16px;
          text-align: left;
          font-style: normal;padding-left: 12px">
          {{ $t('login.openAccount') }}
        </span>
						</div>
						<span style="font-family: Roboto, Roboto;
        font-weight: bold;
        font-size: 24px;
        color: #364A63;
        line-height: 26px;
        text-align: left;
        font-style: normal;">
 &nbsp;      </span>
					</div>

				</div>
			</div>

		</div>
<!--充值-->
		<el-dialog :visible.sync="centerDialogVisible" :title="dialogTitle" @close="closeDialog" width="506px" center>
			<div v-if="false" class="dialog-content">
				<div class="dialog-section">
					<span class="section-label">{{$t('home.paymentAmount')}}</span>
					<el-input v-model="paymentAmount" oninput ="value=value.replace(/[^\-\d.]/g, '')" placeholder="0.00" class="section-input">
						<template slot="append"><span style="color: #364A63">USD</span></template>
					</el-input>
					<p v-if="isInputEmpty" style="color: red;">{{$t('home.enterPaymentAmount')}}</p>

				</div>
				<div class="copy-div">
					<div class="dialog-section">
						<el-button type="primary" class="generate-link-button"  @click="generateUrl">{{$t('home.generateRechargeLink')}}</el-button>
					</div>
				</div>

			</div>
			<div class="dialog-content" v-else>

				<div class="generated-url">
					<div class="url-content" >
						<span class="url-text">{{ url }}</span>
						<div class="copy-button"  @click="copyUrl">
							<span class="text_120">{{$t('home.copy')}}</span>
						</div>

					</div>
				</div>
				<div class="block-container">

					<!--									<div class="block-image">-->
					<!--										<vue-qrcode value="1212" :size="180" :color="'#ff0000'" />-->
					<!--									</div>-->
					<template>
						<div class="block-image">
							<QrcodeVue :size="180" :value="url"  level="H" />
						</div>
					</template>
					<!--								<el-button class="block-text-wrapper" @click="$router.go(-1)">-->
					<!--									<span class="block-text">下载二维码</span>-->
					<!--								</el-button>-->

				</div>
				<div style="width: 438px;margin-top: 24px">
					<div class="copy-div">
						<el-button type="primary" class="generate-link-button" @click="redirectToPayment">{{$t('home.goToPay')}}</el-button>

					</div>
				</div>

			</div>
		</el-dialog>


<!--版本新提现-->
		<!-- 弹窗题此案提现 -->
		<!-- 分享收款链接弹窗 -->
		<div v-if="isWithdrawalModalVisible" class="dialog-overlay">
				<div v-if="this.isPro==='0'" class="modal-content">
					<div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
						<div></div>
						<div class="modal-title">{{$t('sysText.home_create_payment_requests')}}</div>
						<img class="close-button" src="../assets/images/close.png" @click="hideModal" alt="关闭按钮" />
					</div>

					<div style="padding-bottom: 32px"></div>

					<div class="input-row">
						<p class="input-label">{{$t('sysText.create_payment_requests_currency')}}</p>
						<div style="padding-bottom: 4px"></div>

						<el-select
							@change="changeSelection"
							ref="refSelect"
											 :popper-append-to-body="false"
											  v-model="seOneCurrency">
							<el-option
												 v-for="item in currencyImages"
												 :key="item.title"
												 :label="item.title"
												 :value="item.title"
							>
								<template >
									<img :src="item.filename" class="currency-image" alt="Currency" />
									<div style="
font-family: Roboto, Roboto;
font-weight: 500;
font-size: 18px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">	{{ item.title }}</div>
								</template>
							</el-option>
						</el-select>

					</div>
					<div style="padding-bottom: 20px"></div>

					<div class="input-row">
						<p class="input-label">{{$t('sysText.create_payment_requests_request_amount')}}</p>
						<div style="padding-bottom: 4px"></div>

						<div class="input-field">
							<el-input v-model="amount" placeholder="0.0" @input="handleInput"></el-input>
						</div>
					</div>

					<div class="input-row">
						<p class="input-label">{{$t('sysText.create_payment_requests_note')}}</p>
						<div style="padding-bottom: 4px"></div>

						<div class="input-field-beizhu">
							<el-input v-model="remark" :placeholder="$t('sysText.optional_optional')"></el-input>
						</div>
					</div>

					<div class="modal-actions">
						<el-button :loading="this.loading"  class="confirm-button" type="primary" @click="confirmWithdrawal">{{$t('sysText.create_payment_requests_continue')}}</el-button>
					</div>
				</div>
			<div v-if="this.isPro==='1'" class="modal-content">
				<div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
					<img class="bank-main" src="../assets/images/bank-main.png" @click="isBankProOne" alt="" />

					<div class="modal-title"></div>
					<img class="close-button" src="../assets/images/close.png" @click="hideModal" alt="" />
				</div>
				<img class="share-mian" src="../assets/images/share-mian.png" alt="" />

				<div class="share-mian-text">{{$t('sysText.home_create_payment_requests')}}</div>

				<div style="padding-bottom: 32px"></div>

				<div class="input-row">
					<p class="share-mian-text-two">{{$t('sysText.payment_Requests')}}</p>
					<div style="padding-bottom: 4px"></div>
					<div class="input-field-te">
						<span class="url-texts">{{this.url}}</span>

						<a :href="this.url " target="_blank">
							<img class="share-to" src="../assets/images/share-to.png" alt="分享" />
						</a>

					</div>
					<div style="padding-bottom: 20px"></div>
					<div style="display: flex;justify-content: center;align-items: start">
						<div class="fcol" @click="copyUrl">
							<img class="three-icon" src="../assets/images/three-copy.png" alt="three-icon" />
							<span class="three-text" >
																{{$t('sysText.copy_link')}}
							</span>
						</div>
						<div style="width: 20px"></div>
						<el-popover
							placement="top"
							width="300px"
							trigger="click"
						>
							<div class="block-image-code-con">
								<div class="block-image">
									<div style="font-family: PingFangSC, PingFang SC;
font-weight: 600;
font-size: 14px;
color: #526484;
line-height: 16px;
text-align: left;
font-style: normal;
">																{{$t('sysText.qr_code')}}
									</div>
									<div style="padding-bottom: 21px"></div>

									<QrcodeVue :size="160" :value="url"  level="L" />
								</div>
							</div>
							<div class="fcol" slot="reference">
								<img class="three-icon" src="../assets/images/three-code.png" alt="three-icon" />
								<span class="three-text">	{{$t('sysText.qr_code')}}</span>
							</div >

						</el-popover>

						<div style="width: 20px"></div>

						<div class="fcol" @click="isProGen">
							<img class="three-icon" src="../assets/images/three-add.png" alt="three-icon" />
							<span class="three-text">	{{$t('sysText.create_new_request')}}</span>
						</div>

					</div>

				</div>

			</div>

		</div>

		<el-dialog :visible.sync="isShuju"  class="dialog_header_edit"  :title="$t('home.account')" width="550px" top="15%"  center>
			<div>
				<div class="mb8">{{$t('sysText.home_total_balance')}}（USDC）</div>
				<div class="font_size_down">	{{accountBalance.totalAmount}}</div>
			</div>
			<div style="display:flex">
				<div  style="padding-right: 50px;margin-top: 24px">
					<div class="mb8">{{$t('home.withdrawableBalance')}}（USDC）</div>
					<div class="font_size_down">{{accountBalance.amount}}</div>
				</div>
				<div style="width: 1px;border: 1px solid #E9ECF3;"></div>
				<div  style="padding-left: 50px;margin-top: 24px">
					<div class="mb8">{{$t('sysText.unsettledBalance')}}（USDC）</div>
					<div class="font_size_down">{{accountBalance.uncheckedAmount}}</div>
				</div>
			</div>
		</el-dialog>

		<!-- 弹窗组件 -->
		<div v-if="showModal" class="dialog-overlay">
			<div class="section_1 flex-col">
				<div class="block_1 ">
					<div class="block_2 flex-col">
						<div class="text-group_3 ">
							<span class="text_1">{{$t('sysText.welcomeToOnlinePay')}}</span>
							<span class="text_2">{{$t('sysText.allDataIsTestData')}}</span>
						</div>
						<div class="text-wrapper_1 flex-row justify-between">
							<span class="text_3">{{$t('sysText.viewPaymentDoc')}}</span>
							<a href="https://docs.onlinepay.ai/" target="_blank" class="text_4"><span>{{$t('sysText.check')}} ></span></a>
						</div>
					</div>
					<div class="text-wrapper_2 flex-row justify-between">
						<span class="text_50">{{$t('sysText.learnPaymentProcess')}}</span>
						<!--						<span class="text_6">查看&nbsp;&gt;</span>-->
						<a :href=this.url  target="_blank" class="text_6"><span>{{$t('sysText.check')}} ></span></a>
					</div>

					<div class="text-wrapper_3 flex-row justify-between">
						<span class="text_7">{{$t('sysText.viewMerchantManual')}}</span>
						<a href="https://onlinepay.com/onlinepaydocs/" target="_blank" class="text_4"><span>{{$t('sysText.check')}} ></span></a>
					</div>
					<div class="box_2">
						<!--						<div class="text-wrapper_4 flex-col"><span class="text_9">返回</span></div>-->
						<div class="text-wrapper_7 flex-col" ><span class="text_12" @click="closeGuide()">{{$t('sysText.ok')}}</span></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 实名 -->

		<Popup :visible="isPopupVisible" />
		<!-- 开通账户 -->
		<div v-if="isOpenCurrencyModalVisible" class="dialog-overlay">
			<div class="modal-content-openCurrency">
				<div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
					<div></div>
					<div class="modal-title">{{ $t('login.openAccount') }}</div>
					<img class="close-button" src="../assets/images/close.png" @click="hideOpenCurrencyModal" alt="" />
				</div>

				<div style="padding-bottom: 32px"></div>

				<div class="input-row">
					<p class="input-label">{{$t('sysText.create_payment_requests_currency')}}</p>
					<div style="padding-bottom: 4px"></div>

					<el-select
						@change="changeSelection"
						ref="refSelect"
						:popper-append-to-body="false"
						v-model="seOpenCurrency">
						<el-option
							v-for="item in openCurrencyImages"
							:key="item.title"
							:label="item.title"
							:value="item.title"
						>
							<template >
								<img :src="item.filename" class="currency-image" alt="Currency" />
								<div style="
font-family: Roboto, Roboto;
font-weight: 500;
font-size: 18px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">	{{ item.title }}</div>
							</template>
						</el-option>
					</el-select>

				</div>
				<div style="padding-bottom: 20px"></div>

				<div class="modal-actions">
					<el-button :loading="this.loading"  class="confirm-button" type="primary" @click="confirmOpenCurrency">{{$t('sysText.create_payment_requests_continue')}}</el-button>
				</div>
			</div>

		</div>
		<div class="transaction-section">
			<div class="header">
				<h3>{{$t('sysText.transaction')}}</h3>
				<el-button type="text" class="view-more" @click="viewMore">{{$t('sysText.viewMore')}} &gt;</el-button>
			</div>
			<div class="transaction-list" v-if="transactions.length != 0">
				<div class="transaction-item" v-for="transaction in transactions" :key="transaction.id" @click="viewDetail(transaction)">
					<div class="transaction-left">
						<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
						<div class="transaction-info">
							<div class="transaction-type">{{ transaction.type === 2 ? $t('sysText.home_sell'):$t('sysText.home_buy') }}</div>
							<div class="transaction-date">{{ transaction.createDate }}</div>
						</div>
					</div>
					<div class="transaction-right">
						<div class="transaction-amount">{{ transaction.amount }} {{ transaction.currency }}</div>
						<div class="transaction-status" :class="getStatusClass(transaction.status)">{{ getStatusName(transaction.status)}}</div>
					</div>
				</div>
			</div>
			<div class="quesheng" v-if="transactions.length === 0">
				<img src="icon/zw.png">
				<p class="empty-list-text">{{$t('sysText.none')}}</p>
			</div>
		</div>
<!--		<Popup :visible="isPopupVisible" />-->



	</div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import EchartsControl from "@/components/EchartsControl";
import pieCharts from "@/components/Charts/pieCharts";
import Popup from "@/components/Verify";
import {
	getSummary,
	getTradeSum,
	getProtest,
	getAccountBalance,
	getCurrency,
	checkStand,
	checkStandPay,
	merQueryAccount,
	addAccountBalance,
	getHomeList
} from "@/api/home";
import {
	getRateAndBankInfo,addwithdraw,getAmount
} from "@/api/Settlement";
import sumHandle from "@/utils/operation";
import {Notification} from "element-ui";
import { mapGetters, mapState } from "vuex";
import install from "@/directive";
import md5 from "md5";
import store from "@/store";
import { getCertificationStatus } from "@/api/certification";
import { bip39, BigNumber,base } from "@okxweb3/crypto-lib";
import { EthWallet, MessageTypes } from "@okxweb3/coin-ethereum";
import CryptoJS from 'crypto-js'

import okxReq from "@/utils/okxReq"

export default {
	name: "Home",
	components: { EchartsControl, pieCharts,QrcodeVue,Popup },
	data() {
		return {
			transactions: [
				// { type: '汇款', date: '2020-01-01 12:00', amount: '10.00 USD', status: '成功' },
				// { type: '转入', date: '2020-01-01 12:00', amount: '10.00 USD', status: '失败' },
				// { type: '转入', date: '2020-01-01 12:00', amount: '10.00 USD', status: '处理中' },
				// { type: '转入', date: '2020-01-01 12:00', amount: '10.00 USD', status: '失败' },
				// { type: '转入', date: '2020-01-01 12:00', amount: '10.00 USD', status: '处理中' }
			],
			country:'',
			loading: false,
			isPro: '0',

			payee:'',
			swift:'',
			payeeName:'',
			shareLink: '',
			seOneCurrency: 'USD',
			seOpenCurrency: 'USD',
			amount: '',
			remark: '',
			countryList:[
				{ value: 'AF', label: 'Afghanistan' },
				{ value: 'AX', label: '√Öland Islands' },
				{ value: 'AL', label: 'Albania' },
				{ value: 'DZ', label: 'Algeria' },
				{ value: 'AS', label: 'American Samoa' },
				{ value: 'AD', label: 'Andorra' },
				{ value: 'AO', label: 'Angola' },
				{ value: 'AI', label: 'Anguilla' },
				{ value: 'AQ', label: 'Antarctica' },
				{ value: 'AG', label: 'Antigua and Barbuda' },
				{ value: 'AR', label: 'Argentina' },
				{ value: 'AM', label: 'Armenia' },
				{ value: 'AW', label: 'Aruba' },
				{ value: 'AU', label: 'Australia' },
				{ value: 'AT', label: 'Austria' },
				{ value: 'AZ', label: 'Azerbaijan' },
				{ value: 'BS', label: 'Bahamas' },
				{ value: 'BH', label: 'Bahrain' },
				{ value: 'BD', label: 'Bangladesh' },
				{ value: 'BB', label: 'Barbados' },
				{ value: 'BY', label: 'Belarus' },
				{ value: 'BE', label: 'Belgium' },
				{ value: 'BZ', label: 'Belize' },
				{ value: 'BJ', label: 'Benin' },
				{ value: 'BM', label: 'Bermuda' },
				{ value: 'BT', label: 'Bhutan' },
				{ value: 'BO', label: 'Bolivia' },
				{ value: 'BA', label: 'Bosnia and Herzegovina' },
				{ value: 'BW', label: 'Botswana' },
				{ value: 'BV', label: 'Bouvet Island' },
				{ value: 'BR', label: 'Brazil' },
				{ value: 'IO', label: 'British Indian Ocean Territory' },
				{ value: 'BN', label: 'Brunei Darussalam' },
				{ value: 'BG', label: 'Bulgaria' },
				{ value: 'BF', label: 'Burkina Faso' },
				{ value: 'BI', label: 'Burundi' },
				{ value: 'KH', label: 'Cambodia' },
				{ value: 'CM', label: 'Cameroon' },
				{ value: 'CA', label: 'Canada' },
				{ value: 'CV', label: 'Cape Verde' },
				{ value: 'KY', label: 'Cayman Islands' },
				{ value: 'CF', label: 'Central African Republic' },
				{ value: 'TD', label: 'Chad' },
				{ value: 'CL', label: 'Chile' },
				{ value: 'CN', label: 'China' },
				{ value: 'CX', label: 'Christmas Island' },
				{ value: 'CC', label: 'Cocos (Keeling) Islands' },
				{ value: 'CO', label: 'Colombia' },
				{ value: 'KM', label: 'Comoros' },
				{ value: 'CG', label: 'Congo (Congo-Brazzaville)' },
				{ value: 'CD', label: 'Congo (Congo-Kinshasa)' },
				{ value: 'CK', label: 'Cook Islands' },
				{ value: 'CR', label: 'Costa Rica' },
				{ value: 'CI', label: "Cote D'Ivoire" },
				{ value: 'HR', label: 'Croatia' },
				{ value: 'CU', label: 'Cuba' },
				{ value: 'CY', label: 'Cyprus' },
				{ value: 'CZ', label: 'Czech Republic' },
				{ value: 'DK', label: 'Denmark' },
				{ value: 'DJ', label: 'Djibouti' },
				{ value: 'DM', label: 'Dominica' },
				{ value: 'DO', label: 'Dominican Republic' },
				{ value: 'EC', label: 'Ecuador' },
				{ value: 'EG', label: 'Egypt' },
				{ value: 'SV', label: 'El Salvador' },
				{ value: 'GQ', label: 'Equatorial Guinea' },
				{ value: 'ER', label: 'Eritrea' },
				{ value: 'EE', label: 'Estonia' },
				{ value: 'ET', label: 'Ethiopia' },
				{ value: 'FK', label: 'Falkland Islands (Malvinas)' },
				{ value: 'FO', label: 'Faroe Islands' },
				{ value: 'FJ', label: 'Fiji' },
				{ value: 'FI', label: 'Finland' },
				{ value: 'FR', label: 'France' },
				{ value: 'GF', label: 'French Guiana' },
				{ value: 'PF', label: 'French Polynesia' },
				{ value: 'TF', label: 'French Southern Territories' },
				{ value: 'GA', label: 'Gabon' },
				{ value: 'GM', label: 'Gambia' },
				{ value: 'GE', label: 'Georgia' },
				{ value: 'DE', label: 'Germany' },
				{ value: 'GH', label: 'Ghana' },
				{ value: 'GI', label: 'Gibraltar' },
				{ value: 'GR', label: 'Greece' },
				{ value: 'GL', label: 'Greenland' },
				{ value: 'GD', label: 'Grenada' },
				{ value: 'GP', label: 'Guadeloupe' },
				{ value: 'GU', label: 'Guam' },
				{ value: 'GT', label: 'Guatemala' },
				{ value: 'GG', label: 'Guernsey' },
				{ value: 'GN', label: 'Guinea' },
				{ value: 'GW', label: 'Guinea-Bissau' },
				{ value: 'GY', label: 'Guyana' },
				{ value: 'HT', label: 'Haiti' },
				{ value: 'HM', label: 'Heard Island and McDonald Islands' },
				{ value: 'VA', label: 'Holy See (Vatican City State)' },
				{ value: 'HN', label: 'Honduras' },
				{ value: 'HK', label: 'Hong Kong' },
				{ value: 'HU', label: 'Hungary' },
				{ value: 'IS', label: 'Iceland' },
				{ value: 'IN', label: 'India' },
				{ value: 'ID', label: 'Indonesia' },
				{ value: 'IR', label: 'Iran' },
				{ value: 'IQ', label: 'Iraq' },
				{ value: 'IE', label: 'Ireland' },
				{ value: 'IM', label: 'Isle of Man' },
				{ value: 'IL', label: 'Israel' },
				{ value: 'IT', label: 'Italy' },
				{ value: 'JM', label: 'Jamaica' },
				{ value: 'JP', label: 'Japan' },
				{ value: 'JE', label: 'Jersey' },
				{ value: 'JO', label: 'Jordan' },
				{ value: 'KZ', label: 'Kazakhstan' },
				{ value: 'KE', label: 'Kenya' },
				{ value: 'KI', label: 'Kiribati' },
				{ value: 'KP', label: 'Korea, North' },
				{ value: 'KR', label: 'Korea, South' },
				{ value: 'KW', label: 'Kuwait' },
				{ value: 'KG', label: 'Kyrgyzstan' },
				{ value: 'LA', label: 'Lao People\'s Democratic Republic' },
				{ value: 'LV', label: 'Latvia' },
				{ value: 'LB', label: 'Lebanon' },
				{ value: 'LS', label: 'Lesotho' },
				{ value: 'LR', label: 'Liberia' },
				{ value: 'LY', label: 'Libyan Arab Jamahiriya' },
				{ value: 'LI', label: 'Liechtenstein' },
				{ value: 'LT', label: 'Lithuania' },
				{ value: 'LU', label: 'Luxembourg' },
				{ value: 'MO', label: 'Macao' },
				{ value: 'MK', label: 'Macedonia' },
				{ value: 'MG', label: 'Madagascar' },
				{ value: 'MW', label: 'Malawi' },
				{ value: 'MY', label: 'Malaysia' },
				{ value: 'MV', label: 'Maldives' },
				{ value: 'ML', label: 'Mali' },
				{ value: 'MT', label: 'Malta' },
				{ value: 'MH', label: 'Marshall Islands' },
				{ value: 'MQ', label: 'Martinique' },
				{ value: 'MR', label: 'Mauritania' },
				{ value: 'MU', label: 'Mauritius' },
				{ value: 'YT', label: 'Mayotte' },
				{ value: 'MX', label: 'Mexico' },
				{ value: 'FM', label: 'Micronesia' },
				{ value: 'MD', label: 'Moldova' },
				{ value: 'MC', label: 'Monaco' },
				{ value: 'MN', label: 'Mongolia' },
				{ value: 'MS', label: 'Montserrat' },
				{ value: 'MA', label: 'Morocco' },
				{ value: 'MZ', label: 'Mozambique' },
				{ value: 'MM', label: 'Myanmar' },
				{ value: 'NA', label: 'Namibia' },
				{ value: 'NR', label: 'Nauru' },
				{ value: 'NP', label: 'Nepal' },
				{ value: 'NL', label: 'Netherlands' },
				{ value: 'AN', label: 'Netherlands Antilles' },
				{ value: 'NC', label: 'New Caledonia' },
				{ value: 'NZ', label: 'New Zealand' },
				{ value: 'NI', label: 'Nicaragua' },
				{ value: 'NE', label: 'Niger' },
				{ value: 'NG', label: 'Nigeria' },
				{ value: 'NU', label: 'Niue' },
				{ value: 'NF', label: 'Norfolk Island' },
				{ value: 'MP', label: 'Northern Mariana Islands' },
				{ value: 'NO', label: 'Norway' },
				{ value: 'OM', label: 'Oman' },
				{ value: 'PK', label: 'Pakistan' },
				{ value: 'PW', label: 'Palau' },
				{ value: 'PS', label: 'Palestinian Territory, Occupied' },
				{ value: 'PA', label: 'Panama' },
				{ value: 'PG', label: 'Papua New Guinea' },
				{ value: 'PY', label: 'Paraguay' },
				{ value: 'PH', label: 'Philippines' },
				{ value: 'PN', label: 'Pitcairn' },
				{ value: 'PL', label: 'Poland' },
				{ value: 'PT', label: 'Portugal' },
				{ value: 'PR', label: 'Puerto Rico' },
				{ value: 'QA', label: 'Qatar' },
				{ value: 'RE', label: 'Reunion' },
				{ value: 'RO', label: 'Romania' },
				{ value: 'RU', label: 'Russian Federation' },
				{ value: 'RW', label: 'Rwanda' },
				{ value: 'SH', label: 'Saint Helena' },
				{ value: 'KN', label: 'Saint Kitts and Nevis' },
				{ value: 'LC', label: 'Saint Lucia' },
				{ value: 'PM', label: 'Saint Pierre and Miquelon' },
				{ value: 'VC', label: 'Saint Vincent and the Grenadines' },
				{ value: 'WS', label: 'Samoa' },
				{ value: 'SM', label: 'San Marino' },
				{ value: 'ST', label: 'Sao Tome and Principe' },
				{ value: 'SA', label: 'Saudi Arabia' },
				{ value: 'SN', label: 'Senegal' },
				{ value: 'ME', label: 'Montenegro' },
				{ value: 'SC', label: 'Seychelles' },
				{ value: 'SL', label: 'Sierra Leone' },
				{ value: 'SG', label: 'Singapore' },
				{ value: 'SK', label: 'Slovakia' },
				{ value: 'SI', label: 'Slovenia' },
				{ value: 'SB', label: 'Solomon Islands' },
				{ value: 'SO', label: 'Somalia' },
				{ value: 'ZA', label: 'South Africa' },
				{ value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
				{ value: 'ES', label: 'Spain' },
				{ value: 'LK', label: 'Sri Lanka' },
				{ value: 'SD', label: 'Sudan' },
				{ value: 'SR', label: 'Suriname' },
				{ value: 'SJ', label: 'Svalbard and Jan Mayen' },
				{ value: 'SZ', label: 'Swaziland' },
				{ value: 'SE', label: 'Sweden' },
				{ value: 'CH', label: 'Switzerland' },
				{ value: 'SY', label: 'Syrian Arab Republic' },
				{ value: 'TW', label: 'Taiwan, Province of China' },
				{ value: 'TJ', label: 'Tajikistan' },
				{ value: 'TZ', label: 'Tanzania' },
				{ value: 'TH', label: 'Thailand' },
				{ value: 'TL', label: 'Timor-Leste' },
				{ value: 'TG', label: 'Togo' },
				{ value: 'TK', label: 'Tokelau' },
				{ value: 'TO', label: 'Tonga' },
				{ value: 'TT', label: 'Trinidad and Tobago' },
				{ value: 'TN', label: 'Tunisia' },
				{ value: 'TR', label: 'Turkey' },
				{ value: 'TM', label: 'Turkmenistan' },
				{ value: 'TC', label: 'Turks and Caicos Islands' },
				{ value: 'TV', label: 'Tuvalu' },
				{ value: 'UG', label: 'Uganda' },
				{ value: 'UA', label: 'Ukraine' },
				{ value: 'AE', label: 'United Arab Emirates' },
				{ value: 'GB', label: 'United Kingdom' },
				{ value: 'US', label: 'United States' },
				{ value: 'UM', label: 'United States Minor Outlying Islands' },
				{ value: 'UY', label: 'Uruguay' },
				{ value: 'UZ', label: 'Uzbekistan' },
				{ value: 'VU', label: 'Vanuatu' },
				{ value: 'VE', label: 'Venezuela' },
				{ value: 'VN', label: 'Viet Nam' },
				{ value: 'VG', label: 'Virgin Islands, British' },
				{ value: 'VI', label: 'Virgin Islands, U.S.' },
				{ value: 'WF', label: 'Wallis and Futuna' },
				{ value: 'EH', label: 'Western Sahara' },
				{ value: 'YE', label: 'Yemen' },
				{ value: 'ZM', label: 'Zambia' },
				{ value: 'ZW', label: 'Zimbabwe' },
				{ value: 'RS', label: 'Serbia' }
			],
			openCurrencyImages: [
				{ filename: '/currency/USD.png', title: 'USD' },
				{ filename: '/currency/USDT.png', title: 'USDT' },
				{ filename: '/currency/HKD.png', title: 'HKD' },
				{ filename: '/currency/BRL.png', title: 'BRL' },
				{ filename: '/currency/PHP.png', title: 'PHP' },
				{ filename: '/currency/EUR.png', title: 'EUR' },
			],
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
			showModal: false,
			isWithdrawalModalVisible: false,
			isOpenCurrencyModalVisible: false,
			selectedOption: "0", // 默认选择“转账给自己”

			citiesValue:'USDT',
			cities: [{
				value: 'USDT',
				label: 'USDT'
			},{
				value: 'USD',
				label: 'USD'
			},{
				value: 'HKD',
				label: 'HKD'
			},{
				value: 'BRL',
				label: 'BRL'
			},{
				value: 'PHP',
				label: 'PHP'
			}],

			cities1Value:'USD',
			cities1: [{
					value: 'USDT',
					label: 'USDT'
			},{
				value: 'USD',
				label: 'USD'
			},{
				value: 'HKD',
				label: 'HKD'
			},{
				value: 'BRL',
				label: 'BRL'
			},{
				value: 'PHP',
				label: 'PHP'
			}],
			value: '',
			accountBalance: {},
			getTradeSumlist: [],
			getProtestArr: [],
			getSummaryCode:'0',
			getTradeSumCode:'0',
			getProtestCode:'0',
			centerDialogVisible: false,
			dialogTitle: "Dialog Title",
			withdrawalVisible:false,
			withdra1walVisible:false,
			isShuju:false,
			withdraType:2,
			showUrl: false,
			disabled:false,
			paymentAmount: "",
			numberAddress:'',
			withdrawAmount:'',
			url: "",
			isInputEmpty: false,
			chartData: {
				id: "chart1",
				options: {},
			},
			chartData2: {
				id: "chart2",
				options: {},
			},
			withdrawal:{},
			amountListTime: [],
			rateAndBankInfo:{},
			overAmount:{},
			merchantList:[],
			currencyList:[],
			merchantListWithAll:[],
			currencyListWithAll:[],
			selectedMerchant:'',
			selectedCurrency:'',
			ipAddress: '192.168.120.120',
			selectedAllMerchant:this.$t('sysText.allMerchants'),
			selectedAllCurrency:this.$t('sysText.allCurrencys'),
			colorObject: { dark: '#000000', light: '#FFFFFF' }
		};
	},
	mounted() {
		this.merHomeQueryAccount();
		this.openGuide();

	},
	created() {
		this.getIPAddress();
		this.getHomeList();
		store.dispatch("GetInfo");
		const merNo = sessionStorage.getItem('merNo');
		if (process.env.NODE_ENV === 'production') {
			this.url = `https://pos.onlinepay.ai/#/home?merNo=${merNo}`;
		} else {
			this.url = `https://testpos.onlinepay.ai/#/home?merNo=${merNo}`;
		}

	},
	computed: {
		...mapGetters(["merType"]),
		...mapGetters(["isPopupVisible"]),
		...mapGetters(['sidebar', 'device', 'name', 'merType', 'identity']),


	},
	methods: {
		getHomeList(){
			getHomeList().then(res=>{
				console.log(res);
				this.transactions  = res.data;
			})
		},
		viewMore() {
			// 在这里添加跳转到更多交易页面的逻辑
			console.log('跳转到更多交易页面');
			this.$router.push({
				path: "/business/list",
			});

		},
		viewDetail(row) {
			// 在这里添加跳转到详情页的逻辑
			console.log('跳转到详情页', row);
			if(row.type  === 2 ){
				this.$router.push({path: "/details/withdrawals/" + row.id});
			}else {
				this.$router.push({ path: "/details/info/" + row.tradeNo, params: { key: row } });
			}
		},
		getIcon(type) {
			// 根据交易类型返回相应的图标路径
			return type === 2 ? '/icon/zhuanchu.png' : '/icon/zhuanru.png';

		},
		getStatusClass(status) {

			if(status === 5){
				return 'status-success';
			}else if(status === 6){
				return 'status-fail';
			}else if(status === 1){
				return 'status-processing';
			}else{
				return 'status-success';
			}
			// return {
			// 	'status-success': status === '5',
			// 	'status-fail': status === '6',
			// 	'status-processing': status === 3 || status === 5
			// };
		},
		getStatusName(status) {
			const orderStates =  this.$store.state.order.orderState
			for (let i = 0; i <orderStates.length ; i++) {
				if(orderStates[i].value == status){
					return orderStates[i].label;
				}
			}
		},

		getHeight() {
			if (this.selectedOption === "1"&& this.withdraType ==1) {
				return '530px';

			} else {
				return '480px';
			}
		},
	async	gotoCertification()	{

		// 0 未实名 1 已实名 2 审核中
		await getCertificationStatus({
			merId: sessionStorage.getItem("merId")
		})
			.then((response) => {
				const certificationStatus = response.data;
				if (certificationStatus === 2) {

					this.$store.dispatch("goToAuthentication"); // 调用 goToAuthentication action

				} else if (certificationStatus === 0) {
					this.$router.push({ path: "/verify" });

				} else {
					this.$router.push({ path: "/verify" });
				}
			})
			.catch((error) => {
				console.error(error);
			});

		},
		handleInput() {
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
		changeSelection(val) {
			let optionsImg = this.currencyImages,
				i = optionsImg.findIndex((item) => item.title == val);
			this.$refs["refSelect"]
				.$el.children[0]
				.children[0]
				.setAttribute(
					"style",
					`
				background: url(${optionsImg[i].filename}) no-repeat;
				background-position: 16px center;
				background-size: 30px 30px;
				text-indent: 40px;
				`
				);
		},
		hideModal() {
			this.isWithdrawalModalVisible=false;
		},
		hideOpenCurrencyModal() {
			this.isOpenCurrencyModalVisible=false;
		},

		confirmWithdrawal() {
			this.loading=true;
			// 处理确定按钮点击事件
			// 可以在这里执行提现操作等逻辑
			const merNo = sessionStorage.getItem('merNo');
			const merOrderNo =  Date.now().toString();
			const sourceAmount = this.amount;
			const returnUrl = "https://merchant.onlinepay.ai";
			const notifyUrl = "https://merchant.onlinepay.ai";
			const version = "1";
			const currencyCode = this.seOneCurrency;

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
				comment:this.remark,
				type:'0',
				productInfoList: productInfoList
			}).then(res =>{

				if (res.status === 200){
					this.isPro='1';

					this.url = res.data.payUrl;
					// window.open(this.url)
				}
				this.loading=false;

			}).catch(err => {
				this.loading=false;

			});
		},
		confirmOpenCurrency() {
			addAccountBalance( {

				currency: this.seOpenCurrency,
			}).then(res => {
				if (res.status === 200) {
					this.$router.push({
						path: "/details/openCurrency",
						query: {
							currency: this.seOpenCurrency
						}
					});
				}
			});
		},
		openGuide() {
			// 检查localStorage中是否存在merNo的值
			const merNo = sessionStorage.getItem('merNo');
			const storedMerNo = localStorage.getItem('merNokey');
			if (storedMerNo !== merNo) {
				localStorage.setItem('merNokey', merNo);
				this.isFirstLogin = true;
			}

			// 根据环境和登录状态来确定是否显示弹窗
			// if (process.env.NODE_ENV === 'development' ) {
			if (process.env.NODE_ENV === 'development' && this.isFirstLogin) {
				this.showModal = true;
				// alert(process.env.NODE_ENV)
				// alert('1',this.isFirstLogin)
			}
		},
		closeGuide() {
			// alert(process.env.NODE_ENV)
			//
			this.showModal = false;
		},
		// isAll 1全部 0
		merHomeQueryAccount(){
			merQueryAccount({
			}).then(result => {
				if (result.status === 200) {
					this.merchantList=result.data;
					this.merchantListWithAll = [this.$t('sysText.allMerchants'), ...result.data];
					this.selectedMerchant = this.merchantList[0];
				}
			}).then(ret => {
				this.getCurrentCurrency(this.selectedMerchant,'1')
			}).then(res => {
				// if (res.status === 200) {
				this.getHomeAccountBalance("", 1,'all');
				// }
			})
		},
		getCurrentCurrency(merNo, isAll){
			getCurrency({
				merNo:merNo,
				isAll:isAll,
			}).then(res => {
				if (res.status === 200) {
					this.currencyList=res.data;
					this.currencyListWithAll = [this.$t('sysText.allCurrencys'), ...res.data];
					this.selectedCurrency = this.currencyList[0];
				}
			})
		},
		getHomeAccountBalance(merNo, isAll,currency){
			getAccountBalance({
				merNo:merNo,
				isAll:isAll,
				currency:currency,
			}).then(res => {
				if (res.status === 200) {
					this.accountBalance=res.data;
				}
			})
		},
		async	selectMerchant(merchant) {

			this.selectedAllMerchant=merchant;
			this.selectedAllCurrency=this.$t('sysText.allCurrencys');
			if (merchant === this.$t('sysText.allMerchants')) {
				await	this.getCurrentCurrency(sessionStorage.getItem('merNo'),'1')
				this.getHomeAccountBalance("", 1,'all');
			} else {
				await	this.getCurrentCurrency(merchant,'0')
				this.getHomeAccountBalance(merchant, 0,'all');
			}
		},
		selectCurrency(currency) {
			this.selectedAllCurrency=currency;
			if (currency === this.$t('sysText.allCurrencys')) {
				if (this.selectedAllMerchant===this.$t('sysText.allMerchants')) {
					this.getHomeAccountBalance("", 1,'all');
				}else {
					this.getHomeAccountBalance(this.selectedAllMerchant, 0,'all');
				}
			} else {
				if (this.selectedAllMerchant===this.$t('sysText.allMerchants')) {
					this.getHomeAccountBalance("", 1,currency);
				}else {
					this.getHomeAccountBalance(this.selectedAllMerchant, 0,currency);
				}
			}
		},
		selectTXMerchant(merchant) {
			this.selectedMerchant=merchant;
			getAmount({merNo:merchant}).then(res=>{
				this.overAmount=res.data;
			})
		},

		selectValue(){
			if(this.cities1Value == 'USDT'){
				this.withdraType = 2;
			}else{
				this.withdraType = 1;
			}
			getRateAndBankInfo({merNo:this.selectedMerchant,'sourceCurrency':this.citiesValue,'targetCurrency':this.cities1Value}).then(res=>{
				this.rateAndBankInfo = res.data;
			});
		},
		twoWithdraw(code){
			this.withdrawalVisible = false;
			this.withdra1walVisible = true;
			this.cities1Value = code;
			this.citiesValue = code;
			if(this.cities1Value == 'USDT'){
				this.withdraType = 2;
			}else{
				this.withdraType = 1;
			}
			getRateAndBankInfo({merNo:this.selectedMerchant,'sourceCurrency':this.citiesValue,'targetCurrency':this.cities1Value}).then(res=>{
				this.rateAndBankInfo = res.data;
			});
		},
		addWithdraw(){

			this.disabled = true;
			const body = {
				amount:this.withdrawAmount,
			};
			body.merNo=this.selectedMerchant;
			body.id=this.rateAndBankInfo.id;
			if(this.withdraType ==1){
				if (this.selectedOption==="0"){
					body.sourceCurrency = this.citiesValue;
					body.targetCurrency = this.cities1Value;
					body.type=this.selectedOption
				}else{
					body.type=this.selectedOption
					body.country=this.country
					body.bankNumber=this.payee
					body.name=this.payeeName
					body.swift=this.swift
					body.sourceCurrency = this.citiesValue;
					body.targetCurrency = this.cities1Value;
				}

			}else{
				body.sourceCurrency = this.citiesValue;
				body.targetCurrency = this.cities1Value;

			}

			addwithdraw(body).then(res=>{
				if (res.status === 200) {
					this.withdra1walVisible = false;
					this.$message.success(this.$t('cashier.submittedSuccessfully'));
					this.withdrawAmount = 0;
					this.numberAddress =  '';
					this.selectMerchant(this.selectedAllMerchant);
					this.disabled = false;
				}else{
					this.disabled = false;
					this.$message.error()

				}
			}).catch(e=>{
				console.info(e)
				this.disabled = false;
			})
		},
		withdrawjump(){
			this.$router.push({ path: "/settlement/withdrawal"});
		},
		//金额表
		upDataList(value) {
			this.amountListTime = value.timePicker;
			this.$getSummary(value);
		},
		generateUrl() {
			if (this.paymentAmount === '') {
				this.isInputEmpty = true;
				return;
			}
			this.isInputEmpty = false;
			// 请求接口获取url的逻辑
			// 假设获取到的url存储在this.url中
			const merNo = sessionStorage.getItem('merNo');
			const merOrderNo =  Date.now().toString();
			const sourceAmount = this.paymentAmount;
			const returnUrl = "https://checkstand.tapxyz.com/#/result?payCode=2";
			const notifyUrl = "https://merchant.onlinepay.ai";
			const ipAddress = "110.110";
			const version = "1";
			const currencyCode = "USD";

			const secretKey = sessionStorage.getItem('secret');
			const signString = merNo + merOrderNo + currencyCode + sourceAmount + secretKey;
			const md5 = require('md5');
			const sign = md5(signString).toUpperCase();
			const productInfoList = [{sku: "1", productName: "PLAYDB - 1025", price: "1.00", quantity: "1"}];

			checkStand({
				merNo: merNo,
				userId:merNo,
				merOrderNo: merOrderNo,
				sourceAmount: sourceAmount,
				returnUrl: returnUrl,
				ipAddress: ipAddress,
				sign: sign,
				version: version,
				currencyCode: currencyCode,
				businessType: "1",
				notifyUrl: notifyUrl,
				productInfoList: productInfoList
			}).then(res => {
				console.info(res);
				if (res.code === "00000"){
					this.url = res.data.payUrl;
					this.showUrl = true;
				}
			});

		},
		copyUrl() {
			// 复制功能
			// 创建一个新的textarea元素
			const textarea = document.createElement('textarea');
			textarea.value = this.url;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			this.$message.success(this.$t('home.copySuccess'));
		},
		isProGen() {
				this.shareLink='';
				this.seOneCurrency='USD';
				this.seOpenCurrency='USD';
				this.amount='';
				this.remark='';
				this.isPro='0';
			this.$nextTick(() => {
				this.changeSelection(this.seOneCurrency);
				this.changeSelection(this.seOpenCurrency);
			});


		},
		async isBankProOne() {
			// this.shareLink='';
			// this.seOneCurrency='';
			// this.amount='0';
			// this.remark='';
			this.isPro='0';

			this.$nextTick(() => {
				this.changeSelection(this.seOneCurrency);
			});

		},
		redirectToPayment() {
			// 跳转到支付页面的逻辑
			window.location.href = this.url;
			// this.showUrl = false;

		},
		goToAuthentication() {
			this.$store.dispatch("goToAuthentication");
		},
		goToDetails(currency) {
			this.$router.push({
				path: "/details/openCurrency",
				query: {
					currency: currency
				}
			});
		},
		async showDialog(type) {
			console.log(type,"2");
			await store.dispatch("checkAuditStatus");
			if (type === 'share') {
				this.isWithdrawalModalVisible = true;
				this.isProGen()
			}else if (type === 'recharge') {
				// this.dialogTitle = this.$t('home.merchantCashier');
				// this.centerDialogVisible = true;

				this.$router.push({ path: '/currencySelect' })
			} else if (type === 'withdraw') {

        this.$router.push({ path: '/digitTransfer' })

				// this.withdrawalVisible = true;
				// getAmount({merNo:this.selectedMerchant}).then(res=>{
				// 	this.overAmount=res.data;
				// })
			} else if (type === 'newCurrency') {
				// this.dialogTitle =  this.$t('home.selectWithdrawalCurrency');
				this.isOpenCurrencyModalVisible = true;
				this.isProGen()


			}else if(type === 'buyAndSell'){
				console.log(123);
				this.$router.push({ path: '/buyAndSell' })

			}

		},
		closeDialog() {
			this.isInputEmpty = false;
			this.centerDialogVisible = false;
			this.showUrl = false;
		},

		$getSummary(value) {
			getSummary({
				startTime: value.timePicker[0],
				endTime: value.timePicker[1],
				baseCode: value.currency,
				merNo:value.merNo
			}).then(res => {
				if (res.status === 200) {
					this.getSummaryObj = res.data;
					this.getSummaryCode = res.data.baseCode
				}
			});
		},
		//交易表
		upDataList1(value) {
			this.$getTradeSum(value);
		},
		$getTradeSum(value) {
			getTradeSum({
				startTime: value.timePicker[0],
				endTime: value.timePicker[1],
				baseCode: value.currency,
				merNo:value.merNo
			}).then(res => {
				if (res.status === 200) {
					this.getTradeSumlist = res.data.dayData;
					this.getTradeSumCode = res.data.dayData[0]?.baseCode
					this.chart1("", res.data.dayData);
				}
			});
		},
		//异常表
		upDataList2(value) {
			this.$getProtest(value);
		},
		$getProtest(value) {
			getProtest({
				startTime: value.timePicker[0],
				endTime: value.timePicker[1],
				baseCode: value.currency,
				merNo:value.merNo
			}).then(res => {
				if (res.status === 200) {
					this.getProtestArr = res.data;
					this.getProtestCode = res.data[0]?.baseCode
					this.chart2("", res.data);
				}
			});
		},
		//金额点击跳转
		handleGoUnbalanced() {
			this.$router.push({ path: "/settlement/unbalanced", query: { amountListTime: this.amountListTime } });
		},


		//交易图
		chart1(id, data) {
			// 处理时间
			const time = data.map(item => item.time);
			const newTime = this.dayjs().format("YYYY-MM-DD HH");
			if (this.dayjs(time[time.length - 1]).diff(this.dayjs(time[0]), "day") <= 1) {
				time.forEach((item, index) => {
					if (time[index] === newTime) {
						time[index] = newTime;
					} else {
						if (index !== 0 && index !== time.length - 1) time[index] = "";
					}
				});
			}
			// 处理成功数据
			const successArr = data.map(item => item.tradeSucceedtAmount);
			//处理失败数据
			const failtArr = data.map(item => item.tradeFailtAmount);
			let option = {
				tooltip: {
					trigger: "item",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985",
						},
					},
					formatter: (params) => {
						//交易成功/失败 字体样式
						const colorFont = params.componentIndex === 0 ? "color:#7F8DFF" : "color:#364A63";
						// 币种
						const baseCode = this.getTradeSumlist[params.dataIndex].baseCode;
						//交易成功/失败金额
						let amount;
						if (params.componentIndex === 0) {
							if (this.getTradeSumlist[params.dataIndex].tradeSucceedtAmount >= 10000) {
								amount = sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(this.getTradeSumlist[params.dataIndex].tradeSucceedtAmount, 1000), 100)), 100) + "k";
							} else {
								amount = this.getTradeSumlist[params.dataIndex].tradeSucceedtAmount;
							}
						} else {
							if (this.getTradeSumlist[params.dataIndex].tradeFailtAmount >= 10000) {
								amount = sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(this.getTradeSumlist[params.dataIndex].tradeFailtAmount, 1000), 100)), 100) + "k";
							} else {
								amount = this.getTradeSumlist[params.dataIndex].tradeFailtAmount;
							}
						}
						//交易成功/失败笔数
						const number = params.componentIndex === 0 ? this.getTradeSumlist[params.dataIndex].succeedCount : this.getTradeSumlist[params.dataIndex].failCount;
						// 交易成功/失败占比
						const rate = params.componentIndex === 0 ? this.getTradeSumlist[params.dataIndex].succeedRate : this.getTradeSumlist[params.dataIndex].failRate;
						return `<div class="hover-echarts-wrap">
							<div class="hover-echarts-time">${this.getTradeSumlist[params.dataIndex].time}</div>
							<div class="hover-echarts-amount" style="${colorFont}">${params.seriesName}{{$t('home.amount')}} ${baseCode} ${amount}</div>
							<div class="hover-echarts-number">${params.seriesName}{{$t('home.count')}}${number}（${rate}）</div>
						</div>`;
					},
				},
				grid: {//grid是用来控制直角坐标系的布局和大小
					left: "4%",
					top: "15%",
					right: "4%",
					bottom: "17%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: time,
					axisTick: {
						show: false, // 去除x轴刻度
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						color: "#8094AE",
						fontWeight: 500,
						rotate: 45,
						fontSize: 10,
						formatter: (value) => {
							if (value !== "") {
								let timeX = value.split("-");
								return timeX[1] + "-" + timeX[2];
							}
						},
					},
				},
				yAxis: {
					type: "value",
					scale: true,//缩放，脱离0值比例
					axisLabel: {
						formatter: (value) => {
							if (value >= 10000) {
								return this.getTradeSumlist[0].baseCode + " " + sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(value, 1000), 100)), 100) + "k";
							} else {
								return this.getTradeSumlist[0].baseCode + " " + value;
							}
						},
					},
				},
				legend: {
					data: [this.$t('home.transactionSuccess'), this.$t('home.transactionFailed')],
					bottom: 15,
					icon: "rect",
					itemWidth: 15,
					itemHeight: 3,
				},
				series: [
					{
						type: "line",
						name: this.$t('home.transactionSuccess'),
						symbolSize: 10,
						showSymbol: false,
						data: successArr,
						//曲线的样式
						lineStyle: {
							width: 2,
							color: "#7F8DFF",
							type: "solid",//solid、dashed、dotted。线的实、虚
						},
					},
					{
						type: "line",
						name: this.$t('home.transactionFailed'),
						symbolSize: 10,
						showSymbol: false,
						color: "#DBDFEA",
						data: failtArr,
						//曲线的样式
						lineStyle: {
							width: 2,
							color: "#9da7b3",
							type: "solid",//solid、dashed、dotted。线的实、虚
						},
					},
				],
			};
			this.$set(this.chartData, "options", option);
			const chart = this.$refs.transactionChart;
			if (chart.chartAttrDom) this.$refs.transactionChart.chartAttrDom.clear();
			this.$refs.transactionChart.drawLine();
		},
		//异常图
		chart2(id, data) {
			//时间处理
			const time = data.map(item => item.time);
			const newTime = this.dayjs().format("YYYY-MM-DD HH");
			if (this.dayjs(time[time.length - 1]).diff(this.dayjs(time[0]), "day") <= 1) {
				time.forEach((item, index) => {
					if (time[index] === newTime) {
						time[index] = newTime;
					} else {
						if (index !== 0 && index !== time.length - 1) time[index] = "";
					}
				});
			}
			//拒付处理
			const protestArr = data.map(item => item.protestSumAmount);
			//退款数据
			const refundArr = data.map(item => item.refundSumAmount);
			let option = {
				tooltip: {
					trigger: "item",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985",
						},
					},
					formatter: (params) => {
						//拒付/退款 字体样式
						const colorFont = params.componentIndex === 0 ? "color:#FDCD32" : "color:#364A63";
						// 币种
						const baseCode = this.getProtestArr[params.dataIndex].baseCode;
						//拒付/退款金额
						let amount;
						if (params.componentIndex === 0) {
							if (this.getProtestArr[params.dataIndex].protestSumAmount >= 10000) {
								amount = sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(this.getProtestArr[params.dataIndex].protestSumAmount, 1000), 100)), 100) + "k";
							} else {
								amount = this.getProtestArr[params.dataIndex].protestSumAmount;
							}
						} else {
							if (this.getProtestArr[params.dataIndex].refundSumAmount >= 10000) {
								amount = sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(this.getProtestArr[params.dataIndex].refundSumAmount, 1000), 100)), 100) + "k";
							} else {
								amount = this.getProtestArr[params.dataIndex].refundSumAmount;
							}
						}
						//拒付/退款笔数
						const number = params.componentIndex === 0 ? this.getProtestArr[params.dataIndex].protestCount : this.getProtestArr[params.dataIndex].refundCount;
						// 拒付/退款占比
						const rate = params.componentIndex === 0 ? this.getProtestArr[params.dataIndex].protestRate : this.getProtestArr[params.dataIndex].refundRate;
						return `<div class="hover-echarts-wrap">
							<div class="hover-echarts-time">${this.getProtestArr[params.dataIndex].time}</div>
							<div class="hover-echarts-amount" style="${colorFont}">${params.seriesName}{{$t('home.amount')}}${baseCode} ${amount}</div>
							<div class="hover-echarts-number">${params.seriesName}{{$t('home.count')}}${number}（${rate}）</div>
						</div>`;
					},
				},
				grid: {//grid是用来控制直角坐标系的布局和大小
					left: "4%",
					top: "15%",
					right: "4%",
					bottom: "17%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: time,
					axisTick: {
						show: false, // 去除x轴刻度
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						color: "#8094AE",
						fontWeight: 500,
						rotate: 45,
						fontSize: 10,
						formatter: (value) => {
							if (value !== "") {
								let timeX = value.split("-");
								return timeX[1] + "-" + timeX[2];
							}
						},
					},
				},
				yAxis: {
					type: "value",
					scale: true,//缩放，脱离0值比例
					axisLabel: {
						formatter: (value) => {
							if (value >= 10000) {
								return this.getProtestArr[0].baseCode + " " + sumHandle.floatDiv(Math.floor(sumHandle.floatMul(sumHandle.floatDiv(value, 1000), 100)), 100) + "k";
							} else {
								return this.getProtestArr[0].baseCode + " " + value;
							}
						},
					},
				},
				legend: {
					data: [this.$t('home.chargeback'), this.$t('home.refund')],
					bottom: 15,
					icon: "rect",
					itemWidth: 15,
					itemHeight: 3,
				},
				series: [
					{
						type: "bar",
						name: this.$t('home.chargeback'),
						color: "#FDCD32",
						data: protestArr,
					},
					{
						type: "bar",
						name: this.$t('home.refund'),
						color: "#9EA2A9",
						data: refundArr,
					},
				],
			};
			this.$set(this.chartData2, "options", option);
			const chart = this.$refs.refusalsLeft;
			if (chart.chartAttrDom) this.$refs.refusalsLeft.chartAttrDom.clear();
			this.$refs.refusalsLeft.drawLine();
		},
	},

};
</script>
<style lang="less" scoped>
.font_size_down{
	font-weight: 500;
	font-size: 24px;
	color: #526484;
	line-height: 32px;
	text-align: left;
	font-style: normal;
}
/deep/.dialog_header_edit .el-dialog__header span{
	font-weight: 500;
	font-size: 24px;
	color: #211F32;
	line-height: 30px;
	text-align: right;
	font-style: normal;
}
/deep/.dialog_header_edit .el-dialog{
	background: #FFFFFF;
	box-shadow: 0px 2px 6px 0px #DBDFEA;
	border-radius: 16px;
	border: 1px solid #DBDFEA;
}
.quesheng{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%; /* 或者设置一个具体的高度，如 300px */
	padding: 20px;
	margin-bottom: 20px;
	text-align: center;
}
.quesheng img{
	max-width: 100%; /* 保证图片宽度不会超过容器宽度 */
	height: auto; /* 高度自动以适应宽度 */
	margin-bottom: 10px; /* 与下方文字保持一些间距 */
	width:300px;
}
.empty-list-text {
	margin: 0; /* 去除默认的margin */
	color: #526484;
	font-weight: 400;
	font-size: 14px;
}

.app-container {
	padding-left: 60px;
	padding-top: 52px;
	//background-color: #EBEDF0;;
}
.group_2 {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 24px;
	//width: 941px;
	//height: 360px;
	border: 1px solid rgba(255, 255, 255, 1);
	background-color: #EBEDF0;;
	margin: 30px 0 0 0px;
	padding: 30px 40px 0px 40px;
	align-content: center;

}
::v-deep .el-dialog__header {
	border-bottom: none;
}
.page-titles {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}
.text-wrapper_16 {
	margin-top: 4px;


}
.text_5 {
	//width: 72px;
	//height: 36px;
	font-size: 18px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 36px;
	//margin-left: 689px;
}
.thumbnail_2 {
	width: 12px;
	height: 9px;
	margin: 13px 0 0 10px;
}
.custom-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	padding: 24px 30px 53px;
	margin-bottom: 24px;

}
.custom-two-style {
	//width: 941px;
	//height: 203px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.custom-four-style {
	//width: 941px;
	//height: 150px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.my-special-class {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.my-special-class .btn {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.my-special-class .btn_two {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.my-special-class .btn + .btn {
	margin-left: 20px;
}

.my-special-class .btn-text {
	font-size: 14px;
	font-family: Roboto-Medium, Roboto;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 16px;
}
.custom-three-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	flex-grow: 1;

	padding: 20px 30px 22px;
	//margin-bottom: 24px;

}
.text_70 {
	//width: 64px;
	//height: 20px;
	font-size: 16px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.text_8 {
	width: 56px;
	height: 20px;
	font-size: 14px;
	font-family: 'PingFangSC-Semibold', 'PingFang SC';
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.new-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 24px;
	color: #526484;
	line-height: 26px;
	text-align: left;
	font-style: normal;
}
.new-style-8 {
	width: 110px;
	height: 32px;
	font-size: 28px;
	font-family: 'Roboto-Medium', 'Roboto';
	font-weight: 500;
	color: #7F8DFF;
	line-height: 32px;
}
.custom-title {
	//width: 120px;
	height: 20px;
	font-size: 14px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #7F8DFF;
	line-height: 20px;
	background: none;
	border: none;
	cursor: pointer;
}

.custom-title:hover {
	text-decoration: underline;
}
.new-two-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 16px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
}
.new-two-style-8 {
	width: 42px;
	height: 24px;
	font-size: 20px;
	font-family: 'PingFangSC-Medium', 'PingFang SC';
	font-weight: 500;
	color: #364A63;
	line-height: 24px;
}
.custom-div {
	width: 25px;
}
.dialog-content {
	//width: 506px;
	//height: 527px;
	display: flex;
	flex-direction: column;
}

.section-input {
	margin-bottom: 31px;
	margin-top: 5px;
}
.generated-url {
	width: 436px;
	height: 40px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #DBDFEA;
	padding-left: 10px;
	padding-right: 10px;
	margin-bottom: 22px;
	display: flex;
	flex-direction: column;
	justify-content: center;

}
.url-content {
	justify-content: space-between;
	align-content: center;
	align-items: center;
	display: flex;
	flex-direction: row;

}

.copy-div {
	display: flex;
	flex-direction: row;
	justify-content: end;
}
.copy-button {
	//width: 40px;
	//height: 22px;
	width: 40px;
	height: 22px;
	background: #F5F6FF;
	border-radius: 2px;
	border: 1px solid #7F8DFF;
	display: flex;

	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.text_120 {
	//width: 24px;
	//height: 20px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #7F8DFF ;
	line-height: 18px;

}
.url-text {
	//width: 404px;
	//height: 36px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8094AE;
	//line-height: 18px;
	//margin-bottom: 20px;

}

.generate-link-button {
	width: 146px;
	height: 42px;
	background: #7F8DFF;
	border-radius: 4px;
	float: right;
}

.block-container {
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	width: 456px;
	height: 300px;
	border: 1px solid rgba(219, 223, 234, 1);
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}

.block-image {
	display: flex;
	flex-direction: column;
	align-items: center;
	//margin:  0  0;
}
.block-image-code-con {
	width: 300-26px;
	height: 267-26px;
}

.block-text-wrapper {
	background-color: rgba(245, 247, 254, 1);
	border-radius: 4px;
	height: 36px;
	width: 160px;
	margin: 24px 0 30px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.block-text {
	overflow-wrap: break-word;
	color: rgba(127, 141, 255, 1);
	font-size: 14px;
	font-weight: normal;
	text-align: center;
	white-space: nowrap;
	line-height: 20px;
}
.clean-style {
	//width: 195px;
	height: 36px;
	padding-left: 20px;
	padding-right: 20px;
	background: #FFFFFF;
	border-radius: 18px;
	border: 1px solid #E5E9F2;
}
.text_sdgsga {
	width: 220px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	text-align: end;
	color: #364A63;
}
.chongzhi-button {
	//min-width: 88px;
	height: 32px;
	background: #7F8DFF;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button:hover {
	opacity: 0.8; /* 鼠标悬停时的不透明度 */
}
.chongzhi-button2 {
	//min-width: 88px;
	height: 32px;
	background: #F7F9FE;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button2:hover {
	background-color: #7F8DFF/* 鼠标悬停时的不透明度 */
}
.chongzhi-button2:hover .btn-text-te2 {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.chongzhi-button2:hover .svg-tabs {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.btn-text-te {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	font-style: normal;
	padding-left: 8px;
}
.btn-text-te2 {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	padding-left: 8px;
}
.scrollable-container {
	padding-right: 10px;
	overflow: scroll;
	white-space: nowrap;
	scrollbar-width: thin;
	scrollbar-color: #C5CAD4 #EBEEF4;
}

.scrollable-container::-webkit-scrollbar {
	width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
	background-color: #F5F5F5;
}

.scrollable-container::-webkit-scrollbar-thumb {
	background-color: #7F8DFF;
}

.content {
	padding-top: 20px;
	padding-bottom: 10px;
}
.cursor-pointer {
	cursor: pointer;
}
.item {
	display: inline-block;
	width: 256-32px;
	height: 208-32px;
	background: #F7F9FE;
	border-radius: 16px;
	margin-right: 12px;
	padding: 16px;
	cursor: pointer;
}

.transaction-section {
	padding: 20px 20px 20px 0px;
	background: #fff;
	margin-top: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.header h3 {
	margin: 0;
	color: #364A63;
	font-size: 18px;
}

.view-more {
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	text-decoration-line: underline;
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
}

.transaction-list {
	display: flex;
	flex-direction: column;
}

.transaction-item {
	display: flex;
	justify-content: space-between;
	padding: 15px 0;
	cursor: pointer;
	border-bottom: 1px solid #f0f0f0;
}

.transaction-item:hover {
	background:#F6F8FE;
}

.transaction-left {
	display: flex;
	align-items: center;
}

.icon {
	width: 40px;
	height: 40px;
	margin-right: 10px;
}

.transaction-info {
	display: flex;
	flex-direction: column;
}

.transaction-type {
	font-size: 14px;
	font-weight: 600;
	color:#364A63;
}

.transaction-date {
	margin-top:5px;
	font-size: 12px;
	color: #8094AE;
}

.transaction-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.transaction-amount {
	font-size: 14px;
	font-weight: 600;
}

.transaction-status {
	font-size: 12px;
	margin-top: 5px;
}

.status-success {
	color: #67c23a;
}

.status-fail {
	color: #f56c6c;
}

.status-processing {
	color: #e6a23c;
}
</style>
<style scoped lang="css" src="../assets/styles/home_dig.css" />