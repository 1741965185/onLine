<template>
	<div class="app-container">
		<!-- 头部 -->
		<div class="top-title-bar">
			<div class="tabs-container">
				<div
						class="tab"
						:class="{ active: activeName === 'notice' }"
						@click="changeTab('notice')"
				>
					通知
				</div>
			</div>

			<el-button class="go-back-btn" @click="$router.go(-1)">
				<svg-icon icon-class="arrow-left" />
				<span>返回</span>
			</el-button>
		</div>
		<!-- 搜索部 -->
		<div class="search-wrap" v-show="activeName === 'log'">
			<el-form ref="form" :model="search">
				<el-form-item label="登录名:">
					<el-input v-model="search.userName"></el-input>
				</el-form-item>
				<el-form-item label="动作:">
					<el-select v-model="search.action" placeholder="">
						<el-option v-for="item in actionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作内容:">
					<el-input v-model="search.operationContent"></el-input>
				</el-form-item>
				<el-form-item label="时间:" class="time-item">
					<el-date-picker
						class="airclick-data-picker"
						v-model="search.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="el-icon-date"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						:default-time="['00:00:00', '23:59:59']"
						:clearable="false"
						:editable="false"
					>
					</el-date-picker>
				</el-form-item>
				<!-- <el-button icon="el-icon-search" class="search-btn" circle @click="getLogList"></el-button> -->
				<div class="icon-hover-effect" @click="getLogList">
					<svg-icon icon-class="search" />
				</div>
			</el-form>
		</div>
		<div class="search-wrap" v-show="activeName === 'notice'">
			<el-form ref="form" :model="searchNotice">
				<el-form-item label="类型:">
					<el-select v-model="searchNotice.type" placeholder="">
						<el-option v-for="item in NoticeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期筛选：" class="time-item">
					<el-date-picker
						class="airclick-data-picker"
						v-model="searchNotice.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="el-icon-date"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						:default-time="['00:00:00', '23:59:59']"
						:clearable="false"
						:editable="false"
					>
					</el-date-picker>
				</el-form-item>
				<!-- <el-button icon="el-icon-search" class="search-btn" circle @click="getLogList"></el-button> -->

				<div class="icon-hover-effect" style="margin-left: 45px;" @click="resetParams">
					<svg-icon icon-class="redo"/>

				</div>
				<div class="icon-hover-effect" style="margin-left: 1px;" @click="getNoticeList">

					<svg-icon icon-class="search" />
				</div>
			</el-form>
		</div>
		<!-- 日志内容 -->
		<div class="log-wrap" v-show="activeName === 'log'">
			<div class="log-content">
				<el-timeline>
					<el-timeline-item
						v-for="(activity, index) in activities"
						:key="index"
						:icon="activity.icon"
						:type="activity.type"
						:color="activity.color"
						:size="activity.size"
						:timestamp="activity.timestamp"
					>
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
		<div class="log-wrap-notice" v-show="activeName === 'notice'">
			<div class="popover-message-content-two" v-show="activeName === 'notice'">
				<div v-for="(warning, index) in warnings" :key="index" style="justify-content: space-between;align-items: start;display: flex;flex-direction: column;margin-left: 24px;margin-right: 24px;padding-top: 24px;box-sizing: border-box;">
				<div style="display: flex;">
					<div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 14px;
color: #526484;
line-height: 18px;
text-align: left;
font-style: normal;">
						{{warning.title}}
					</div>
					<div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #8094AE;
line-height: 18px;
text-align: left;
font-style: normal;
margin-bottom: 8px;
margin-left: 24px;
">
						{{warning.createTime}}
					</div>
				</div>
					<div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #526484;
line-height: 20px;
text-align: left;
font-style: normal;;">
						{{warning.content}}
					</div>
				</div>
			</div>
		</div>
		<!-- 分页器 -->
		<pagination v-show="activeName === 'log'" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize" @pagination="getLogList">
		</pagination>
		<pagination v-show="activeName === 'notice'" :total="noticeTotal" :page.sync="form2.pageNum" :limit.sync="form2.pageSize" @pagination="getNoticeList">
		</pagination>
	</div>
</template>
<script>
import pagination from "@/components/Pagination";
import { getNoticeList } from "@/api/notice";
export default {
	name: "OperationLog",
	components: {
		pagination,
	},
	data() {
		return {
			form: {
				pageNum: 1,
				pageSize: 50,
			},
			form2: {
				pageNum: 1,
				pageSize: 10,
			},
			warnings: [],

			activeIndex: "1",
			activeName: "notice",
			search: {
				userName: "", //登录名
				time: [], //时间
				action: "", //动作
				operationContent: "", //操作内容
			},
			searchNotice: {

				type: '', //
				time: [], //时间
				// 1：商户交易时间 2：商户失败交易 3：通道失败交易 4：交易失败预警
			},
      errorList:[],
			activities: [], //日志列表
			total: 0, //日志总数
			noticeTotal: 0, //日志总数
			actionList: [
				{ label: "所有", value: null },
				{ label: "新增", value: "新增了" },
				{ label: "编辑", value: "编辑了" },
				{ label: "移除", value: "移除了" },
				{ label: "发起", value: "发起了" },
				{ label: "解锁", value: "解锁了" },
				{ label: "审核", value: "审核了" },
				{ label: "登录", value: "登录" },
				{ label: "退出", value: "退出" },
			],
			NoticeTypeList:[
				{ label: "所有", value: null },
				{ label: "提现通知", value: 1 },
				{ label: "汇款补充资料", value: 2 },
				{ label: "调档通知", value: 3 },
				// { label: "交易失败预警", value: 4 }
			]
		};
	},
  mounted() {
    this.loadAll();
  },
  created() {
		this.search.time = [
			// this.dayjs().format("YYYY-MM-DD") + " 00:00:00",
			// this.dayjs().format("YYYY-MM-DD") + " 23:59:59",
		];
		this.searchNotice.time = [
			// this.dayjs().format("YYYY-MM-DD") + " 00:00:00",
			// this.dayjs().format("YYYY-MM-DD") + " 23:59:59",
		];
		// this.getLogList();
		this.getNoticeList();
	},
	methods: {
    loadAll(){
      getListError().then(res=>{

        res.data.forEach(itme=>{
          this.errorList.push({
              value:itme,
              name:itme
            }
          )
        })
        console.log(this.errorList);

      })
    },
		changeTab(tabName) {
			this.activeName = tabName;
		},
    querySearchAsync(queryString, cb){
      var restaurants = this.errorList;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
		// 获取日志列表
		getLogList() {
			let data = {
				...this.form,
				...this.search,
				startTime: this.search.time[0],
				endTime: this.search.time[1],
			};
			// 删除对象中数据为空的
			for (let key in data) {
				if (data[key] == "" || data[key] == [] || data[key] == undefined) {
					delete data[key];
				}
			}
			this.$delete(data, "time");
			getJournalList(data).then(res => {
				this.total = res.data.total;
				this.activities = res.data.list.map(item => {
					return {
						content: item.operationContent,
						timestamp: item.operationTime,
						color:
							item.action.includes("新增") || item.action.includes("编辑") || item.action.includes("移除")
								? "#7F8DFF"
								: "#e4e7ed",
						size:
							item.action.includes("新增") || item.action.includes("编辑") || item.action.includes("移除")
								? "large"
								: "normal",
					};
				});
			});
		},
		// 获取日志列表
		getNoticeList() {
			let data = {
				...this.form2,
				...this.searchNotice,
				startTime: this.searchNotice.time[0],
				endTime: this.searchNotice.time[1],
				merNo:sessionStorage.getItem("merNo"),
			};
			// 删除对象中数据为空的
			for (let key in data) {
				if (data[key] == "" || data[key] == [] || data[key] == undefined) {
					delete data[key];
				}
			}
			this.$delete(data, "time");
			getNoticeList(data).then(res => {
				this.noticeTotal = res.data.total;
				this.warnings=res.data.list;

			});
		},
		resetParams() {
			this.searchNotice= {

				type: '', //
					time: [], //时间
				// 1：商户交易时间 2：商户失败交易 3：通道失败交易 4：交易失败预警
			};
		},
	},
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/detailsList";
.app-container {
	box-sizing: border-box;
}
.search-wrap {
	width: 100%;
	margin: 0 0 10px 0;
	/deep/ .el-form {
		display: flex;
		flex-wrap: wrap;
		.el-form-item {
			display: flex;
			margin: 0 15px 10px 0;
			.line {
				display: flex;
				justify-content: center;
			}
			.el-form-item__label-wrap {
				margin-left: 0 !important;
			}
			.el-form-item__content {
				margin-left: 0 !important;
				width: 150px;
			}
		}
		.time-item {
			width: 400px;
			.el-form-item__content {
				.el-range-editor {
					width: 355px;
				}
			}
		}
		.search-btn {
			width: 40px;
			height: 40px;
		}
	}
}
::-webkit-scrollbar {
	/*隐藏滚轮*/
	width: 0px;
}
.log-wrap {
	width: 99.8%;
	min-height: 400px;
	max-height: 500px;
	border: 1px solid #e5e9f2;
	padding: 40px;
	box-sizing: border-box;
	overflow: auto;
	.log-content {
		padding: 0 0 0 140px;
		::v-deep .el-timeline-item__timestamp {
			position: absolute;
			left: -135px;
			top: -5px;
		}
		::v-deep .el-timeline {
			font-size: 12px;
			.el-timeline-item {
				padding-bottom: 8px;
			}
			.el-timeline-item__node--normal {
				left: 1px;
				width: 8px;
				height: 8px;
				background: #8094ae;
			}
			.el-timeline-item__node--large {
				left: 0px;
				width: 10px;
				height: 10px;
				box-shadow: 0px 0px 5px 1px rgb(127 141 255);
			}
		}
	}
}
.log-wrap-notice {
	width: 99.8%;
	min-height: 400px;
	max-height: 500px;
	border: 1px solid #e5e9f2;
	box-sizing: border-box;
	overflow: auto;
}
.table-footer-wrapper {
	padding: 0;
}
.tabs-container {
	display: flex;
}

.tab {
	padding: 10px;
	cursor: pointer;
	font-family: Roboto, Roboto;
	font-weight: 400;
	font-size: 28px;
	color: #8094AE;
	line-height: 28px;
	text-align: left;
	font-style: normal;

}

.tab.active {
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	font-size: 28px;
	color: #364A63;
	line-height: 28px;
	text-align: left;
	font-style: normal;
}
</style>
