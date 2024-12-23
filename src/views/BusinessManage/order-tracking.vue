<template>
	<div class="app-container">
		<h3 class="page-title mb28">{{$t("orderTracking.orderTracking")}}</h3>
		<el-tabs>
			<!-- 订单跟踪tab-content -->
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="gz" />&nbsp;{{$t("orderTracking.orderTracking")}}</span>

				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							class="mr12"
							:limit.sync="form.pageSize"
							@changeSize="$refs['order-search-form'].getList(1)"
						></page-size-select>
						<div class="icon-hover-effect" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div>
						<span class="download-btn cp" @click="orderDownLoad">
							<svg-icon icon-class="download" />
						</span>
					</div>
				</div>
				<!-- 订单跟踪搜索组件 -->
				<search-form
					ref="order-search-form"
					v-show="showScreen"
					:option="searchOption"
					:formSearch="form"
					@getSearchForm="getSearchForm($event, 1)"
				></search-form>
				<el-table
					ref="multipleTable"
					:data="tableData"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column v-if="merType === 0" prop="tradeNo" min-width="140" :label="$t('orderList.merchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>
					<el-table-column prop="tradeNo" min-width="200" :label="$t('orderTracking.transactionSerialNumber')"></el-table-column>
					<el-table-column prop="billNo" min-width="150" :label="$t('orderTracking.orderNumber')"></el-table-column>
					<el-table-column prop="currencyCode" min-width="" :label="$t('orderTracking.currency')" ></el-table-column>
					<el-table-column prop="amount" min-width="" :label="$t('orderTracking.orderAmount')"></el-table-column>
					<el-table-column prop="errorCode" :label="$t('orderTracking.errorCode')"></el-table-column>
					<el-table-column prop="descr" :label="$t('orderTracking.description')" min-width="150"></el-table-column>
					<el-table-column prop="status" width="" :label="$t('orderTracking.exceptionType')" min-width="150"></el-table-column>
					<el-table-column prop="holderName" min-width="150" :label="$t('orderTracking.customerName')"></el-table-column>
					<el-table-column prop="holderPhone" min-width="150" :label="$t('orderTracking.customerPhone')"></el-table-column>
					<el-table-column prop="holderEmail" min-width="190" :label="$t('orderTracking.customerEmail')"></el-table-column>
					<el-table-column prop="clientIp" min-width="110" :label="$t('orderTracking.ipAddress')"></el-table-column>
					<el-table-column prop="merUrl" min-width="150" :label="$t('orderTracking.sourceWebsite')"></el-table-column>
					<el-table-column min-width="160px" :label="$t('orderTracking.transactionTime')">
						<template slot-scope="scope">
							{{ dayjs(scope.row.enterTime).format("YYYY-MM-DD HH:mm:ss") }}
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<div class="">
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form'].getList()"
				></pagination>
			</div>
		</el-tabs>
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import PageSizeSelect from "@/components/PageSizeSelect/index";
import { getListCx } from "@/api/business";
import { downloadTracking } from "@/api/download";
import { mapGetters } from "vuex";
import SearchForm from "@/components/SearchForm";
import i18n from "@/i18n";

var YCLX = [
	{ label: i18n.t('orderTracking.alls'), value: "" },
	{ label: i18n.t('orderTracking.paymentGateway'), value: "1000" },
	{ label: i18n.t('orderTracking.paymentFormPage'), value: "2000" },
	{ label: i18n.t('orderTracking.riskControlBlock'), value: "3000" },
];
var MS = [
	{ label: i18n.t('orderTracking.alls'), value: "" },
	{ label: i18n.t('orderTracking.paymentFormPage'), value: "2000" },
	{ label: i18n.t('orderTracking.merchantWebsiteRestriction'), value: "1115" },
	{ label: i18n.t('orderTracking.exceedSingleTransactionLimit'), value: "2011" },
	{ label:  i18n.t('orderTracking.exceedDailyTransactionLimit'), value: "2012" },
	{ label: i18n.t('orderTracking.exceedMonthlyTransactionLimit'), value: "2013" },
	{ label: i18n.t('orderTracking.incorrectCurrency'), value: "1107" },
	{ label: i18n.t('orderTracking.visaChannelUnavailable'), value: "2003" },
	{ label: i18n.t('orderTracking.masterChannelUnavailable'), value: "2002" },
	{ label: i18n.t('orderTracking.jcbChannelUnavailable'), value: "2023" },
	{ label: i18n.t('orderTracking.aeChannelUnavailable'), value: "2024" },
	{ label: i18n.t('orderTracking.crossBorderTransaction'), value: "2034" },
	{ label: i18n.t('orderTracking.other'), value: "0" },
];
export default {
	name: "order-tracking",

	components: {
		pagination,
		PageSizeSelect,
		SearchForm,
	},

	data() {
		return {
			gridData: [],
			dialogTableVisible: false, // 弹窗
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			formProps:{},//保存搜索组件传过来的值
			tableData: [],
			showScreen: false,
			total: 0, // 总条数
			multipleSelection: [],
			loading: false, // loading
			tdList: [], // 通道列表
			// 订单搜索
			searchOption: {
				column: [
					{
						label: this.$t('orderTracking.merchantID'),
						prop: "subMerNo",
						type: "input",
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('orderTracking.transactionSerialNumber'),
						prop: "tradeNo",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderTracking.orereNum'),
						prop: "order",
						type: "input",
						btn: true, //是否显示批量输入按钮
					},
					{
						label: this.$t('orderTracking.orderAmountGreaterThanOrEqual'),
						prop: "amount",
						type: "input",
						width: 160,
						placeholder:this.$t('orderTracking.orderAmountGreaterThanOrEqual')
					},
					{
						label:this.$t('orderTracking.orderAmountGreaterThanOrEqual') ,
						prop: "abnormalType",
						type: "select",
						dicData: YCLX, //数据传输
						width: 180,
					},
					{
						label: this.$t('orderTracking.customerName'),
						prop: "holderName",
						type: "input",
						width: 170,
					},
					{
						label: this.$t('orderTracking.ipAddress'),
						prop: "clientip",
						type: "input",
						width: 170,
					},
					{
						label:  this.$t('orderTracking.customerEmail'),
						prop: "holderEmail",
						type: "input",
						width: 170,
					},

					{
						label: this.$t('orderTracking.description'),
						prop: "error_code",
						type: "select",
						dicData: MS, //数据传输
						width: 170,
						change: true, //select联动
					},
					{
						label: "",
						prop: "error_code1",
						type: "input",
						chengeValue: "error_code", //这个跟select联动名字一样
					},
					{
						label: this.$t('orderTracking.transactionTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
		};
	},

	computed: {
		...mapGetters(["merType"]),
	},

	created() {},

	methods: {
		// 分页请求
		getSearchForm(params) {
			this.formProps = params//存储点击搜索按钮后的值
			this.getList(params);
		},
		// 获取列表数据
		getList(page) {
			this.loading = true;

			let data = {
				...page,
				from: page.time[0], //交易起始时间
				to: page.time[1], //交易结束时间
			};
			this.$delete(data, "time");
			this.$delete(data, "error_code1");
			getListCx(data)
				.then(res => {
					this.loading = false;
					this.tableData = res.data.resultList.list;
					if (res.data.resultList.total) {
						this.total = res.data.resultList.total || 0;
					}
				})
				.catch(err => {});
		},

		// table 勾选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		orderDownLoad() {
			const Xz = {
				subMerNo: this.formProps.subMerNo,
				tradeNo: this.formProps.tradeNo, //交易流水号
				order: this.formProps.order, //订单编号
				amount: this.formProps.amount, //金额大于等于
				abnormalType: this.formProps.abnormalType, //异常类型
				holderName: this.formProps.holderName, //客户姓名
				clientip: this.formProps.clientip, //IP
				holderEmail: this.formProps.holderEmail, //邮箱
				error_code: this.formProps.error_code, //描述
				from: this.formProps.time[0], //交易起始时间
				to: this.formProps.time[1], //交易结束时间
			};
			downloadTracking(Xz)
				.then(result => {
					this.$message.success(result.data)
				})
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
</style>
