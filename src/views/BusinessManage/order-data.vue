<template>
	<div class="app-container">
		<!--头部-->
		<h3 class="page-title mb28">{{$t('orderData.transactionReport')}}</h3>
		<!--主体-->
		<div class="content-card">
			<!--搜索-->
			<div class="search-warp">
				<div class="search-left">
					<page-size-select
						class="mr12 select-bottom"
						@changeSize="pageSizeChange"
						:limit.sync="form.pageSize"
					></page-size-select>
				</div>
				<div class="search-right">
					<div class="time-select">
						<el-select v-model="searchForm.timeSelect" :placeholder="$t('orderData.transactionReport')" @change="timeSelectChange">
							<el-option :label="$t('orderData.dailyReport')" value="1"></el-option>
							<el-option :label="$t('orderData.monthlyReport')" value="2"></el-option>
						</el-select>
					</div>
					<div class="picker-wrap">
						<el-date-picker
							v-model="searchForm.timePicker"
							:type="daterangeFlag"
							:value-format="timeFormatValue"
							:range-separator="$t('orderData.to')"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							unlink-panels
							@change="timePickerChange"
							:default-time="['00:00:00', '23:59:59']">
						</el-date-picker>
					</div>
					<!--<div class="download-wrap" @click="handleDownload">-->
					<!--	<span class="download-btn cp">-->
					<!--		<svg-icon icon-class="download" />-->
					<!--	</span>-->
					<!--</div>-->
					<div class="select-currency">
						<el-select v-model="searchForm.currencySelect" :placeholder="$t('orderData.select')" @change="currencySelectChange">
							<el-option
								v-for="item in jsCurrency"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<!--表格-->
			<div class="table-wrap">
				<el-table :data="tradeList" style="width: 100%" @selection-change="handleSelectionChange" row-key="time"
									v-loading="loading">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="time" :label="$t('orderData.time')"></el-table-column>
					<el-table-column prop="baseCode" :label="$t('orderData.statisticsCurrency')"></el-table-column>
					<el-table-column prop="settleAmount">
						<template slot="header">
							{{$t('orderData.settlementTotal')}}
							<el-popover
								placement="top"
								title=""
								trigger="hover"
								:content="$t('orderData.settlementTotalExplanation')">
								<svg-icon icon-class="supplement" class-name="supplement" slot="reference" />
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="refundAmount" :label="$t('orderData.refund')"></el-table-column>
					<el-table-column prop="protestAmount" :label="$t('orderData.chargeback')"></el-table-column>
					<el-table-column prop="rateAmount" :label="$t('orderData.fee')"></el-table-column>
					<!-- <el-table-column prop="tradeFee" label="交易处理费"></el-table-column> -->
					<el-table-column prop="refundProtestCostAmount" :label="$t('orderData.exceptionHandlingFee')"></el-table-column>
					<el-table-column prop="bailAmount" :label="$t('orderData.action')"></el-table-column>
					<el-table-column :label="$t('orderData.viewDetails')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="paginationChange"
				></pagination>
			</div>
		</div>
	</div>
</template>
<script>
import PageSizeSelect from "@/components/PageSizeSelect/index";
import CircularDropdown from "@/components/CircularDropdown/index";
import pagination from "@/components/Pagination";
import { getTradeList } from "@/api/business";
import { downloadTradeList } from "@/api/download";

export default {
	name: "OrderData",
	components: {
		PageSizeSelect,
		CircularDropdown,
		pagination,
	},
	data() {
		return {
			tradeList: [],//表格数据
			daterangeFlag: "daterange",//时间选择器切换 daterange/monthrange
			timeFormatValue: "yyyy-MM-dd HH:mm:ss",//时间选择器输出的格式 yyyy-MM-dd HH:mm:ss / yyyy-MM
			total: 0,//表格总条数
			tableSelectList: [],//表格多选的数据
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			searchForm: {
				timeSelect: "1",
				timePicker: [],
				currencySelect: null,
			},
			operationList: [
				{ label: this.$t('orderData.viewDetails'), icon: "ck", value: 10 },
				{ label: this.$t('orderData.download'), icon: "download", value: 11 },
			],
			loading: false, // table loading状态
		};
	},
	created() {
		this.searchForm.timePicker = [
			this.dayjs().format("YYYY-MM-DD") + " 00:00:00",
			this.dayjs().format("YYYY-MM-DD") + " 23:59:59",
		];
		this.$getTradeList();
	},
	computed: {
		jsCurrency() {
			return [{ label: this.$t('orderData.alls'), value: null }, ...this.$store.getters.jsCurrency];
		},
	},
	methods: {
		// 表格数据请求
		$getTradeList() {
			this.loading = true;
			getTradeList({
				startTime: this.searchForm.timePicker[0],
				endTime: this.searchForm.timePicker[1],
				baseCode: this.searchForm.currencySelect,
				dateType: this.searchForm.timeSelect,
				pageNum: this.form.pageNum,
				pageSize: this.form.pageSize,
			}).then(res => {
				if (res.status === 200) {
					this.tradeList = res.data.list;
					this.total = res.data.total;
					this.loading = false;
				}
			}).catch(err => {
				this.loading = false;
			});
		},
		// 分页条数切换
		pageSizeChange() {
			this.$getTradeList();
		},
		// 日报和月报切换
		timeSelectChange() {
			if (this.searchForm.timeSelect === "1") {
				this.daterangeFlag = "daterange";
				this.timeFormatValue = "yyyy-MM-dd HH:mm:ss";
				this.searchForm.timePicker = [
					this.dayjs().format("YYYY-MM-DD") + " 00:00:00",
					this.dayjs().format("YYYY-MM-DD") + " 23:59:59",
				];
			} else {
				this.daterangeFlag = "monthrange";
				this.timeFormatValue = "yyyy-MM";
				this.searchForm.timePicker = [
					this.dayjs().format("YYYY-MM"),
					this.dayjs().format("YYYY-MM"),
				];
			}
			this.$getTradeList();
		},
		// 时间的切换
		timePickerChange() {
			this.$getTradeList();
		},
		//币种的切换
		currencySelectChange() {
			this.$getTradeList();
		},
		//操作
		operateScope(params) {
			if (params.command.value === 10) {
				this.$router.push({
					path: "/details/orderTableEdit",
					query: {
						time: params.data.time,
						dateType: this.searchForm.timeSelect,
						baseCode: params.data.baseCode,
					},
				});
			} else if (params.command.value === 11) {
				this.handleDownload(params.data.time,params.data.baseCode);
			}
		},
		// 分页页码
		paginationChange() {
			this.$getTradeList();
		},
		//	下载
		handleDownload(time,baseCode) {
			// if (this.tableSelectList.length > 0) {
			// 	const time = this.tableSelectList.map(item => item.time);
			downloadTradeList({
				baseCode: baseCode,
				dateType: +this.searchForm.timeSelect,
				downTime: [time],
			}).then(res => {
				this.$message.success(res.data)
			});
		},
		//	表格多选择
		handleSelectionChange(value) {
			this.tableSelectList = value;
		},
	},
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/template";

.content-card {
	border: 1px solid #DBDFEA;

	.search-warp {
		height: 65px;
		border-bottom: 1px solid #DBDFEA;
		padding: 0 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.search-left {
			width: 100px;
			height: 30px;
		}

		.search-right {
			display: flex;
			align-items: center;

			.time-select {
				width: 80px;
				height: 30px;
			}

			.picker-wrap {
				width: 380px;
				height: 30px;
				margin: 0 20px 0 12px;
			}

			.download-wrap {
				width: 84px;
				height: 30px;
				margin: 0 20px 0 0;

				.download-btn {
					width: 100%;
					height: 100%;
				}
			}

			.select-currency {
				width: 96px;
				height: 30px;
			}
		}
	}

	.table-wrap {
		width: 100%;
	}
}

/deep/ .el-select {
	height: 100%;
	line-height: 1;

	.el-input {
		height: 100%;

		.el-input__inner {
			height: 100%;
		}

		.el-select__caret {
			line-height: 30px;
		}
	}
}

/deep/ .el-date-editor {
	width: 100%;
	height: 100%;

	.el-input__icon {
		line-height: 22px;
	}

	.el-range-input {
		height: 100%;
	}

	.el-range-separator {
		line-height: 22px;
	}
}

.supplement {
	width: 16px;
	height: 16px;
	cursor: pointer;
}

/deep/ .el-button {
	width: 90px;
	height: 36px;
	font-size: 13px;
	line-height: 1;
	padding: 0;
}
</style>
