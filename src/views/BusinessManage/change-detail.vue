<template>
	<div class="app-container">
		<div class="top-title-bar">
			<h3 class="page-title">批量退款</h3>
			<el-button class="go-back-btn" @click="$router.go(-1)">
        <svg-icon icon-class="arrow-left"/>
				<span>返回</span>
			</el-button>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<!-- 数据检测 -->
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="bg" /> 数据检测</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC"></div>
					<div>
            <span class="download-btn cp mr12" @click="mbUpload">
              <svg-icon icon-class="download"/>
            </span>
            <span class="download-btn cp" @click="tkUpload">
              <svg-icon icon-class="upload"/>
            </span>
					</div>
				</div>
				<div align="center">
					<label v-show="showSpan">请上传需要检测的退款文档 </label>
					<el-table
						v-show="showTable"
						:data="list"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
						@selection-change="handleSelectionChange"
					>
						<el-table-column label="序号" min-width="" align=""></el-table-column>
						<el-table-column label="退款订单号" min-width="" align=""></el-table-column>
						<el-table-column label="标签金额" min-width="" align=""></el-table-column>
						<el-table-column label="已退金额" min-width="" align=""></el-table-column>
						<el-table-column label="退款金额" min-width="" align=""></el-table-column>
						<el-table-column label="结果描述" min-width="" align=""></el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<!-- 批量申请 -->
			<el-tab-pane name="1">
				<span slot="label"><svg-icon icon-class="bg" /> 批量申请</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC"></div>
					<div>
            <span class="download-btn cp" @click="tkUpload">
              <svg-icon icon-class="upload"/>
            </span>
					</div>
				</div>
				<div align="center">
					<label v-show="showSpan">请上传需要检测的退款文档 </label>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import pagination from "@/components/Pagination"
import CircularDropdown from "@/components/CircularDropdown/index"
import PageSizeSelect from "@/components/PageSizeSelect/index"
import TextareaDialog from "@/components/TextareaDialog/TextareaDialog"
import { downExcel } from "@/api/business"
export default {
	name: "change-detail",
	components: {
		// pagination, CircularDropdown, PageSizeSelect, TextareaDialog
	},
	data() {
		return {
			activeName: "0", // tabs active
			form: {
				timetype: "trade",
				from: undefined,
				to: undefined,
				time: [],
				pageNum: 1,
				pageSize: 15,
				tradenos: "", //流水订单号
			},
			showScreen: false,
			list: [],
			loading: false,
			showTable: false,
			showSpan: true,
		}
	},
	created() {},
	mounted() {},
	methods: {
		// tabs click 回调
		handleClick(tab) {},
		//上传
		tkUpload() {
			this.showTable = true
			this.showSpan = false
		},

		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		//模板下载
		mbUpload() {
			downExcel()
				.then(res => {
					if (!res.size) {
						this.$message({
							message: "没有可下载文件",
							type: "warning",
						})
						return
					}
					const blob = new Blob([res], { type: "application/vnd.ms-excel" })
					if ("download" in document.createElement("a")) {
						const url = window.URL.createObjectURL(blob)
						const link = document.createElement("a")
						link.href = url
						link.download = "Down_XLS_TradeBatchRefund"
						link.click()
						// 释放内存
						URL.revokeObjectURL(url)
					} else {
						// ie10下载
						navigator.msSaveOrOpenBlob(blob, "Down_XLS_TradeBatchRefund")
					}
				})
				.catch(err => {
				})
		},
	},
}
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
@import "../../assets/styles/detailsList";
</style>

<style scoped lang="less">
.app-container {
	/deep/ .el-dialog {
		display: flex;
		display: -ms-flex; /* 兼容IE */
		flex-direction: column;
		-ms-flex-direction: column; /* 兼容IE */
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: calc(100% - 30px);
		height: 480px;
	}

	/deep/ .el-dialog .el-dialog__body {
		max-height: 100%;
		flex: 1;
		-ms-flex: 1 1 auto; /* 兼容IE */
		overflow-y: auto;
		overflow-x: hidden;
	}

	/deep/ .el-dialog__wrapper {
		/*隐藏ie和edge中遮罩的滚动条*/
		overflow: hidden;
	}
}
</style>