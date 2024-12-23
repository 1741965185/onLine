<!--没翻译-->
<template>
	<div class="app-container" v-loading="loading">
		<!-- 头部 -->
		<div class="top-title-bar" style="margin-bottom: 8px">
			<h3 class="page-title">
				{{$t('editMerchant.merchant')}} / <span class="c-7F8DFF">{{ merno || "-" }}</span>
			</h3>
			<el-button class="go-back-btn" @click="$router.go(-1)">
				<svg-icon icon-class="arrow-left" />
				<span>{{$t('editMerchant.back')}}</span>
			</el-button>
		</div>
		<!-- 主体部 -->
		<el-tabs class="pr" v-model="activeName">
			<!-- 个人信息 -->
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="person" /> {{$t('editMerchant.personalInfo')}}</span>
				<div class="edit-save">
					<el-button @click="handleEditSave">{{editOrSave ? $t('editMerchant.edit') : $t('editMerchant.edit')}}</el-button>
				</div>
				<el-form class="person-form" :model="personForm" label-width="120px" label-position="left">
					<el-row>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.name')">
								<el-input v-model="personForm.name" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item :label="$t('editMerchant.contact')">
								<el-input v-model="personForm.linkman" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.bank')">
								<el-input v-model="personForm.bank" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item :label="$t('editMerchant.phone')">
								<el-input v-model="personForm.linkphone" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.account')">
								<el-input v-model="personForm.account" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item label="Email">
								<el-input v-model="personForm.email" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.beneficiary')">
								<el-input v-model="personForm.accountname" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item :label="$t('editMerchant.address')">
								<el-input v-model="personForm.address" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.website')">
								<el-input v-model="personForm.website" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item label="PrivateKey">
								<el-input v-model="personForm.md5key" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('editMerchant.city')">
								<el-input v-model="personForm.city" placeholder="" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item :label="$t('editMerchant.fax')">
								<el-input v-model="personForm.fax" placeholder="" :disabled="isLock"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import { subMerchantDetail,editSubMerchant } from "@/api/account";
export default {
	data() {
		return {
			loading: false,
			activeName: "0",
			personForm: {},
			merId: "",
			merno: "",
			isLock: true,
			editOrSave:true
		};
	},
	created() {
		this.merId = this.$route.query.id;
		this.merno = this.$route.query.merno;
		this.getSubMerchantDetail()
	},
	methods: {
		// 编辑保存
		handleEditSave(){
			if(this.editOrSave){
				// 编辑
				this.isLock = false
				this.editOrSave = false
			}else{
				// 保存
				editSubMerchant({
					id:this.merId,
					linkMan:this.personForm.linkman,
					linkPhone:this.personForm.linkphone,
					email:this.personForm.email,
					address:this.personForm.address,
					privateKey:this.personForm.md5key,
					fax:this.personForm.fax,
				}).then(res=>{
					if(res.status == 200){
						this.$message.success(res.data);
						this.isLock = true
						this.editOrSave = true
					}
				})
			}
		},
		getSubMerchantDetail(){
			subMerchantDetail({
				id:this.merId
			}).then(res=>{
				this.personForm = res.data
			})
		}
	},
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/template";
@import "../../assets/styles/detailsList";
.el-tab-pane {
	padding: 25px;
}
.edit-save {
	text-align: end;
	margin-bottom: 20px;
}
.person-form {
	/deep/ .el-form-item__label {
		font-weight: 500;
		color: #8094ae;
	}

	/deep/ .el-input.is-disabled {
		input {
			border: none;
			background-color: transparent;
			padding: 0;
			text-align: right;
			font-weight: bold;
			color: #526484;
			cursor: auto;
		}
	}

	.el-switch {
		height: 32px;
		line-height: 32px;
	}

	/deep/ .el-switch__core {
		width: 64px !important;
		height: 32px !important;
		border-radius: 16px;

		&:after {
			width: 28px;
			height: 28px;
			left: 2px;
		}
	}

	/deep/ .el-switch.is-checked .el-switch__core::after {
		left: 100%;
		margin-left: -30px !important;
	}
}
</style>
