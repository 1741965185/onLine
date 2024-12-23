<template xmlns:el-col="http://www.w3.org/1999/html">
	<div class="app-container">
		<div class="new-one-container" v-show="ismd5">
			<h4 class="private_title_class">
			PrivateKey
				<el-link type="primary" @click="theKey = true">{{$t('configure.view')}}</el-link>
			</h4>
		</div>
		<div class="new-one-container" v-show="!ismd5">
			<h4 class="private_title_class">
			<el-row>
				<el-col :span="12">
					User Publickey
					<el-link type="primary" @click="theKey = true">{{$t('configure.edit')}}</el-link>
				</el-col>
				<el-col :span="12">
					OnlinePay Publickey
					<el-link type="primary" @click="getRsaPublickey()">{{$t('configure.view')}}</el-link>
				</el-col>
			</el-row>
		</h4>
<!--			<div class="label-wrap">-->
<!--				<div class="label-wrap-row">-->
<!--					<div class="label-wrap-row-left">-->
<!--						<span>{{this.privatekey}}</span>-->
<!--						<div>-->
<!--							<img src="../../assets/images/closeeye.png" v-if ="eye" @click="theKey = true">-->
<!--							<img src="../../assets/images/openeye.png" v-else @click="see()">-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="label-wrap-row-right">-->
<!--						<span>{{this.publicKey}}</span>-->
<!--						<div>-->
<!--							<img src="../../assets/images/closeeye.png" v-if ="eye" @click="theKey = true">-->
<!--							<img src="../../assets/images/openeye.png" v-else @click="see()">-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
		</div>
		<el-tabs v-model="activeName">
			<!-- IP白名单 -->
			<el-tab-pane name="0">
				<span slot="label"><i class="el-icon-truck"></i>{{$t('cashier.IPWhiteList')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
								@changeSize="$refs['order-search-form'].getList(1)"
								class="mr12"
								:limit.sync="form.pageSize"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div class="Flex alignC">
						<el-button class="air-btn-add" type="primary" icon="el-icon-plus" @click="$addIpWhite"></el-button>
					</div>
				</div>

				<!-- IP白名单搜索组件 -->
				<search-form  v-if="activeName == 0"
						ref="order-search-form"
						v-show="showScreen"
						:option="searchOption2"
						:formSearch="form"
						@getSearchForm="getSearchForm($event, 1)"
				></search-form>
				<el-table
						v-loading="loading"
						ref="multipleTable"
						:data="IPWhiteListData"
						tooltip-effect="dark"
						style="width: 100%"
						@selection-change="handleSelectionChange"
				>
					<el-table-column prop="merNo" min-width="140" :label="$t('cashier.totalMerchantID')">
					</el-table-column>
					<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->
					<el-table-column prop="ip" min-width="150px" :label="'IP'"> </el-table-column>
					<el-table-column prop="status" min-width="80px" :label="$t('cashier.auditStatus')">
          <template slot-scope="scope">
              {{formatIpStatus(scope.row.status)}}
          </template>
					</el-table-column>
					<el-table-column prop="createTime" min-width="170px" :label="$t('cashier.createTime')">

					</el-table-column>
					<el-table-column :label="$t('cashier.operate')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateIpScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- 通道支付网址 -->
			<el-tab-pane name="1">
				<span slot="label"><i class="el-icon-truck"></i>{{$t('cashier.channelPaymentWebsite')}}</span>
				<div class="Flex spaceB alignC card-tools-toggle">
					<div class="Flex alignC">
						<page-size-select
							@changeSize="$refs['order-search-form'].getList(1)"
							class="mr12"
							:limit.sync="form.pageSize"
						></page-size-select>
						<div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
							<svg-icon icon-class="select" />
						</div>
					</div>
					<div class="Flex alignC">
						<add-template href='https://airclick-oss.oss-cn-hongkong.aliyuncs.com/execl/merLogistics-en%20.xlsx'/>
						<file-upload class="mr12" :isShowTip="false" :fileUrl="'/channelpayable/paysiteExcel'"> </file-upload>
						<el-button class="air-btn-add" type="primary" icon="el-icon-plus" @click="$addZFURL"></el-button>
					</div>
				</div>

				<!-- 通道支付网址搜索组件 -->
				<search-form v-if="activeName == 1"
					ref="order-search-form"
					v-show="showScreen"
					:option="searchOption"
					:formSearch="form"
					@getSearchForm="getSearchForm($event, 1)"
				></search-form>
				<el-table
					v-loading="loading"
					ref="multipleTable"
					:data="listData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column prop="merNo" min-width="140" :label="$t('cashier.totalMerchantID')">
						<template slot-scope="scope">
							{{ scope.row.subMerNo == 0 ? scope.row.merNo : scope.row.subMerNo }}
						</template>
					</el-table-column>
<!--					<el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->
					<el-table-column prop="domain" min-width="150px" :label="$t('cashier.website')"> </el-table-column>
					<el-table-column min-width="80px" :label="$t('cashier.auditStatus')">
						<template slot-scope="scope">
							<div>
								{{ scope.row.audit_status | formstatus }}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="reason" min-width="60px" :label="$t('cashier.reason')"> </el-table-column>
					<el-table-column min-width="170px" :label="$t('cashier.modificationTime')">
						<template slot-scope="scope">
							<div>
								{{ dayjs(scope.row.modify_time).format("YYYY-MM-DD HH:mm:ss") }}
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('cashier.operate')" fixed="right">
						<template slot-scope="scope">
							<circular-dropdown :list="operationList" :row="scope.row" @command="operateScope"></circular-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- 分页器 -->
			<pagination
				:total="total"
				:page.sync="form.pageNum"
				:limit.sync="form.pageSize"
				@pagination="$refs['order-search-form'].getList()"
			>
			</pagination>
		</el-tabs>

		<!-- 新增支付网址 -->
		<el-dialog :title="$t('cashier.addPaymentWebsite')" :visible.sync="addZFURL" width="500px">
			<el-form ref="xzzfwz" label-width="120px" label-position="left" :model="addZFURLForm">
				<el-form-item :label="$t('cashier.totalMerchantID')">
					<el-select v-model="websiteForm.merNo">
						<el-option v-for="(item, index) in merList" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cashier.paymentWebsite')" prop="domain">
					<el-input type="text" v-model="addZFURLForm.domain"></el-input>
				</el-form-item>
				<el-form-item :label="$t('cashier.paymentWebsite2')" prop="domain2">
					<el-input type="text" v-model="addZFURLForm.domain2"></el-input>
				</el-form-item>
				<el-form-item :label="$t('cashier.paymentWebsite3')" prop="domain3">
					<el-input type="text" v-model="addZFURLForm.domain3"></el-input>
				</el-form-item>
				<el-form-item :label="$t('cashier.paymentWebsite4')" prop="domain4">
					<el-input type="text" v-model="addZFURLForm.domain4"></el-input>
				</el-form-item>
				<el-form-item :label="$t('cashier.paymentWebsite5')" prop="domain5">
					<el-input type="text" v-model="addZFURLForm.domain5"></el-input>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addZFURL = false">{{$t('cashier.cancellation1')}}</el-button>
					<el-button type="primary" @click="savePlayURLs" class="btnbg">{{$t('cashier.submit')}}</el-button>
				</span>
			</template>
		</el-dialog>

    <!--新增ip白名单-->
    <el-dialog :title="$t('cashier.addIPWhite')" :visible.sync="addIP" width="500px">
      <el-form label-width="50px" label-position="left" :model="addIPForm" :rules="IPRules" ref="addIPForm">
        <el-form-item :label="$t('cashier.inputIP')" :prop="'ip'" :rules="[{ required: true, message: $t('cashier.pleaseInputIP'), trigger: 'blur' }]">
          <el-input type="text" v-model="addIPForm.ip"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="addIP = false">{{$t('cashier.cancellation1')}}</el-button>
					<el-button type="primary" @click="submitIpForm" class="btnbg">{{$t('cashier.submit')}}</el-button>
				</span>
      </template>
    </el-dialog>



		<el-dialog
			:title="$t('cashier.SecurityVerification')"
			:visible.sync="theKey"
			width="470px"
			center
			:before-close="cancleseekey"
			class="anquan"
		>

				<div class="form-item">
					<div class="text-email">{{ $t('login.emailVerificationCode') }}</div>
					<div class="input-wrapper">
						<el-input v-model="verify" :placeholder="$t('login.please_input_password')" class="input-with-code" />
						<el-link class="code-button" :disabled="isCountdownActive" @click="sendVerify()" type="primary">
							<span class="code-text">{{ countdownSeconds ? `${countdownSeconds}s` : $t('login.sendVerificationCode') }}</span>
						</el-link>
					</div>
				</div>
<!--			<div class="form-item">-->
<!--				<div class="form-label">谷歌验证码</div>-->
<!--				<div class="form-input">-->
<!--					<el-input v-model="googleCode" placeholder="请输入谷歌验证码"></el-input>-->
<!--				</div>-->
<!--			</div>-->
			<div class="dialog-footer">
				<el-button @click="cancleseekey()">取 消</el-button>
				<el-button type="primary" @click="see(verify)">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog
			:title="isPublicKeyTitle"
			:visible.sync="isPublicKey"
			width="470px"
			center
			class="anquan"
		>

			<div class="form-item">
				<div class="input-wrapper">
					<el-input type="textarea" :disabled="inputKeyDisable" size="small" rows="6" v-model="privatekey" placeholder="-----BEGIN PUBLIC KEY-----
					......
					-----END PUBLIC KEY-----" class="input-with-code" />
				</div>
			</div>
			<div class="dialog-footer">
				<el-button v-show="inputKeyDisable" @click="inputKeyDisable=false">{{$t('cashier.edit')}}</el-button>
				<el-button v-show="!inputKeyDisable" type="primary" @click="updateRsaMe()">{{$t('cashier.submit')}}</el-button>
			</div>
		</el-dialog>


		<el-dialog
			:title="$t('cashier.publicKey')"
			:visible.sync="isPublicKey1"
			width="470px"
			center
			class="anquan"
		>

			<div class="form-item">
				<div class="input-wrapper">
					<el-input type="textarea" disabled="false" size="small" rows="6" v-model="privatekey1" placeholder="" class="input-with-code" />
				</div>
			</div>
		</el-dialog>


	</div>
</template>

<script>
import pageSizeSelect from "@/components/PageSizeSelect";
import circularDropdown from "@/components/CircularDropdown";
import pagination from "@/components/Pagination";
import {
	getListData,
	getIPListData,
	deleteIP,
	getDeletePayURL,
	getAddPayURL,
	saveIP,
	getSubmitPayURL,
	getMerchantSon,
	getPrivateKey,
	getPrivateKeyVerify,
	getPublicKey, updateRsa,
} from "@/api/userInfo";
import { mapGetters } from "vuex";
import FileUpload from "@/components/FileUpload";
import SearchForm from "@/components/SearchForm";
import AddTemplate from '@/components/AddTemplate';
import i18n from "@/i18n";

var SHZT = [
	{ label: i18n.t('cashier.allAll'), value: null },
	{ label: i18n.t('cashier.notSubmitted'), value: "0" },
	{ label: i18n.t('cashier.unaudited'), value: "1" },
	{ label: i18n.t('cashier.Approved'), value: "2" },
	{ label: i18n.t('cashier.reviewFailed'), value: "3" },
];
export default {
	name: "Cashier",
	components: {
		pageSizeSelect,
		pagination,
		circularDropdown,
		FileUpload,
		SearchForm,
		AddTemplate
	},
	data() {
		var checkUrl = (rules, value, callback) => {
			if (
				value.includes("sslpayment") ||
				value.includes("makepay") ||
				value.includes("globefastpay") ||
				value.includes("onlinecdservice") ||
				value.includes("pay") ||
				value.includes("creditcard") ||
				value.includes("chicagofire") ||
				value.includes("torontofc") ||
				value.includes("newYorkcityfc") ||
				value.includes("atlantaunitedfc") ||
				value.includes("orlandocitysc") ||
				value.includes("columbuscrewsc") ||
				value.includes("newyorkredbulls") ||
				value.includes("philadelphiaunion") ||
				value.includes("montreallmpact") ||
				value.includes("newenglandrevolution") ||
				value.includes("dcunited") ||
				value.includes("sportingkansascity") ||
				value.includes("fcdallas") ||
				value.includes("houstondynamo") ||
				value.includes("portlandtimbers") ||
				value.includes("sanjoseearthquakes") ||
				value.includes("vancouverwhitecapsfc") ||
				value.includes("seattlesoundersfc") ||
				value.includes("lagalaxy") ||
				value.includes("realsaltLake") ||
				value.includes("coloradorapids") ||
				value.includes("nnesotaunitedfc")
			) {
				return callback(new Error(this.$t('cashier.bufuhe')));
			} else if (value.includes("http://") || value.includes("https://")) {
        return callback(new Error(this.$t('cashier.gscw')));
      }else {
				return callback();
			}
		};
		return {
			activeName:0,
			isPublicKeyTitle:'',
			isPublicKey1:false,
			privatekey1:'',
			ismd5:true,
			verify:"",
			eye:true,
			// 用户名字
			modifier: "",
			// 支付网址  数据
			listData: [],
			showScreen: false,
			loading: false,
      IPWhiteListData:[],
			// 审核状态 默认值 所有
			orderStatus: null,
			form: {
				pageNum: 1,
				pageSize: 15,
			},
			total: 0, // 总条数
			operationList: [
				// { label:this.$t('cashier.tjsq'), icon: "jf", value: "1" },
				{ label: this.$t('cashier.delete'), icon: "dj", value: "2" },
			],
			countdownSeconds:0,
			// 添加支付网址的 弹窗
			addZFURL: false,
      //添加ip白名单的弹窗
      addIP: false,
			//查看密钥安全验证的弹窗
			theKey:false,
			isPublicKey:false,
			// 添加支付网址的 表单
			addZFURLForm: {
				domain: "",
				domain2: "",
				domain3: "",
				domain4: "",
				domain5: "",
			},
			inputKeyDisable:false,
      //添加IP白名单的表单
      addIPForm:{
        ip:''
      },
      IPRules:{
        ip:[{ required: true, message: this.$t('cashier.inputIP'), trigger: 'blur' }]
      },
			// rules: {
			// 	domain: [{ validator: checkUrl, trigger: "blur" }],
			// 	domain2: [{ validator: checkUrl, trigger: "blur" }],
			// 	domain3: [{ validator: checkUrl, trigger: "blur" }],
			// 	domain4: [{ validator: checkUrl, trigger: "blur" }],
			// 	domain5: [{ validator: checkUrl, trigger: "blur" }],
			// },
			websiteForm: {},
			merList: [],
			privatekey:'',
			publicKey: "123231221",
			seeKey: false,
			// 通道支付网址搜索
			searchOption: {
				column: [
					{
						label: this.$t('cashier.totalMerchantID'),
						prop: "merNo",
						type: "select",
						dicData:this.$store.state.order.userMerNo , //数据传输
						Vshow: this.$store.state.user.merType === 0,
					},
					{
						label: this.$t('cashier.website'),
						prop: "domain",
						type: "input",
					},
					{
						label: this.$t('cashier.auditStatus'),
						prop: "audit_status",
						type: "select",
						dicData: SHZT,
					},
				],
			},
      //IP白名单搜索
      searchOption2: {
        column: [
          {
            label: 'IP',
            prop: "ip",
            type: "input",
         },
        ]
      }
		};
	},
	watch:{
		activeName: function(newVal, oldVal) {
			// 每次切换tabs 初始化状态
			this.form = {
				pageNum: 1,
				pageSize: 15
			};
			this.total = 0;
			this.loading = false;
		},
	},
	computed: {
		...mapGetters(["merType"]),
		isCountdownActive() {
			return this.countdownSeconds > 0
		}
	},

	filters: {
		formstatus(val) {
			switch (val) {
				case null:
					return i18n.t('cashier.notSubmitted');
				case 0:
					return i18n.t('cashier.notSubmitted');
				case 1:
					return i18n.t('cashier.unaudited');
				case 2:
					return i18n.t('cashier.Approved');
				case 3:
					return i18n.t('cashier.reviewFailed');
				default:
					i18n.t('cashier.notSubmitted');
			}
		},
	},
	created(){
		console.log(sessionStorage.getItem('encryption'));
		this.ismd5 = Number(sessionStorage.getItem('encryption')) === 0;
	},
	methods: {
		async $addZFURL() {
			const res = await getMerchantSon();

			if (res.status === 200) this.merList = res.data;
			this.addZFURL = true;
		},


    async $addIpWhite() {
      this.addIP = true
    },
		updateRsaMe(){
			updateRsa({key:this.privatekey}).then(res=>{
				if (res.status === 200){
					this.$message.success(this.$t('cashier.submittedSuccessfully'))
					this.isPublicKey  =  false
				}else {
					this.$message.error(res.data)
				}
			})
		},

		getRsaPublickey(){
			getPublicKey().then(res=>{
					if (res.status === 200){
						this.privatekey1 = res.data
						this.isPublicKey1 = true;
					}else {
						this.$message.error(res.data)
					}
			})
		},
		see(verify){
			getPrivateKey(verify).then(res=>{
				if (res.status === 200){
					this.theKey = false
					this.privatekey = res.data
					this.isPublicKey = true;
					if(this.ismd5) {
						this.isPublicKeyTitle = this.$t('cashier.privateKey')
					}else{
						this.isPublicKeyTitle = this.$t('cashier.publicKey')
					}
					if(this.privatekey){
						this.inputKeyDisable =true;
					}
					this.eye = false
					this.seeKey =true
					this.verify = ""
				}else {
					this.$message.error(res.data)
				}
			})
		},
		cancleseekey(){
			this.verify = ""
			this.theKey = false
		},

		// 分页请求
		getSearchForm(params) {
			if (this.activeName === "0") {
				this.getIPList(params);
			} else if (this.activeName === "1") {
				this.getList(params);
			}
		},
		// 分页器   按条件查询的   数据
		getList(page) {
			this.loading = true;
			getListData(page).then(res => {
				this.loading = false;
				this.listData = res.data.result.list;
				this.total = res.data.result.total;
			});
		},
    // 分页器   按条件查询的   数据
    getIPList(page) {
      this.loading = true;
      getIPListData(page).then(res => {
        this.loading = false;
        this.IPWhiteListData = res.data.list;
        this.total = res.data.total;
      });
    },
    submitIpForm(){
      this.$refs["addIPForm"].validate((valid) => {
        if (valid) {
          this.saveIPWhite()
        }
      })
    },
    //新增IP白名单
    saveIPWhite(){
      if (this.addIPForm.ip){
        saveIP(this.addIPForm).then(res=>{
          if (res.status === 200){
            this.$message.success(this.$t('cashier.addSuccess'))
            this.addIP = false
            this.getIPList(this.form)
            this.addIPForm = {}
          }else {
            this.$message.error(res.data)
          }
        })
      }else {
        this.$message.error(this.$t('cashier.ipcw'))
      }
    },
		// 新增 添加支付网址
		savePlayURLs() {
			let domain = [];
			for (let key in this.addZFURLForm) {
				if (this.addZFURLForm[key]) {
					domain.push(this.addZFURLForm[key]);
				}
			}
			if (this.websiteForm.merNo) {
				if (domain.length > 0) {
					this.$refs["xzzfwz"].validate(valid => {
						if (valid) {
							getAddPayURL({
								domain,
								merNo: this.websiteForm.merNo,
							}).then(res => {
								this.$refs["order-search-form"].getList();
								if (res.status === 200) {
									this.$message.success(this.$t('cashier.addSuccess'));
								} else {
									this.$message.error(this.$t('cashier.addFail'));
								}
							});
							this.addZFURL = false;
							this.addZFURLForm = {
								domain: "",
								domain2: "",
								domain3: "",
								domain4: "",
								domain5: "",
							};
						}
					});
				} else {
					this.$message.error(this.$t('cashier.zstxygwz'));
				}
			} else {
				this.$message.error(this.$t('cashier.shhbnwk'));
			}
		},
		sendVerify(){
			this.countdownSeconds = 60
			this.startCountdown()
			getPrivateKeyVerify().then(res =>{
				if (res.status == 200){
					this.$message.success(res.data)
				}
			})
		},
		startCountdown() {
			this.countdownTimer = setInterval(() => {
				this.countdownSeconds--
				if (this.countdownSeconds === 0) {
					this.stopCountdown()
				}
			}, 1000)
		},
		stopCountdown() {
			clearInterval(this.countdownTimer)
			this.countdownTimer = null
		},

		changeuserInfo(){

		},
    formatIpStatus(sc) {
		  switch (sc) {
		    case 0:
		      return this.$t('cashier.Approved');
		    case 1:
		      return this.$t('cashier.reviewRefused');
		    case 2:
		      return this.$t('cashier.unaudited');
		    case 3:
		      return this.$t('cashier.close');
		  }
    },
    operateIpScope(params) {
		  if (params.command.label == this.$t('cashier.delete')) {
        this.$confirm(this.$t('cashier.sureToDelete'), this.$t('cashier.tips'), {
          confirmButtonText: this.$t('cashier.yes'),
          cancelButtonText: this.$t('cashier.cancel'),
          type: "warning",
        }).then(()=> {
          deleteIP(
              params.data.id
          ).then(res => {
            this.getIPList(this.form);
            this.$message.success(this.$t('cashier.deleteSuccess'));
          });
        })
      }
    },
		// 当前行的 操作
		operateScope(params) {
			if (params.command.label == this.$t('cashier.tjsq')) {
				if (params.data.audit_status == null || params.data.audit_status == 0) {
					getSubmitPayURL({
						id: params.data.id,
						domain: params.data.domain,
						modifier: this.modifier,
						audit_status: params.data.audit_status,
					}).then(res => {
						if (res == true) {
							this.$message.success(this.$t('cashier.addSuccess'));
							this.$refs["order-search-form"].getList();
						} else {
							this.$message.error(this.$t('cashier.addFail'));
							this.$refs["order-search-form"].getList();
						}
					});
				} else {
					this.$message.warning(this.$t('cashier.qtjwtjdxx'));
				}
			} else if (params.command.label == this.$t('cashier.delete')) {
				//根据 id 移除  数据
				getDeletePayURL({
					id: params.data.id,
				}).then(res => {
					this.$refs["order-search-form"].getList();
					this.$message.success(this.$t('cashier.deleteSuccess'));
				});
			}
		},

		// 勾选table
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
	},
};
</script>

<style scoped lang="less">

/deep/ .anquan .el-dialog__header span{
	font-weight: 500;
	font-size: 24px;
	color: #211F32;
	line-height: 30px;
	text-align: right;
	font-style: normal;
}
/deep/ .anquan .el-dialog__header{
	border-bottom: 0px solid #DBDFEA;
}

.form-item {
	align-items: center;
	padding-left:50px;
	padding-right:50px;
	margin-bottom: 50px;
}
.form-item .text-email{
	margin-bottom: 6px;
}
.form-label {
	width: 100px;
	margin-bottom: 6px;
}
.form-input {
	flex: 1;
	display: flex;
	align-items: center;
}
.dialog-footer {
	text-align: right;
	margin-right:50px;
	padding-left:16px;
}

.input-wrapper {
	position: relative;
}

.code-button {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
}

.ipt_W {
	width: 300px;
}
.label-wrap {
	.label-wrap-row {
		display: flex;
		margin: 0 0 1px 0;

		.label-wrap-row-left {
			display: flex;
			width: 50%;
			align-items: center;
			span {
				display: inline-block;
				margin: 0 6px 0 0;
				font-size: 14px;
				font-weight: 500;
				color: #526484;
			}
		}

		.label-wrap-row-right {
			display: flex;
			width: 50%;
			align-items: center;
			span {
				display: inline-block;
				margin: 0 6px 0 0;
				font-size: 14px;
				font-weight: 500;
				color: #526484;
			}
		}
	}
}

.icon_margin_LR {
	margin: 0 20px;
}

.flex_L_R {
	display: flex;
	justify-content: space-between;
	padding: 10px;
}
.new-one-container {
	padding: 23px 20px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid #DBDFEA;
	margin-bottom:20px;
}

.private_title_class{
	font-weight: 500;
	font-size: 15px;
	color: #526484;
	line-height: 16px;
	text-align: left;
	font-style: normal;
	height:16px;
}
.private_span_icon{
	height:16px;
	display:flex;
	align-content:center;

}
.private_span_icon span{
	padding-right:6px;
}

/deep/ .el-input-group__append, .el-input-group__prepend{
	background-color: #F5F7FA;
	color: #7F8DFF;
	vertical-align: middle;
	display: table-cell;
	position: relative;
	border: 1px solid #DBDFEA;
	border-radius: 4px;
	padding: 0 20px;
	width: 1px;
	white-space: nowrap;
}


@import "../../assets/styles/template";
</style>
