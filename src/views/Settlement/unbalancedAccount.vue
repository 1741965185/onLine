<template>
	<div class="app-container">
		<!--		<div class="mer-wrap">-->
		<!--			商户号:-->
		<!--			<span>{{ merNo }}</span>-->
		<!--		</div>-->
		<!--		<div class="settled">-->
		<!--			已结算：-->
		<!--			<div class="settled-item" v-for="(item,index) in settledObj" :key="index">{{ item.baseCode }}-->
		<!--				<span>{{ item.sumAmount }}</span></div>-->
		<!--		</div>-->

		<el-tabs v-model="activeName">
			<!-- 未结算订单统计 -->
			<el-tab-pane name="0">
				<span slot="label"><i class="el-icon-date"></i> {{$t('unbalanced.wjsddtj')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<pageSizeSelect
							class="mr12"
							:limit.sync="form.pageSize"
							@changeSize="$refs['order-search-form'].getList(1)"
						></pageSizeSelect>
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
				<el-table
					v-loading="loading"
					ref="multipleTable"
					:data="unbalancedAccountData"
					tooltip-effect="dark"
					style="	width: 100%;"
					@selection-change="handleSelectionChange">
					<el-table-column prop="baseCode" min-width="60px" :label="$t('unbalanced.settleCurrency')"></el-table-column>
					<el-table-column prop="tradeAmount" min-width="100px" :label="$t('unbalanced.tradeSuccessAmount')"></el-table-column>
					<el-table-column min-width="100px" prop="bailAmount" :label="$t('unbalanced.marginAmount')"></el-table-column>
					<el-table-column prop="rateAmount" min-width="100px" :label="$t('unbalanced.tradeSumAmount')"></el-table-column>
					<el-table-column prop="refundAmount" min-width="100px" :label="$t('unbalanced.refundAmount')"></el-table-column>
					<el-table-column prop="protestAmount" min-width="100px" :label="$t('unbalanced.protestAmount')"></el-table-column>
					<el-table-column prop="refundProtestCost" min-width="100px" :label="$t('unbalanced.errorFee')"></el-table-column>
					<el-table-column prop="frozenAmount" min-width="100px" :label="$t('unbalanced.djAmount')"></el-table-column>
<!--					<el-table-column prop="hkOkAmount" min-width="100px" :label="$t('unbalanced.yjsAmount')"></el-table-column>-->
					<el-table-column prop="hkNoAmount" min-width="100px" :label="$t('unbalanced.wjsAmount')"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import pageSizeSelect from "@/components/PageSizeSelect";
import SearchForm from "@/components/SearchForm";
import {
	unbalancedAccount,
} from "@/api/Settlement";


export default {
	name: "unbalancedAccount",
	components: { pageSizeSelect, SearchForm },
	data() {
		return {
			loading: false,
			merNo: "",
			showScreen: false,
			activeName: "0",
			formProps: {}, //保存搜索组件传过来的值
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			unbalancedAccountData: [
				{
					currencyCode: "",
					amount: "",
					bailAmount: "",
					factorage: "",
					refundAmount: "",
					protestAmount: "",
					frostAmount: "",
					opAmount: "",
				},
			],
			settledObj: [],
			searchOption: {
				column: [
					{
						label: this.$t("unbalanced.tradeTime"),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
		};
	},
	created() {
		if (this.$route.query.amountListTime?.length > 0) {
			this.showScreen = true;
			this.searchOption.column[0].default = this.$route.query.amountListTime;
		}
	},
	methods: {
		getWJSList(params) {
			this.loading = true;
			let data = {
				startTime: params.time[0],
				endTime: params.time[1],
			};
			this.$delete(data, "time");
			unbalancedAccount(data).then(res => {
				this.loading = false;
				this.unbalancedAccountData = res.data.data;
			});
		},
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 分页请求
		getSearchForm(params) {
			this.formProps = params;
			if (this.activeName === "0") {
				// 外卡划款
				this.getWJSList(params);
			}
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
<style scoped lang="less">
.mer-wrap {
	font-size: 30px;
	font-weight: 700;

	span {
		font-size: 24px;
		color: #7f8dff;
	}
}

.settled {
	line-height: 55px;
	font-size: 20px;

	.settled-item {
		margin-right: 30px;
		display: inline-block;

		span {
			color: #7f8dff;
			font-size: 19px;
		}
	}
}
</style>
