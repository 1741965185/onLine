<template>
	<div class="app-container">
		<el-tabs>
			<!-- 补划订单 -->
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i> {{$t("replacementOrder.remedyOrder")}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
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
					<div>
						<span class="download-btn cp" @click="XiaZaiBH">
							<svg-icon icon-class="download" />
						</span>
					</div>
				</div>
				<!-- 订单列表搜索组件 -->
				<search-form
					ref="order-search-form"
					v-show="showScreen"
					:option="searchOption"
					:formSearch="form"
					@getSearchForm="getSearchForm($event, 1)"
				></search-form>
				<el-table
					v-loading="loading"
					ref="multipleTable"
					:data="StrokeOrderData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="tradeNo" min-width="170px" :label="$t('replacementOrder.transactionSerialNumber')"></el-table-column>
					<el-table-column prop="opType" min-width="110px" :label="$t('replacementOrder.operationType')"></el-table-column>
					<el-table-column min-width="80px" prop="currencyCode" :label="$t('replacementOrder.currency')"></el-table-column>
					<el-table-column prop="opAmount" min-width="100px" :label="$t('replacementOrder.operationAmount')"></el-table-column>
					<el-table-column min-width="100px" prop="settleRate" :label="$t('replacementOrder.settlementRate')"></el-table-column>
					<el-table-column min-width="100px" prop="settleRateAmount" :label="$t('replacementOrder.settlementAmount')"></el-table-column>
					<el-table-column prop="otherAmount" min-width="100px" :label="$t('replacementOrder.otherAmount')"></el-table-column>
					<el-table-column min-width="160px" prop="hkId" :label="$t('replacementOrder.transactionRemedy')"></el-table-column>
					<el-table-column min-width="200px" prop="createTime" :label="$t('replacementOrder.creationTime')"></el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- 分页器 -->
			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			>
			</pagination>
		</el-tabs>
	</div>
</template>

<script>
import pageSizeSelect from "@/components/PageSizeSelect";
import pagination from "@/components/Pagination";
import { getCheckStrokeOrder } from "@/api/Settlement";
import { downloadBhOrder } from "@/api/download";
import SearchForm from "@/components/SearchForm";
import i18n from "@/i18n";

var CZLX = [
	{ label:  i18n.t('replacementOrder.remitted'), value: "1" },
	{ label:  i18n.t('replacementOrder.notRemitted'), value: "0" },
];
var HKZT = [
	{ label: i18n.t('replacementOrder.alls'), value: null },
	{ label: i18n.t('replacementOrder.other'), value: "0" },
	{ label: i18n.t('replacementOrder.refund'), value: "1" },
	{ label: i18n.t('replacementOrder.chargeback'), value: "2" },
	{ label: i18n.t('replacementOrder.frozen'), value: "3" },
	{ label: i18n.t('replacementOrder.unfreeze'), value: "4" },
	{ label: i18n.t('replacementOrder.refundAfterRemittance'), value: "5" },
	{ label: i18n.t('replacementOrder.chargebackAfterRemittance'), value: "6" },
	{ label: i18n.t('replacementOrder.frozenAfterRemittance'), value: "7" },
	{ label: i18n.t('replacementOrder.unfreezeAfterRemittance'), value: "8" },
	{ label: i18n.t('replacementOrder.successfulAppeal'), value: "9" },
	{ label:  i18n.t('replacementOrder.refundAfterChargeback'), value: "17" },
];
export default {
	name: "earnestMoney",
	components: {
		pageSizeSelect,
		pagination,
		SearchForm,
	},
	data() {
		return {
			merno: "",
			showScreen: false, // form.c
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			formProps:{},//保存搜索组件传过来的值
			total: 0,
			// 操作类型
			operateType: [
				{ label: this.$t('replacementOrder.alls'), value: null },
				{ label: this.$t('replacementOrder.remitted'), value: "1" },
				{ label: this.$t('replacementOrder.notRemitted'), value: "0" },
			],
			// 划款状态
			hkstatus: null,
			status: null,
			transferMoneyStatus: [
				{ label: this.$t('replacementOrder.alls'), value: null },
				{ label: this.$t('replacementOrder.other'), value: "0" },
				{ label: this.$t('replacementOrder.refund'), value: "1" },
				{ label: this.$t('replacementOrder.chargeback'), value: "2" },
				{ label: this.$t('replacementOrder.frozen'), value: "3" },
				{ label: this.$t('replacementOrder.unfreeze'), value: "4" },
				{ label: this.$t('replacementOrder.refundAfterRemittance'), value: "5" },
				{ label: this.$t('replacementOrder.chargebackAfterRemittance'), value: "6" },
				{ label: this.$t('replacementOrder.frozenAfterRemittance'), value: "7" },
				{ label:  this.$t('replacementOrder.unfreezeAfterRemittance'), value: "8" },
				{ label: this.$t('replacementOrder.successfulAppeal'), value: "9" },
			],
			loading: false,
			// 补划订单数据
			StrokeOrderData: [],
			// 勾兑、复核 记录日志搜索
			searchOption: {
				column: [
					{
						label: this.$t('replacementOrder.transactionSerialNumber'),
						prop: "Tradeno",
						type: "input",
					},
					{
						label: this.$t('replacementOrder.remittanceStatus'),
						prop: "hkstatus",
						type: "select",
						dicData: CZLX,
					},
					{
						label: this.$t('replacementOrder.operationType'),
						prop: "status",
						type: "select",
						dicData: HKZT,
					},
					{
						label: this.$t('replacementOrder.creationTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
		};
	},
	created() {},
	filters: {
		formstatus(val) {
			switch (val) {
				case "0":
					return this.$t('replacementOrder.other');
				case "1":
					return this.$t('replacementOrder.refund');
				case "2":
					return this.$t('replacementOrder.chargeback');
				case "3":
					return this.$t('replacementOrder.frozen');
				case "4":
					return this.$t('replacementOrder.unfreeze');
				case "5":
					return this.$t('replacementOrder.refundAfterRemittance');
				case "6":
					return this.$t('replacementOrder.chargebackAfterRemittance');
				case "7":
					return this.$t('replacementOrder.frozenAfterRemittance');
				case "8":
					return this.$t('replacementOrder.unfreezeAfterRemittance');
				case "9":
					return this.$t('replacementOrder.successfulAppeal');
				case "17":
					return this.$t('replacementOrder.refundAfterChargeback');
				case "":
					return this.$t('replacementOrder.alls');
			}
		},
	},
	computed: {},
	methods: {
		// 分页请求
		getSearchForm(params) {
			this.formProps = params//存储点击搜索按钮后的值
			this.checkStrokeOrder(params);
		},
		// 点击 搜索 按条件 查看 补划订单
		checkStrokeOrder(page) {
			let data = {
				...page,
				starttime: page.time[0],
				endtime: page.time[1],
			};
			this.$delete(data, "time");
			this.loading = true;
			// 获取 按条件 查看 的补划订单
			getCheckStrokeOrder(data).then(res => {
				this.loading = false;
				if (res.data.list.length === 0) {
					this.StrokeOrderData = [];
					return false;
				} else {
					this.total = res.data.total;
					this.StrokeOrderData = res.data.list;
				}
			});
		},
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		XiaZaiBH() {
			const Xz = {
				Tradeno: this.formProps.Tradeno,
				hkstatus: this.formProps.hkstatus,
				status: this.formProps.status,
				starttime: this.formProps.time[0],
				endtime: this.formProps.time[1],
			};
			downloadBhOrder(Xz)
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
<style scoped lang="less">
@import "../../assets/styles/detailsList";
</style>
