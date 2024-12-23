<template>
  <div class="">
    <div class="top-title-bar">
      <h3 class="page-title">批次号 / <span class="c-7F8DFF">{{order}}</span></h3>
      <el-button class="go-back-btn">
        <svg-icon icon-class="arrow-left"/>
        <span>返回</span>
      </el-button>
    </div>
    <ul class="top-subtitle clearfix">
      <li>制表日期：<span>2020-03-17</span></li>
      <li>制表人：<span>sys</span></li>
      <li>复核人：<span>-</span></li>
      <li>财务：<span>admin2</span></li>
    </ul>
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <!-- 外卡划款 tabsContent -->
      <el-tab-pane class="pd25" name="first">
        <span slot="label"><i class="el-icon-date"></i> 外卡划款</span>
        <el-row class="detail-info-wrapper" type="flex" justify="space-between">
          <el-col :span="11">
            <p><label>商户号</label><span>1194</span></p>
            <p><label>商户名</label><span>张三</span></p>
            <p><label>开户名称</label><span>张三</span></p>
            <p><label>开户账号</label><span>123</span></p>
            <p><label>开户行</label><span>工商</span></p>
          </el-col>
          <el-col :span="11">
            <p><label>币种</label><span>USD</span></p>
            <p><label>划款金额</label><span>22.37</span></p>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h5 class="fs20-style-title mb16">本期交易划款</h5>
        <el-table
            ref="thisIssueTable"
            :data="thisIssueList"
            tooltip-effect="dark"
            style="width: 100%;">
          <el-table-column
              prop="a"
              label="商户号">
          </el-table-column>
          <el-table-column
              prop="b"
              label="商户名">
          </el-table-column>
          <el-table-column
              prop="c"
              label="开户人">
          </el-table-column>
          <el-table-column
              prop="d"
              min-width="160px"
              label="开户账号">
          </el-table-column>
          <el-table-column
              prop="e"
              label="开户名称">
          </el-table-column>
          <el-table-column
              prop="f"
              label="币种">
          </el-table-column>
          <el-table-column
              prop="g"
              label="划款金额">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>

        <!-- 保证金无异常 -->
        <template v-if="unusual">
          <h5 class="fs20-style-title mb16">异常单划款以及上期补划</h5>
          <el-table
              ref="unusualListTable"
              :data="unusualList"
              tooltip-effect="dark"
              style="width: 100%;">
            <el-table-column
                prop="a"
                label="商户号">
            </el-table-column>
            <el-table-column
                prop="b"
                label="商户名">
            </el-table-column>
            <el-table-column
                prop="c"
                label="开户人">
            </el-table-column>
            <el-table-column
                prop="d"
                min-width="160px"
                label="开户账号">
            </el-table-column>
            <el-table-column
                prop="e"
                label="开户名称">
            </el-table-column>
            <el-table-column
                prop="f"
                label="币种">
            </el-table-column>
            <el-table-column
                prop="g"
                label="划款金额">
            </el-table-column>
          </el-table>
          <el-divider></el-divider>
        </template>

        <h5 class="fs20-style-title mb16">其他扣费项</h5>
        <el-form class="Flex spaceB">
          <el-form-item label="扣费项：">
            <el-select v-model="value" placeholder="">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额：">
            <el-input v-model="form.a" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="form.a" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </el-form>

        <el-divider></el-divider>

        <h5 class="fs20-style-title mb8">合计</h5>
        <el-table
            :data="totalList"
            ref="totalTable"
            tooltip-effect="dark"
            style="width: 100%;">
          <el-table-column
              prop="a"
              label="划款币种">
          </el-table-column>
          <el-table-column
              prop="b"
              label="交易金额">
          </el-table-column>
          <el-table-column
              prop="c"
              label="保证金">
          </el-table-column>
          <el-table-column
              prop="d"
              label="手续费">
          </el-table-column>
          <el-table-column
              prop="e"
              label="其他金额">
          </el-table-column>
          <el-table-column
              prop="f"
              label="应划金额">
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <!-- 划款明细 tabsContent -->
      <el-tab-pane class="pd25" name="second">
        <span slot="label"><i class="el-icon-date"></i> 划款明细</span>
        <h5 class="fs20-style-title">正常交易划款记录</h5>
        <div class="total-wrapper">
          <span>合计：</span>
          <ul class="clearfix">
            <li>交易金额：<span>39,650.32</span></li>
            <li>保证金：<span>-29,650.32</span></li>
            <li>手续费：<span>-29,650.32</span></li>
            <li>应划金额：<span>-29,650.32</span></li>
          </ul>
        </div>
        <el-table
            ref="thisIssueTable"
            :data="thisIssueList"
            tooltip-effect="dark"
            style="width: 100%;">
          <el-table-column
              prop="a"
              label="商户号">
          </el-table-column>
          <el-table-column
              prop="b"
              label="商户名">
          </el-table-column>
          <el-table-column
              prop="c"
              label="开户人">
          </el-table-column>
          <el-table-column
              prop="d"
              min-width="160px"
              label="开户账号">
          </el-table-column>
          <el-table-column
              prop="e"
              label="开户名称">
          </el-table-column>
          <el-table-column
              prop="f"
              label="币种">
          </el-table-column>
          <el-table-column
              prop="g"
              label="划款金额">
          </el-table-column>
        </el-table>

        <!-- 保证金无异常 -->
        <template v-if="unusual">
          <h5 class="fs20-style-title">异常交易划款记录</h5>
          <div class="total-wrapper">
            <span>合计：</span>
            <ul class="clearfix">
              <li>交易金额：<span>39,650.32</span></li>
              <li>保证金：<span>-29,650.32</span></li>
              <li>手续费：<span>-29,650.32</span></li>
              <li>应划金额：<span>-29,650.32</span></li>
            </ul>
          </div>
          <el-table
              ref="thisIssueTable"
              :data="thisIssueList"
              tooltip-effect="dark"
              style="width: 100%;">
            <el-table-column
                prop="a"
                label="商户号">
            </el-table-column>
            <el-table-column
                prop="b"
                label="商户名">
            </el-table-column>
            <el-table-column
                prop="c"
                label="开户人">
            </el-table-column>
            <el-table-column
                prop="d"
                min-width="160px"
                label="开户账号">
            </el-table-column>
            <el-table-column
                prop="e"
                label="开户名称">
            </el-table-column>
            <el-table-column
                prop="f"
                label="币种">
            </el-table-column>
            <el-table-column
                prop="g"
                label="划款金额">
            </el-table-column>
          </el-table>
        </template>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
	export default {
		// 基础划款,保证金划款 详情页面 -> 外卡划款 划款明细
		name: "TransferMoneyDetails",
		data() {
			return {
				activeName: "first", // tabsActive
				order: 2105211332340,
				unusual: true, // 是否显示异常划款 (保证金划款无异常)
				thisIssueList: [
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
				], // 本期划款列表
				unusualList: [
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
        ], // 异常单划款以及上期补划
				form: {
					a: null,
					b: null,
					remarks: null,
				},
				totalList: [
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
        ], // 合计列表
				normalBusinessList: [
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
				], // 正常交易划款记录
				unusualBusinessList: [
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
					{ a: 56, b: "USD", c: "500.00", d: "-5.00", e: "5.00", f: "495.00", g: "USD", h: "500.00" },
				], // 异常交易划款记录
			}
		},
		methods: {
			handleClick(tab, event) {
				// 切换时回调
			},
		},
	}
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