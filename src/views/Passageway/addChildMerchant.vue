<!--&lt;!&ndash;没翻译6&ndash;&gt;-->
<!--<template>-->
<!--	<div class="register-wrap">-->
<!--		<div class="register-wrap-container">-->
<!--			<h3 class="title">{{$t('addMerchant.childMerchantManagement')}}</h3>-->
<!--			<div class="return-btn">-->
<!--				<el-button @click="handleReturnBtn">{{$t('addMerchant.childMerchantReturn')}}</el-button>-->
<!--			</div>-->
<!--			<div class="border pd25 mt20 detail-info-wrapper" style="height:600px">-->
<!--				<div style="width:400px;margin:auto">-->
<!--					<el-form-->
<!--						label-position="right"-->
<!--						ref="registerForm"-->
<!--						:model="registerForm"-->
<!--						:rules="registerRules"-->
<!--					>-->
<!--						<el-form-item :label="$t('addMerchant.childMerchantUsername')" prop="username">-->
<!--							<el-input v-model="registerForm.username"></el-input>-->
<!--						</el-form-item>-->
<!--						<el-form-item :label="$t('addMerchant.email')" prop="username">-->
<!--							<el-input v-model="registerForm.email"></el-input>-->
<!--						</el-form-item>-->
<!--						<el-form-item :label="$t('addMerchant.emailCode')" prop="username">-->
<!--							<el-input placeholder="请输入内容" v-model="registerForm.emailCode">-->
<!--								<template slot="append">-->
<!--									<el-link class="code-button" :disabled="countdown" @click="getCode" type="primary">-->
<!--										<span class="code-text">{{ countdown ? `${countdown}s` : $t('login.sendVerificationCode') }}</span>-->
<!--									</el-link>-->
<!--								</template>-->
<!--							</el-input>-->
<!--						</el-form-item>-->
<!--						<el-form-item :label="$t('addMerchant.childMerchantPassword')" prop="username">-->
<!--							<el-input show-password v-model="registerForm.password" v-popover:popover2></el-input>-->
<!--						</el-form-item>-->
<!--							<el-form-item :label="$t('addMerchant.childMerchantConfirmPassword')" prop="confirmPassword">-->
<!--								<el-input show-password v-model="registerForm.confirmPassword"></el-input>-->
<!--							</el-form-item>-->
<!--						<el-form-item>-->
<!--							<el-button type="primary" style="width: 180px; margin-left:28%">生成</el-button>-->
<!--						</el-form-item>-->
<!--					</el-form>-->
<!--				</div>-->
<!--			</div>-->



<!--&lt;!&ndash;			</el-form>&ndash;&gt;-->
<!--&lt;!&ndash;				<h3 class="title">{{$t('addMerchant.childMerchantManagement')}}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantUsername')" prop="username">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.username" v-popover:popover></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantPassword')" prop="password">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input show-password v-model="registerForm.password" v-popover:popover2></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantConfirmPassword')" prop="confirmPassword">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input show-password v-model="registerForm.confirmPassword"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantPrivateKey')" prop="privateKey">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.privateKey" :disabled="true"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->

<!--&lt;!&ndash;				<h3 class="title">{{$t('addMerchant.childMerchantName')}}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantType')" prop="name">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.name" v-popover:popover3></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantPrivateKey')">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-select v-model="registerForm.type" 	:placeholder="$t('addMerchant.childMerchantSelect')">&ndash;&gt;-->
<!--&lt;!&ndash;						<el-option :label="$t('addMerchant.companyAccount')" value="0"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;						<el-option :label="$t('addMerchant.personalAccount')" value="1"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;					</el-select>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantIDType')">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-select v-model="registerForm.ddlCertificateType" 	:placeholder="$t('addMerchant.childMerchantSelect')">&ndash;&gt;-->
<!--&lt;!&ndash;						<el-option :label="$t('addMerchant.idTypeID')" value="0"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;						<el-option :label="$t('addMerchant.idTypeOther')" value="1"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;					</el-select>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantIDNumber')">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.txtIdNumber"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantAccountHolderName')" prop="accountName">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.accountName"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantBankName')" prop="bank">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.bank"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantBankAccount')" prop="account">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.account"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<h3 class="title">{{$t('addMerchant.childMerchantContactName')}}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantBankAccount')" prop="linkMan">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.linkMan"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantContactPhone')" prop="linkPhone">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.linkPhone"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantWebsite')" prop="website">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.website"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantAddress')" prop="address">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.address"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantFax')">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.fax"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item label="QQ/MSN：" prop="qqMSN">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.qqMSN"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantEmail')" prop="email">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.email"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('register.location')"  class="address-wrap" v-if="currentLanguage === 'zh'">&ndash;&gt;-->
<!--&lt;!&ndash;					<v-distpicker&ndash;&gt;-->
<!--&lt;!&ndash;							ref="distpicker"&ndash;&gt;-->
<!--&lt;!&ndash;							class="distpicker-wrap"&ndash;&gt;-->
<!--&lt;!&ndash;							:province="registerForm.prov"&ndash;&gt;-->
<!--&lt;!&ndash;							:city="registerForm.city"&ndash;&gt;-->
<!--&lt;!&ndash;					></v-distpicker>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<h3 class="title">{{$t('addMerchant.childMerchantRegistrationSource')}}</h3>&ndash;&gt;-->

<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantApproach')">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.pathWay"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<el-form-item :label="$t('addMerchant.childMerchantVerificationCode')" prop="rand">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-input v-model="registerForm.rand" class="fl" style="width: 200px"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;					<div class="login-code fl">&ndash;&gt;-->
<!--&lt;!&ndash;						<img :src="codeUrl" alt="" @click="getCode" class="" />&ndash;&gt;-->
<!--&lt;!&ndash;					</div>&ndash;&gt;-->
<!--&lt;!&ndash;					<span class="fl cp" @click="getCode">{{$t('addMerchant.childMerchantRefresh')}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;				</el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;				<div class="add-child-user">&ndash;&gt;-->
<!--&lt;!&ndash;					<el-button&ndash;&gt;-->
<!--&lt;!&ndash;						class="air-btn-save register-btn"&ndash;&gt;-->
<!--&lt;!&ndash;						type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;						@click.native.prevent="$merchantRegister('registerForm')"&ndash;&gt;-->
<!--&lt;!&ndash;						:disabled="merchantRegisterFlag"&ndash;&gt;-->
<!--&lt;!&ndash;					>&ndash;&gt;-->
<!--&lt;!&ndash;						<span>{{$t('addMerchant.childMerchantGenerate')}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;					</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;				</div>&ndash;&gt;-->
<!--&lt;!&ndash;			</el-form>&ndash;&gt;-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->

<!--<script>-->
<!--import { getRand, generateKey } from "@/api/register";-->
<!--import VDistpicker from "v-distpicker";-->
<!--import { addSubMerchant } from "@/api/account";-->
<!--export default {-->
<!--	name: "Register",-->

<!--	components: {-->
<!--		VDistpicker,-->
<!--	},-->
<!--	data() {-->
<!--		const equalToPassword2 = (rule, value, callback) => {-->
<!--			if (this.registerForm.password !== value) {-->
<!--				callback(new Error(this.$t('addMerchant.childMerchantPasswordMismatch')));-->
<!--			} else {-->
<!--				callback();-->
<!--			}-->
<!--		};-->
<!--		return {-->
<!--			loading: false,-->
<!--			registerForm: {-->
<!--				type: "0",-->
<!--				ddlCertificateType: "0",-->
<!--				privateKey: "", // PrivateKey-->
<!--				prov: "",-->
<!--				city: "",-->
<!--			},-->
<!--			registerRules: {-->
<!--				username: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantUsernameRequired') }],-->
<!--				password: [-->
<!--					{ required: true, trigger: "blur", message: this.$t('login.childMerchantPasswordMismatch') },-->
<!--					{ min: 8, max: 16, message: this.$t('addMerchant.childMerchantPasswordLength'), trigger: "blur" },-->
<!--				],-->
<!--				confirmPassword: [-->
<!--					{ required: true, message: this.$t('addMerchant.childMerchantConfirmPasswordRequired'), trigger: "blur" },-->
<!--					{ required: true, validator: equalToPassword2, trigger: "blur" },-->
<!--				],-->
<!--				name: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantNameRequired') }],-->
<!--				accountName: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantAccountHolderRequired') }],-->
<!--				account: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantBankAccountRequired') }],-->
<!--				bank: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantBankNameRequired') }],-->
<!--				linkMan: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantContactNameRequired') }],-->
<!--				linkPhone: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantContactPhoneRequired') }],-->
<!--				website: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantWebsiteRequired') }],-->
<!--				address: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantAddressRequired') }],-->
<!--				email: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantEmailRequired') }],-->
<!--				qqMSN: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantQQMSNRequired') }],-->
<!--				rand: [{ required: true, trigger: "blur", message: this.$t('addMerchant.childMerchantVerificationCodeRequired') }],-->
<!--			},-->
<!--			codeUrl: "",-->
<!--			merchantRegisterFlag:false-->
<!--		};-->
<!--	},-->
<!--	created() {-->
<!--		// this.$getRand();-->
<!--		// this.$generateKey();-->
<!--	},-->

<!--	mounted() {-->
<!--		this.$refs.distpicker.$el.children[2].style.display = "none";-->
<!--	},-->

<!--	methods: {-->
<!--		// 获取地址-->
<!--		$generateKey() {-->
<!--			generateKey().then(result => {-->
<!--				if (result.status === 200) {-->
<!--					this.registerForm.privateKey = result.data.randomKey;-->
<!--				}-->
<!--			});-->
<!--		},-->
<!--		// 验证码-->
<!--		$getRand: function () {-->
<!--			getRand().then(result => {-->
<!--				this.codeUrl = result.verCode;-->
<!--				this.uuid = result.uuid;-->
<!--			});-->
<!--		},-->
<!--		// 点击换一张验证码-->
<!--		getCode() {-->
<!--			this.$getRand();-->
<!--		},-->
<!--		// 生成-->
<!--		$merchantRegister: function (formName) {-->
<!--			let data = {-->
<!--				accountName: this.registerForm.username,-->
<!--				accountPassword: this.registerForm.password,-->
<!--				privateKey: this.registerForm.privateKey,-->
<!--				merchantName: this.registerForm.name,-->
<!--				accountType: this.registerForm.type,-->
<!--				certificatesType: this.registerForm.ddlCertificateType,-->
<!--				certificatesNum: this.registerForm.txtIdNumber,-->
<!--				openAccountName: this.registerForm.accountName,-->
<!--				openAccountBankName: this.registerForm.bank,-->
<!--				openAccountBankNumber: this.registerForm.account,-->
<!--				basicName: this.registerForm.linkMan,-->
<!--				basicPhone: this.registerForm.linkPhone,-->
<!--				webSite: this.registerForm.website,-->
<!--				basicAddress: this.registerForm.address,-->
<!--				fax: this.registerForm.fax,-->
<!--				qqMsn: this.registerForm.qqMSN,-->
<!--				basicEmail: this.registerForm.email,-->
<!--				province: this.$refs.distpicker.currentProvince,-->
<!--				city: this.$refs.distpicker.currentCity,-->
<!--				channel: this.registerForm.pathWay,-->
<!--				rand: this.registerForm.rand,-->
<!--				uuid: this.uuid,-->
<!--			};-->
<!--			this.$refs[formName].validate(valid => {-->
<!--				if (valid) {-->
<!--					this.merchantRegisterFlag = true-->
<!--					addSubMerchant(data).then(res => {-->
<!--						if (res.status == 200) {-->
<!--							this.$message.success(res.data);-->
<!--							this.$router.go(-1);-->
<!--							setTimeout(()=>{this.merchantRegisterFlag = false},1000)-->
<!--						}-->
<!--					}).catch(err => {-->
<!--						this.merchantRegisterFlag = false-->
<!--					})-->
<!--				} else {-->
<!--					return false;-->
<!--				}-->
<!--			});-->
<!--		},-->
<!--		// 返回-->
<!--		handleReturnBtn() {-->
<!--			this.$router.go(-1);-->
<!--		},-->
<!--	},-->
<!--};-->
<!--</script>-->

<!--<style lang="less">-->

<!--.yzm{-->
<!--	font-family: PingFangSC, PingFang SC;-->
<!--	font-weight: 400;-->
<!--	font-size: 14px;-->
<!--	color: #7F8DFF;-->
<!--	line-height: 18px;-->
<!--	text-align: left;-->
<!--	font-style: normal;-->
<!--}-->
<!--.yzm:hover{-->
<!--	cursor: pointer;-->
<!--}-->
<!--.title {-->
<!--	font-family: PingFangSC, PingFang SC;-->
<!--	font-weight: 600;-->
<!--	font-size: 28px;-->
<!--	color: #364A63;-->
<!--	line-height: 36px;-->
<!--	text-align: left;-->
<!--	font-style: normal;-->
<!--	margin-top:20px-->
<!--}-->
<!--.register-wrap {-->
<!--	.register-wrap-container {-->
<!--		overflow-x: hidden;-->
<!--		overflow-y: hidden;-->
<!--		.return-btn {-->
<!--		position: absolute;-->
<!--			right: 20px;-->
<!--			top: 20px;-->
<!--		}-->
<!--		/deep/ .el-form-item__label {-->
<!--			font-size: 14px;-->
<!--			font-weight: 400;-->
<!--			color: #8094ae;-->
<!--		}-->

<!--		/deep/ .el-input {-->
<!--			.el-input__inner {-->
<!--				border: none;-->
<!--				border-radius: unset;-->
<!--				border-bottom: 1px solid #dcdfe6;-->
<!--			}-->
<!--		}-->

<!--		/deep/ .el-select {-->
<!--			.el-input__inner {-->
<!--				border-radius: 4px;-->
<!--				border: 1px solid #dcdfe6;-->
<!--			}-->
<!--	}-->

<!--		header {-->
<!--			border-bottom: 1px solid #dcdfe6;-->
<!--			height: 64px;-->
<!--			padding: 12px 0;-->
<!--			box-sizing: border-box;-->

<!--			img {-->
<!--				height: 100%;-->
<!--			}-->
<!--	}-->


<!--		.register-form {-->
<!--			width: 500px;-->
<!--			padding: 0 100px;-->
<!--			margin: 20px auto;-->
<!--			max-height: 750px;-->
<!--			overflow: auto;-->

<!--		}-->
<!--		::-webkit-scrollbar {-->
<!--			display: none;-->
<!--		}-->
<!--		.register-btn {-->
<!--			width: 187px;-->
<!--			height: 36px;-->
<!--			background-color: #526484;-->
<!--			border-color: #526484;-->
<!--		}-->
<!--		.add-child-user {-->
<!--			display: flex;-->
<!--			justify-content: center;-->
<!--		}-->
<!--	}-->
<!--	.address-wrap {-->
<!--		.el-form-item__content {-->
<!--			width: 440px;-->
<!--		}-->
<!--	}-->
<!--}-->
<!--</style>-->


<template>
	<div class="submerchant-management">
		<div class="header">
			<h2>{{$t('addMerchant.childMerchantManagement')}}</h2>
			<button @click="goBack" class="back-button">
				<i class="el-icon-arrow-left"></i> {{$t('addMerchant.childMerchantReturn')}}
			</button>
		</div>
		<div class="form-container">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="form">
				<el-form-item :label="$t('addMerchant.childMerchantUsername')"  prop="username">
					<el-input v-model="form.username" ></el-input>
				</el-form-item>
				<el-form-item :label="$t('addMerchant.email')" prop="email">
					<el-input v-model="form.email" ></el-input>
				</el-form-item>
				<el-form-item :label="$t('addMerchant.emailCode')"  prop="emailCode">
					<div class="verification-group">
						<el-input v-model="form.emailCode"></el-input>
						<el-button @click="sendCode" :disabled="codeSending" class="code-button">{{ codeButtonText }}</el-button>
					</div>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" ></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmPassword">
					<el-input v-model="form.confirmPassword" type="password" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm" :disabled="submitDisabled" class="submit-button">生成</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { getRand } from "@/api/register";
import { addSubMerchant } from "@/api/account";
export default {
	data() {
		return {
			form: {
				username: '',
				email: '',
				emailCode: '',
				password: '',
				confirmPassword: ''
			},
			codeSending: false,
			codeButtonText: this.$t('login.sendVerificationCode'),
			submitDisabled: false,
			rules: {
				username: [
					{ required: true, message: this.$t('addMerchant.childMerchantUsernameRequired'), trigger: 'blur' }
				],
				email: [
					{ required: true, message: this.$t('addMerchant.childMerchantEmailRequired'), trigger: 'blur' },
					{ type: 'email', message: this.$t('login.incorrectEmailFormat'), trigger: 'blur' }
				],
				emailCode: [
					{ required: true, message: this.$t('login.please_input_password'), trigger: 'blur' }
				],
				password: [
					{ required: true, message: this.$t('login.passwordRequired'), trigger: 'blur' }
				],
				confirmPassword: [
					{ required: true, message: this.$t('login.passwordConfirmRequired'), trigger: 'blur' },
					{ validator: (rule, value, callback) => {
							if (value !== this.form.password) {
								callback(new Error(this.$t('login.childMerchantPasswordMismatch')));
							} else {
								callback();
							}
						}, trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		goBack() {
			// 在这里添加返回上一页的逻辑
			console.log('返回上一页');
			this.$router.go(-1);
		},
		sendCode() {
			if(this.form.email == '' || this.form.email == undefined){
				this.$message.error(this.$t('login.please_email'));
				return
			}
			if (!this.codeSending) {
				this.codeSending = true;
				this.codeButtonText = '60s' ;
				let countdown = 60;
				const timer = setInterval(() => {
					countdown--;
					this.codeButtonText = `${countdown}s`;
					if (countdown === 0) {
						clearInterval(timer);
						this.codeSending = false;
						this.codeButtonText = this.$t('login.sendVerificationCode');
					}
				}, 1000);
				// 在这里添加您的发送邮箱验证码的逻辑
				getRand({email: this.form.email}).then(result => {
					console.log(result);
					this.uuid = result.uuid;
				})
			}
		},
		submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.submitDisabled = true;
					// 在这里添加您的表单提交逻辑
					let data = {
							accountName: this.form.username,
							accountPassword: this.form.password,
							basicEmail: this.form.email,
							rand: this.form.emailCode,
							uuid: this.uuid,
							privateKey: ''
					};
					addSubMerchant(data).then(res=>{
						if (res.status == 200) {
							this.$message.success(res.data);
							this.$router.go(-1);
							setTimeout(() => {
								this.submitDisabled = false;
							}, 1000)
						}
					}).catch(e=>{
						this.submitDisabled = false;
					})


					// // 模拟提交后的处理时间
					// setTimeout(() => {
					// 	this.submitDisabled = false;
					// }, 2000); // 假设处理时间为2秒
				} else {
					console.log('表单验证失败');
					return false;
				}
			});
		}
	}
};
</script>

<style scoped>
.submerchant-management {
	padding: 50px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.header h2 {
	margin: 0;
	font-size: 24px;
	font-weight: bold;
}

.back-button {
	display: flex;
	align-items: center;
	color: #606266;
	font-size: 14px;
	border-radius: 4px;
	padding: 10px 20px;
	cursor: pointer;
	background: #FFFFFF;
	border: 1px solid #DBDFEA;
}

.back-button i {
	margin-right: 5px;
}

.back-button:hover {
	border-color: #409eff;
	color: #409eff;
}

.form-container {
	border: 1px solid #dcdfe6;
	padding: 50px;
	border-radius: 4px;
	background: #fff;
}

.form {
	width: 80%;
	max-width: 600px;
	margin: 0 auto;
}

.el-form-item {
	margin-bottom: 30px;
}

.el-input {
	width: 100%;
}

.verification-group {
	display: flex;
	align-items: center;
}

.verification-group .el-input {
	flex: 1;
	margin-right: 10px;
}

.code-button {
	font-size: 14px;
	height: 32px;
	line-height: 32px;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.submit-button {
	width: 100px;
	background-color: #7F8DFF 100%;
	color: white;
	font-size: 16px;
	height: 40px;
	line-height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	border-radius: 4px;
}

.submit-button span {
	margin: 0 auto;
}
</style>

