<template>
	<div class="app-container">
		<h3 class="page-title mb28">账户管理</h3>
		<el-tabs>
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="bg" /> </span>
			</el-tab-pane>
			<el-table :data="list" tooltip-effect="dark" style="width: 100%" v-loading="loading">
			</el-table>
			<div class="footer-pagination-wrapper">
				<pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"></pagination>
			</div>
		</el-tabs>
	</div>
</template>

<script>
import pagination from "@/components/Pagination"
import CircularDropdown from "@/components/CircularDropdown/index"
import PageSizeSelect from "@/components/PageSizeSelect/index"
import TextareaDialog from "@/components/TextareaDialog/TextareaDialog"
export default {
	name: "DownloadApi",
	components: { pagination,
	//  CircularDropdown, PageSizeSelect, TextareaDialog 
	 },
	data() {
		return {
			list: [],
			loading: false,
			total: 0, // 总条数
			pageNum: 1,
			pageSize: 15,
		}
	},
	created() {},
	mounted() {},
	methods: {
		//下载
		Download() {},
		getList() {},
	},
}
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
</style>