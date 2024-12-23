<!--没翻译5-->
<template>
	<div class="app-container">
		<!--头部-->
		<div class="title-wrap">
			<h3 class="page-title mb28">{{$t('orderTable.title')}}</h3>
			<el-button class="go-back-btn" @click="$router.go(-1)">
				<svg-icon icon-class="arrow-left" class-name="arrow-left" />
				<span>{{$t('orderTable.back')}}</span>
			</el-button>
		</div>
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
			</div>
			<!--表格-->
			<div class="table-wrap">
				<el-table :data="tradeList" style="width: 100%">
					<el-table-column :label="$t('orderTable.merchantNo')">
						<template slot-scope="scope">
							{{scope.row.subMerNo !== 0 ? scope.row.subMerNo : scope.row.merNo}}
						</template>
					</el-table-column>
					<el-table-column prop="tradeNo" :label="$t('orderTable.tradeNo')"></el-table-column>
					<el-table-column prop="cardName" :label="$t('orderTable.cardType')"></el-table-column>
					<el-table-column prop="sourceAmount" :label="$t('orderTable.sourceAmount')"></el-table-column>
					<el-table-column prop="settleAmount" :label="$t('orderTable.settleAmount')"></el-table-column>
					<el-table-column prop="orderStatus" :label="$t('orderTable.status')">
						<template slot-scope="scope">
							<span
								:class="[{'success':scope.row.orderStatus === $t('orderTable.success')},{'fail':scope.row.orderStatus === $t('orderTable.fail')},{'dishonor':scope.row.orderStatus === $t('orderTable.dishonor')},{'refund':scope.row.orderStatus === $t('orderTable.refund')}]">{{ scope.row.orderStatus }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="time" :label="$t('orderTable.time')"></el-table-column>
				</el-table>
				<!--分页-->
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
import pagination from "@/components/Pagination";
import { tradseeDetails } from "@/api/business";

export default {
	name: "OrderData",
	components: {
		PageSizeSelect,
		pagination,
	},
	data() {
		return {
			tradeList: [],
			total: 0,
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			routerTime: "",
			routerDateType: null,
			routerBaseCode: "",
		};
	},
	created() {
		this.routerTime = this.$route.query.time;
		this.routerDateType = this.$route.query.dateType;
		this.routerBaseCode = this.$route.query.baseCode;
		this.$tradseeDetails();
	},
	methods: {
		$tradseeDetails() {
			tradseeDetails({
				time: this.routerTime,
				dateType: this.routerDateType,
				baseCode: this.routerBaseCode,
				pageNum: this.form.pageNum,
				pageSize: this.form.pageSize,
			}).then(res => {
				if (res.status === 200) {
					this.tradeList = res.data.list;
					this.total = res.data.total;
				}
			});
		},
		pageSizeChange() {
			this.$tradseeDetails();
		},
		paginationChange() {
			this.$tradseeDetails();
		},
	},
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/template";

.title-wrap {
	display: flex;
	justify-content: space-between;
}

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

.arrow-left {
	width: 14px;
	height: 14px;
	margin: 0 10px 0 0;
}

/deep/ .el-button {
	width: 90px;
	height: 36px;
	font-size: 13px;
	line-height: 1;
	padding: 0;
}

.success {
	color: #a1e8cc;
}

.fail {
	color: #e4846d;
}

.dishonor {
	color: #e89583;
}

.refund {
	color: #ffa65e;
}
</style>
