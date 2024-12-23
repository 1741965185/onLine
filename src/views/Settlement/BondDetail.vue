<template>
  <div class="app-container">
    <div class="top-title-bar">
      <h3 class="page-title">批次号 / <span class="c-7F8DFF">{{ balanceid }}</span></h3>
      <el-button class="go-back-btn" @click="$router.go(-1)">
        <svg-icon icon-class="arrow-left"/>
        <span>返回</span>
      </el-button>
    </div>
    <ul class="top-subtitle clearfix">
      <li>
        <label>制表日期：</label>
        <span>{{ form.createTableDate ? dayjs(form.createTableDate).format("YYYY-MM-DD HH:mm:ss") : "-" }}</span>
      </li>
    </ul>
    <el-tabs v-model="activeName">

      <!-- 外卡划款 tabsContent -->
      <el-tab-pane class="pd25" name="first">
        <span slot="label"><i class="el-icon-date"></i> 外卡划款</span>
        <el-row class="detail-info-wrapper" type="flex" justify="space-between">
          <el-col :span="11">
            <p><label>商户号</label><span>{{ form.merNo || "-" }}</span></p>
            <p><label>商户名</label><span>{{ form.merName || "-" }}</span></p>
            <p><label>开户名称</label><span>{{ form.accountName || "-" }}</span></p>
            <p><label>开户账号</label><span>{{ form.account || "-" }}</span></p>
            <p><label>开户行</label><span>{{ form.binName || "-" }}</span></p>
          </el-col>
          <el-col :span="11">
            <p><label>币种</label><span>{{ form.hkCurrency || "-" }}</span></p>
            <p><label>划款金额</label><span>{{ form.hkAmount || "-" }}</span></p>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <h5 class="fs20-style-title mb16">保证金划款</h5>
        <el-table
            class="mb28"
            ref="thisIssueTable"
            :data="thisIssueList"
            tooltip-effect="dark"
            style="width: 100%;">
          <el-table-column
              prop="tradeNum"
              label="交易笔数">
          </el-table-column>
          <el-table-column
              prop="currencyCode"
              label="币种1">
          </el-table-column>
          <el-table-column
              prop="tradeSourceAmount"
              label="交易金额">
          </el-table-column>
          <el-table-column
              prop="bailAmount"
              label="保证金">
          </el-table-column>
          <el-table-column
              prop="refundNum"
              label="退款笔数">
          </el-table-column>
          <el-table-column
              prop="refundAmount"
              label="退款金额">
          </el-table-column>
          <el-table-column
              prop="protestNum"
              label="拒付笔数">
          </el-table-column>
          <el-table-column
              prop="protestAmount"
              label="拒付金额">
          </el-table-column>
          <el-table-column
              prop="hkCurrency"
              label="划款币种">
          </el-table-column>
          <el-table-column
              prop="bailAmount"
              label="应划金额">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 划款明细 tabsContent -->
      <el-tab-pane class="pd25" name="second">
        <span slot="label"><i class="el-icon-date"></i> 划款明细</span>
        <h5 class="fs20-style-title">正常交易划款明细</h5>
        <div class="total-wrapper">
          <span>合计：</span>
          <ul class="clearfix">
            <li :key=" 'normalBusinessForm1' ">标签金额：<span>{{ normalBusinessForm.mounts || "-" }}</span></li>
            <li :key=" 'normalBusinessForm2' ">保证金：<span>{{ normalBusinessForm.bails || "-" }}</span></li>
            <li :key=" 'normalBusinessForm3' ">手续费：<span>{{ normalBusinessForm.rates || "-" }}</span></li>
          </ul>
        </div>
        <el-table
            class="mb28"
            :data="normalBusinessList"
            tooltip-effect="dark"
            style="width: 100%;">
          <el-table-column
              prop="tradeNo"
              min-width="170px"
              label="交易流水号">
          </el-table-column>
          <el-table-column
              prop="tradeNo"
              min-width="170px"
              label="商户订单号">
          </el-table-column>
          <el-table-column
              prop="cardName"
              label="卡种">
          </el-table-column>
          <el-table-column
              min-width="140"
              prop="sourceAmount"
              label="标签金额">
          </el-table-column>
          <el-table-column
              min-width="140"
              prop="bail"
              label="保证金扣率">
          </el-table-column>
          <el-table-column
              prop="rate"
              label="卡种扣率">
          </el-table-column>
          <el-table-column
              prop="settleRate"
              label="结算汇率">
          </el-table-column>
          <el-table-column
              prop="refundment"
              label="交易状态">
          </el-table-column>
          <el-table-column
              min-width="160"
              prop="tradeDateTime"
              label="交易时间">
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  seeBonds,
  seeBondDetails,
} from "@/api/bond";

export default {
  name: "BondDetail",
  data() {
    return {
      form: {},
      activeName: "first", // tabsActive
      thisIssueList: [], // 本期划款列表
      normalBusinessList: [], // 正常交易划款记录
      normalBusinessForm: {},
    };
  },
  created() {
    const balanceid = this.$route.params && this.$route.params.id;
    this.balanceid = balanceid;
    this.$seeBondInfo(this.balanceid);
    this.$seeBondDetailed(this.balanceid);
  },
  methods: {
    $seeBondInfo(balanceid) {
      seeBonds({ id: balanceid }).then(result => {
        if (result.data.bean && result.data.bean.length) {
          this.form = result.data.bean[0];
          this.thisIssueList = result.data.details;
        }
      });
    },
    $seeBondDetailed(balanceid) {
      seeBondDetails({ id: balanceid }).then(result => {
        if (result.data.bean && result.data.bean.length) {
          this.normalBusinessList = result.data.bean;
        }
        if (result.data.sum && result.data.sum.length) {
          const { bails, mounts, rates } = result.data.sum[0];
          this.normalBusinessForm = { bails, mounts, rates };
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../assets/styles/detailsList";
</style>
<style scoped lang="less">
.top-subtitle {
  font-size: 14px;
  margin-bottom: 16px;

  li {
    float: left;
    margin-right: 24px;
    color: #8094AE;

    span {
      color: #526484;
    }
  }
}
</style>