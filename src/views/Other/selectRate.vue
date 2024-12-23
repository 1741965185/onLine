<template>
	<div class="app-container">
		<h3 class="page-title mb28">{{$t('selectRate.queryExchangeRate')}}</h3>
		<el-tabs v-model="activeName">
			<!-- 查询汇率tab-content -->
			<el-tab-pane name="0">
				<span slot="label"> <svg-icon icon-class="selectRate" /> {{$t('selectRate.queryExchangeRate')}}	 </span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							class="mr12 select-bottom"
							@changeSize="$refs['order-search-form'].getList(1)"
							:limit.sync="form.pageSize"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
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
				<!-- 数据列表 -->
				<el-table
					ref="selectRateTable"
					:data="selectRateTableData"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
				>
					<el-table-column type="index" width="55" :label="$t('selectRate.serialNumber')"></el-table-column>
					<el-table-column prop="originCurrency" :label="$t('selectRate.originalCurrency')"></el-table-column>
					<el-table-column prop="targetCurrency" :label="$t('selectRate.targetCurrency')"></el-table-column>
					<el-table-column prop="settleRate" :label="$t('selectRate.settlementRate')"></el-table-column>
					<el-table-column prop="issueTime" :label="$t('selectRate.releaseDate')" min-width="160px"></el-table-column>
				</el-table>
			</el-tab-pane>
			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			></pagination>
		</el-tabs>

	</div>
</template>
<script>
import PageSizeSelect from "@/components/PageSizeSelect/index";
import SearchForm from "@/components/SearchForm";
import pagination from "@/components/Pagination";
import { findMerchantRate } from "@/api/selectRate";
import { settlementCurrency } from "@/api/commonFn";

export default {
	name: "SelectRate",
	components: {
		PageSizeSelect,
		SearchForm,
		pagination,
	},
	data() {
		return {
			activeName: "0", // tabs active
			//条件查询参数表单
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			showScreen: false,
			// 订单搜索
			searchOption: {
				column: [
					{
						label: this.$t("selectRate.releaseDate"),
						prop: "time",
						type: "datetimerange",
					},
					{
						label: this.$t("selectRate.originalCurrency"),
						prop: "originCurrency",
						type: "select",
						dicData: () => this.$store.getters.ysCurrency,
					},
					{
						label: this.$t("selectRate.targetCurrency"),
						prop: "targetCurrency",
						type: "select",
						dicData: () => this.$store.getters.jsCurrency,
					},
				],
			},
			formProps: {}, //保存搜索组件传过来的值
			selectRateTableData: [],
			total: 0,
			loading: false, // table loading状态
		};
	},
	methods: {
		// 分页请求
		getSearchForm(params) {
			this.formProps = params; //存储点击搜索按钮后的值
			if (this.activeName === "0") {
				this.getSelectRateList(params);
			}
		},
		// 获取列表数据
		getSelectRateList(page) {
			this.loading = true;
			let data = {
				...page,
				fromTime: page.time[0],
				toTime: page.time[1],
				originCurrency: page.originCurrency,
				targetCurrency: page.targetCurrency,
			};
			this.$delete(data, "time");
			findMerchantRate(data).then(res => {
				if (res.status === 200) {
					this.selectRateTableData = res.data.list;
					this.total = res.data.total;
					this.loading = false;
				}
			}).catch(err => {
				this.loading = false;
			});
		},
	},
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/template";
</style>
