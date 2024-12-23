<template>
	<div class="page flex-col">
		<div class="block_1 flex-col justify-center">
			<div class="box_1 flex-row">
					<img class="label_1"
							 referrerpolicy="no-referrer"
							 src="./assets/img/SketchPngcf0409b4e46f3940a18dee8cef0a718f8e87f756e6ad8a6a090d89e68dd18479.png"
							 @click="goBack"
					/>

				</div>

			<div class="group_3 flex-col align-center">
				<span class="text_2" style="margin-bottom: 6px">{{$t("card.open_sub_card")}}</span>
				<span style="font-weight: 400;
font-size: 14px;
margin-bottom: 20px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">{{$t("card.subcard_descr")}}</span>
				<div class="section_1 flex-row align-center">
					<div></div>
					<div class="box_3" :style="boxStyle"></div>

					<div class="group_4"></div>

				</div>
				<div class="text-wrapper_1 flex-row justify-between">
					<span :class="{'text_5': numberStep === '1', 'text_4': numberStep !== '1'}">{{$t("card.card_limit")}}</span>
<!--					<span :class="{'text_5': numberStep === '2', 'text_4': numberStep !== '2'}">基础信息</span>-->
					<span :class="{'text_5': numberStep === '2', 'text_4': numberStep !== '3'}">{{$t("card.card_fee")}}</span>
				</div>
				<div class="section_2 flex-col" v-if="numberStep === '1'">
					<div class="card-limit-form">
						<h2 class="card-limit-form__title">{{$t("card.card_limit")}}</h2>

						<div class="card-limit-form__usage-types">
							<div
								v-for="type in usageTypes"
								:key="type.value"
								:class="[
          'card-limit-form__usage-type',
          { 'card-limit-form__usage-type--selected': selectedUsageType === type.value }
        ]"
								@click="selectUsageType(type.value)"
							>
								<h3 class="h3_label_1">{{ type.label }}</h3>
								<p class="p_label_1">{{ type.description }}</p>
							</div>
						</div>

						<template v-if="selectedUsageType === '1'">
							<div class="card-limit-form__form-group">
								<label>{{$t("card.cycle_settings")}}</label>
								<el-radio-group v-model="formData.cycleType" class="radio-group">
									<el-radio label="1">{{$t("card.natural_day")}}</el-radio>
									<el-radio label="0">{{$t("card.natural_month")}}</el-radio>
								</el-radio-group>
							</div>
							<div v-if="formData.cycleType === '1'"  class="card-limit-form__form-group">
								<label>{{$t("card.natural_day_settings")}}</label>
								<el-input v-model="formData.cycleDay" class="input-420px" placeholder="1-28"></el-input>
							</div>
						</template>

						<template v-if="selectedUsageType === '0'">
							<div class="card-limit-form__form-group">
								<label>{{$t("card.expiration_date")}}</label>
								<el-date-picker
									v-model="formData.time"
									type="daterange"
									range-separator="-"
									class="input-420px"
									:start-placeholder=startdate
									:end-placeholder=enddate>
								</el-date-picker>
							</div>
						</template>

						<div>
							<div class="card-limit-form__form-group">
								<label>{{$t("card.max_tradeaction")}}</label>
								<el-input
									class="input-420px"
									v-model="formData.maxNum"
									:placeholder="selectedUsageType === '2' ? '1' : ''"
									:disabled="selectedUsageType === '2'"
								></el-input>
								<div style="margin-bottom: 16px"></div>

							</div>
							<div class="card-limit-form__form-group">
								<label>{{$t("card.card_limits")}}</label>
								<el-input class="input-420px" v-model="formData.maxAmount"></el-input>
								<div style="margin-bottom: 16px"></div>
							</div>
						</div>

						<el-button class="text-wrapper_3121212"  type="primary" @click="continueStep('021201')"><span>{{$t("translations.nextStep")}}</span></el-button>
					</div>

				</div>

				<div class="section_2 flex-col" v-if="numberStep === '2'">
					<span class="text_7">{{$t("card.card_fee")}}</span>

					<div class="ccf-fee-row">
						<span class="ccf-fee-label">{{$t("card.card_issuance_fee")}}</span>
						<span class="ccf-fee-amount">{{ currencyFeeMap.hkdFee }} HKD <span class="ccf-fee-amount_small"> ({{ currencyFeeMap.fee }} USDC)</span></span>
					</div>
					<div class="ccf-payment-row">
						<span class="ccf-payment-label">{{$t("card.payment_amount")}}</span>
						<div class="ccf-custom-select"  ref="selectContainer">
							<section @click="toggleDropdown">
								<div class="ccf-select-value">
									<img :src="`/currency/${selectedCurrency.flag}.png`" alt="Currency icon" class="ccf-currency-icon">
									<span>{{ selectedCurrency.currency }}</span>
								</div>
								<div class="ccf-select-arrow"></div>
							</section>

							<div class="ccf-dropdown" v-show="isDropdownOpen">
								<div
									v-for="currency in currencySelectList"
									:key="currency.value"
									class="ccf-dropdown-item"
									@click="selectCurrency(currency)"
								>
									<img :src="`/currency/${currency.currency}.png`" alt="Currency icon" class="ccf-currency-icon">
									<span>{{ currency.currency }}</span>
								</div>
							</div>
						</div>
					</div>
					<div style="margin-top: 4px">
						<span style="margin-right: 298px"></span>
						<span class="ccf-balance-amount">{{$t("card.available_balance")}}:{{ getCurrencyBalance }} {{ selectedCurrency.currency }}</span>
					</div>
					<div class="ccf-button-row">
						<el-button class="text-wrapper_400"  type="primary" @click="decrementStep"><span class="text_12">{{$t("card.prestep")}}</span></el-button>
						<el-button class="text-wrapper_3"  type="primary" @click="continueStep"><span class="text_12">{{$t("card.confirmd")}}</span></el-button>
					</div>
				</div>

				<div v-else>
				</div>
			</div>
		</div>
<!--		<el-dialog :visible.sync="dialogVisible" :close-on-click-modal="true">-->
<!--			<img :src="previewUrl" style="max-width: 50%;" />-->
<!--		</el-dialog>-->
	</div>

</template>
<script>
import router from "@/router";
import {
	addVpaScene,
	cardApplication,
	certificationApply,
	getCertificationStatus,
	openCard,
	upload,
	uploadFid
} from "@/api/certification";
import { getCargodeDetails } from "@/api/business";
import { getBlongBusiness, getCertificationsCategory,getCardSetting } from "@/api/register";
import { getAccountBalance } from "@/api/home";
import i18n from "@/i18n";

export default {

	data() {
		return {
			startdate:i18n.t('card.start'),
			enddate:i18n.t('card.end'),
			isDropdownOpen: false,
			currentCardType: '',
			currencySelectList: [],
			selectedCurrency: null,
			currencyFeeMap: {
				"overAmount": '',
				"fee": '',
				"hkdFee": ''
			},
			numberStep:'1',
			hyOptions: [],
			formData: {
				/**
				 * 开始时间
				 */
				startTime: '',

				/**
				 * 结束时间
				 */
				endTime: '',

				/**
				 * 最大数量
				 */
				maxNum: '',

				/**
				 * 最大金额
				 */
				maxAmount: '', // 使用 BigDecimal 可能表示为数字

				/**
				 * 类型
				 */
				type: '',

				/**
				 * 周期类型
				 */
				cycleType: '0', // 使用 null 表示 Integer 类型

				/**
				 * 场景名称
				 */
				sceneName: '',

				/**
				 * 场景ID
				 */
				sceneId: '',

				/**
				 * 自然日天数
				 */
				cycleDay: '',

				/**
				 * 卡片种类
				 */
				productType: '021201',

				/**
				 * 手续费币种
				 */
				payType: '',

				/**
				 * VPA场景ID
				 */
				sceneId: '',

				/**
				 * 主卡卡号
				 */
				mainCardNo: '',

				/**
				 * 是否主卡 (0: 子卡, 1: 主卡)
				 */
				isMainCard: '0' //
			},
			dialogVisible: false,
			previewUrl: '',
			// type 0:期限使用 1:周期使用 2:单次使用
		usageTypes: [
				{ value: '1', label: i18n.t('card.periodic_use'), description: i18n.t('card.preipdic_desc') },
				{ value: '0', label: i18n.t('card.time_linited_use'), description: i18n.t('card.time_limit_desc') },
				{ value: '2', label: i18n.t('card.signle_use'), description: i18n.t('card.signle_use_desc') },
			],
			selectedUsageType: '1',
			periodicType: '0',
			monthlyResetDay: '',
			dateRange: [],
			maxTransactionCount: '',
			maxTransactionAmount: '',
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
				{ value: 'PE', label: 'Peru' },
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
			idTypeOptions:[
				{ label: '居民身份证', value: '01' },
				{ label: '护照', value: '04' },
			],
			idTypeOptions2:[
				{ label: '港澳台通行证', value: '03' },
				{ label: '其他类个人有效证件', value: '06' }
			],
			fileList1: [],
			fileList2: [],
			fileList3: [],
			fileList4: [],
			fileList5: [],
			fileList6: [],
			headers: { Authorization: sessionStorage.getItem("JWT"),
			},
		};
	},
	mounted() {
		this.formData.mainCardNo = this.$route.params.mainCardId;
		this.getCertification()
		this.getCardTypesAccountBalance()
	},
	watch: {
		selectedUsageType(newType) {
			if (newType === '2') {
				this.maxTransactionCount = '1';
			}
		}
	},
	methods: {
		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;

		},
		selectCurrency(currency) {
			this.selectedCurrency = currency;
			this.isDropdownOpen = false;
		},
		selectUsageType(type) {
			this.selectedUsageType = type;
			if (type === '2') {
				this.formData.maxNum = '1';
			}else {
				this.formData.maxNum = '';
			}
		},
		handleChange(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		getCertification() {
			getCertificationsCategory()
				.then(result => {
					if (result.status === 200) {
						const data = result.data;
						// 遍历 data 中的每个属性
						Object.keys(data).forEach(key => {
							// 检查 formData 中是否有对应的字段
							if (this.formData.hasOwnProperty(key)) {
								this.formData[key] = data[key] !== null ? data[key] : ''; //
							}
						});
					}
				})
				.catch(error => {
				});
		},
		getCardTypesAccountBalance(){
			getAccountBalance({
				isAll:0,
				currency:'all',
			}).then(res => {
				if (res.status === 200) {
					this.currencySelectList=res.data.merAccount;
					this.currencySelectList.find(item => {
						if(item.currency === 'USDC'){
							this.selectedCurrency = item;
						}
					})
				}
			})
		},
		getCardSettingData(productType,currency) {
			getCardSetting({productType:productType,currency:currency})
				.then(result => {
					if (result.status === 200){
						this.currencyFeeMap = result.data;
					}
				})
				.catch(error => {
				});
		},
		setFileData(fileList, photoKey, idKey) {
			if (fileList.length !== 0) {
				this.formData[photoKey] = fileList[0].url; // 假设取第一个文件
				this.formData[idKey] = fileList[0].fid;
			}
		},
		handleRemove(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		handlePreview(file) {
			// 预览图片
			console.log('预览图片', file);
			this.previewUrl = file.url;
			this.dialogVisible = true;
		},
		beforeUpload(file) {
			// const allowedFormats = [
			// 	'image/png',
			// 	'image/jpeg',
			// 	'image/gif',
			// 	'image/bmp',
			// 	'image/webp',
			// 	'image/tiff',
			// 	// 添加其他允许的图片格式
			// ];
			// const isAllowedFormat = allowedFormats.includes(file.type);
			// if (!isAllowedFormat) {
			// 	this.$message.error('只能上传图片');
			// }
			// return isAllowedFormat;
		},
		handleAvatarSuccess(file, fileList, targetArray){
			console.info(file.file.name);
			const formData = new FormData();
			formData.append('file', file.file); // 将文件对象添加到 FormData 中
			formData.append("type", "certification");

			uploadFid(
				formData,
			).then(res => {
				// 遍历 fileList，将每个文件的名称和URL加入到数组中
				console.info(this.fileList1.length);

				fileList.forEach(item => {

					if (item.name === res.data.fileName) {
						console.info(res.data.fileName);

						item.url = res.data.url; // 将接口返回的url赋给匹配项的url属性
						item.fid = res.data.fid; // 将接口返回的url赋给匹配项的url属性
						item.name = res.data.fileName; // 将接口返回的url赋给匹配项的url属性
					}

				});
				console.info(this.fileList1);
			}).catch(err => {
				// fileList.splice(0, 1); // 删除刚刚上传的文件
				// this.$message.error('上传失败，请稍后再试');
				console.error(err);
			});
		},
		continueStep(cardTypes) {
			if (this.numberStep === '1') {
				// 001001:通华金服VISA公务卡 001201:通华金服VISA虚拟卡 021201:通华VPA电子卡
				if(cardTypes){
					this.currentCardType=cardTypes;
					this.getCardSettingData(cardTypes,'USDC');
				}
				this.formData.type=this.selectedUsageType
				if(this.formData.time){
					this.formData.startTime=this.formData.time[0]
					this.formData.endTime=this.formData.time[1]
					this.$delete(this.formData, "time");
				}


				addVpaScene(this.formData)
					.then((response) => {
						if (response.status === 200) {
							this.formData.sceneId=response.data

							this.numberStep = '2';
						}

					})
					.catch((error) => {
						console.error(error);
					});

			} else if (this.numberStep === '2') {
				// isMainCard 0:子卡 1:主卡
				this.formData.isMainCard=0;
				this.formData.payType=this.selectedCurrency.currency
				// productType卡片种类
				// payType手续费币种
				// sceneId vpa场景id
				// mainCardNo 主卡卡号
				// isMainCard 0:子卡 1:主卡
				openCard(this.formData)
					.then((response) => {
						this.$message.success(response.msg);
						this.goBack();

					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				// 调用方法处理文件列表
				this.setFileData(this.fileList1, 'photoFront1', 'photoFrontId1');
				this.setFileData(this.fileList2, 'photoBack1', 'photoBackId1');
				this.setFileData(this.fileList3, 'photoBack1', 'photoBackId1'); // 可能需要合并逻辑
				this.setFileData(this.fileList4, 'photoFront2', 'photoFrontId2');
				this.setFileData(this.fileList5, 'photoBack2', 'photoBackId2');
				this.setFileData(this.fileList6, 'agmUrl', 'agmFid');
				this.formData.payType=this.selectedCurrency.currency;
				this.formData.productType=this.currentCardType;
				openCard(this.formData)
					.then((response) => {
						this.goBack();

					})
					.catch((error) => {
						console.error(error);
					});

				// router.push({ path: '/AuthenticationProcessing' });

				// this.numberStep='1';
			}
		},
		goBack() {
			router.back();
		},
		decrementStep() {
			// 检查是否等于 1
			if (this.numberStep === '1') {
				this.goBack();
			}
			// 将 numberStep 转换为数字
			let currentStep = Number(this.numberStep);

			// 减一
			currentStep -= 1;

			// 更新 numberStep
			this.numberStep = currentStep.toString(); // 转回字符串

		},
	},
	computed: {
		getCurrencyBalance() {
			const foundItem = this.currencySelectList.find(item => item.currency === this.selectedCurrency.currency);
			return foundItem ? foundItem.overAmount : ''; //
		},
		boxStyle() {
			let width = '';
			if (this.numberStep === '1') {
				width = '0';
			} else if (this.numberStep ==='3') {
				width = '49%';
			} else if (this.numberStep ==='2') {
				width = '100%';
			}
			return { width };
		}
	}
};
</script>
<style scoped lang="css" src="../Card/assets/common.css" />

<style scoped lang="css" src="./assets/company_verification.css" />
<style scoped>
/*/deep/.el-input__inner {*/
/*	width: 420px;*/
/*	height: 40px;*/
/*	color: black;*/

/*}*/
.input-200px {
	width: 200px !important;
	font-size: 14px;
}
.input-420px {
	width: 420px !important;
	font-size: 14px;
}
.input-300px {
	width: 292px !important;
	font-size: 14px;
}
.input-100px {
	width: 120px !important;
	font-size: 14px;
	margin-right: 8px;
}
/deep/.el-upload-dragger {
	width: 876px;
	height: 66px;

	/*background: #FFFFFF;*/
	border-radius: 4px;
	/*border: 1px dashed #DBDFEA;*/
	margin: 7px 33px 0 33px;
}
/deep/.el-upload-list__item-name {
	width: 876px;

	margin: 0 33px 0 33px;
}
</style>

<style scoped>
.visa-selector {
	max-width: 1200px;
	margin: 0 auto;
	padding: 33px 33px 59px 33px;
}

.visa-selector__title {
	font-weight: 600;
	font-size: 20px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;

	margin-bottom: 30px;

}

.visa-selector__container {
	display: flex;
	gap: 60px;
}

.visa-card {
	width: 240px;
	height: 340px;
	box-sizing: border-box;
	flex: 1;
	background: #FFFFFF;
	border-radius: 16px;
	border: 1px solid #DBDFEA;
	display: flex;
	flex-direction: column;
}

.visa-card__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	height: 72px;
	border-bottom: 1px solid #DBDFEA;
}

.visa-card__name {
	font-weight: 600;
	font-size: 18px;
	color: #364A63;
	line-height: 25px;
	text-align: left;
	font-style: normal;
}
.visa-card__name_small {
	font-weight: 500;
	font-size: 14px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;

}

.visa-card__logo {
	width: 48px;
	height: 32px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.visa-card__logo-text {
	color: white;
	font-size: 12px;
	font-weight: 500;
}

.visa-card__logo--gray { background-color: #9CA3AF; }
.visa-card__logo--blue { background-color: #1E40AF; }
.visa-card__logo--black { background-color: #000000; }

.visa-card__content {
	flex-grow: 1;
	padding:33px 20px;
}

.visa-card__info {
	display: flex;
	/*align-items: center;*/
	margin-bottom: 24px;
}

.visa-card__check-icon {
	width: 16px;
	height: 16px;
	margin-right: 8px;
	/*background-color: #3B82F6;*/
	border-radius: 50%;
	position: relative;
}

.visa-card__check-icon::after {
	content: '';
	position: absolute;
	width: 6px;
	height: 10px;
	border-right: 2px solid #3B82F6;
	border-bottom: 2px solid #3B82F6;
	transform: rotate(45deg);
	top: 1px;
	left: 5px;
}

.visa-card__label {
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	flex-grow: 1;
}

.visa-card__value {
	font-weight: 600;
	font-size: 14px;
	color: #364A63;
	line-height: 18px;
	text-align: center;
	font-style: normal;

}

.visa-card__feature {
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	max-width: 168px;
}

.visa-card__button {
	position: relative;
	bottom: 20px;
	/*width: 134px;*/
	padding: 12px 38px;
	background: #7F8DFF;
	color: white;
	border: none;
	align-items: center;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	margin: 0 auto;
 ;
}

.visa-card__button:hover {
	background-color: #2563EB;
}
</style>
<style scoped>
.ccf-container {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	max-width: 400px;
	margin: 0 auto;
	padding: 24px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
	border-radius: 4px;
}

.ccf-title {
	font-size: 16px;
	font-weight: 500;
	color: #303133;
	margin-bottom: 24px;
}

.ccf-fee-row, .ccf-payment-row, .ccf-balance-row {
	display: flex;
	justify-content: start;
	align-items: center;
	margin: 24px 0 0 33px;

}

.ccf-fee-label, .ccf-payment-label, .ccf-balance-label {
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	margin-right: 232px;
}

.ccf-fee-amount {
	font-weight: bold;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}
.ccf-balance-amount {
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}

.ccf-fee-amount_small {
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 18px;
	text-align: center;
	font-style: normal;
}

.ccf-custom-select {
	position: relative;
	width: 112px;
	cursor: pointer;
}

.ccf-select-value {
	display: flex;
	align-items: center;
	padding: 8px 14px 8px 14px;
	border: 2px solid #DCDFE6;
	border-radius: 4px;
	background-color: #FFF;
}
.ccf-select-value:hover {
	border: 2px solid rgba(127, 141, 255, 1);

}

.ccf-currency-icon {
	width: 20px;
	height: 20px;
	margin-right: 8px;
}

.ccf-select-arrow {
	position: absolute;
	top: 50%;
	right: 10px;
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid rgba(82, 87, 92, 1);
	transform: translateY(-50%);
}

.ccf-dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: #FFF;
	border: 1px solid #E4E7ED;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
	z-index: 1;
}

.ccf-dropdown-item {
	display: flex;
	align-items: center;
	padding: 8px 14px;
}

.ccf-dropdown-item:hover {
	background-color: #F5F7FA;
}

.ccf-button-row {
	display: flex;
	justify-content: center;
	margin-top: 53px;
	margin-bottom: 203px;
}

.ccf-back-button, .ccf-confirm-button {
	width: 104px;
	height: 40px;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	border: none;
}

.ccf-back-button {
	background-color: #F2F6FC;
	color: #606266;
}



.ccf-confirm-button:hover {
	background-color: #5b4cc4;
}
</style>

<style scoped>
.card-limit-form {
	font-family: Arial, sans-serif;
	/*max-width: 600px;*/
	/*margin: 0 auto;*/
	padding: 31px 33px;
}

.card-limit-form__title {
	font-weight: 600;
	font-size: 20px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
	margin-bottom: 16px;
}

.card-limit-form__usage-types {
	display: flex;
	justify-content: space-between;
	margin-bottom: 28px;
	width: 100%;
}

.card-limit-form__usage-type {
	flex: 1;
	padding: 16px 20px;
	border: 1px solid rgba(219, 223, 234, 1);
	border-radius: 8px;
	text-align: center;
	cursor: pointer;
	margin-right: 24px;  /* Add right margin for spacing */
}

.card-limit-form__usage-type:last-child {
	margin-right: 0;  /* Remove margin from the last item */
}

.card-limit-form__usage-type--selected {
	border: 2px solid rgba(127, 141, 255, 1);

	/*background-color: #f0f0ff;*/
}
.h3_label_1 {
	font-weight: 500;
	font-size: 14px;
	color: #364A63;
	line-height: 16px;
	text-align: left;
	font-style: normal;
	margin-bottom: 6px;
}
.p_label_1 {
	font-weight: 400;
	font-size: 12px;
	color: #8094AE;
	line-height: 14px;
	text-align: left;
	font-style: normal;

}

.card-limit-form__usage-type h3 {
	margin: 0;
	font-size: 16px;
}

.card-limit-form__usage-type p {
	margin: 5px 0 0;
	font-size: 12px;
	color: #666;
}

.card-limit-form__form-group {
	margin-bottom: 7px;
}

.radio-group {
	display: flex; /* 使用 Flexbox 布局 */
	gap: 20px; /* 设置单选框之间的间距 */
	margin-top: 10px;
}

.card-limit-form__form-group label {
	display: block;
	margin-bottom: 5px;
	color: #666;
}

.text-wrapper_3121212 {
	width: 180px;
	height: 40px;

	background: #7F8DFF;
	border-radius: 4px;
	margin: 35px auto;
	align-items: center;
	justify-content: center;
	display: flex;
	span {
		font-weight: 500;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 16px;
		text-align: right;
		font-style: normal;

	}

}
.card-limit-form__submit-button {
	width: 100%;
	margin-top: 20px;

}

/* Element UI overrides */
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
	width: 100%;
}

/*.el-button--primary {*/
/*	background-color: #6c5ce7;*/
/*	border-color: #6c5ce7;*/
/*}*/
</style>