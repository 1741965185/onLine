<template>
  <div>
    <div class="top-title-bar">
      <h3 class="page-title">货物跟踪记录</h3>
      <el-button class="go-back-btn">
        <svg-icon icon-class="arrow-left"/>
        <span >返回</span>
      </el-button>
    </div>
    <div class="border pd25 detail-info-wrapper">
      
      <el-row type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">订单信息</el-col>
        <el-col :span="11">物流信息</el-col>
        <el-button type="primary" :span="11">保存</el-button>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <p><label>流水订单号</label><span>SN3PAY2105211728557203</span></p>
          <p><label>商户号</label><span>152</span></p>
          <p><label>商户号订单号</label><span>210521172855231140</span></p>
          <p><label>收货人姓名</label><span>Vinicius&nbsp;Robinson</span></p>
          <p><label>持卡人姓名</label><span>Vinicius&nbsp;Robinson</span></p>
          <p><label>持卡人邮箱</label><span>&nbsp;v-robinso&#64;me.com</span></p>
          <p><label>货物跟踪状态</label>
            <span>
              <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button  
              style="display:flex;justify-content:space-between;width:180px;">
                   上传
                  <i class="el-icon-arrow-down"></i>
              </el-button>
              </el-upload>
            </span>
          </p>
          <p><label>交易时间</label><span>2021-05-21&nbsp;17:28:58.48</span></p>
          <p><label>账单地址</label><span>美国|US&nbsp;&nbsp;75.76.118.25075.76.118.250</span></p>
          <p><label>支付地址</label><span>美国|US&nbsp;&nbsp;75.76.118.25075.76.118.250</span></p>
          <p><label>妥投备注</label>
            <span>
              <el-input
              style="width:180px"
              type="textarea"
              :rows="1"
              placeholder="备注"
              v-model="textarea">
              </el-input>
            </span>
          </p>
        </el-col>
        <el-col :span="11">
          <p><label>货物名称</label><span> Vinicius&nbsp;Robinson</span></p>
          <p><label>货物数量</label><span>1</span></p>
          <p><label>货物单价</label><span>USD&nbsp;&nbsp;17.5</span></p>
          <p><label>总计</label><span> USD.&nbsp;22.73</span></p>
          <p><label>收货地址</label><span>6&nbsp;Avery&nbsp;Court&nbsp;Saint&nbsp;Petersburg&nbsp;&nbsp;&nbsp;FL&nbsp;US</span></p>
          <p><label>货运公司</label><span>China&nbsp;Post</span></p>
          <p><label>跟踪好</label><span>LZ887572859CN</span></p>
          <p><label>到货时间</label><span>2021-05-21&nbsp;17:28:58.48</span></p>
          <p><label>状态</label><span>已发货</span></p>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

	export default {
		name: "CheckLogistics",
		data() {
			return {
				textarea: "",
				
			}
		},
	}
</script>

<style scoped lang="less">
  .border {
    border-radius: 4px;
  }

  .pd25 {
    padding: 25px;
  }

  .go-back-btn {
    font-size: 13px;
    font-weight: 500;
    color: #526484;
    width: 90px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #DBDFEA;
    display: flex;
    align-items: center;
    justify-content: center;

    em {
      font-size: 14px;
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .go-back-btn:hover, .go-back-btn:focus {
    color: #000;
    /*background: #526484;*/
    /*border-color: #000;*/
    font-weight: 700;
  }

  .top-title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
  }

  .detail-info-wrapper {

    .detail-info-title {
      font-size: 20px;
      font-weight: 600;
      color: #364A63;
    }

    p {
      margin-bottom: 30px;
    }

    label {
      width: 120px;
      display: inline-block;
      font-size: 14px;
      font-weight: 500;
      color: #8094AE;
    }

    span {
      width: calc(100% - 120px);
      display: inline-block;
      text-align: right;
      font-size: 14px;
      font-weight: 600;
      color: #526484;
      word-break: break-word;
      line-height: 16px;
    }

    .el-divider--horizontal {
      margin: 15px 0;
      background-color: #DBDFEA;
    }
  }

  .card-email-ip {
    padding-left: 25px;
    line-height: 38px;
    margin-bottom: 10px;

    li {
      float: left;
      margin-right: 95px;
      position: relative;

      p {
        font-size: 14px;
        font-weight: 500;
        color: #526484;
        text-align: center;

        a {
          color: #6576FF;
        }
      }
    }

    li:after {
      content: '';
      width: 1px;
      height: 49px;
      background-color: #DBDFEA;
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: -47px;
      margin: auto 0;
    }

    li:last-child:after {
      content: none;
    }
  }

  /deep/ .el-collapse, /deep/ .el-collapse-item__header, /deep/ .el-collapse-item__wrap {
    border: none;
  }

  /deep/ .el-collapse {
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #364A63;
      line-height: 18px;
    }

    .el-collapse-item__header {
      font-size: 20px;
      font-weight: 600;
      color: #364A63;
      line-height: 26px;

      .el-collapse-item__arrow {
        margin: 0 8px 0 4px;
      }

      &:focus:not(:hover) {
        color: #364A63;
      }
    }
  }

  .c-7F8DFF {
    font-size: 24px;
    font-weight: bold;
    color: #7F8DFF;
  }


</style>