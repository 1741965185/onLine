<template>
  <div class="app-container">
    <div class="top-title-bar">
      <h3 class="page-title">订单跟踪详情 / <span class="c-7F8DFF">{{tradeno}}</span></h3>
      <el-button class="go-back-btn" @click="$router.go(-1)">
        <svg-icon icon-class="arrow-left"/>
        <span>返回</span>
      </el-button>
    </div>
    <div class="border pd25 detail-info-wrapper">
      <ul class="card-email-ip clearfix">
        <li>
          <p>卡号</p>
          <p @click="emailAndCard({tradeno})"><a>{{infoForm["cardnotruncation"]}}</a></p>
        </li>
        <li>
          <p>邮箱</p>
          <p @click="emailAndCard({email:infoForm.billEmail})"><a>{{infoForm.billEmail}}</a></p>
        </li>
        <li>
          <p>IP</p>
          <p>{{infoForm.ip || "-"}}</p>
        </li>
      </ul>

      <el-row type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">基本信息</el-col>
        <el-col :span="11">收货信息</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <p><label>商户号</label><span>{{infoForm.merNo || "-"}}</span></p>
          <p><label>订单号</label><span>{{infoForm.tradeNo || "-"}}</span></p>
          <p><label>商户订单号</label><span>{{infoForm.billNo || "-"}}</span></p>
          <p>
            <label>标签金额</label>
            <span>{{(infoForm.sourceAmount||"-") + "(" + (infoForm.sourceCurrency || "-") + ")"}}</span>
          </p>
          <p><label>步骤状态</label><span>{{infoForm.errorCode || "-"}}</span></p>
          <p><label>描述</label><span>{{infoForm.errorDesc || "-"}}</span></p>
        </el-col>
        <el-col :span="11">
          <p><label>来源网址</label><span>{{infoForm.fromURL || "-"}}</span></p>
          <p><label>提交网址</label><span>{{infoForm.submiturl || "-"}}</span></p>
          <p><label>返回网址</label><span>{{infoForm.returnURL || "-"}}</span></p>
          <p><label>进入系统时间</label><span>{{infoForm.enterServerDateTime || "-"}}</span></p>
          <p><label>备注</label><span>{{infoForm.remark || "-"}}</span></p>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">账单信息</el-col>
        <el-col :span="11">收货信息</el-col>
      </el-row>

      <el-divider></el-divider>

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <p><label>姓名</label><span>{{(infoForm.bfirstName||"-") + infoForm.blastName||"-"}}</span></p>
          <p><label>联系电话</label><span>{{infoForm.billPhone  || "-"}}</span></p>
          <p><label>发卡行</label><span>???</span></p>
          <p><label>邮政编码</label><span>{{infoForm.billZip || "-"}}</span></p>
          <p><label>国家</label><span>{{infoForm.billCountry || "-"}}</span></p>
          <p><label>所在地</label><span>{{infoForm.billState || "-"}}</span></p>
          <p><label>城市</label><span>{{infoForm.billCity || "-"}}</span></p>
          <p><label>地址</label><span>{{infoForm.billAddress || "-"}}</span></p>
        </el-col>
        <el-col :span="11">
          <p><label>姓名</label><span>{{(infoForm.sfirstName||"-") + (infoForm.slastName||"-")}}</span></p>
          <p><label>联系电话</label><span>+{{infoForm.shipPhone || "-"}}</span></p>
          <p><label>收货人邮箱</label><span>{{infoForm.shipEmail || "-"}}</span></p>
          <p><label>邮政编码</label><span>{{infoForm.shipZip || "-"}}</span></p>
          <p><label>国家</label><span>{{infoForm.shipCountry || "-"}}</span></p>
          <p><label>所在地</label><span>{{infoForm.shipState || "-"}}</span></p>
          <p><label>城市</label><span>{{infoForm.shipCity || "-"}}</span></p>
          <p><label>地址</label><span>{{infoForm.shipAddress || "-"}}</span></p>
        </el-col>
      </el-row>
    </div>

    <el-dialog
        title="交易记录信息"
        :visible.sync="dialogVisible"
        width="60%">
      <p class="fs20-style-title" v-show="cardOrEamil === 'card'">
        卡号&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-7F8DFF fs20">{{subtitle}}</span>
      </p>
      <p class="fs20-style-title" v-show="cardOrEamil === 'email'">
        邮箱&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-7F8DFF fs20">{{subtitle}}</span>
      </p>
      <el-table style="width: 100%" :data="tablelList">
        <el-table-column
            v-if=" cardOrEamil === 'email' "
            prop="cardnotruncation"
            min-width="140px"
            label="卡号">
        </el-table-column>
        <el-table-column
            v-if=" cardOrEamil === 'card' "
            prop="email"
            min-width="200px"
            label="电子邮箱">
        </el-table-column>
        <el-table-column
            prop="tradeno"
            min-width="170px"
            label="流水订单号">
        </el-table-column>
        <el-table-column
            prop="ipaddress"
            min-width="140px"
            label="IP地址">
        </el-table-column>
        <el-table-column
            prop="tel"
            min-width="140px"
            label="联系电话">
        </el-table-column>
        <el-table-column
            prop="fullname"
            label="称呼">
        </el-table-column>
        <el-table-column
            prop="amount"
            label="交易金额">
        </el-table-column>
        <el-table-column
            label="交易结果">
          <template slot-scope="scope">
            {{ (+scope.row.Succeed) === 1 ? "成功" : "失败" }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="160px"
            label="交易时间">
          <template slot-scope="scope">
            {{ dayjs(scope.row.TradeDateTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>

      <pagination
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
          @pagination="emailAndCard"
      ></pagination>
    </el-dialog>
  </div>
</template>

<script>
	import pagination from "@/components/Pagination"

	export default {
		name: "trackingDetail",
		components: {
			pagination,
		},
		data() {
			return {
				activeNames: ["1"],
				infoForm: {}, // 表单数据
				tradeno: undefined, //
				dialogVisible: false, // card email 弹窗
				tablelList: [], // 卡号,邮箱交易记录信息
				cardOrEamil: undefined,  // 初始化弹窗内容 卡号还是email
				// 分页data
				pageNum: 1,
				pageSize: 15,
				total: 0,
				subtitle: undefined,
			}
		},
		created() {
			const tradeno = this.$route.params && this.$route.params.id
			this.tradeno = tradeno
			this.getDetail(tradeno)
		},
		methods: {
			// 请求订单详情
			getDetail(TradeNo) {
				getListId({ TradeNo }).then(result => {
					this.infoForm = result[0]
				})
			},
			// 邮件和卡号查询详情
			emailAndCard(params) {
				params.email ? this.cardOrEamil = "email" : this.cardOrEamil = "card"
				queryDeta({
					...params, pageNum: this.pageNum, pageSize: this.pageSize,
				}).then(result => {
					if (this.cardOrEamil === "email") {
						this.subtitle = this.infoForm.email
					} else {
						this.subtitle = result.cardnotruncation
					}
					this.tablelList = result.list
					this.total = result.total
					this.dialogVisible = true
				})
			},
		},
	}
</script>

<style scoped lang="less">
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