<template>
	<div class="app-container">
		<div class="header-userInfo">
			<h3 class="page-title mb8 margin_T_B_20">
				<span>{{$t('configure.merchant')}}</span>
				<span>/</span>
				<span>{{ userInfoForm.merno }}</span>
			</h3>
			<div class="right">
				<el-button @click="handleGoIndex"><i class="el-icon-dat"></i> {{$t('configure.return')}}</el-button>
			</div>
		</div>

		<el-tabs>
			<!-- 用户管理--个人信息 -->
			<el-tab-pane>
				<span slot="label"><i class="el-icon-office-building"></i> {{$t('configure.personalInformation')}}</span>
				<!-- 可输入模式 -->
				<div v-loading="loading" class="flex_l_r box_W padding_TB10_LR20" v-show="inputUserInfoForm_ipt">
					<div class="L">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.merchantName')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.bankOfDeposit')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.bank" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.accountOpening')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.account" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.payee')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.accountname" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.website')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.website" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.location')" class="margin_T20">
								<el-input
									type="text"
									v-model="userInfoForm.province"
									:placeholder="$t('configure.province')"
									class="ipt_W margin_r"
								></el-input>
								<el-input type="text" v-model="userInfoForm.city" :placeholder="$t('configure.province')" class="ipt_W"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="R">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.contacts')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.linkman" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.telephone')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.linkphone" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="Email" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.email" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.contactAddress')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.address" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.fax')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.fax" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<!-- 半输入模式 -->
				<div v-loading="loading" class="flex_l_r box_W padding_TB10_LR20" v-show="halfUserInfoForm_ipt">
					<div class="L">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.merchantName')" class="margin_T20">
								{{ userInfoForm.name }}
							</el-form-item>
							<el-form-item :label="$t('configure.bankOfDeposit')" class="margin_T20">
								{{ userInfoForm.bank }}
							</el-form-item>
							<el-form-item :label="$t('configure.accountOpening')" class="margin_T20">
								{{ userInfoForm.account }}
							</el-form-item>
							<el-form-item :label="$t('configure.payee')" class="margin_T20">
								{{ userInfoForm.accountname }}
							</el-form-item>
							<el-form-item :label="$t('configure.website')" class="margin_T20">
								{{ userInfoForm.website }}
							</el-form-item>
							<el-form-item :label="$t('configure.location')" class="margin_T20">
								{{ userInfoForm.province }}{{ "-" }}{{ userInfoForm.city }}
							</el-form-item>
						</el-form>
					</div>
					<div class="R">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.contacts')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.linkman" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.telephone')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.linkphone" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="Email" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.email" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.contactAddress')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.address" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('configure.fax')" class="margin_T20">
								<el-input type="text" v-model="userInfoForm.fax" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<!-- 只读模式 -->
				<div v-loading="loading" class="flex_l_r box_W padding_TB10_LR20" v-show="readOnlyUserInfoForm_ipt">
					<div class="L">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.merchantName')" class="margin_T20">
								{{ userInfoForm.name }}
							</el-form-item>
							<el-form-item :label="$t('configure.bankOfDeposit')" class="margin_T20">
								{{ userInfoForm.bank }}
							</el-form-item>
							<el-form-item :label="$t('configure.accountOpening')" class="margin_T20">
								{{ userInfoForm.account }}
							</el-form-item>
							<el-form-item :label="$t('configure.payee')" class="margin_T20">
								{{ userInfoForm.accountname }}
							</el-form-item>
							<el-form-item :label="$t('configure.website')" class="margin_T20">
								{{ userInfoForm.website }}
							</el-form-item>
							<el-form-item :label="$t('configure.location')" class="margin_T20">
								{{ userInfoForm.province }}{{ "-" }}{{ userInfoForm.city }}
							</el-form-item>
						</el-form>
					</div>
					<div class="R">
						<el-form :model="userInfoForm" ref="userInfoForm" label-width="80px">
							<el-form-item :label="$t('configure.contacts')" class="margin_T20">
								{{ userInfoForm.linkman }}
							</el-form-item>
							<el-form-item :label="$t('configure.telephone')" class="margin_T20">
								{{ userInfoForm.linkphone }}
							</el-form-item>
							<el-form-item label="Email" class="margin_T20">
								{{ userInfoForm.email }}
							</el-form-item>
							<el-form-item :label="$t('configure.contactAddress')" class="margin_T20">
								{{ userInfoForm.address }}
							</el-form-item>
							<el-form-item :label="$t('configure.fax')" class="margin_T20">
								{{ userInfoForm.fax }}
							</el-form-item>
						</el-form>
					</div>
				</div>

				<el-collapse v-model="activeNames">
					<!--提交记录-->
					<div class="tip-wrap">
							<el-collapse-item :title="$t('configure.commitRecord')" name="1">
							<el-table
								:data="msgList"
								style="width: 100%"
								@expand-change="expandChange"
								row-key="id">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-form label-position="left" inline class="demo-table-expand">
											<el-form-item :label="$t('configure.merchantName')">
												<span>{{ props.row.name }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.contacts')">
												<span>{{ props.row.linkMan }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.bankOfDeposits')">
												<span>{{ props.row.bank }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.telephone')">
												<span>{{ props.row.linkPhone }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.accountOpening')">
												<span>{{ props.row.account }}</span>
											</el-form-item>
											<el-form-item label="Email">
												<span>{{ props.row.email }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.payee')">
												<span>{{ props.row.accountName }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.contactAddress')">
												<span>{{ props.row.address }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.website')">
												<span>{{ props.row.website }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.location')">
												<span>{{ props.row.province }} - {{ props.row.city }}</span>
											</el-form-item>
											<el-form-item :label="$t('configure.fax')">
												<span>{{ props.row.fax }}</span>
											</el-form-item>
										</el-form>
									</template>
								</el-table-column>
								<el-table-column
									:label="$t('configure.location')"
									prop="merNo">
								</el-table-column>
								<el-table-column
									:label="$t('configure.state')"
									prop="auditStatus">
								</el-table-column>
								<el-table-column
									:label="$t('configure.modificationTime')"
									prop="createTime">
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</div>
					<!--交易白名单-->
					<div class="tip-wrap" v-if="userInfoForm.cardWhiteSwitch">
						<el-button class="addWhiteList" @click="addWhiteListDialog = true">{{$t('configure.addWhitelist')}}</el-button>
						<el-collapse-item :title="$t('configure.transactionWhitelist')" name="2">
							<el-table :data="whiteListData" style="width: 100%">
								<el-table-column prop="fileName" :label="$t('configure.fileName')"></el-table-column>
								<el-table-column prop="showStatus" :label="$t('configure.state')">
									<template slot-scope="scope">
										{{ scope.row.showStatus === 1 ? $t('configure.takeEffect') : scope.row.showStatus === 2 ? $t('configure.processing') : $t('configure.fail') }}
									</template>
								</el-table-column>
								<el-table-column prop="uploadTime" :label="$t('configure.creationTime')"></el-table-column>
								<el-table-column>
									<template slot-scope="scope">
										<el-button v-if="scope.row.showStatus === 1" icon="el-icon-download" circle @click="historyListDownload(scope.row)"></el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</div>
				</el-collapse>
				<!-- 按钮 -->
				<div class="margin_T_B_20 border_T padding_TB10_LR20 btn-wrap">
					<div class="margin_T20" v-show="showRedact" @click="showRedact = !showRedact">
						<el-button class="padding_TB10_LR20" @click="changeuserInfo">{{$t('configure.edit')}}</el-button>
					</div>
					<div class="margin_T20" v-show="!showRedact">
						<el-button class="padding_TB10_LR20 bg_7F8DFF" @click="changeUserInfoForm_ipt">{{$t('configure.save')}}</el-button>
						<el-button class="padding_TB10_LR20" @click="cancel">{{$t('configure.cancellation')}}</el-button>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>

		<!-- 白名单弹框 -->
		<el-dialog :title="$t('configure.add')" :visible.sync="addWhiteListDialog" width="30%" destroy-on-close>
			<div class="white-list-wrap">
				<div class="updata-wrap">
					<span>{{$t('configure.updateFile')}}：</span>
					<span>
						<el-upload
							class="upload-demo"
							ref="upload"
							:action="uploadFileUrl + '/uploadWhiteList'"
							:multiple="false"
							:auto-upload="false"
							:on-exceed="handleExceed"
							:on-change="getFile"
							:on-remove="removeFile"
							:on-success="postSuccess"
							:data="fileObj"
							:limit="1"
							accept=".xlsx"
							:headers=headers
						>
							<el-button size="small" type="primary">{{$t('configure.selectFile')}}</el-button>
							<div slot="tip" class="el-upload__tip">{{$t('configure.updateFileRule')}}</div>
						</el-upload>
					</span>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addWhiteListDialog = false">{{$t('configure.cancellation1')}}</el-button>
				<el-button type="primary" @click="handleAddWhiteListUpdata">{{$t('configure.update')}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
// import pagination from "@/components/Pagination"
import { getUserInfo, getChangeUserInfo, getWhiteList } from "@/api/userInfo";

export default {
	name: "configure",

	components: {},

	directives: {},
	data() {
		return {
			loading: false,
			merno: "",
			readOnlyUserInfoForm_ipt: true, //只读模式
			halfUserInfoForm_ipt: false, // 半输入模式
			inputUserInfoForm_ipt: false, // 全输入模式
			jurisdiction: true,
			userInfoForm: {
				merno: "",
				name: "",
				bank: "",
				account: "",
				accountname: "",
				website: "",
				province: "",
				city: "",
				address: "",
				linkman: "",
				email: "",
				linkphone: "",
				fax: "",
				md5key: "",
				remark: "",
				operatorId: "",
				merid: "",
			},
			showRedact: true,
			msgList: [],//提示的数据
			expands: [],//需要展开的数据
			activeNames: ["2"],
			whiteListData: [
				{ date: "123123", name: "1", address: "123123x" },
			],
			addWhiteListDialog: false,
			headers: {
				"Authorization": sessionStorage.getItem("JWT"),
			},
			uploadFileUrl: process.env.VUE_APP_BASE_API,
			fileObj: {},
		};
	},
	created() {
		this.userInfo();
	},
	computed: {},
	watch: {
		addWhiteListDialog: function(val) {
			if (!val) {
				this.fileObj = {};
			}
		},
	},
	methods: {
		userInfo() {
			this.loading = true;
			getUserInfo({}).then(res => {
				this.loading = false;
				this.userInfoForm = res.data.userInfo;
				this.msgList = res.data.list;
				if(this.userInfoForm.cardWhiteSwitch){
					this.$getWhiteList();
				}
			});
		},
		changeuserInfo() {
			// this.userInfoForm_ipt=false;
			if (this.jurisdiction) {
				this.readOnlyUserInfoForm_ipt = false;
				this.inputUserInfoForm_ipt = true; //有权限 --全输入模式
			} else if (!this.jurisdictionfalse) {
				this.readOnlyUserInfoForm_ipt = false;
				this.halfUserInfoForm_ipt = true; //无权限 --半输入模式
			}
		},
		//点击取消的时候
		cancel() {
			this.showRedact = true; // 取消和保存 按钮消失 编辑按钮显示
			this.readOnlyUserInfoForm_ipt = true; // 只读模式显示
			this.halfUserInfoForm_ipt = false; // 半输入模式不显示
			this.inputUserInfoForm_ipt = false; // 全输入模式不显示
		},
		// 当点击时 发送请求
		changeUserInfoForm_ipt() {
			this.loading = true;
			this.showRedact = true; // 取消和保存  按钮消失 编辑按钮显示
			this.readOnlyUserInfoForm_ipt = true;
			this.halfUserInfoForm_ipt = false; // 半输入模式
			this.inputUserInfoForm_ipt = false; // 全输入模式
			getChangeUserInfo({
				merNo: this.userInfoForm.merno,
				name: this.userInfoForm.name,
				bank: this.userInfoForm.bank,
				account: this.userInfoForm.account,
				accountName: this.userInfoForm.accountname,
				website: this.userInfoForm.website,
				province: this.userInfoForm.province,
				city: this.userInfoForm.city,
				address: this.userInfoForm.address,
				linkMan: this.userInfoForm.linkman,
				email: this.userInfoForm.email,
				linkPhone: this.userInfoForm.linkphone,
				fax: this.userInfoForm.fax,
				merId: this.userInfoForm.merid,
				md5key: this.userInfoForm.md5key,
			}).then(res => {
				this.loading = false;
				this.$message(res.data);
				this.userInfo();
			}).catch(err => {
				this.loading = false;
				this.userInfo();
			});
		},
		// 点击返回
		handleGoIndex() {
			this.$router.push({ path: "/index" });
		},
		//提示的展开只展开一个
		expandChange(row, expandedRows) {
			this.expands = [row.id];
		},
		//	上传白名单
		async handleAddWhiteListUpdata() {
			await this.$refs.upload.submit();
			this.$message.warning(this.$t('configure.wenAn'));
			this.addWhiteListDialog = false;
			this.$getWhiteList();
		},
		//	限制上传文件数量
		handleExceed() {
			this.$message.warning(this.$t('configure.ruleFile'));
		},
		// 上传时的change事件
		getFile(file) {
			let fd = new FormData();
			fd.append("file", file.raw);
			this.fileObj = { ...fd };
		},
		// removeFile移除文件
		removeFile() {
			this.fileObj = {};
		},
		// 上传后返回的状态
		postSuccess(response, file, fileList) {
			if (response.status === 200) {
				this.$message.success(response.data);
			} else {
				this.$message.error(response.msg);
				this.$refs.upload.clearFiles();
				this.fileObj = {};
			}
		},
		//获取白名单列表
		$getWhiteList() {
			getWhiteList().then(res => {
				if (res.status === 200) {
					this.whiteListData = res.data;
				}
			});
		},
		//	下载白名单
		historyListDownload(row) {
			if (row.uploadPath) {
				window.location.href = row.uploadPath;
			}
		},
	},
};

// }
</script>

<style scoped lang="less">
* {
	margin: 0;
	padding: 0;
}

.font_color {
	color: #8094ae;
}

.box_W {
	width: 942px;
}

.flex {
	display: flex;
}

.flex_l_r {
	display: flex;
	justify-content: space-between;
}

.margin_T_B_20 {
	margin: 20px 0;
}

.margin_T20 {
	margin-top: 20px;
}

.padding_TB10_LR20 {
	padding: 10px 20px;
	box-sizing: border-box;
}

.right {
	text-align: right;
}

.border_T {
	border-top: 1px solid #dbdfea;
}

.L,
.R {
	width: 50%;
}

.readOnly {
	display: inline-block;
	width: 180px;
	text-overflow: ellipsis; /*只是起到注解作用*/
	white-space: nowrap; /*不让文本换行*/
	overflow: hidden; /*超出的部分显示...*/
}

.ipt_W {
	width: 80px;
}

.margin_r {
	margin-right: 10px;
}

.bg_7F8DFF {
	background: #7f8dff;
	color: aliceblue;
}

.el-button {
	padding: 12px 20px;
}

.cell {
	.el-button {
		padding: 12px;
	}
}

.header-userInfo {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.btn-wrap {
	display: flex;
	justify-content: flex-end;
}

.tip-wrap {
	border-top: 1px solid #dbdfea;
	font-size: 14px;
	padding-top: 20px;
	padding-left: 20px;

	&:nth-of-type(2) {
		position: relative
	}

	.addWhiteList {
		position: absolute;
		right: 30px;
		top: 25px;
	}
}

.demo-table-expand {
	.el-form-item {
		width: 49%;
		text-align: left;

		.el-form-item__label {
			width: 100px;
			text-align: right;
			margin-right: 30px;
		}
	}
}

.white-list-wrap {
	min-height: 100px;
	display: flex;
	justify-content: center;

	.updata-wrap {
		margin-top: 30px;
		font-size: 16px;
		display: flex;
		position: relative;

		span:first-child {
			display: inline-block;
			width: 100px;
		}

		.el-upload__tip {
			margin-top: 7px !important;
		}

		span:nth-of-type(3) {
			font-size: 14px;
			color: #409eff;
			position: absolute;
			right: 0;
			top: 5px;
			cursor: pointer;
		}
	}
}
</style>
