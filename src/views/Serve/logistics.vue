<template>
	<div class="app-container">
		<el-tabs v-model="activeName">
			<!-- 货物跟踪 -->
			<el-tab-pane>
				<span slot="label"><svg-icon icon-class="goods" /> {{$t('logistics.goodsTracking')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<pageSizeSelect
							class="mr12"
							@changeSize="$refs['order-search-form'].getList(1)"
							:limit.sync="form.pageSize"
						>
						</pageSizeSelect>
						<div class="icon-hover-effect" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div class="Flex alignC">
						<add-template href="https://airclick-oss.oss-cn-hongkong.aliyuncs.com/execl/merWebsite-en%20.xlsx" />
						<span class="download-btn cp mr12" @click="downloadOrderForm">
							<svg-icon icon-class="download" />
						</span>
						<file-upload class="mr12" :isShowTip="false" :fileUrl="'/deliver/deliverExcel'"></file-upload>
					</div>
				</div>
				<!-- 订单列表搜索组件 -->
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
					v-loading="loading"
					ref="multipleTable"
					:data="logisticsData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="50px"></el-table-column>
					<el-table-column v-if="merType === 0" prop="subMerNo" min-width="140" :label="$t('logistics.merchant')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>
					<el-table-column prop="tradeNo" min-width="170px" :label="$t('logistics.tradeNo')"></el-table-column>
					<el-table-column prop="merOrderNo" min-width="140px" :label="$t('logistics.orderNo')"></el-table-column>
					<el-table-column prop="sourceAmount" min-width="80px" :label="$t('logistics.orderAmount')"></el-table-column>
					<el-table-column prop="sourceCurrency" min-width="60px" :label="$t('logistics.currency')"></el-table-column>
					<el-table-column prop="trackNo" min-width="150px" :label="$t('logistics.trackingNo')"></el-table-column>
					<el-table-column prop="iogistics" min-width="80px" :label="$t('logistics.logisticsGs')"></el-table-column>
					<el-table-column prop="orderStatus" min-width="80px" :label="$t('logistics.tradeStatus')"></el-table-column>
					<el-table-column min-width="100px" :label="$t('logistics.trackingStatus')">
						<template slot-scope="scope">
							<div>
								{{ scope.row.checkState | formstatus }}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="tradeDateTime" min-width="170px" :label="$t('logistics.tradeTime')"></el-table-column>
					<el-table-column :label="$t('logistics.operate')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页器 -->
				<div class="footer-pagination-wrapper">
					<pagination
						:total="total"
						:page.sync="form.pageNum"
						:limit.sync="form.pageSize"
						@pagination="$refs['order-search-form'].getList()"
					>
					</pagination>
				</div>
			</el-tab-pane>
		</el-tabs>

		<!-- 上传物流信息   -->
		<el-dialog :title="$t('logistics.updateLogistics')" :visible.sync="showUploadLogisticsInfo" width="720px">
			<el-form
				:model="UploadLogisticsInfoForm"
				ref="UploadLogisticsInfoForm"
				label-width="100px"
				class="upload-logistics-info"
			>
				<el-form-item :label="$t('logistics.orderlsh')">
					<el-input type="text" readonly v-model="UploadLogisticsInfoForm.tradeNo" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.expectedDeliveryTime')">
					<el-date-picker v-model="UploadLogisticsInfoForm.arrivalTime" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('logistics.trackingNo')">
					<el-input type="text" class="ipt_W" v-model="UploadLogisticsInfoForm.trackNo" autocomplete="off"></el-input>
					<div class="icon-hover-effect mr12 icon_margin_LR" v-show="!showAddMore" @click="showAddMore = true">
						<i class="el-icon-circle-plus-outline"></i>
					</div>
					<div class="icon-hover-effect mr12 icon_margin_LR" v-show="showAddMore" @click="showAddMore = false">
						<i class="el-icon-remove-outline"></i>
					</div>
				</el-form-item>
				<el-form-item :label="$t('logistics.freightCompany')">
					<el-input type="text" class="ipt_W" v-model="UploadLogisticsInfoForm.iogistics" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.freightCompany')" v-show="showAddMore">
					<el-input type="text" class="ipt_W" v-model="UploadLogisticsInfoForm.trackNo1"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.transitCompany1')" v-show="showAddMore">
					<el-input type="text" class="ipt_W" v-model="UploadLogisticsInfoForm.iogistics1"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.shippingDocumentImage')">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
						<el-button size="small" type="primary">{{$t('logistics.selectFile')}}</el-button>
						<template #tip>
							<div class="el-upload__tip">{{$t('logistics.updateRule')}}</div>
						</template>
					</el-upload>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="showUploadLogisticsInfo = false">{{$t('logistics.close')}}</el-button>
					<el-button type="primary" @click="showUploadLogisticsInfo = false" class="btnbg">{{$t('logistics.confirmUpdate')}}</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改物流信息 -->
		<el-dialog destroy-on-close :title="$t('logistics.updateLogisticsInfo')" :visible.sync="showChangeLogisticsInfo" width="600px">
			<el-form
				:model="UploadLogisticsInfoForm"
				:rules="rules"
				ref="UploadLogisticsInfoForm"
				label-width="120px"
				label-position="left"
				class="show-change-logistics-info"
			>
				<el-form-item :label="$t('logistics.orderlsh')">
					<el-input type="text" readonly v-model="UploadLogisticsInfoForm.tradeNo" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.expectedDeliveryTime')" class="time-form-item-picker">
					<el-date-picker
						v-model="UploadLogisticsInfoForm.arrivalTime"
						type="date"
						:placeholder="$t('logistics.selectTime1')"
						value-format="yyyy-MM-dd HH:mm:ss"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('logistics.trackingNo')" prop="trackNo" class="trackNo-wrap">
					<el-input type="text" v-model="UploadLogisticsInfoForm.trackNo" autocomplete="off"></el-input>
					<div class="icon-hover-effect mr12 icon_margin_LR" v-show="!showAddMore" @click="showAddMore = true">
						<i class="el-icon-circle-plus-outline"></i>
					</div>
					<div class="icon-hover-effect mr12 icon_margin_LR" v-show="showAddMore" @click="showAddMore = false">
						<i class="el-icon-remove-outline"></i>
					</div>
				</el-form-item>
				<el-form-item :label="$t('logistics.goodsCompany')" prop="iogistics">
					<el-input type="text" v-model="UploadLogisticsInfoForm.iogistics" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.transferNumber1')" v-show="showAddMore">
					<el-input type="text" v-model="UploadLogisticsInfoForm.trackNo1"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.transitCompany1')" v-show="showAddMore">
					<el-input type="text" v-model="UploadLogisticsInfoForm.iogistics1"></el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.shippingDocumentImage')">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
						<el-button size="small" type="primary">{{$t('logistics.selectFile')}}</el-button>
						<template #tip>
							<div class="el-upload__tip">{{$t('logistics.updateRule')}}</div>
						</template>
					</el-upload>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="showChangeLogisticsInfo = false">{{$t('logistics.close')}}</el-button>
					<el-button type="primary" @click="Checklogistics" class="btnbg">{{$t('logistics.confirmCommit')}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import pageSizeSelect from "@/components/PageSizeSelect";
import circularDropdown from "@/components/CircularDropdown";
import pagination from "@/components/Pagination";
import {
	getlogistics,
	getChecklogistics,
	getRedactlogistics, // 编辑
	removeRedactlogistics,
} from "@/api/logistics";
import { downloadLogistics } from "@/api/download";
import { mapGetters } from "vuex";
import FileUpload from "@/components/FileUpload";
import SearchForm from "@/components/SearchForm";
import AddTemplate from "@/components/AddTemplate";
import i18n from "@/i18n";

var HKZT = [
	{ label: i18n.t('logistics.allall'), value: null },
	{ label: i18n.t('logistics.yhk'), value: "1" },
	{ label: i18n.t('logistics.whk'), value: "0" },
];
var GZDHZT = [
	{ label: i18n.t('logistics.allall'), value: null },
	{ label: i18n.t('logistics.ysc'), value: "SQ" },
	{ label: i18n.t('logistics.wsc'), value: "WS" },
	// {label: "待审核", value:"3"},
	{ label: i18n.t('logistics.cxSc'), value: "QSQ" },
	{ label: i18n.t('logistics.ytt'), value: "Y" },
	{ label: i18n.t('logistics.wtt'), value: "N" },
	{ label: i18n.t('logistics.wjg'), value: "W" },
	{ label: i18n.t('logistics.other'), value: "QT" },
];
export default {
	name: "Logistics",

	components: {
		pageSizeSelect,
		pagination,
		circularDropdown,
		FileUpload,
		SearchForm,
		AddTemplate,
	},

	data() {
		return {
			activeName: "0",
			merid: "",
			showScreen: false,
			loading: false,
			// 划款状态 默认值
			orderStatus: null,
			// 跟踪单号状态 默认值
			checkState: null,
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			formProps: {}, //保存搜索组件传过来的值
			rules: {
				trackNo: [{ required: true, message: this.$t('logistics.qsrgzddh'), trigger: "blur" }],
				iogistics: [{ required: true, message: this.$t('logistics.qsrhdmchygs'), trigger: "blur" }],
			}, //验证
			total: 0, // 总条数
			// 货物跟踪  数据
			logisticsData: [],
			operationList: [
				// { label: "上传", icon: "tk", value: "0" },
				{ label: this.$t('logistics.edit'), icon: "jf", value: "1" },
				{ label: this.$t('logistics.delete'), icon: "dj", value: "2" },
			],
			// 上传物流信息 弹窗
			showUploadLogisticsInfo: false,
			// 编辑
			UploadLogisticsInfoForm: {
				OrderNo: "",
				arrivalTime: "",
				Iogistics: "",
				TrackNo: "",
				status: "",
				trackNo1: "",
				iogistics1: "",
			},
			// 上传物流信息 弹窗 里面点击 + 后多的两个输入框
			showAddMore: false,
			// 修改物流信息 弹窗
			showChangeLogisticsInfo: false,
			// 修改物流信息 弹窗  里面点击 + 后多的两个输入框
			showChangeMore: false,
			// 勾兑、复核 记录日志搜索
			searchOption: {
				column: [
					{
						label: this.$t('logistics.merchant'),
						prop: "subMerNo",
						type: "input",
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('logistics.tradeNo'),
						prop: "tradeNo",
						type: "input",
					},
					{
						label: this.$t('logistics.orderNo'),
						prop: "merOrderNo",
						type: "input",
					},
					{
						label: this.$t('logistics.hkStatus'),
						prop: "isHK",
						type: "select",
						dicData: HKZT,
					},
					{
						label: this.$t('logistics.trackingStatus'),
						prop: "checkState",
						type: "select",
						dicData: GZDHZT,
					},
					{
						label: this.$t('logistics.tradeTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
			// table勾选
			multipleSelection: [],
		};
	},

	computed: {
		...mapGetters(["merType"]),
	},
	watch: {
		showChangeLogisticsInfo: function (val) {
			if (!val) {
				this.showAddMore = false;
			}
		},
	},
	filters: {
		formstatus(val) {
			switch (val) {
				case "SQ":
					return i18n.t('logistics.ysc');
				case "WS":
					return i18n.t('logistics.wsc');
				case "QSQ":
					return  i18n.t('logistics.cxSc');
				case "Y":
					return i18n.t('logistics.ytt');
				case "N":
					return i18n.t('logistics.wtt');
				case "W":
					return i18n.t('logistics.wjg');
				case "QT":
					return i18n.t('logistics.other');
				case 0:
					return "";
				case 1:
					return i18n.t('logistics.tradeError');
				case 2:
					return i18n.t('logistics.preAuthorizationInProgress');
				case 3:
					return i18n.t('logistics.preAuthorizationInProgressSuccess');
				case 4:
					return i18n.t('logistics.preAuthorizationInProgressFail');
				case 5:
					return i18n.t('logistics.tradeSuccess');
				case 6:
					return i18n.t('logistics.tradeFail');
				case 7:
					return i18n.t('logistics.tradeClose');
				case 8:
					return i18n.t('logistics.tradeCloseZhong');
				case 9:
					return i18n.t('logistics.refundSuccess');
				case 10:
					return i18n.t('logistics.refundZhong');
				case 11:
					return i18n.t('logistics.protest');
				case 12:
					return i18n.t('logistics.protestZhong');
				case 13:
					return i18n.t('logistics.dongJie');
				case 14:
					return i18n.t('logistics.dongJiZhong');
				case 15:
					return i18n.t('logistics.jieDong');
				case 16:
					return i18n.t('logistics.jieDongZhong');
				case 17:
					return i18n.t('logistics.refundProtest');
				case null:
					return "";
			}
		},
	},
	methods: {
		// 分页请求
		getSearchForm(params) {
			this.formProps = params; //存储点击搜索按钮后的值
			// tabs click 的分页 点击分页 获取 当前页的数据
			if (this.activeName === "0") {
				// 物流
				this.getWLdataList(params);
			}
		},
		// 获取  按条件查询 物流管理  数据
		getWLdataList(page) {
			let data = {
				...page,
				startTime: page.time[0],
				endTime: page.time[1],
			};
			this.$delete(data, "time");
			this.loading = true;
			getChecklogistics(data).then(res => {
				this.loading = false;
				this.total = res.data.total;
				this.logisticsData = res.data.list;
			});
		},
		// 下载交易成功且未上传的物流信息的订单
		downloadOrderForm() {
			const Xz = {
				tradeNo: this.formProps.tradeNo,
				merOrderNo: this.formProps.merOrderNo,
				isHK: this.formProps.isHK,
				checkState: this.formProps.checkState,
				startTime: this.formProps.time[0],
				endTime: this.formProps.time[1],
			};
			downloadLogistics(Xz)
				.then(result => {
					this.$message.success(result.data);
				})
		},
		// 当前行的 操作
		operateScope(params) {
			if (params.command.label == "上传") {
				this.showUploadLogisticsInfo = true;
				this.UploadLogisticsInfoForm = params.data;
			} else if (params.command.label == this.$t('logistics.edit')) {
				this.showChangeLogisticsInfo = true;
				this.UploadLogisticsInfoForm = params.data;
				if (params.data.trackNo1 || params.data.iogistics1) {
					this.showAddMore = true;
				}
			} else if (params.command.label ==  this.$t('logistics.delete')) {
				// 移除  物流管理  数据
				removeRedactlogistics({
					tradeNo: params.data.tradeNo,
				}).then(res => {
					this.$refs["order-search-form"].getList();
				});
			}
		},
		// 点击确认
		Checklogistics() {
			this.$refs.UploadLogisticsInfoForm.validate(valid => {
				if (valid) {
					getRedactlogistics({
						tradeNo: this.UploadLogisticsInfoForm.tradeNo,
						arrivalTime: this.UploadLogisticsInfoForm.arrivalTime,
						logistics: this.UploadLogisticsInfoForm.iogistics,
						trackNo: this.UploadLogisticsInfoForm.trackNo,
						logistics1: this.UploadLogisticsInfoForm.iogistics1,
						trackNo1: this.UploadLogisticsInfoForm.trackNo1,
						logistics2: "",
						trackNo2: "",
						multipartFile: "",
					}).then(res => {
						if (res.status == 200) {
							this.$message.success(res.data);
							this.$refs["order-search-form"].getList();
						} else {
							this.$message.error(res.msg);
						}
					});
					this.showChangeLogisticsInfo = false;
				}
			});
		},

		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
	},
};
</script>

<style lang="less">
.upload-logistics-info {
	.el-form-item {
		width: 400px;
	}
}
.show-change-logistics-info {
	.el-form-item {
		width: 400px;
	}
	.trackNo-wrap {
		width: 443px;
		.el-form-item__content {
			display: flex;
		}
	}
}

@import "../../assets/styles/template";
</style>
