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
				<span class="text_2">{{this.$t('translations.openBusinessAccount')}}</span>
				<span class="text_3">{{this.$t('translations.accountOpenInfo')}}</span>
				<div class="section_1 flex-row align-center">
					<div></div>
					<div class="box_3" :style="boxStyle"></div>

					<div class="group_4"></div>

				</div>
				<div class="text-wrapper_1 flex-row justify-between">
					<span :class="{'text_5': numberStep === '1', 'text_4': numberStep !== '1'}">{{this.$t('translations.companyInfo')}}</span>
					<span :class="{'text_5': numberStep === '2', 'text_4': numberStep !== '2'}">{{this.$t('translations.addressInfo')}}</span>
					<span :class="{'text_5': numberStep === '3', 'text_4': numberStep !== '3'}">{{this.$t('translations.beneficiaryInfo')}}</span>
				</div>
				<div class="section_2 flex-col" v-if="numberStep === '1'">
					<span class="text_7">{{this.$t('translations.companyInfo')}}</span>
					<div class="text-wrapper_2 flex-row justify-between">

							<div class="flex-col ">
								<span class="text_8">{{this.$t('translations.companyName')}}</span>
								<el-input class="section_3" v-model="formData.company"></el-input>
							</div>

							<div class="flex-col ">
								<span class="text_9">{{this.$t('translations.companyType')}}</span>
								<el-select
									v-model="formData.companyType"
									class="unHeight"
									filterable
									allow-create
									default-first-option
									placeholder=""
								>
									<el-option v-for="item in hyOptions" :key="item.business" :label="item.business" :value="item.business">
									</el-option>
								</el-select>
<!--								<el-input class="section_3" v-model="formData.companyType"></el-input>-->
							</div>
					</div>
					<div class="text-wrapper_2 flex-row justify-between">
						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.registrationNumber')}}</span>
							<el-input class="section_3" v-model="formData.businessScale"></el-input>
						</div>
						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.companyWebsite')}}</span>
							<el-input class="section_3" v-model="formData.website"></el-input>
						</div>
					</div>
					<span class="text_10">{{this.$t('translations.registrationCertificate')}}</span>

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
							<div class="image-text_4 flex-col justify-between">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">{{this.$t('translations.submittingUpload')}}</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>

					<span class="text_10">{{this.$t('translations.articles')}}</span>
					<el-upload
						drag
						action= "http://192.168.3.23:8180/merchant/file/upload"
						:http-request="file => handleAvatarSuccess(file, fileList2)"
						:headers=headers
						:file-list="fileList2"
						:auto-upload="true"
						:on-preview="handlePreview"
						:before-upload="beforeUpload"

						:on-change="handleChange(2)"
						:on-remove="handleRemove(2)"


						>
						<div class="block_5 flex-row">
							<div class="image-text_4 flex-col justify-between">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">{{this.$t('translations.submittingUpload')}}</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>
					<span class="text_11">{{this.$t('translations.bankStatement')}}</span>
					<el-upload
						drag
						action= "http://192.168.3.23:8180/merchant/file/upload"
						:http-request="file => handleAvatarSuccess(file, fileList3)"
						:headers=headers
						:file-list="fileList3"
						:auto-upload="true"
						:on-preview="handlePreview"
						:before-upload="beforeUpload"
						:on-change="handleChange(3)"
						:on-remove="handleRemove(3)"


						>
						<div class="block_5 flex-row">
							<div class="image-text_4 flex-col justify-between">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">{{this.$t('translations.submittingUpload')}}</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>
					<div class="flex-row justify-center">
						<el-button class="text-wrapper_3"  type="primary" @click="continueStep"><span class="text_12">{{this.$t('translations.nextStep')}}</span></el-button>
					</div>
				</div>
				<div class="section_2 flex-col" v-else-if="numberStep === '2'">
					<span class="text_7">{{this.$t('translations.addressInfo')}}</span>
					<div class="text-wrapper_2 flex-row justify-between">

						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.registrationCountry')}}</span>
							<el-input class="section_3" v-model="formData.country"></el-input>
						</div>
						<div class="flex-col ">
							<span class="text_9">{{this.$t('translations.registeredAddress')}}</span>
							<el-input class="section_3" v-model="formData.address"></el-input>
						</div>
					</div>
					<div class="text-wrapper_2 flex-row justify-between">

						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.city')}}</span>
							<el-input class="section_3" v-model="formData.city"></el-input>
						</div>
						<div class="flex-col ">
							<span class="text_9">{{this.$t('translations.province')}}</span>
							<el-input class="section_3" v-model="formData.province"></el-input>
						</div>
					</div>
					<div class="text-wrapper_2 flex-row justify-between">

						<div class="flex-col ">
							<span class="text_8">{{this.$t('translations.postalCode')}}</span>
							<el-input class="section_3" v-model="formData.postCode"></el-input>
						</div>
						<div class="flex-col ">

						</div>
					</div>
					<div class="flex-row justify-center">
						<el-button class="text-wrapper_3"  type="primary" @click="continueStep"><span class="text_12">{{this.$t('translations.nextStep')}}</span></el-button>
					</div>
					<div style="padding-bottom: 32px"></div>

				</div>
				<div class="section_2 flex-col" v-else>
					<span class="text_7">{{this.$t('translations.companyInfo')}}</span>
					<span style="margin: 6px 0 0 32px;font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #8094AE;
line-height: 20px;
text-align: left;
font-style: normal;">{{this.$t('translations.directorsShareholders')}}</span>


					<span class="text_10">{{this.$t('translations.idPassport')}}</span>

					<el-upload
						drag
						action= "http://192.168.3.23:8180/merchant/file/upload"
						:http-request="file => handleAvatarSuccess(file, fileList4)"
						:headers=headers
						:file-list="fileList4"
						:auto-upload="true"
						:on-preview="handlePreview"
						:before-upload="beforeUpload"
						:on-change="handleChange(4)"
						:on-remove="handleRemove(4)"


					>
						<div class="block_5 flex-row">
							<div class="image-text_4 flex-col justify-between">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">{{this.$t('translations.submittingUpload')}}</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>

					<span class="text_10">{{this.$t('translations.directorShareholderCertificate')}}</span>
					<el-upload
						drag
						action= "http://192.168.3.23:8180/merchant/file/upload"
						:http-request="file => handleAvatarSuccess(file, fileList5)"
						:headers=headers
						:file-list="fileList5"
						:auto-upload="true"
						:on-preview="handlePreview"
						:before-upload="beforeUpload"

						:on-change="handleChange(5)"
						:on-remove="handleRemove(5)"


					>
						<div class="block_5 flex-row">
							<div class="image-text_4 flex-col justify-between">
								<img
									class="label_3"
									referrerpolicy="no-referrer"
									src="./assets/img/SketchPng4e45b4b8663604f7a908c696a67579f01e65d06a8c0f65a59ab6db8269c2c208.png"
								/>
								<span class="text-group_4">{{this.$t('translations.submittingUpload')}}</span>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip" style="margin-left: 40px">{{this.$t('translations.imagerTips')}}</div>

					</el-upload>

					<div class="flex-row justify-center">
						<el-button class="text-wrapper_3"  type="primary" @click="continueStep"><span class="text_12">
							{{this.$t('translations.submit')}}
						</span></el-button>
					</div>				</div>
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
import { getBlongBusiness } from "@/api/register";

export default {

	data() {
		return {
			numberStep:'1',
			hyOptions: [],
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
				type: '1',
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
	mounted() {
		this.getBBusiness()
	},
	methods: {
		handleChange(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		getBBusiness(state = 1) {
			getBlongBusiness({ state })
				.then(result => {
					this.hyOptions = result.data;
				})
				.catch(error => {
				});
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

			upload(
				formData,
			).then(res => {
				// 遍历 fileList，将每个文件的名称和URL加入到数组中
				console.info(this.fileList1.length);

				fileList.forEach(item => {

					if (item.name === res.data.fileName) {
						console.info(res.data.fileName);

						item.url = res.data.url; // 将接口返回的url赋给匹配项的url属性
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
		continueStep() {
			if (this.numberStep === '1') {
				if (this.formData.company === '') {
					this.$message.error(this.$t('translations.fillCompany'));
					return;
				}
				if (this.formData.companyType === '') {
					this.$message.error(this.$t('translations.selectCompanyType'));
					return;
				}
				if (this.formData.businessScale === '') {
					this.$message.error(this.$t('translations.fillRegistrationNumber'));
					return;
				}
				if (this.formData.website === '') {
					this.$message.error(this.$t('translations.fillCompanyWebsite'));
					return;
				}
				if (this.fileList1.length === 0) {
					this.$message.error(this.$t('translations.uploadRegistrationCertificate'));
					return;
				}
				if (this.fileList2.length === 0) {
					this.$message.error(this.$t('translations.uploadArticles'));
					return;
				}
				if (this.fileList3.length === 0) {
					this.$message.error(this.$t('translations.uploadBankStatement'));
					return;
				}
				this.numberStep = '2';
			} else if (this.numberStep === '2') {
				if (this.formData.country === '') {
					this.$message.error(this.$t('translations.enterRegistrationCountry'));
					return;
				}
				if (this.formData.address === '') {
					this.$message.error(this.$t('translations.fillRegisteredAddress'));
					return;
				}
				if (this.formData.city === '') {
					this.$message.error(this.$t('translations.fillCity'));
					return;
				}
				if (this.formData.province === '') {
					this.$message.error(this.$t('translations.fillProvince'));
					return;
				}
				if (this.formData.postCode === '') {
					this.$message.error(this.$t('translations.fillPostalCode'));
					return;
				}
				this.numberStep = '3';
			} else {
				if (this.fileList4.length === 0) {
					this.$message.error(this.$t('translations.uploadIDPassport'));
					return;
				}
				if (this.fileList5.length === 0) {
					this.$message.error(this.$t('translations.uploadDirectorShareholderCertificate'));
					return;
				}
				const url1 = this.fileList1.map(item => item.url);
				this.formData.license = url1.join(',');
				const url2 = this.fileList2.map(item => item.url);
				this.formData.constitution = url2.join(',');
				const url3 = this.fileList3.map(item => item.url);
				this.formData.bill = url3.join(',');
				const url4 = this.fileList4.map(item => item.url);
				this.formData.idCard = url4.join(',');
				const url5 = this.fileList5.map(item => item.url);
				this.formData.prove = url5.join(',');
				certificationApply(this.formData)
					.then((response) => {
						router.push({ path: '/AuthenticationProcessing' });
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