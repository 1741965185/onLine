<template>
  <div class="table-footer-wrapper Flex spaceB alignC">
    <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        :prev-text="$t('page.up')"
        :next-text="$t('page.down')"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
	export default {
		name: "Pagination",
		data() {
			return {
				pageCount: 1,
			};
		},
		props: {
			total: {
				required: true,
				type: Number,
			},
			page: {
				type: Number,
				default: 1,
			},
			limit: {
				type: Number,
				default: 15,
			},
			pageSizes: {
				type: Array,
				default() {
					return [15, 50, 100, 300, 500];
				},
			},
			layout: {
				type: String,
				default: "prev, pager, next, total, jumper",
			},
			background: {
				type: Boolean,
				default: true,
			},
			autoScroll: {
				type: Boolean,
				default: true,
			},
			hidden: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			currentPage: {
				get() {
					return this.page;
				},
				set(val) {
					this.$emit("update:page", val);
				},
			},
			pageSize: {
				get() {
					return this.limit;
				},
				set(val) {
					this.$emit("update:limit", val);
				},
			},
		},
		mounted() {
			document.getElementsByClassName("el-pagination__jump")[0].childNodes[0].nodeValue = this.$t("page.page");
			document.getElementsByClassName("el-pagination__jump")[0].childNodes[2].nodeValue = "";
		},
		methods: {
			handleSizeChange(val) {
				this.$emit("pagination", { page: this.currentPage, limit: val });
				// if (this.autoScroll) {
				// 	scrollTo(0, 800)
				// }
			},
			handleCurrentChange(val) {
				this.pageCount = val;
				this.$emit("pagination", { page: val, limit: this.pageSize });
				// if (this.autoScroll) {
				// 	scrollTo(0, 800)
				// }
			},
		},
	};
</script>

<style scoped lang="less">
  .table-footer-wrapper {
    padding: 0 25px;
    box-sizing: border-box;
    height: 85px;
    line-height: 85px;

    .el-pagination {
      padding: 0 !important;
      height: 36px !important;
      overflow: hidden;
    }
  }
</style>