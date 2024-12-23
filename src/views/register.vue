<template>
	<div class="register-wrap">
		<header class="t-c">
			<img :src="require('../assets/logo/logo@2x.png')" alt="" />
		</header>
		<el-form
			class="register-form"
			label-width="160px"
			label-position="right"
			ref="registerForm"
			:model="registerForm"
			:rules="registerRules"
		>
			<h3 class="title">{{ $t('register.merchantManagement') }}</h3>
				<el-form-item :label="$t('register.username')" prop="username">
				<el-input v-model="registerForm.username" v-popover:popover></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.password')" prop="password">
				<el-input :type="type" v-model="registerForm.password" v-popover:popover2>
					<svg-icon
						slot="suffix"
						:icon-class="elIcon"
						autocomplete="auto"
						class="el-input__icon input-icon"
						@click="flag = !flag"
					/>
				</el-input>
			</el-form-item>
			<el-form-item :label="$t('register.confirmPassword')" prop="confirmPassword">
				<el-input :type="type2" v-model="registerForm.confirmPassword">
					<svg-icon
						slot="suffix"
						:icon-class="elIcon2"
						autocomplete="auto"
						class="el-input__icon input-icon"
						@click="flag2 = !flag2"
					/>
				</el-input>
			</el-form-item>
			<el-form-item :label="$t('register.privateKey')" prop="privateKey">
				<el-input v-model="registerForm.privateKey" :disabled="true"></el-input>
			</el-form-item>

			<h3 class="title">{{$t('register.merchantInfo')}}</h3>
			<el-form-item :label="$t('register.merchantName')" prop="name">
				<el-input v-model="registerForm.name" v-popover:popover3></el-input>
				<!--<el-popover-->
				<!--    ref="popover3"-->
				<!--    placement="right"-->
				<!--    trigger="focus"-->
				<!--    content="请填写真实信息，方便客服与您联系！(注意：商家名称必须和开户人姓名一致！)">-->
				<!--</el-popover>-->
			</el-form-item>
			<el-form-item :label="$t('register.merchantType')">
				<el-select v-model="registerForm.type" :placeholder="$t('register.select')" >
					<el-option :label="$t('register.companyAccount')" value="0"></el-option>
					<el-option :label="$t('register.personalAccount')" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('register.idType')" v-if="registerForm.type === '1'">
				<el-select v-model="registerForm.ddlCertificateType" :placeholder="$t('register.idTypeSelect')">
					<el-option :label="$t('register.idTypeID')" value="0"></el-option>
					<el-option :label="$t('register.idTypeOther')" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('register.idNumber')" v-if="registerForm.type === '1'">
				<el-input v-model="registerForm.txtIdNumber"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.registrationNumber')" v-if="registerForm.type === '0'">
				<el-input v-model="registerForm.registerNo"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.industryType')">
				<el-radio-group v-model="registerForm.state" :disabled="stateDisabled">
					<el-radio-button label="0">{{$t('register.physical')}}</el-radio-button>
					<el-radio-button label="1">{{$t('register.virtual')}}</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item :label="$t('register.industry')" prop="businessType">
				<el-select
					v-model="registerForm.businessType"
					class="unHeight"
					filterable
					allow-create
					default-first-option
					placeholder=""
				>
					<el-option v-for="item in hyOptions" :key="item.orders" :label="item.business" :value="item.orders">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('register.accountHolderName')" prop="accountName">
				<el-input v-model="registerForm.accountName"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.bank')" prop="bank">
				<el-input v-model="registerForm.bank"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.accountNumber')" prop="account">
				<el-input v-model="registerForm.account"></el-input>
			</el-form-item>
			<h3 class="title">{{$t('register.contactInfo')}}</h3>
			<el-form-item :label="$t('register.contactName')" prop="linkMan">
				<el-input v-model="registerForm.linkMan"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.contactPhone')" prop="linkPhone">
				<el-input v-model="registerForm.linkPhone"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.website')" prop="website">
				<el-input v-model="registerForm.website"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.address')" prop="address">
				<el-input v-model="registerForm.address"></el-input>
			</el-form-item>
<!--			<el-form-item label="传真：">
				<el-input v-model="registerForm.fax"></el-input>
			</el-form-item>-->
			<el-form-item :label="$t('register.socialMedia')">
				<el-input v-model="registerForm.qqMSN"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.email')" prop="email">
				<el-input v-model="registerForm.email"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.location')"  class="address-wrap" v-if="currentLanguage === 'zh'">
				<v-distpicker
					ref="distpicker"
					class="distpicker-wrap"
					:province="registerForm.prov"
					:city="registerForm.city"
				></v-distpicker>
			</el-form-item>
			<h3 class="title">{{$t('register.registrationSource')}}</h3>

			<el-form-item :label="$t('register.source')">
				<el-input v-model="registerForm.pathWay"></el-input>
			</el-form-item>
			<el-form-item :label="$t('register.verificationCode')" prop="rand">
				<el-input v-model="registerForm.rand" class="fl" style="width: 200px"></el-input>
				<div class="login-code fl">
					<img :src="codeUrl" alt="" @click="getCode" class="" />
				</div>
				<span class="fl cp" @click="getCode">{{$t('register.refresh')}}</span>
			</el-form-item>
			<el-form-item label-width="0" prop="checked" class="agreement-wrap">
				<el-checkbox v-model="registerForm.checked"></el-checkbox>
				<p class="d-inline-block ml5">
					{{$t('register.readAndAgree')}}<a style="color: #6576ff" :href="currentLanguage === 'zh' ? '/html/serve.html' : '/html/serve-en.html'" target="_blank">{{$t('register.serviceAgreement')}}</a>
				</p>
			</el-form-item>
			<div class="register-btn-wrap">
				<el-button
					class="air-btn-save register-btn"
					type="primary"
					@click.native.prevent="$merchantRegister('registerForm')"
				>
					<span>{{$t('register.registerNow')}}</span>
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
import { getBlongBusiness, getRand, merchantRegister, generateKey } from "@/api/register";
import VDistpicker from "v-distpicker";
import {mapGetters} from "vuex";

export default {
	name: "Register",

	components: {
		VDistpicker,
	},
	data() {
		const equalPassword = (rule, value, callback) => {
			let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
			if (value === "") {
				callback(new Error(this.$t('manage.pwdRule')));
			} else {
				if (!reg.test(value)) {
					callback(new Error(this.$t('manage.pwdRule2')));
				} else {
					// if (this.adminForm.passwordAg !== "") {
					// 	this.$refs.adminForm.validateField("passwordAg");
					// }
					callback();
				}
			}
		}
		var checked = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('register.readAndAgreeServiceAgreement')));
			} else {
				callback();
			}
		};
		const equalToPassword2 = (rule, value, callback) => {
			if (this.registerForm.password !== value) {
				callback(new Error(this.$t('register.passwordsNotMatch')));
			} else {
				callback();
			}
		};
		return {
			loading: false,
			registerForm: {
				type: "0",
				ddlCertificateType: "0",
				state: "0",
				privateKey: "", // PrivateKey
				prov: "",
				city: "",
			},
			hyOptions: [],
			pathWayList: [
				{ label: this.$t('register.salesReferral'), value: 1 },
				{ label: this.$t('register.merchantReferral'), value: 2 },
				{ label: this.$t('register.agentReferral'), value: 3 },
				{ label: this.$t('register.internet'), value: 4 },
				{ label: this.$t('register.other'), value: 5 },
			],
			registerRules: {
				username: [{ required: true, trigger: "blur", message: this.$t('register.usernameRequired') }],
				password: [
					{ required: true, trigger: "blur", message: this.$t('register.passwordRequired') },
					{ min: 8, max: 16, message: this.$t('register.passwordLength'), trigger: "blur" },
					{ required: true, validator: equalPassword, trigger: "blur" },
				],
				confirmPassword: [
					{ required: true, message: this.$t('register.confirmPasswordRequired'), trigger: "blur" },
					{ required: true, validator: equalToPassword2, trigger: "blur" },
					{ required: true, validator: equalPassword, trigger: "blur" },
				],
				name: [{ required: true, trigger: "blur", message: this.$t('register.merchantNameRequired') }],
				accountName: [{ required: true, trigger: "blur", message: this.$t('register.accountHolderNameRequired') }],
				account: [{ required: true, trigger: "blur", message: this.$t('register.bankAccountRequired') }],
				bank: [{ required: true, trigger: "blur", message: this.$t('register.bankRequired') }],
				linkMan: [{ required: true, trigger: "blur", message: this.$t('register.contactNameRequired') }],
				linkPhone: [{ required: true, trigger: "blur", message: this.$t('register.contactPhoneRequired') }],
				website: [{ required: true, trigger: "blur", message: this.$t('register.websiteRequired') }],
				address: [{ required: true, trigger: "blur", message: this.$t('register.addressRequired')}],
				email: [{ required: true, trigger: "blur", message: this.$t('register.emailRequired') }],
				businessType: [{ required: true, trigger: "change", message: this.$t('register.industryRequired') }],
				checked: [{ validator: checked, trigger: "blur" }],
				rand: [{ required: true, trigger: "blur", message: this.$t('register.industryRequired') }],
			},
			codeUrl: "",
			checked: false,
			stateDisabled: false,
			flag: false,
			flag2: false,
		};
	},

	computed: {
		...mapGetters({
			currentLanguage: 'getCurrentLanguage' // 获取当前语言代码
		}),
		state() {
			return this.registerForm.state;
		},
		type() {
			return this.flag ? "text" : "password";
		},
		elIcon() {
			return this.flag ? "showpassword" : "nopassword";
		},
		type2() {
			return this.flag2 ? "text" : "password";
		},
		elIcon2() {
			return this.flag2 ? "showpassword" : "nopassword";
		},
	},

	watch: {
		state: function(newVal, oldVal) {
			this.$getBlongBusiness(newVal);
		},
	},

	created() {
		this.$getBlongBusiness();
		this.$getRand();
		this.$generateKey();
	},

	mounted() {
		this.$refs.distpicker.$el.children[2].style.display = "none";
	},

	methods: {
		$generateKey() {
			generateKey().then(result => {
				if (result.status === 200) {
					this.registerForm.privateKey = result.data.randomKey;
				}
			});
		},
		$getBlongBusiness: function(state = 0) {
			getBlongBusiness({ state })
				.then(result => {
					this.hyOptions = result.data;
				})
				.catch(error => {
				});
		},
		$getRand: function() {
			getRand().then(result => {
				this.codeUrl = result.verCode;
				this.uuid = result.uuid;
			});
		},
		getCode() {
			this.$getRand();
		},
		$merchantRegister: function(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let businessType = undefined,
						business = undefined;
					let arr = this.hyOptions.filter(item => {
						return item.orders === this.registerForm.businessType;
					});
					if (arr.length) {
						businessType = arr[0].orders;
					} else {
						business = this.registerForm.businessType;
					}
					merchantRegister({
						...this.registerForm,
						businessType,
						business,
						prov: this.$refs.distpicker.currentProvince,
						city: this.$refs.distpicker.currentCity,
						uuid: this.uuid,
					}).then(result => {
						if (result.status === 200) {
							this.$confirm(result.data, this.$t('register.prompt'), {
								confirmButtonText: this.$t('register.confirm'),
								cancelButtonText: this.$t('register.cancel'),
								type: "warning",
							})
								.then(() => {
									this.$router.push({ path: "/login" });
								})
								.catch(() => {
									this.$router.push({ path: "/login" });
								});
						} else {
							this.$message.error(result.msg);
						}
					});
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style lang="less">
.register-wrap {
	/deep/ .el-form-item__label {
		font-size: 14px;
		font-weight: 400;
		color: #8094ae;
	}

	/deep/ .el-input {
		.el-input__inner {
			border: none;
			border-radius: unset;
			border-bottom: 1px solid #dcdfe6;
		}
	}

	/deep/ .el-select {
		.el-input__inner {
			border-radius: 4px;
			border: 1px solid #dcdfe6;
		}
	}

	header {
		border-bottom: 1px solid #dcdfe6;
		height: 64px;
		padding: 12px 0;
		box-sizing: border-box;

		img {
			height: 100%;
		}
	}

	.register-form {
		width: 500px;
		padding: 0 100px;
		margin: 20px auto;

		.title {
			font-size: 20px;
			font-weight: 500;
			color: #526484;
			margin-bottom: 15px;
		}
	}

	.address-wrap {
		.el-form-item__content {
			width: 440px;
		}
	}

	.agreement-wrap {
		text-align: center;
	}

	.register-btn-wrap {
		text-align: center;

		.register-btn {
			width: 187px;
			height: 36px;
			background-color: #526484;
			border-color: #526484;
		}
	}
}
</style>
<style lang="less" scoped>
/deep/ .el-input__suffix {
	top: 2px;
}
</style>
