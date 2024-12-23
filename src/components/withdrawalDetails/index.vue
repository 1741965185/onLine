<template>
	<div class="app-container">
		<div class="top-title-bar">
			 <span class="page-title-text">{{ this.infoForm.tradeNo }}</span>
			<div style="display: flex; flex-direction: row;">
<!--				<el-button v-if="infoForm.status === 1" style="width: 105px; height: 36px; background: #FFFFFF; border-radius: 4px; margin-right: 16px; border: 1px solid #7F8DFF; display: flex; justify-content: center; align-items: center;" @click="handleApprove">-->
<!--    <span style="font-size: 14px; font-family: 'PingFangSC', 'PingFang SC'; font-weight: 500; color: #7F8DFF; line-height: 16px;">-->
<!--        审核通过-->
<!--    </span>-->
<!--				</el-button>-->

				<el-button v-if="infoForm.status === 4 " style="width: 105px; height: 36px; background: #FFFFFF; margin-right: 16px; border-radius: 4px; border: 1px solid #7F8DFF; display: flex; justify-content: center; align-items: center;" @click="handAddInfo">
    <span style="font-size: 14px; font-family: 'PingFangSC', 'PingFang SC'; font-weight: 500; color: #7F8DFF; line-height: 16px;">
        补充资料
    </span>
				</el-button>

				<el-button  class="go-back-btn" @click="$router.go(-1)">
					<svg-icon icon-class="arrow-left" />
					<span>{{$t('dataDetail.back')}}</span>
				</el-button>
			</div>
		</div>
		<div class="border pd25 detail-info-wrapper">
			<el-row type="flex" justify="space-between" class="detail-info-title">
				<el-col :span="11">{{$t('withdrawDetails.tradeTrends')}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="height: 19px"></div>
			<!--订单动态-->
			<div class="block">

				<el-timeline  >
					<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
              size="large"
              hide-timestamp="false"
							:timestamp="activity.time">
						{{activity.time}}&emsp;&ensp;{{activity.log}}
					</el-timeline-item>
				</el-timeline>
			</div>


			<el-row type="flex" justify="space-between" class="detail-info-title">
				<el-col :span="11">{{$t('withdrawDetails.basicInformation')}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="height: 19px"></div>
			<el-row v-if="this.paymentType===0" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.merchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.merNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.type')}}</label>
						<div class="page-eve-value">{{ infoForm.beneficiaryType || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.handlingFee')}}</label>
						<div class="page-eve-value">{{ infoForm.fee || "-" }} {{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.submerchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.subMerNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.withdrawals')}}</label>
						<div class="page-eve-value">{{ infoForm.amount || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.status')}}</label>
<!--						status 1：处理中 2 成功  3 失败'-->
						<div class="page-eve-value">
							{{ infoForm.status === 0 ? $t('sysText.bankProcessing') :infoForm.status === 1 ? $t('sysText.systemProcessing') : infoForm.status === 2 ? $t('withdrawDetails.Success') : infoForm.status === 3 ? $t('withdrawDetails.Failure') :infoForm.status === 4 ? $t('sysText.to_be_added'):infoForm.status === 5 ? $t('sysText.Pending_review') : '-' }}
						</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.amountCredited')}}</label>
						<div class="page-eve-value">{{ infoForm.receivedAmount || "-" }}{{" "+infoForm.receivedCurrency}}</div>
					</div>


				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===1" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.merchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.merNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.type')}}</label>
						<div class="page-eve-value">{{ infoForm.beneficiaryType || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.handlingFee')}}</label>
						<div class="page-eve-value">{{ infoForm.fee || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.submerchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.subMerNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.withdrawals')}}</label>
						<div class="page-eve-value">{{ infoForm.amount || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.status')}}</label>
						<!--						status 1：处理中 2 成功  3 失败'-->
						<div class="page-eve-value">
							{{ infoForm.status === 0 ? $t('sysText.bankProcessing') :infoForm.status === 1 ? $t('sysText.systemProcessing') : infoForm.status === 2 ? $t('withdrawDetails.Success') : infoForm.status === 3 ? $t('withdrawDetails.Failure') :infoForm.status === 4 ? $t('sysText.to_be_added'):infoForm.status === 5 ? $t('sysText.Pending_review') : '-' }}
						</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.amountCredited')}}</label>
						<div class="page-eve-value">{{ infoForm.receivedAmount || "-" }}{{" "+infoForm.receivedCurrency}}</div>
					</div>


				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===2" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.merchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.merNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.type')}}</label>
						<div class="page-eve-value">{{ infoForm.beneficiaryType || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.handlingFee')}}</label>
						<div class="page-eve-value">{{ infoForm.fee || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.submerchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.subMerNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.withdrawals')}}</label>
						<div class="page-eve-value">{{ infoForm.amount || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">状态</label>
						<!--						status 1：处理中 2 成功  3 失败'-->
						<div class="page-eve-value">
							{{ infoForm.status === 0 ? $t('sysText.bankProcessing') :infoForm.status === 1 ? $t('sysText.systemProcessing') : infoForm.status === 2 ? $t('withdrawDetails.Success') : infoForm.status === 3 ? $t('withdrawDetails.Failure') :infoForm.status === 4 ? $t('sysText.to_be_added'):infoForm.status === 5 ? $t('sysText.Pending_review') : '-' }}
						</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.amountCredited')}}</label>
						<div class="page-eve-value">{{ infoForm.receivedAmount || "-" }}{{" "+infoForm.receivedCurrency}}</div>
					</div>


				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===3" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.merchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.merNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.type')}}</label>
						<div class="page-eve-value">{{ infoForm.beneficiaryType || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.handlingFee')}}</label>
						<div class="page-eve-value">{{ infoForm.fee || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.submerchantNo')}}</label>
						<div class="page-eve-value">{{ infoForm.subMerNo || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.withdrawals')}}</label>
						<div class="page-eve-value">{{ infoForm.amount || "-" }}{{" "+infoForm.currency}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.status')}}</label>
						<!--						status 1：处理中 2 成功  3 失败'-->
						<div class="page-eve-value">
							{{ infoForm.status === 0 ? $t('sysText.bankProcessing') :infoForm.status === 1 ? $t('sysText.systemProcessing') : infoForm.status === 2 ? $t('withdrawDetails.Success') : infoForm.status === 3 ? $t('withdrawDetails.Failure') :infoForm.status === 4 ? $t('sysText.to_be_added'):infoForm.status === 5 ? $t('sysText.Pending_review') : '-' }}
						</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.amountCredited')}}</label>
						<div class="page-eve-value">{{ infoForm.receivedAmount || "-" }}{{" "+infoForm.receivedCurrency}}</div>
					</div>


				</el-col>
			</el-row>

			<!--数字货币交易明细-->
			<el-row type="flex" justify="space-between" style="margin-top: 16px" class="detail-info-title">
				<el-col :span="11">{{$t('withdrawDetails.receiptAccount')}}</el-col>
			</el-row>
			<el-divider></el-divider>
			<div style="height: 19px"></div>

			<el-row v-if="this.paymentType===0" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('configure.payee')}}</label>
						<div class="page-eve-value">{{ infoForm.billingFirstName || "-" }}{{ infoForm.billingLastName}}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.city')}}</label>
						<div class="page-eve-value">{{ infoForm.billingCity || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.stateProvince')}}</label>
						<div class="page-eve-value">{{ infoForm.billingState || "-" }}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.country')}}</label>
						<div class="page-eve-value">{{ infoForm.billingCountry || "-" }}</div>
					</div>
				<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.zipCode')}}</label>
						<div class="page-eve-value">{{ infoForm.billingZip || "-" }}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.bankCardNo')}}</label>
						<div class="page-eve-value">{{ infoForm.bankNumber || "-" }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.address')}}</label>
						<div class="page-eve-value">{{ infoForm.billingAddress || "-" }}</div>
					</div>


				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===1" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('configure.payee')}}</label>
						<div class="page-eve-value">{{ infoForm.billingFirstName || "-" }}{{ infoForm.billingLastName}}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.bankCardNo')}}</label>
						<div class="page-eve-value">{{ infoForm.bankNumber || "-" }}</div>
					</div>

				</el-col>
				<el-col :span="7">

					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.receivingBank')}}</label>
						<div class="page-eve-value">{{ infoForm.bankName || "-" }}</div>
					</div>

				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===2" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.internet')}}</label>
						<div class="page-eve-value">TRC20</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.payeeAddress')}}</label>
						<div class="page-eve-value">{{ infoForm.bankNumber || "-" }}</div>
					</div>

				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('configure.payee')}}</label>
						<div class="page-eve-value">{{ infoForm.billingFirstName || "-" }}{{ infoForm.billingLastName }}</div>
					</div>

				</el-col>
			</el-row>
			<el-row v-if="this.paymentType===3" type="flex" justify="space-between">
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('configure.payee')}}</label>
						<div class="page-eve-value">{{ infoForm.billingFirstName || "-" }}{{ infoForm.billingLastName }}</div>
					</div>
					<div class="page-eve-css">
						<label class="page-eve-key">Swift</label>
						<div class="page-eve-value">{{ infoForm.swift || "-" }}</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('withdrawDetails.bankCardNo')}}</label>
						<div class="page-eve-value">{{ infoForm.bankNumber || "-" }}</div>
					</div>

				</el-col>
				<el-col :span="7">

					<div class="page-eve-css">
						<label class="page-eve-key">{{$t('home.Country')}}</label>
						<div class="page-eve-value">{{ infoForm.billingCountry || "-" }}</div>
					</div>

				</el-col>
			</el-row>

			<el-divider></el-divider>
			<div class="page-eve-css">
				<label class="page-eve-key">附件</label>
				<ul class="attachment-list">
					<li v-for="attachment in attachments" :key="attachment.id" class="attachment-item" @click="openAttachment(attachment)">
						{{ attachment.name }}
					</li>
				</ul>
			</div>
			<div style="height: 40px"></div>

		</div>
		<el-dialog title="交易记录信息" :visible.sync="dialogVisible" width="60%">
			<p class="fs20-style-title" v-show="cardOrEamil === 'card'">
				卡号&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-7F8DFF fs20">{{ subtitle }}</span>
			</p>
			<p class="fs20-style-title" v-show="cardOrEamil === 'email'">
				邮箱&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-7F8DFF fs20">{{ subtitle }}</span>
			</p>
			<el-table style="width: 100%" :data="tablelList">
				<el-table-column v-if="cardOrEamil === 'email'" prop="cardnotruncation" min-width="140px" label="卡号">
				</el-table-column>
				<el-table-column v-if="cardOrEamil === 'card'" prop="email" min-width="200px" label="电子邮箱">
				</el-table-column>
				<el-table-column prop="tradeno" min-width="170px" label="流水订单号"></el-table-column>
				<el-table-column prop="ipaddress" min-width="140px" label="IP地址"></el-table-column>
				<el-table-column prop="tel" min-width="140px" label="联系电话"></el-table-column>
				<el-table-column prop="fullname" label="称呼"></el-table-column>
				<el-table-column prop="amount" label="交易金额"></el-table-column>
				<el-table-column label="交易结果">
					<template slot-scope="scope">
						{{ +scope.row.Succeed === 1 ? "成功" : "失败" }}
					</template>
				</el-table-column>
				<el-table-column min-width="160px" label="交易时间">
					<template slot-scope="scope">
						{{ scope.row.TradeDateTime ? dayjs(scope.row.TradeDateTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
					</template>
				</el-table-column>
			</el-table>
			<pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getQueryDeta"></pagination>
		</el-dialog>
		<!--        补充资料-->
		<el-dialog title="补充资料" :visible.sync="addPriceVisible" width="500px" class="custom-dialog">
			<!-- 由于要替换为不可输入的展示框，我们这里使用div来替代el-input -->
			<div style="display: flex; flex-direction: column; align-items: start; margin-bottom: 20px;">
				<!-- 移除留言标题 -->
				<div style="width: 436px; height: 67px; background: #F8F9FC; border-radius: 3px; border: 1px solid #DBDFEA; padding: 10px; overflow: auto;">
                    <span style="font-weight: 500;font-size: 14px;color: #526484;line-height: 16px;
text-align: left;
font-style: normal;">
                       {{this.priceMap.remark}}
                    </span>
				</div>
			</div>

			<!-- 添加上传按钮 -->
			<div style="margin-bottom: 12px;">
				<label style="font-size: 14px; color: #8094AE;">附件</label>
			</div>

			<!-- 文件上传部分 -->
			<div>
				<el-upload
					action= "http://192.168.3.23:8180/merchant/file/upload"
					:http-request="file => handleAvatarSuccess(file, fileList1)"
					:headers=headers
					:file-list="fileList1"
					:auto-upload="true"
					:before-upload="beforeUpload"
					:on-preview="handlePreview"
					:on-change="handleChange(1)"
					:on-remove="handleRemove(1)"
				>

					<el-button slot="trigger"  type="primary">点击上传</el-button>
				</el-upload>
			</div>

			<!-- 文件列表展示部分 -->
			<!--            <div>-->
			<!--                <ul>-->
			<!--                    <li v-for="file in fileList" :key="file.name">-->
			<!--                        {{ file.name }}-->
			<!--                    </li>-->
			<!--                </ul>-->
			<!--            </div>-->

			<div slot="footer" class="dialog-footer">
				<el-button @click="addPriceVisible = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="addTraderPrice">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>
import pagination from "@/components/Pagination/index.vue";
import {getWithdrawDetail, queryDd, queryDeta,getWithdrawDetailDynamic} from "@/api/business";
import {updateWithdraw} from "@/api/Settlement";
import { addInformation, upload } from "@/api/certification";

export default {
	name: "WithdrawalDetails",
	components: {
		pagination,
	},
	data() {
		return {
			activeNames: ["1"],
			infoForm: {}, // 表单数据
			tradeno: undefined, //
			paymentType: 1, //
			listHistory: [], // 历史变更列表
			dialogVisible: false, // card email 弹窗
			addPriceVisible: false, // card email 弹窗
			loading: false, // table loading状态

			tablelList: [], // 卡号,邮箱交易记录信息
			cardOrEamil: undefined, // 初始化弹窗内容 卡号还是email
			// 分页data
			pageNum: 1,
			pageSize: 15,
			total: 0,
			priceMap: {
				remark:'',
				imageUrl:'',
				id:'',

			},
			fileList1: [], // 这里存储已上传文件的信息
			subtitle: undefined,
			cardAndEamil: undefined,
			activities: [],
			attachments: [],
			headers: { Authorization: sessionStorage.getItem("JWT"),
			},
		};
	},
	created() {
		const tradeno = this.$route.params && this.$route.params.id;
		this.tradeno = tradeno;
		this.getDetail(tradeno);
	},
	watch: {
		cardOrEamil: function() {
			this.pageNum = 1;
		},
	},
	methods: {
		// 请求订单详情
		getDetail(id) {
			getWithdrawDetail({ id }).then(result => {

				this.infoForm = result.data;
				this.attachments=result.data.imageUrl.split(',').map(attachment => {
					const [name, url] = attachment.split(':@');
					return { name, url };
				});
				console.info(result.data)
        getWithdrawDetailDynamic({ tradeNo:this.infoForm.tradeNo }).then(result => {
          console.log(result)
          this.activities = result.data;
        });

				// isPayout 0:转账给自己 1:转账给他人

				// beneficiaryType 公司 个人
				// paymentType 个人 1公司+2usdt
          if (this.infoForm.beneficiaryType === this.$t("withdrawDetails.individual")) {
					// 提现类型为个人时的处理逻辑
					this.paymentType=0
					// ...
				}
				if (this.infoForm.beneficiaryType === this.$t("withdrawDetails.company")) {

					// ...
					// 判断是否使用数字货币收款
					if (this.infoForm.bankName.startsWith('TRC20')) {
						this.paymentType=2

					}else{
						if (this.infoForm.isPayout==='0') {
							this.paymentType=1
						}else {
							this.paymentType=3
						}
					}
				}

				console.info(this.paymentType)
			});
		},
		openAttachment(attachment) {
			// 在这里处理打开附件的逻辑，比如根据附件ID获取内容并展示到页面上
			console.log('打开附件:', attachment.name);

			// 示例逻辑：模拟打开附件的操作
			if (attachment.url) {
				window.open(attachment.url); // 在新标签页中打开附件链接
			} else {
				console.log('附件链接不存在');
			}
		},
		handleAvatarSuccess(file, fileList, targetArray){
			console.info(fileList);
			console.info('1');
			console.info(targetArray);
			const formData = new FormData();
			formData.append('file', file.file); // 将文件对象添加到 FormData 中
			formData.append("type", "certification");

			upload(
				formData,
			).then(res => {
				if (res.status === 200) {
					// 遍历 fileList，将每个文件的名称和URL加入到数组中
					if (Array.isArray(fileList)) {
						fileList.forEach(item => {
							console.info(item.name);
							console.info(res.data.fileName);
							if (item.name === res.data.fileName) {
								item.url = res.data.url; // 将接口返回的url赋给匹配项的url属性
								item.name = res.data.fileName; // 将接口返回的url赋给匹配项的url属性
								item.imageUrl=res.data.fileName+':@'+res.data.url;
							}
						});
					}
				}
				console.info(this.fileList);
			}).catch(err => {

				console.error(err);
			});
		},

		handleApprove() {
			updateWithdraw({id: this.$route.params.id, status: 2}).then(res=>{
				console.log(res);
				if (res.status === 200) {
					this.$message.success("成功");
					this.getDetail(this.$route.params.id)
				}
			})
			// 处理审核通过的逻辑
		},
		handAddInfo() {
			this.addPriceVisible = true;
			this.priceMap.remark=this.infoForm.remark;
			this.priceMap.id=this.infoForm.id;
		},
		async addTraderPrice() {
			this.loading = true;
			// 提醒填写留言
			if ( this.fileList1.length === 0){
				this.$message.error('请上传附件');
				this.loading = false;

				return ;
			}else {
				this.fileList1.forEach(item => {

					this.priceMap.imageUrl += item.name +':@' + item.url +',';
				});
			}

			await addInformation(this.priceMap)
				.then(res => {
					if (res.status === 200) {
						this.$message.success(res.msg);
						this.addPriceVisible = false; // 关闭弹窗
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch(err => {
					console.error(err);
					this.loading = false;

				}).finally(() => {         // 无论成功或失败都将执行
					this.loading = false;
				});
			const tradeno = this.$route.params && this.$route.params.id;
			this.tradeno = tradeno;
			this.getDetail(tradeno);

		},

		handleReject() {
			// 处理审核拒绝的逻辑
			updateWithdraw({id: this.$route.params.id, status: 3}).then(res=>{
				console.log(res);
				if (res.status === 200) {
					this.$message.success("成功");
					this.getDetail(this.$route.params.id)

				}
			})
		},
		// 邮件和卡号查询详情
		emailAndCard(params) {
			if (params.email) {
				this.cardOrEamil = "email";
			} else {
				this.cardOrEamil = "card";
			}
			this.cardAndEamil = params;
			this.getQueryDeta();
		},
		handleChange(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		handleRemove(uploadId) {
			return (file, fileList) => {
				// 根据 uploadId 区分不同的上传组件
				this[`fileList${uploadId}`] = fileList;
			};
		},
		handlePreview(file) {
			// 预览图片

		},
		beforeUpload(file) {

		},

		getQueryDeta() {
			queryDeta({ ...this.cardAndEamil, pageNum: this.pageNum, pageSize: this.pageSize }).then(result => {
				if (this.cardOrEamil === "email") {
					this.subtitle = this.infoForm.email;
				} else {
					this.subtitle = this.infoForm._cardnotruncation;
				}
				this.tablelList = result.list;
				this.total = result.total;
				this.dialogVisible = true;
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

.clearfix {
	overflow: hidden;
}
.page-title-text {
	font-size: 28px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	color: #364A63;
	line-height: 28px;
}
.page-eve-css {
	display: flex;
	flex-direction: column;
}
.page-eve-key {
	//width: 42px;
	height: 20px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	color: #8094AE;
	line-height: 20px;
}
.page-eve-value {
	//width: 59px;
	height: 20px;
	font-size: 14px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	color: #526484;
	line-height: 20px;

	margin-bottom: 24px;
}
.attachment-list {
	list-style-type: none;
	padding: 0;
}

.attachment-item {
	margin: 10px 0;
	color: #0000EE;
	text-decoration: underline;
	cursor: pointer;
}

.attachment-item:hover {
	color: #551A8B;
}
</style>
<style scoped>
.custom-dialog /deep/ .el-dialog__footer {
	border-top: none ;
}
</style>