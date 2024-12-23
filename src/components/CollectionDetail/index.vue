<!--没翻译3-->
<template>
  <div class="app-container">
    <div class="top-title-bar">
      <h3 class="page-title">
         {{$t("remittance.remittanceTableInfo")}}
      </h3>
      <el-button class="go-back-btn" @click="$router.go(-1)">
        <svg-icon icon-class="arrow-left"/>
        <span>{{$t('dataDetail.back')}}</span>
      </el-button>
    </div>
    <div class="border pd25 detail-info-wrapper" style="height:500px">
      <el-row type="flex" justify="space-between" class="detail-info-title">
        <el-col :span="11">{{$t('remittance.remittanceTableInfo')}}</el-col>
      </el-row>
      <el-divider></el-divider>
			<div  v-if=" detail.benediciary ===1" >
				<el-row :gutter="20" style="font-size: 14px;line-height: 25px;">
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.type')}}</div>
						<div style="color: #526484;">{{detail.benediciary == 1 ? '企业':'个人'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.qyskmc')}}</div>
						<div style="color: #526484;">{{detail.name|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.registerNo')}}</div>
						<div style="color: #526484;">{{detail.companyCode || "-"}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.registerCurreney')}}</div>
						<div style="color: #526484;">{{detail.country || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.xxdz')}}</div>
						<div style="color: #526484;">{{detail.address|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.remark')}}</div>
						<div style="color: #526484;">{{detail.remark|| '-'}}</div>
					</el-col>
				</el-row>
				<el-row type="flex" justify="space-between" class="detail-info-title" style="margin-top: 50px">
					<el-col :span="11">{{$t('remittance.skzh')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :gutter="20" style="font-size: 14px;line-height: 25px;">
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankCard')}}</div>
						<div style="color: #526484;">{{detail.bankCard|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankName')}}</div>
						<div style="color: #526484;">{{detail.bankName|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankAddress')}}</div>
						<div style="color: #526484;">{{detail.bankAddress || "-"}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.khyhszd')}}</div>
						<div style="color: #526484;">{{detail.bankCountry || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankCode')}}</div>
						<div style="color: #526484;">{{detail.bankCode || '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">Swift</div>
						<div style="color: #526484;">{{detail.swift || '-'}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.payCurrency')}}</div>
						<div style="color: #526484;">{{detail.currency  || '-'}}</div>
					</el-col>
				</el-row>
			</div>


			<div  v-if="detail.benediciary ===2" >
				<el-row :gutter="20" style="font-size: 14px;line-height: 25px;">
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.type')}}</div>
						<div style="color: #526484;">{{detail.benediciary == 1 ? '企业':'个人'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.name')}}</div>
						<div style="color: #526484;">{{detail.name|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.curreney')}}</div>
						<div style="color: #526484;">{{detail.country || "-"}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.province')}}</div>
						<div style="color: #526484;">{{detail.province || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.city')}}</div>
						<div style="color: #526484;">{{detail.city|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.xxdz')}}</div>
						<div style="color: #526484;">{{detail.address|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.remark')}}</div>
						<div style="color: #526484;">{{detail.remark|| '-'}}</div>
					</el-col>
				</el-row>
				<el-row type="flex" justify="space-between" class="detail-info-title" style="margin-top: 50px">
					<el-col :span="11">{{$t('remittance.skzh')}}</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :gutter="20" style="font-size: 14px;line-height: 25px;">
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankCard')}}</div>
						<div style="color: #526484;">{{detail.bankCard|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankName')}}</div>
						<div style="color: #526484;">{{detail.bankName|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankAddress')}}</div>
						<div style="color: #526484;">{{detail.bankAddress || "-"}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.khyhszd')}}</div>
						<div style="color: #526484;">{{detail.bankCountry || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.bankCode')}}</div>
						<div style="color: #526484;">{{detail.bankCode || '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">Swift</div>
						<div style="color: #526484;">{{detail.swift || '-'}}</div>
					</el-col>
					<div  style="height: 70px"></div>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.payCurrency')}}</div>
						<div style="color: #526484;">{{detail.currency  || '-'}}</div>
					</el-col>
				</el-row>
			</div>

			<div  v-if="detail.type === 2">
				<el-row :gutter="20" style="font-size: 14px;line-height: 25px;">
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.name')}}</div>
						<div style="color: #526484;">{{detail.name|| '-'}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.walletAddress')}}</div>
						<div style="color: #526484;">{{detail.bankCard || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.web')}}</div>
						<div style="color: #526484;">{{detail.web || "-"}}</div>
					</el-col>
					<el-col :span="8">
						<div style="color: #8094AE;">{{$t('remittance.remark')}}</div>
						<div style="color: #526484;">{{detail.remark|| '-'}}</div>
					</el-col>
				</el-row>
			</div>
      </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import {getMerbeeficiaryDetail} from "@/api/Settlement";

export default {
  // name: "DetailsList",
  name: "Info",
  components: {
    pagination,
  },
  data() {
    return {
      detailId:'',
      detail:{},
			images:[],
    };
  },

  created() {
    const id = this.$route.params && this.$route.params.id;
    this.detailId = id;
    this.getDetail();
  },
  methods: {
    // 请求订单详情
    getDetail() {
      getMerbeeficiaryDetail({
        id: this.detailId,
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
            this.detail = res.data;
						this.images = this.detail.idCard.split(",")

        }
        }).catch(err => {
      });


    },
  },
};
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
