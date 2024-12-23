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
				<span class="text_2">{{this.$t('translations.openPersonalAccount')}}</span>
				<span style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #364A63;
line-height: 20px;
text-align: left;
font-style: normal;">{{this.$t('translations.accountOpenInfo')}}</span>

				<div class="section_2 flex-col">
					<span class="text_7">{{this.$t('translations.personalInformation')}}</span>
					<span style="margin: 6px 0 0 32px;font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #8094AE;
line-height: 20px;
text-align: left;
font-style: normal;"></span>
					<div class="text-wrapper_2 flex-row justify-between">

						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.phoneNumber')}}</span>
							<el-input class="section_3" v-model="formData.phone"></el-input>
						</div>
						<div class="flex-col ">
							<span class="text_9">{{this.$t('translations.countryRegion')}}</span>
							<el-select class="section_3" v-model="formData.country" filterable :placeholder="$t('translations.countryRegion')" style="width: 100%;">
								<el-option
									v-for="item in countryList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.value }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
								</el-option>
							</el-select>
						</div>
					</div>


					<span class="text_10">{{this.$t('translations.idPassport')}}</span>

					<el-upload
						drag
						action= "http://192.168.3.23:8180/merchant/file/upload"
						:http-request="file => handleAvatarSuccess(file, fileList1)"
						:headers=headers
						:file-list="fileList1"
						:auto-upload="true"
						:before-upload="beforeUpload"
						:on-preview="handlePreview"
						:on-change="handleChange(1)"
						:on-remove="handleRemove(1)"


					>
						<div class="block_5 flex-row">
							<div class="image-text_4 flex-col justify-between align-center">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">
									{{this.$t('translations.submittingUpload')}}
								</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>

					<div class="flex-row justify-center">
						<el-button class="text-wrapper_3"  type="primary" @click="continueStep"><span class="text_12">{{this.$t('translations.submit')}}</span></el-button>
					</div>
					<div style="padding-bottom: 32px"></div>

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
import { certificationApply, getCertificationStatus, upload } from "@/api/certification";
import { getCargodeDetails } from "@/api/business";

export default {

	data() {
		return {
			numberStep:'1',
			formData: {
				/**
				 * 商户号
				 */
				merNo: sessionStorage.getItem("merNo"),
				/**
				 * 商户id
				 */
				merId: sessionStorage.getItem("merId"),
				/**
				 * 认证类型 1；企业 2个人
				 */
				type: '2',
				/**
				 * 手机号（个人认证用）
				 */
				phone: '',
				/**
				 * 公司名称（企业认证用）
				 */
				company: '',
				/**
				 * 公司类型(企业认证用)
				 */
				companyType: '',
				/**
				 * 注册号码（企业认证用）
				 */
				businessScale: '',
				/**
				 * 公司网站(企业认证用)
				 */
				website: '',
				/**
				 * 注册证书（企业认证用）
				 */
				license: '',
				/**
				 * 公司章程（企业认证用）
				 */
				constitution: '',
				/**
				 * 公司三个月流水（企业认证用）
				 */
				bill: '',
				/**
				 * 国家
				 */
				country: '',
				/**
				 * 公司地址（企业认证用）
				 */
				address: '',
				/**
				 * 城市（企业认证用）
				 */
				city: '',
				/**
				 * 省份（企业认证用）
				 */
				province: '',
				/**
				 * 邮政编码（企业认证用）
				 */
				postCode: '',
				/**
				 * 身份证/护照
				 */
				idCard: '',
				/**
				 * 董事及股东证明书（企业认证用 ）
				 */
				prove: ''
			},
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

			dialogVisible: false,
			previewUrl: '',

			fileList1: [],
			fileList2: [],
			fileList3: [],
			fileList4: [],
			fileList5: [],
			headers: { Authorization: sessionStorage.getItem("JWT"),
			},
		};
	},
	methods: {
		handleChange(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
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
			console.info(fileList);
			console.info('1');
			console.info(targetArray);
			const formData = new FormData();
			formData.append('file', file.file); // 将文件对象添加到 FormData 中
			formData.append("type", "certification");

			upload(
				formData,
			).then(res => {
					if (res.status === 200) {
						// 遍历 fileList，将每个文件的名称和URL加入到数组中
						if (Array.isArray(fileList)) {
							fileList.forEach(item => {
								console.info(item.name);
								console.info(res.data.fileName);
								if (item.name === res.data.fileName) {
									item.url = res.data.url; // 将接口返回的url赋给匹配项的url属性
									item.name = res.data.fileName; // 将接口返回的url赋给匹配项的url属性
								}
							});
						}
					}
				console.info(this.fileList1);
			}).catch(err => {

				console.error(err);
			});
		},
		continueStep() {
			if (this.formData.phone === '') {
				this.$message.error(this.$t('translations.phoneNumberRequired'));
				return;
			}

			if (this.formData.country === '') {
				this.$message.error(this.$t('translations.countryRequired'));
				return;
			}

			if (this.fileList1.length === 0) {
				this.$message.error(this.$t('translations.identityDocumentRequired'));
				return;
			}
			const urls= this.fileList1.map(item => item.url);

			this.formData.idCard = urls.join(',');
			certificationApply(this.formData)
				.then((response) => {
					router.push({ path: '/AuthenticationProcessing' });
				})
				.catch((error) => {
					console.error(error);
				});
		},
		goBack() {
			router.back();
		}
	},
	computed: {
		boxStyle() {
			let width = '';
			if (this.numberStep === '1') {
				width = '0';
			} else if (this.numberStep ==='2') {
				width = '49%';
			} else if (this.numberStep ==='3') {
				width = '100%';
			}
			return { width };
		}
	}
};
</script>
<style scoped lang="css" src="../Verify/assets/common.css" />

<style scoped lang="css" src="./assets/company_verification.css" />
<style scoped>
/deep/.el-input__inner {
	width: 420px;
	height: 40px;
	color: black;

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