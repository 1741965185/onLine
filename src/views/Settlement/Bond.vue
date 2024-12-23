<template>
	<div class="app-container">
		<h3 class="page-title mb28">{{$t("depositTransfer.marginRemittance")}}</h3>
		<el-tabs v-model="activeName">
			<el-tab-pane name="0">
				<span slot="label"><i class="el-icon-date"></i> {{$t("depositTransfer.marginRemittanceTable")}}</span>
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
					:data="bondTableList"
					ref="bondTableList"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"> </el-table-column>
					<el-table-column prop="balanceId" min-width="160" :label="$t('depositTransfer.batchNumber')"> </el-table-column>
					<el-table-column prop="hkCurrency" :label="$t('depositTransfer.remittanceCurrency')"> </el-table-column>
					<el-table-column prop="hkAmount" :label="$t('depositTransfer.remittanceMoney')"> </el-table-column>
					<el-table-column prop="createTableDate" min-width="160" :label="$t('depositTransfer.tableCreationTime')"> </el-table-column>
					<el-table-column prop="startDate" min-width="160" :label="$t('depositTransfer.transactionStartTime')"> </el-table-column>
					<el-table-column prop="endDate" min-width="160" :label="$t('depositTransfer.transactionEndTime')"> </el-table-column>
					<el-table-column prop="hkDate" min-width="160" :label="$t('depositTransfer.remittanceDate')"> </el-table-column>
					<el-table-column prop="hkBank" min-width="160" :label="$t('depositTransfer.remittanceBank')"> </el-table-column>
					<el-table-column prop="remark" min-width="160" :label="$t('depositTransfer.remarks')"> </el-table-column>
					<el-table-column :label="$t('depositTransfer.operation')" fixed="right">
						<template slot-scope="scope">
							<div class="icon-hover-effect" @click="getDetails(scope.row)">
								<svg-icon icon-class="eye" />
							</div>
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
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import PageSizeSelect from "@/components/PageSizeSelect";
import SearchForm from "@/components/SearchForm";
import { hkSeeBondList } from "@/api/bond";

export default {
	name: "Bond",

	components: {
		pagination,
		PageSizeSelect,
		SearchForm,
	},

	data() {
		return {
			activeName: "0",
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			showScreen: false,
			total: 0,
			bondTableList: [],
			loading: false,
			multipleSelection: [],
			// 勾兑、复核 记录日志搜索
			searchOption: {
				column: [
					{
						label: this.$t('depositTransfer.batchNumber'),
						prop: "balanceId",
						type: "input",
					},
					{
						label: this.$t('depositTransfer.tableCreationTime'),
						prop: "time",
						type: "datetimerange",
					},
				],
			},
		};
	},
	created() {
	},
	watch: {
		activeName: function (newVal, oldVal) {},
	},
	methods: {
		getDetails(params) {
			if (params.balanceId)
				this.$router.push({
					path: "/details/bond/" + params.balanceId,
					query: { hkType: params.hkType },
				});
		},
    
    // 分页请求
		getSearchForm(params) {
			if (this.activeName === "0") {
				this.$hkSeeBondList(params);
			}
		},
		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		$hkSeeBondList(page) {
			this.loading = true;
      let data = {
        ...page,
        startDate: page.time[0],
				endDate: page.time[1],
      }
      this.$delete(data, "time");
			hkSeeBondList(data)
				.then(result => {
					this.loading = false;
					this.bondTableList = result.list;
					this.total = result.total;
				})
				.catch(error => {
					this.loading = false;
				});
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
</style>