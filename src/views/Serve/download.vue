<template>
	<div class="app-containers">
		<div>
			<div style="display: flex;flex-direction: row;width:  100%">

				<div class="remittanceTable-container">{{$t('download.downLoadCenter')}}</div>
				<div class="buttons-container">
					<div
						class="button"
						@click="handleFilter"
						@mouseover="hoverButton('filter')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'filter' }"
					>
						<svg-icon icon-class="filter-icon" class="filter"/>
						{{$t('orderList.screening')}}
					</div>
<!--					<div-->
<!--						class="button"-->
<!--						@click="handleDownload"-->
<!--						@mouseover="hoverButton('download')"-->
<!--						@mouseleave="leaveButton"-->
<!--						:class="{ active: activeButton === 'download' }"-->
<!--					>-->
<!--						<svg-icon icon-class="download-icon" class="download"/>-->

<!--						&lt;!&ndash;						<img src="@/assets/images/download-icon.png" alt="下载" class="download"/>&ndash;&gt;-->
<!--						{{$t('orderList.download')}}-->
<!--					</div>-->
					<div
						class="buttons"
						@click="handleToggleView"
						@mouseover="hoverButton('toggleView')"
						@mouseleave="leaveButton"
						:class="{ active: activeButton === 'toggleView' }"
					>
						<svg-icon icon-class="toggle-icon" class="toggle"/>

						<!--						<img src="@/assets/images/toggle-view-icon.png" alt="切换视图" class="toggle"/>-->
						{{$t('orderList.switchTables')}}

					</div>
				</div>
			</div>
			<div style="width:  100%;margin-top: 20px;" >
				<template v-if="activeTab === 0">
					<search-form
						ref="order-search-form"
						v-show="showScreen"
						:key="activeTab"
						:option="searchOption"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
					></search-form>
				</template>

			</div>
			<div v-if="newView===0">
				<div class="custom-border-table" v-if="activeTab === 0">
					<el-table
						ref="businessTable"
						:data="tableData"
						tooltip-effect="dark"
						style="width: 100%"
						v-loading="loading"
					>
						<el-table-column prop="fileName" :label="$t('download.fileName')" min-width="170"></el-table-column>
						<el-table-column prop="downloadTime" min-width="70" :label="$t('download.time')"></el-table-column>
						<el-table-column prop="downloadStatus" :label="$t('download.process')">
							<template slot-scope="scope">
								<span v-if="scope.row.downloadStatus === 1" class="downloading">{{$t('download.downZhong')}}</span>
								<span v-if="scope.row.downloadStatus === 2" class="downloadUrl"
											@click="handleDownload(scope.row.downloadURL)">{{$t('download.down')}}</span>
								<span v-if="scope.row.downloadStatus === 3" class="downloadErr">{{$t('download.downError')}}</span>
							</template>
						</el-table-column>
						<el-table-column :label="$t('download.operate')" fixed="right">
							<template slot-scope="scope">
								<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
							</template>
						</el-table-column>
					</el-table>

					<pagination
						:total="total"
						:page.sync="form.pageNum"
						:limit.sync="form.pageSize"
						@pagination="$refs['order-search-form'].getList()"
					/>

				</div>

			</div>
			<div v-if="newView===1">

				<div class="transaction-list" v-if="tableData.length != 0">

					<div-dropdown v-for="transaction in tableData" :key="transaction.id" @click="viewDetail(transaction)"
												:list="operationList" :row="transaction" @command="operateScope" #dropdown-button
					>
						<div class="transaction-item">
							<div class="transaction-left">
								<img :src="getIcon(transaction.type)" alt="icon" class="icon" />
								<div class="transaction-info">
									<div class="transaction-type">{{ transaction.fileName }}</div>
									<div class="transaction-date">{{ transaction.downloadTime }}</div>
								</div>
							</div>
							<div class="transaction-right" @click.stop="handleDownload(transaction.downloadURL)">

								<img :src="getIconTwo(transaction.type)" alt="icon" style="width: 72px;height: 32px;margin-top: 8px;margin-right: 2px"  />

							</div>
						</div>
					</div-dropdown>
				</div>
				<el-empty description="" v-else class="custom-empty"></el-empty>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form'].getList()"
				/>

			</div>

		</div>

	</div>



<!--	<div v-if="false" class="app-container">
		<h3 class="page-title mb28">{{$t('download.downLoadCenter')}}</h3>
		<el-tabs v-model="activeName">
			&lt;!&ndash; 下载中心 &ndash;&gt;
			<el-tab-pane name="0">
				<span slot="label"><svg-icon icon-class="download" /> {{$t('download.downLoadCenter')}}</span>
				<div class="card-tools-toggle Flex spaceB alignC">
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
				&lt;!&ndash; 货物跟踪搜索组件 &ndash;&gt;
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
					ref="businessTable"
					:data="tableData"
					tooltip-effect="dark"
					style="width: 100%"
					v-loading="loading"
				>
					<el-table-column prop="fileName" :label="$t('download.fileName')" min-width="170"></el-table-column>
					<el-table-column prop="downloadTime" min-width="70" :label="$t('download.time')"></el-table-column>
					<el-table-column prop="downloadStatus" :label="$t('download.process')">
						<template slot-scope="scope">
							<span v-if="scope.row.downloadStatus === 1" class="downloading">{{$t('download.downZhong')}}</span>
							<span v-if="scope.row.downloadStatus === 2" class="downloadUrl"
										@click="handleDownload(scope.row.downloadURL)">{{$t('download.down')}}</span>
							<span v-if="scope.row.downloadStatus === 3" class="downloadErr">{{$t('download.downError')}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('download.operate')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<pagination
					:total="total"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="$refs['order-search-form'].getList()"
				>
				</pagination>
			</el-tab-pane>
		</el-tabs>
	</div>-->
</template>
<script>
import pagination from "@/components/Pagination";
import PageSizeSelect from "@/components/PageSizeSelect";
import SearchForm from "@/components/SearchForm";
import CircularDropdown from "@/components/CircularDropdown";
import { downloadDeleteList, downloadGetList } from "@/api/serve";
import DivDropdown from "@/components/DivDropdown/index.vue";
import i18n from "@/i18n";
import { mapGetters } from "vuex";


export default {
	name: "Download",
	components: {
		DivDropdown,
		pagination, PageSizeSelect, SearchForm, CircularDropdown,
	},
	computed: {
		...mapGetters(["merType","newView"]),

	},
	data() {
		return {
			activeName: "0",
			total: 0,

			componentKey: 0,
			activeTab: 0,
			hoveredTab: null,
			activeButton: null,
			dialogVisible:false,
			tabs: [ i18n.t('debitTable.debitTable'), i18n.t('depositTransfer.marginRemittanceTable'),],


			form: {
				pageNum: 1,
				pageSize: 15,
			},
			showScreen: false,
			// 下载中心搜索
			searchOption: {
				column: [
					{
						label: this.$t('download.fileName'),
						prop: "fileName",
						type: "input",
					},
					{
						label: this.$t('download.updateTime'),
						prop: "time",
						type: "daterange",
					},
				],
			},
			// 下载中心数据
			tableData: [],
			formProps: {}, //保存搜索组件传过来的值
			loading: false,
			operationList: [
				{ label: this.$t('download.delete'), value: 0, icon: "remove" },
			], // 操作列表
		};
	},
	methods: {
		selectTab(index) {
			// this.transactions=[];
			this.form= {
				pageNum: 1,
				pageSize: 15,
			};
			this.activeTab = index;
			this.getSearchForm(this.formProps);

			// if (this.newView === 0) {
			// 	if(this.activeTab === 0){
			// 		this.getSearchForm(this.formProps1);
			// 	}else{
			// 		this.getSearchForm(this.formProps2);
			// 	}
			// }else{
			// 	if(this.activeTab === 0){
			// 		this.getSearchForm(this.formProps3);
			// 	}else if(this.activeTab === 1){
			// 		this.getSearchForm(this.formProps4);
			// 	}else{
			// 		this.getSearchForm(this.formProps5);
			// 	}
			// }
		},
		hoverTab(index) {
			this.hoveredTab = index;
		},
		leaveTab() {
			this.hoveredTab = null;
		},
		hoverButton(button) {
			this.activeButton = button;
		},
		leaveButton() {
			this.activeButton = null;
		},
		handleFilter() {
			this.showScreen=!this.showScreen
			console.log('筛选');
		},
		handleDownload() {
			this.download();

			console.log('下载');
		},
		handleToggleView() {
			this.activeTab=0;
			this.$store.commit('SET_NEWVIEW', this.newView === 0 ? 1 : 0);

		},
		getIcon(type) {
			// 根据交易类型返回相应的图标路径
			return '/icon/xiazaiwenjian.png';
		},
		getIconTwo(type) {
			// 根据交易类型返回相应的图标路径
			return '/icon/xiazaicopy.png';
		},
		viewDetail(params) {
			// 当点击查看 且 页面是  外卡划款 的时候
			this.transferMoneyCashDeposit = false;
			this.showCrossSectionDetails = true;
			//当点击查看的时候 获取 当前行 个人信息
			this.transferMoneyForm = params;
			//获取批次号 后面 要当前行的 批次号 获取 外卡划款 数据
			this.balanceId = params.balanceId;
			//
			//当点击查看的时候   获取 外卡划款 和 划款明细的数据
			// if (params.balanceId)
			// 	this.$router.push({
			// 		path: "/details/bond/" + params.balanceId,
			// 		query: { hkType: params.hkType },
			// 	});
		},
		getStatusClass(transaction) {
			switch (transaction.status) {
				case 0:
					return 'status-processing';
				case 1:
					return 'status-success';
				case 2:
					return 'status-fail';
				default:
					return '';
			}
		},
		getStatusName(transaction) {
			switch (transaction.status) {
				case 0:
					return this.$t('remittance.underreview');
				case 1:
					return this.$t('remittance.success');
				case 2:
					return this.$t('remittance.failure');
				default:
					return '';
			}
		},
		// 分页请求
		getSearchForm(params) {
			this.formProps = params; //存储点击搜索按钮后的值
			if (this.activeName === "0") {
				this.$downloadGetList(params);
			}
		},
		//操作
		operateScope(params) {
			// 删除
			if (params.command.value === 0) {
				downloadDeleteList({ id: (params.data.id).toString() }).then(res => {
					if (res.status === 200) {
						this.$message.success(res.data);
						this.$downloadGetList(this.formProps);
					}
				});
			}
		},
		// 获取列表
		$downloadGetList(params) {
			this.loading = true
			let data = {
				...params,
				startTime: params.time[0],
				endTime: params.time[1],
			};
			this.$delete(data, "time");
			downloadGetList(data).then(res => {
				if (res.status === 200) {
					this.tableData = res.data.list;
					this.total = res.data.total;
					this.loading = false
				}
			}).catch(err => {
				this.loading = false
			})
		},
		// 点击下载
		handleDownload(url) {
			window.location.href = url;
		},
	},
};
</script>
<style scoped lang="less">
@import "../../assets/styles/template";

.downloadUrl {
	text-decoration: underline;
	cursor: pointer;
	color: #409EFF;
}

.downloading {
	color: #E6A23C;
}

.downloadErr {
	color: #F56C6C;
}
</style>
<style lang="less" scoped>

.quesheng{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%; /* 或者设置一个具体的高度，如 300px */
	padding: 20px;
	margin-bottom: 20px;
	text-align: center;
	width: 900px;
}
.quesheng img{
	max-width: 100%; /* 保证图片宽度不会超过容器宽度 */
	height: auto; /* 高度自动以适应宽度 */
	margin-bottom: 10px; /* 与下方文字保持一些间距 */
	width:300px;
}
.empty-list-text {
	margin: 0; /* 去除默认的margin */
	color: #526484;
	font-weight: 400;
	font-size: 14px;
}

.app-container {
	padding-left: 60px;
	padding-top: 52px;
	//background-color: #EBEDF0;;
}
.group_2 {
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 24px;
	//width: 941px;
	//height: 360px;
	border: 1px solid rgba(255, 255, 255, 1);
	background-color: #EBEDF0;;
	margin: 30px 0 0 0px;
	padding: 30px 40px 0px 40px;
	align-content: center;

}
::v-deep .el-dialog__header {
	border-bottom: none;
}
.page-titles {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}
.text-wrapper_16 {
	margin-top: 4px;


}
.text_5 {
	//width: 72px;
	//height: 36px;
	font-size: 18px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 36px;
	//margin-left: 689px;
}
.thumbnail_2 {
	width: 12px;
	height: 9px;
	margin: 13px 0 0 10px;
}
.custom-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	padding: 24px 30px 53px;
	margin-bottom: 24px;

}
.custom-two-style {
	//width: 941px;
	//height: 203px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.custom-four-style {
	//width: 941px;
	//height: 150px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

}
.my-special-class {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.my-special-class .btn {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.my-special-class .btn_two {
	width: 146px;
	height: 42px;
	//background: #7F8DFF;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.my-special-class .btn + .btn {
	margin-left: 20px;
}

.my-special-class .btn-text {
	font-size: 14px;
	font-family: Roboto-Medium, Roboto;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 16px;
}
.custom-three-style {
	//width: 941px;
	//height: 150px;
	background: #FFFFFF;
	border-radius: 16px;
	flex-grow: 1;

	padding: 20px 30px 22px;
	//margin-bottom: 24px;

}
.text_70 {
	//width: 64px;
	//height: 20px;
	font-size: 16px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.text_8 {
	width: 56px;
	height: 20px;
	font-size: 14px;
	font-family: 'PingFangSC-Semibold', 'PingFang SC';
	font-weight: 600;
	color: #364A63;
	line-height: 20px;
}
.new-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 24px;
	color: #526484;
	line-height: 26px;
	text-align: left;
	font-style: normal;
}
.new-style-8 {
	width: 110px;
	height: 32px;
	font-size: 28px;
	font-family: 'Roboto-Medium', 'Roboto';
	font-weight: 500;
	color: #7F8DFF;
	line-height: 32px;
}
.custom-title {
	//width: 120px;
	height: 20px;
	font-size: 14px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #7F8DFF;
	line-height: 20px;
	background: none;
	border: none;
	cursor: pointer;
}

.custom-title:hover {
	text-decoration: underline;
}
.new-two-style {
	font-family: Roboto, Roboto;
	font-weight: 500;
	font-size: 16px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	font-style: normal;
}
.new-two-style-8 {
	width: 42px;
	height: 24px;
	font-size: 20px;
	font-family: 'PingFangSC-Medium', 'PingFang SC';
	font-weight: 500;
	color: #364A63;
	line-height: 24px;
}
.custom-div {
	width: 25px;
}
.dialog-content {
	//width: 506px;
	//height: 527px;
	display: flex;
	flex-direction: column;
}

.section-input {
	margin-bottom: 31px;
	margin-top: 5px;
}
.generated-url {
	width: 436px;
	height: 40px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #DBDFEA;
	padding-left: 10px;
	padding-right: 10px;
	margin-bottom: 22px;
	display: flex;
	flex-direction: column;
	justify-content: center;

}
.url-content {
	justify-content: space-between;
	align-content: center;
	align-items: center;
	display: flex;
	flex-direction: row;

}

.copy-div {
	display: flex;
	flex-direction: row;
	justify-content: end;
}
.copy-button {
	//width: 40px;
	//height: 22px;
	width: 40px;
	height: 22px;
	background: #F5F6FF;
	border-radius: 2px;
	border: 1px solid #7F8DFF;
	display: flex;

	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.text_120 {
	//width: 24px;
	//height: 20px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #7F8DFF ;
	line-height: 18px;

}
.url-text {
	//width: 404px;
	//height: 36px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8094AE;
	//line-height: 18px;
	//margin-bottom: 20px;

}

.generate-link-button {
	width: 146px;
	height: 42px;
	background: #7F8DFF;
	border-radius: 4px;
	float: right;
}

.block-container {
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	width: 456px;
	height: 300px;
	border: 1px solid rgba(219, 223, 234, 1);
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}

.block-image {
	display: flex;
	flex-direction: column;
	align-items: center;
	//margin:  0  0;
}
.block-image-code-con {
	width: 300-26px;
	height: 267-26px;
}

.block-text-wrapper {
	background-color: rgba(245, 247, 254, 1);
	border-radius: 4px;
	height: 36px;
	width: 160px;
	margin: 24px 0 30px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.block-text {
	overflow-wrap: break-word;
	color: rgba(127, 141, 255, 1);
	font-size: 14px;
	font-weight: normal;
	text-align: center;
	white-space: nowrap;
	line-height: 20px;
}
.clean-style {
	//width: 195px;
	height: 36px;
	padding-left: 20px;
	padding-right: 20px;
	background: #FFFFFF;
	border-radius: 18px;
	border: 1px solid #E5E9F2;
}
.text_sdgsga {
	width: 220px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	text-align: end;
	color: #364A63;
}
.chongzhi-button {
	//min-width: 88px;
	height: 32px;
	background: #7F8DFF;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button:hover {
	opacity: 0.8; /* 鼠标悬停时的不透明度 */
}
.chongzhi-button2 {
	//min-width: 88px;
	height: 32px;
	background: #F7F9FE;
	border-radius: 16px;
	padding: 0 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	margin-right: 12px
}
.chongzhi-button2:hover {
	background-color: #7F8DFF/* 鼠标悬停时的不透明度 */
}
.chongzhi-button2:hover .btn-text-te2 {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.chongzhi-button2:hover .svg-tabs {
	color: #F7F9FE; /* 修改为你想要的 SVG 填充色 */
}
.btn-text-te {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	font-style: normal;
	padding-left: 8px;
}
.btn-text-te2 {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	padding-left: 8px;
}
.scrollable-container {
	width: 900px;

	overflow: scroll;
	white-space: nowrap;
	scrollbar-width: thin;
	scrollbar-color: #C5CAD4 #EBEEF4;
}

.scrollable-container::-webkit-scrollbar {
	width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
	background-color: #F5F5F5;
}

.scrollable-container::-webkit-scrollbar-thumb {
	background-color: #7F8DFF;
}

.content {
	padding-top: 20px;
	padding-bottom: 10px;
}
.cursor-pointer {
	cursor: pointer;
}
.item {
	display: inline-block;
	width: 256-32px;
	height: 208-32px;
	background: #F7F9FE;
	border-radius: 16px;
	margin-right: 12px;
	padding: 16px;
	cursor: pointer;
}

.transaction-section {
	background: #fff;
	margin-top: 16px;
	width:  100%;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.header h3 {
	margin: 0;
	color: #364A63;
	font-size: 18px;
}

.view-more {
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;
	text-decoration-line: underline;
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
}

.transaction-list {
	display: flex;
	flex-direction: column;
}

.transaction-item {
	display: flex;
	justify-content: space-between;
	height: 58px;
	//padding: 12px 0;
	margin-top: 12px;
	cursor: pointer;
	box-sizing: border-box;
	border-bottom: 1px solid #F4F5F9;
}

.transaction-item:hover {
	background: #F6F8FE;
}

.transaction-left {
	display: flex;
	align-items: flex-start;
}

.icon {
	width: 48px;
	height: 48px;
	margin-right: 10px;
}

.transaction-info {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.transaction-type {
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	margin-top: 3px;
}

.transaction-date {
	margin-top:8px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;

}

.transaction-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.transaction-amount {
	font-family: Roboto, Roboto;
	font-weight: bold;
	font-size: 16px;
	color: #364A63;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	padding-top: 3px;

}

.transaction-status {
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: right;
	font-style: normal;

	margin-top: 8px;
}

.status-success {
	color: #8094AE;
}

.status-fail {
	color: #F23C3C;
}

.status-processing {
	color: #FF7A16;
}
.status-processing-yellow {
	color: yellow;
}
</style>
<style scoped>
.custom-border-table,
.custom-border-table .el-table__header-wrapper,
.custom-border-table .el-table__body-wrapper,
.custom-border-table .el-table__footer-wrapper {
	margin-top: 20px;
	border-radius: 0px 0px 4px 4px;
	margin-bottom: 100px;
	border: 1px solid #DBDFEA;
}

.custom-border-table .el-table__row,
.custom-border-table .el-table__cell {
	border-bottom: 1px solid #000; /* 行之间的边框 */
}

.custom-border-table .el-table__header th,
.custom-border-table .el-table__body td {
	border-right: 1px solid #000; /* 列之间的边框 */
}

.custom-border-table .el-table__header th:last-child,
.custom-border-table .el-table__body td:last-child {
	border-right: none; /* 移除最后一列的右边框 */
}

.custom-border-table .el-table__row:last-child td {
	border-bottom: none; /* 移除最后一行的底部边框 */
}
</style>
<style scoped lang="less">
@import "../../assets/styles/detailsList";

.go-back-btn {
	border: none;
	width: auto;
	display: block;
}
.app-containers {
	margin-top: 32px;
	width:  100%;
}
</style>
<style scoped>
.tabs-container {
	display: flex;
	gap: 10px;
}

.tab {
	min-width: 72px;
	height: 32px;
	border-radius: 16px;
	padding-left: 21px;
	padding-right: 21px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 16px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}

.tab:hover {
	background-color: #F7F9FE; /* 鼠标移入的背景色 */

	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
}

.tab.active {
	background-color: #F7F9FE; /* 激活状态的背景色 */
	font-weight: 500;
	font-size: 16px;
	color: #364A63;
	line-height: 16px;
	text-align: right;
	font-style: normal;
}
.tab-content {
	margin-top: 20px;
}
.remittanceTable-container {
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	font-size: 28px;
	color: #364A63;
	line-height: 36px;
	text-align: left;
	font-style: normal;
}
.buttons-container {
	display: flex;
	gap: 10px;
	margin-left: auto;
}

.button {
	height: 32px;
	padding-left: 16px;
	padding-right: 16px;
	background: #7F8DFF;
	border-radius: 16px;
	border: 1px solid #ECEEF4;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	text-align: right;
	font-style: normal;

}
.button:hover {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}

.button.active {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}
.buttons {
	background-color: #FFFFFF; /* 鼠标移入的背景色 */

	height: 32px;
	padding-left: 16px;
	padding-right: 16px;
	border-radius: 16px;
	border: 1px solid #ECEEF4;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s;
	font-weight: 500;
	font-size: 14px;
	color: #8094AE;

	line-height: 16px;
	text-align: right;
	font-style: normal;

}
.buttons:hover {
	background: #7F8DFF;

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	text-align: center;
	color: #FFFFFF;

	font-style: normal;
}

.buttons.active {
	background: #7F8DFF;

	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 16px;
	text-align: center;
	font-style: normal;
}
/*.toggle*/
.filter{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
.download{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
.toggle{
	width: 16px;
	height: 16px;
	margin-right: 9px;
}
</style>
<style scoped>
.custom-empty ::v-deep .el-empty__image {
	display: none;
}
</style>