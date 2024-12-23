<template>
	<div class="app-container">
		<h3 class="page-title mb28">{{$t('downloadapi.interfaceDownload')}}</h3>
		<el-tabs>
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="bg" /> {{$t("downloadapi.apiinnterface")}}</span>
			</el-tab-pane>
			<el-table :data="list" tooltip-effect="dark" style="width: 100%" v-loading="loading">
				<el-table-column prop="a" :label="$t('downloadapi.allTypes')" min-width="100" align="">
					<template slot-scope="scope">
						{{ scope.row.Belongtype }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('downloadapi.fileName')" min-width="350" align="">
					<template slot-scope="scope">
						{{ scope.row.filename }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('downloadapi.updateTime')" min-width="170" align="">
					<template slot-scope="scope">
						{{ scope.row.updatetime }}
					</template>
				</el-table-column>
				<el-table-column :label="$t('downloadapi.download')">
					<template slot-scope="scope">
						<a :href="scope.row.url" class="icon-hover-effect">
							<svg-icon icon-class="download" />
						</a>
					</template>
				</el-table-column>
			</el-table>
			<pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"></pagination>
		</el-tabs>
	</div>
</template>

<script>
import pagination from "@/components/Pagination";
import { downApiWord } from "@/api/basicSetting";

export default {
	name: "DownloadApi",
	components: {
		pagination,
	},
	data() {
		return {
			list: [
				// { Belongtype: "文档", filename: "支付接口帮助文档", updatetime: "2021-03-26 17:00:00", url:'https://airclick-oss.oss-cn-hongkong.aliyuncs.com/api/tapxyz-api.zip' },
				// { Belongtype: "文档", filename: "Unionpay", updatetime: "2021-09-10 11:30:00", url:'https://airclick-oss.oss-cn-hongkong.aliyuncs.com/api/UnionPay.zip' },
			],
			loading: false,
			total: 0,
			pageNum: 1,
			pageSize: 15,
		};
	},

	methods: {
		//下载
		Download(row) {
			const data = {
				file: row.filename,
			};
			downApiWord(data)
				.then(res => {
					if (!res.size) {
						this.$message({
							message: this.$t("downloadapi.downloading"),
							type: "",
						});
						return;
					}

					const blob = new Blob([res], { type: "application/zip" });
					if ("download" in document.createElement("a")) {
						const url = window.URL.createObjectURL(blob);
						const link = document.createElement("a");
						link.href = url;
						link.download = row.filename;
						link.click();
						// 释放内存
						URL.revokeObjectURL(url);
					} else {
						// ie10下载
						navigator.msSaveOrOpenBlob(blob, row.filename);
					}
				})
				.catch(err => {});
		},
		getList() {},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/styles/template";
</style>
