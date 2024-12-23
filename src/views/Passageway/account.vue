<template>
	<div class="app-container">
		<h3 class="page-title mb28">{{$t('account.merchantSetting')}}</h3>
		<el-tabs v-model="activeName">
			<el-tab-pane>
				<span slot="label"><svg-icon icon-class="person" />&nbsp;{{$t('account.accountSetting')}}</span>
				<div class="card-tools-toggle Flex spaceB alignC">
					<div class="Flex alignC">
						<page-size-select
							class="mr12"
							@changeSize="$refs['order-search-form'].getList(1)"
							:limit.sync="form.pageSize"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div class="Flex alignC">
						<el-button class="air-btn-add" type="primary" icon="el-icon-plus" @click="handleAddChildMerchant">
						</el-button>
					</div>
				</div>
				<!-- 商户设置搜索组件 -->
				<template v-if="activeName == 0">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>
				<el-table
					ref="accountTableList"
					:data="accountTableList"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column prop="subMerNo" :label="$t('account.merchant')"> </el-table-column>
					<el-table-column prop="userName" :label="$t('account.username')"> </el-table-column>
					<el-table-column prop="linkPhone" :label="$t('account.phone')"> </el-table-column>
					<el-table-column min-width="160" prop="email" :label="$t('account.email')"> </el-table-column>
					<el-table-column prop="active" :label="$t('account.status')">
						<template slot-scope="scope">
							{{ scope.row.active == "1" ? $t('account.active') : scope.row.active == "0" ? $t('account.notActive') : $t('account.close') }}
						</template>
					</el-table-column>
					<el-table-column min-width="160" prop="operateTime" :label="$t('account.updateTime')">
						<template slot-scope="scope">
							{{ scope.row.operateTime ? dayjs(scope.row.operateTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
						</template>
					</el-table-column>
					<el-table-column width="80" :label="$t('account.operate')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			></pagination>
		</el-tabs>
		<!-- 重置密码 -->
		<el-dialog :title="$t('account.resetPassword')" :visible.sync="showPwdDialog" width="500px">
			<el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules" label-width="120px" label-position="left">
				<el-form-item :label="$t('account.oldPwd')" prop="oldPassword">
					<el-input show-password v-model="pwdForm.oldPassword"></el-input>
				</el-form-item>
				<el-form-item :label="$t('account.pwd')" prop="newPassword">
					<el-input show-password v-model="pwdForm.newPassword"></el-input>
				</el-form-item>
				<el-form-item :label="$t('account.confirmPassword')" prop="newPasswordAg">
					<el-input show-password v-model="pwdForm.newPasswordAg"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="air-btn-cancel" @click="showPwdDialog = false">{{$t('account.cancellation')}}</el-button>
				<el-button class="air-btn-save" type="primary" @click="putPwdForm('pwdForm')">{{$t('account.confirmSave')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import PageSizeSelect from "@/components/PageSizeSelect/index";
import { getAccountList, updatePwd } from "@/api/account";
import CircularDropdown from "@/components/CircularDropdown";
import SearchForm from "@/components/SearchForm";
import i18n from "@/i18n";

var ZT = [
	{ label: i18n.t('account.allAll'), value: "" },
	{ label: i18n.t('account.active'), value: "1" },
	{ label: i18n.t('account.audit'), value: "0" },
	{ label: i18n.t('account.close'), value: "-1" },
];
export default {
	name: "account",
	components: {
		pagination,
		PageSizeSelect,
		CircularDropdown,
		SearchForm,
	},
	data() {
		const equalToPassword2 = (rule, value, callback) => {
			if (this.pwdForm.newPassword !== value) {
				callback(new Error(i18n.t('account.pwdRule')));
			} else {
				callback();
			}
		};
		return {
			activeName: "0",
			showScreen: false,
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			total: 0,
			loading: false,
			accountTableList: [], // 商户管理列表
			multipleSelection: [],
			operationList: [
				{ label: i18n.t('account.edit'), value: 0, icon: "edit" },
				{ label: i18n.t('account.resetPassword'), value: 1, icon: "" },
			], // 操作列表
			// 重置密码弹窗/表单/规则
			showPwdDialog: false,
			pwdForm: {},
			pwdRules: {
				oldPassword: [{ required: true, message: this.$t('account.oldpwdRule'), trigger: "blur" }],
				newPassword: [
					{ required: true, message: this.$t('account.newpwdRule'), trigger: "blur" },
					{ min: 8, max: 20, message: this.$t('account.lengthRual'), trigger: "blur" },
				],
				newPasswordAg: [
					{ required: true, message: this.$t('account.resetPwdRual'), trigger: "blur" },
					{ required: true, validator: equalToPassword2, trigger: "blur" },
				],
			},
			// 商户设置搜索
			searchOption: {
				column: [
					{
						label: this.$t('account.merchant'),
						prop: "subMerNo",
						type: "input",
					},
					{
						label: this.$t('account.username'),
						prop: "userName",
						type: "input",
					},
					{
						label: this.$t('account.status'),
						prop: "active",
						type: "select",
						dicData: ZT,
					},
				],
			},
		};
	},

	watch: {
		showPwdDialog: function (newVal, oldVal) {
			if (!newVal) {
				this.pwdForm = {};
				this.$refs["pwdForm"].resetFields();
				this.$nextTick(() => {
					this.$refs["pwdForm"].clearValidate();
				});
			}
		},
	},
	methods: {
		putPwdForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					updatePwd({
						administratorId:this.pwdForm.id,
						originPwd:this.pwdForm.oldPassword,
						newPwd:this.pwdForm.newPassword,
					}).then(result => {
						if (result.status === 200) {
							this.$message.success(result.data);
							this.showPwdDialog = false;
						} else {
							this.$message.error(result.msg);
						}
					});
				} else {
					return false;
				}
			});
		},
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 分页请求
		getSearchForm(params) {
			if (this.activeName === "0") {
				this.$getAccountList(params);
			}
		},
		$getAccountList(page) {
			this.loading = true;
			getAccountList(page)
				.then(result => {
					this.loading = false;
					if (result.status === 200) {
						this.accountTableList = result.data.list;
						this.total = result.data.total;
					}
				})
				.catch(error => {
					this.$message.error(this.$t('account.selectError'));
					this.loading = false;
				});
		},
		// 操作
		async operateScope(params) {
			if (params.command.value === 0) {
				this.$router.push({
					path: "/details/editChildMerchant",
					query: { id: params.data.id, merno: params.data.subMerNo },
				});
			} else if (params.command.value === 1) {
				this.pwdForm["id"] = params.data.administratorId;
				this.showPwdDialog = true;
			}
		},
		// 跳转添加商户页面
		handleAddChildMerchant() {
			this.$router.push({ path: "/details/addChildMerchant" });
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
</style>
