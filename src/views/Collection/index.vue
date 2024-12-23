<template>
  <div class="app-container">
    <img class="element " src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />
	    <h2 class="page-title t-c ">{{$t('remittance.addRemittance')}}</h2>

			<div class="custom-form">
				<el-button class="w223 button-border-radius"  :class="buttonqh === 3 ? 'selected' : ''"   style="text-align: left;" @click="selectButton(3)">
							 <img height="30px" src="/payWays/bankTransfer.png" class="mr10" />
							 <span>Bank account</span>
						</el-button>
				<el-button class="w223 button-border-radius" :class="buttonqh === 1 ? 'selected' : ''" style="text-align: left;" @click="selectButton(1)">
					<img height="30px" src="/payWays/card.png" class="mr10" />
					<span >Card</span>
				</el-button>
				<el-button class="w223 button-border-radius"  :class="buttonqh === 4 ? 'selected' : ''"   style="text-align: left;" @click="selectButton(4)">
					<img height="30px" src="/payWays/PIX.png" class="mr10" />
					<span>PIX</span>
				</el-button>
				<el-button class="w223 button-border-radius" :class="buttonqh === 5 ? 'selected' : ''" style="text-align: left;" @click="selectButton(5)">
					<img height="30px" src="/payWays/PER.png"  class="mr10"/>
					<span >PER transfer</span>
				</el-button>

			</div>
		<div class="custom-form1">
			<el-button class="w223 button-border-radius"  :class="buttonqh === 6 ? 'selected' : ''"   style="text-align: left;" @click="selectButton(6)">
				<img height="30px" src="/payWays/SPEI.png	"  class="mr10"/>
				<span>SPEI</span>
			</el-button>
			<el-button class="w223 button-border-radius" :class="buttonqh ===2 ? 'selected' : ''" style="text-align: left;" @click="selectButton(2)">
				<img height="30px" src="../../assets/images/sz.png"  class="mr10"/>
				<span >Crypto</span>
			</el-button>
		</div>

		<div v-show="buttonqh===3" class="border pd25 detail-info-wrapper" style="width: 942px;margin: auto">
			<div v-show="form.benediciary===1">
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.type")}}</span>
							<el-select v-model="form.benediciary" >
								<el-option :label="$t('remittance.company')" :value='1' ></el-option>
								<el-option :label="$t('remittance.individual')" :value='2' ></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.qyskmc")}}</span>
							<el-input v-model="form.name"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr10 w100px">
								<span>{{$t("remittance.phoneCode")}}</span>
								<el-select v-model="phomeCode"  placeholder="">
									<el-option
										v-for="item in countryCodes"
										:key="item"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="w100">
							<span>{{$t("remittance.phoneNumber")}}</span>
							<el-input v-model="phoneNum" placeholder="123456"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.registerCurreney")}}</span>
							<el-select v-model="form.country" filterable placeholder="">
								<el-option
									v-for="item in countryList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.xxdz")}}</span>
							<el-input v-model="form.address"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.registerNo")}}</span>
							<el-input v-model="form.companyCode"></el-input>
						</div>
					</el-col>
					<el-col :span="24">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>

				<div style="font-size: 20px" class="mt32">{{$t("remittance.skzh")}}</div>
				<el-row :gutter="20" class="mt10 content-way1" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankCard")}}</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>Swift</span>
							<el-input v-model="form.swift"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankAddress")}}</span>
							<el-input v-model="form.bankAddress"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.khyhszd')}}</span>
							<el-select v-model="form.bankCountry" filterable placeholder="">
								<el-option
									v-for="item in countryList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankName")}}</span>
							<el-input v-model="form.bankName"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.bankCode')}}</span>
							<el-input v-model="form.bankCode"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" multiple placeholder="请选择">
								<el-option
									v-for="item in currencyList1"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
			<div v-show="form.benediciary===2">
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.type")}}</span>
							<el-select v-model="form.benediciary" >
								<el-option :label="$t('remittance.company')" :value='1' ></el-option>
								<el-option :label="$t('remittance.individual')" :value='2' ></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr20">
								<span>{{$t("remittance.Lastname")}}</span>
								<el-input v-model="form.lastName"></el-input>
							</div>
							<div>
								<span>{{$t("remittance.name")}}</span>
								<el-input v-model="form.name"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr10 w100px">
								<span>{{$t("remittance.phoneCode")}}</span>
								<el-select v-model="phomeCode"  placeholder="">
									<el-option
										v-for="item in countryCodes"
										:key="item"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="w100">
								<span>{{$t("remittance.phoneNumber")}}</span>
								<el-input v-model="form.phoneNum" placeholder="123456"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.curreney")}}</span>
							<el-select v-model="form.country" filterable placeholder="">
								<el-option
									v-for="item in countryList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.xxdz")}}</span>
							<el-input v-model="form.address"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.birthday")}}</span>
							<el-date-picker
								style="width: 100%"
								v-model="form.birthday"
								type="date"
								value-format="yyyy-MM-dd"
								placeholder="选择日期">
							</el-date-picker>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.idType")}}</span>
							<el-select v-model="form.idType" filterable placeholder="">
								<el-option
									v-for="item in idTypeListAccount"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.idNumber")}}</span>
							<el-input v-model="form.idNumber"></el-input>
						</div>
					</el-col>
					<el-col :span="24">
						<div>
							<span>{{$t('remittance.shennfenCard')}}</span>
							<file-upload-picture style="" :fileUrl="'/file/upload?type=image'" @input="updateFileStr"></file-upload-picture>
						</div>
					</el-col>
					<el-col :span="24">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>

				<div style="font-size: 20px" class="mt32">{{$t("remittance.skzh")}}</div>
				<el-row :gutter="20" class="mt10 content-way1" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankCard")}}</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>Swift</span>
							<el-input v-model="form.swift"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankAddress")}}</span>
							<el-input v-model="form.bankAddress"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.khyhszd')}}</span>
							<el-select v-model="form.bankCountry" filterable placeholder="">
								<el-option
									v-for="item in countryList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankName")}}</span>
							<el-input v-model="form.bankName"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.bankCode')}}</span>
							<el-input v-model="form.bankCode"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" multiple placeholder="请选择">
								<el-option
									v-for="item in currencyList1"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
		</div>
		<div v-show="buttonqh===5" class="border pd25 detail-info-wrapper" style="width: 942px;margin: auto">
			<div>
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.type")}}</span>
							<el-select v-model="form.accountType" >
								<el-option :label="$t('remittance.currentAccount')" value='00' ></el-option>
								<el-option :label="$t('remittance.savingsAccount')" value='01' ></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankCard")}}</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankNameBT")}}</span>
							<el-select v-model="form.bankName" filterable placeholder="">
								<el-option
									v-for="item in bankList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>CCI Number</span>
							<el-input v-model="form.bankCode"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.appName")}}</span>
							<el-input v-model="form.app"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.curreney")}}</span>
							<el-select v-model="form.country" filterable placeholder="">
								<el-option
									key="PE"
									label="PE"
									value="PE">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" placeholder="请选择">
								<el-option
									key="PEN"
									label="PEN"
									value="PEN">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr20">
								<span>{{$t("remittance.Lastname")}}</span>
								<el-input v-model="form.lastName"></el-input>
							</div>
							<div>
								<span>{{$t("remittance.name")}}</span>
								<el-input v-model="form.name"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.xxdz")}}</span>
							<el-input v-model="form.address"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.email")}}</span>
							<el-input v-model="form.email"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr10 w100px">
								<span>{{$t("remittance.phoneCode")}}</span>
								<el-select v-model="phomeCode"  placeholder="">
									<el-option
										v-for="item in countryCodes"
										:key="item"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="w100">
								<span>{{$t("remittance.phoneNumber")}}</span>
								<el-input v-model="form.phoneNum" placeholder="123456"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.idType")}}</span>
							<el-select v-model="form.idType" filterable placeholder="">
								<el-option
									v-for="item in idTypeListAccount1"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.idNumber")}}</span>
							<el-input v-model="form.idNumber"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
		</div>
		<div v-show="buttonqh===6" class="border pd25 detail-info-wrapper" style="width: 942px;margin: auto">
			<div>
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.accountNumber")}}</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankNameBT")}}</span>
							<el-select v-model="form.bankName" filterable placeholder="">
								<el-option
									v-for="item in bankList1"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label }}</span>
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr20">
								<span>{{$t("remittance.Lastname")}}</span>
								<el-input v-model="form.lastName"></el-input>
							</div>
							<div>
								<span>{{$t("remittance.name")}}</span>
								<el-input v-model="form.name"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.curreney")}}</span>
							<el-select v-model="form.country" placeholder="">
								<el-option
									key="MX"
									label="MX"
									value="MX">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" placeholder="请选择">
								<el-option
									key="MX"
									label="MX"
									value="MX">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
		</div>
		<div v-show="buttonqh===4" class="border pd25 detail-info-wrapper" style="width: 942px;margin: auto">
			<div>
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div class="Flex">
							<div class="mr20">
								<span>{{$t("remittance.Lastname")}}</span>
								<el-input v-model="form.lastName"></el-input>
							</div>
							<div>
								<span>{{$t("remittance.name")}}</span>
								<el-input v-model="form.name"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>Pix code</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" placeholder="请选择">
								<el-option
									key="BRL"
									label="BRL"
									value="BRL">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
		</div>
		<div v-show="buttonqh===1" class="border pd25 detail-info-wrapper" style="width: 942px;margin: auto">
			<div>
				<div style="font-size: 20px" class="mt5">{{$t("remittance.remittanceTableInfo")}}</div>
				<el-row :gutter="20" class="mt10 content-way" >
					<el-col :span="12">
						<div class="Flex">
							<div class="mr20">
								<span>{{$t("remittance.Lastname")}}</span>
								<el-input v-model="form.lastName"></el-input>
							</div>
							<div>
								<span>{{$t("remittance.name")}}</span>
								<el-input v-model="form.name"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t("remittance.bankCard")}}</span>
							<el-input v-model="form.bankCard"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="Flex">
							<div class="mr10 w100px">
								<span>{{$t("remittance.phoneCode")}}</span>
								<el-select v-model="phomeCode"  placeholder="">
									<el-option
										v-for="item in countryCodes"
										:key="item"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="w100">
								<span>{{$t("remittance.phoneNumber")}}</span>
								<el-input v-model="phoneNum" placeholder="123456"></el-input>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div>
							<span>{{$t('remittance.payCurrency')}}</span>
							<el-select v-model="form.currency" multiple placeholder="请选择">
								<el-option
									v-for="item in currencyList1"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="24">
						<div>
							<span>{{$t('remittance.remark')}}</span>
							<el-input type="textarea" v-model="form.remark"></el-input>
						</div>
					</el-col>
				</el-row>
				<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
			</div>
		</div>
		<div v-show="buttonqh===2" class="border pd25 detail-info-wrapper" style="width: 942px; margin: auto">
			<div style="font-size: 20px" class="mt5">收款人信息</div>
			<el-row :gutter="20" class="mt10 content-way" >
				<el-col :span="12">
					<div>
						<span>{{$t('remittance.remittanceTable')}}</span>
						<el-input  v-model="form.name"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div>
						<span>{{$t('remittance.walletAddress')}}</span>
						<el-input  v-model="form.bankCard"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div>
						<span>{{$t('remittance.web')}}</span>
						<el-input v-model="form.web"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div>
						<span>{{$t('remittance.remark')}}</span>
						<el-input type="textarea" v-model="form.remark"></el-input>
					</div>
				</el-col>
			</el-row>
			<el-button  :loading="loading"  type="primary" class="submit-button" @click="addMerbeneficiay()">{{$t('remittance.submit')}}</el-button>
		</div>
  </div>
</template>

<script>
import { addMerbeneficiary } from "@/api/Settlement";
import FileUploadPicture from "@/components/FileUploadPicture";
import { mapGetters } from "vuex";
import i18n from "@/i18n";

export default {
	components: {
		FileUploadPicture,
	},
  data() {
    return {
      	form: {
					name: '',
					bankCard: '',
					accountType:'',
					web: '',
					country: '',
					swift: '',
					province:'',
					city:'',
					address:'',
					postcode:'',
					type:3,
					bankName:'',
					bankAddress:'',
					bankCode:'',
					companyCode:'',
					benediciary :2,
					bankCountry:'',
					birthday:'',
					currency:'',
					idCard:'',
					remark:'',
					email:'',
					app:'',
      },
			// USD,USDT,HKD,BRL,PHP
			currencyList1:[
				{value:'USD',label:'USD'},
				{value:'HKD',label:'HKD'},
				{value:'BRL',label:'BRL'},
				{value:'PHP',label:'PHP'},
				{value:'MXN',label:'MXN'},
				{value:'PEN',label:'PEN'},
			],

		idTypeListAccount:[
			{ label: i18n.t('remittance.national_id'), value: "national_id" },
			{ label: i18n.t('remittance.driving_license'), value: "driving_license" },
			{ label: i18n.t('remittance.social_security'), value: "social_security" },
			{ label: i18n.t('remittance.tax_id'), value: "tax_id" },
			{ label: i18n.t('remittance.employer_id'), value: "employer_id" },
			{ label: i18n.t('remittance.alien_registration'), value: "alien_registration" },
			{ label: i18n.t('remittance.resident_card'), value: "resident_card" }
			],

			idTypeListAccount1 : [
				{ label: i18n.t('remittance.CC'), value: "00" },
				{ label: i18n.t('remittance.CE'), value: "01" },
				{ label: i18n.t('remittance.RUC'), value: "02" },
				{ label: i18n.t('remittance.PAS'), value: "03" }
			],

			bankList : [
				{ value: '01', label: 'bcp' },
				{ value: '02', label: 'interbank' },
				{ value: '03', label: 'bbva' },
				{ value: '04', label: 'scotiabank' },
				{ value: '05', label: 'Banco de Comercio' },
				{ value: '06', label: 'BanBif (Banco Interamericano de Finanzas)' },
				{ value: '07', label: 'Banco Pichincha' },
				{ value: '08', label: 'Citibank' },
				{ value: '09', label: 'Banco GNB' },
				{ value: '10', label: 'Banco Santander' },
				{ value: '11', label: 'Banco Azteca' },
				{ value: '12', label: 'Banco Cencosud' },
				{ value: '13', label: 'ICBC PERU BANK' },
				{ value: '14', label: 'Banco de la Nación' },
				{ value: '15', label: 'Caja Cusco' },
				{ value: '16', label: 'Caja Huancayo' },
				{ value: '17', label: 'Caja Maynas' },
				{ value: '18', label: 'Caja Metropolitana' },
				{ value: '19', label: 'Caja Municipal Ica' },
				{ value: '20', label: 'Caja Sullana' },
				{ value: '21', label: 'Caja Tacna' },
				{ value: '22', label: 'Caja Trujillo' }
			],
			bankList1 : [
				{ value: '40138', label: 'ABC CAPITAL' },
				{ value: '40133', label: 'ACTINVER' },
				{ value: '40062', label: 'AFIRME' },
				{ value: '90661', label: 'ALTERNATIVOS' },
				{ value: '90706', label: 'ARCUS' },
				{ value: '90659', label: 'ASP INTEGRA OPC' },
				{ value: '40128', label: 'AUTOFIN' },
				{ value: '40127', label: 'AZTECA' },
				{ value: '37166', label: 'BaBien' },
				{ value: '40030', label: 'BAJIO' },
				{ value: '40002', label: 'BANAMEX' },
				{ value: '40154', label: 'BANCO COVALTO' },
				{ value: '37006', label: 'BANCOMEXT' },
				{ value: '40137', label: 'BANCOPPEL' },
				{ value: '40160', label: 'BANCO S3' },
				{ value: '40152', label: 'BANCREA' },
				{ value: '37019', label: 'BANJERCITO' },
				{ value: '40147', label: 'BANKAOOL' },
				{ value: '40106', label: 'BANK OF AMERICA' },
				{ value: '40159', label: 'BANK OF CHINA' },
				{ value: '37009', label: 'BANOBRAS' },
				{ value: '40072', label: 'BANORTE' },
				{ value: '40058', label: 'BANREGIO' },
				{ value: '40060', label: 'BANSI' },
				{ value: '2001', label: 'BANXICO' },
				{ value: '40129', label: 'BARCLAYS' },
				{ value: '40145', label: 'BBASE' },
				{ value: '40012', label: 'BBVA MEXICO' },
				{ value: '40112', label: 'BMONEX' },
				{ value: '90677', label: 'CAJA POP MEXICA' },
				{ value: '90683', label: 'CAJA TELEFONIST' },
				{ value: '90630', label: 'CB INTERCAM' },
				{ value: '40143', label: 'CIBANCO' },
				{ value: '90631', label: 'CI BOLSA' },
				{ value: '90901', label: 'CLS' },
				{ value: '90903', label: 'CoDi Valida' },
				{ value: '40130', label: 'COMPARTAMOS' },
				{ value: '40140', label: 'CONSUBANCO' },
				{ value: '90652', label: 'CREDICAPITAL' },
				{ value: '90688', label: 'CREDICLUB' },
				{ value: '90680', label: 'CRISTOBAL COLON' },
				{ value: '90723', label: 'Cuenca' },
				{ value: '40151', label: 'DONDE' },
				{ value: '90616', label: 'FINAMEX' },
				{ value: '90634', label: 'FINCOMUN' },
				{ value: '90689', label: 'FOMPED' },
				{ value: '90685', label: 'FONDO (FIRA)' },
				{ value: '90601', label: 'GBM' },
				{ value: '37168', label: 'HIPOTECARIA FED' },
				{ value: '40021', label: 'HSBC' },
				{ value: '40155', label: 'ICBC' },
				{ value: '40036', label: 'INBURSA' },
				{ value: '90902', label: 'INDEVAL' },
				{ value: '40150', label: 'INMOBILIARIO' },
				{ value: '40136', label: 'INTERCAM BANCO' },
				{ value: '90686', label: 'INVERCAP' },
				{ value: '40059', label: 'INVEX' },
				{ value: '40110', label: 'JP MORGAN' },
				{ value: '90653', label: 'KUSPIT' },
				{ value: '90670', label: 'LIBERTAD' },
				{ value: '90602', label: 'MASARI' },
				{ value: '90722', label: 'Mercado Pago W' },
				{ value: '40042', label: 'MIFEL' },
				{ value: '40158', label: 'MIZUHO BANK' },
				{ value: '90600', label: 'MONEXCB' },
				{ value: '40108', label: 'MUFG' },
				{ value: '40132', label: 'MULTIVA BANCO' },
				{ value: '37135', label: 'NAFIN' },
				{ value: '90638', label: 'NU MEXICO' },
				{ value: '90710', label: 'NVIO' },
				{ value: '40148', label: 'PAGATODO' },
				{ value: '90620', label: 'PROFUTURO' },
				{ value: '40156', label: 'SABADELL' },
				{ value: '40014', label: 'SANTANDER' },
				{ value: '40044', label: 'SCOTIABANK' },
				{ value: '40157', label: 'SHINHAN' },
				{ value: '90646', label: 'STP' },
				{ value: '90703', label: 'TESORED' },
				{ value: '90684', label: 'TRANSFER' },
				{ value: '90656', label: 'UNAGRA' },
				{ value: '90617', label: 'VALMEX' },
				{ value: '90605', label: 'VALUE' },
				{ value: '90608', label: 'VECTOR' },
				{ value: '40113', label: 'VE POR MAS' },
				{ value: '40141', label: 'VOLKSWAGEN' }
			],
			phomeCode:"1",
			phoneNum:'',
			countryCodes:[
				{ label: '+1', value: '1' },
				{ label: '+809', value: '809' },
				{ label: '+675', value: '675' },
				{ label: '+63', value: '63' },
				{ label: '+92', value: '92' },
				{ label: '+48', value: '48' },
				{ label: '+508', value: '508' },
				{ label: '+351', value: '351' },
				{ label: '+680', value: '680' },
				{ label: '+595', value: '595' },
				{ label: '+974', value: '974' },
				{ label: '+262', value: '262' },
				{ label: '+40', value: '40' },
				{ label: '+7', value: '7' },
				{ label: '+250', value: '250' },
				{ label: '+966', value: '966' },
				{ label: '+677', value: '677' },
				{ label: '+248', value: '248' },
				{ label: '+249', value: '249' },
				{ label: '+46', value: '46' },
				{ label: '+65', value: '65' },
				{ label: '+290', value: '290' },
				{ label: '+1784', value: '1784' },
				{ label: '+421', value: '421' },
				{ label: '+232', value: '232' },
				{ label: '+378', value: '378' },
				{ label: '+221', value: '221' },
				{ label: '+252', value: '252' },
				{ label: '+597', value: '597' },
				{ label: '+239', value: '239' },
				{ label: '+503', value: '503' },
				{ label: '+963', value: '963' },
				{ label: '+268', value: '268' },
				{ label: '+1809', value: '1809' },
				{ label: '+235', value: '235' },
				{ label: '+228', value: '228' },
				{ label: '+992', value: '992' },
				{ label: '+690', value: '690' },
				{ label: '+993', value: '993' },
				{ label: '+216', value: '216' },
				{ label: '+676', value: '676' },
				{ label: '+670', value: '670' },
				{ label: '+90', value: '90' },
				{ label: '+1809', value: '1809' },
				{ label: '+688', value: '688' },
				{ label: '+255', value: '255' },
				{ label: '+256', value: '256' },
				{ label: '+684', value: '684' },
				{ label: '+598', value: '598' },
				{ label: '+998', value: '998' },
				{ label: '+379', value: '379' },
				{ label: '+1784', value: '1784' },
				{ label: '+58', value: '58' },
				{ label: '+1809', value: '1809' },
				{ label: '+1809', value: '1809' },
				{ label: '+84', value: '84' },
				{ label: '+678', value: '678' },
				{ label: '+681', value: '681' },
				{ label: '+685', value: '685' },
				{ label: '+967', value: '967' },
				{ label: '+269', value: '269' },
				{ label: '+27', value: '27' },
				{ label: '+260', value: '260' },
				{ label: '+930', value: '930' },
				{ label: '+376', value: '376' },
				{ label: '+971', value: '971' },
				{ label: '+93', value: '93' },
				{ label: '+1268', value: '1268' },
				{ label: '+1264', value: '1264' },
				{ label: '+355', value: '355' },
				{ label: '+374', value: '374' },
				{ label: '+244', value: '244' },
				{ label: '+672', value: '672' },
				{ label: '+54', value: '54' },
				{ label: '+685', value: '685' },
				{ label: '+43', value: '43' },
				{ label: '+297', value: '297' },
				{ label: '+994', value: '994' },
				{ label: '+387', value: '387' },
				{ label: '+1246', value: '1246' },
				{ label: '+880', value: '880' },
				{ label: '+32', value: '32' },
				{ label: '+226', value: '226' },
				{ label: '+359', value: '359' },
				{ label: '+973', value: '973' },
				{ label: '+257', value: '257' },
				{ label: '+229', value: '229' },
				{ label: '+1441', value: '1441' },
				{ label: '+673', value: '673' },
				{ label: '+591', value: '591' },
				{ label: '+55', value: '55' },
				{ label: '+1809', value: '1809' },
				{ label: '+975', value: '975' },
				{ label: '+267', value: '267' },
				{ label: '+375', value: '375' },
				{ label: '+501', value: '501' },
				{ label: '+236', value: '236' },
				{ label: '+242', value: '242' },
				{ label: '+41', value: '41' },
				{ label: '+225', value: '225' },
				{ label: '+682', value: '682' },
				{ label: '+56', value: '56' },
				{ label: '+237', value: '237' },
				{ label: '+57', value: '57' },
				{ label: '+506', value: '506' },
				{ label: '+53', value: '53' },
				{ label: '+238', value: '238' },
				{ label: '+357', value: '357' },
				{ label: '+420', value: '420' },
				{ label: '+253', value: '253' },
				{ label: '+45', value: '45' },
				{ label: '+1767', value: '1767' },
				{ label: '+213', value: '213' },
				{ label: '+593', value: '593' },
				{ label: '+372', value: '372' },
				{ label: '+20', value: '20' },
				{ label: '+967', value: '967' },
				{ label: '+291', value: '291' },
				{ label: '+251', value: '251' },
				{ label: '+358', value: '358' },
				{ label: '+679', value: '679' },
				{ label: '+500', value: '500' },
				{ label: '+691', value: '691' },
				{ label: '+298', value: '298' },
				{ label: '+241', value: '241' },
				{ label: '+1809', value: '1809' },
				{ label: '+995', value: '995' },
				{ label: '+594', value: '594' },
				{ label: '+233', value: '233' },
				{ label: '+350', value: '350' },
				{ label: '+299', value: '299' },
				{ label: '+220', value: '220' },
				{ label: '+224', value: '224' },
				{ label: '+590', value: '590' },
				{ label: '+240', value: '240' },
				{ label: '+30', value: '30' },
				{ label: '+502', value: '502' },
				{ label: '+671', value: '671' },
				{ label: '+245', value: '245' },
				{ label: '+592', value: '592' },
				{ label: '+504', value: '504' },
				{ label: '+383', value: '383' },
				{ label: '+509', value: '509' },
				{ label: '+36', value: '36' },
				{ label: '+62', value: '62' },
				{ label: '+353', value: '353' },
				{ label: '+972', value: '972' },
				{ label: '+91', value: '91' },
				{ label: '+246', value: '246' },
				{ label: '+964', value: '964' },
				{ label: '+98', value: '98' },
				{ label: '+354', value: '354' },
				{ label: '+39', value: '39' },
				{ label: '+1876', value: '1876' },
				{ label: '+962', value: '962' },
				{ label: '+254', value: '254' },
				{ label: '+996', value: '996' },
				{ label: '+855', value: '855' },
				{ label: '+686', value: '686' },
				{ label: '+269', value: '269' },
				{ label: '+85', value: '85' },
				{ label: '+82', value: '82' },
				{ label: '+965', value: '965' },
				{ label: '+1345', value: '1345' },
				{ label: '+7', value: '7' },
				{ label: '+856', value: '856' },
				{ label: '+1758', value: '1758' },
				{ label: '+41', value: '41' },
				{ label: '+94', value: '94' },
				{ label: '+231', value: '231' },
				{ label: '+266', value: '266' },
				{ label: '+370', value: '370' },
				{ label: '+352', value: '352' },
				{ label: '+371', value: '371' },
				{ label: '+218', value: '218' },
				{ label: '+212', value: '212' },
				{ label: '+377', value: '377' },
				{ label: '+373', value: '373' },
				{ label: '+261', value: '261' },
				{ label: '+692', value: '692' },
				{ label: '+389', value: '389' },
				{ label: '+223', value: '223' },
				{ label: '+95', value: '95' },
				{ label: '+976', value: '976' },
				{ label: '+670', value: '670' },
				{ label: '+222', value: '222' },
				{ label: '+1664', value: '1664' },
				{ label: '+356', value: '356' },
				{ label: '+230', value: '230' },
				{ label: '+960', value: '960' },
				{ label: '+265', value: '265' },
				{ label: '+52', value: '52' },
				{ label: '+60', value: '60' },
				{ label: '+258', value: '258' },
				{ label: '+264', value: '264' },
				{ label: '+687', value: '687' },
				{ label: '+227', value: '227' },
				{ label: '+6723', value: '6723' },
				{ label: '+234', value: '234' },
				{ label: '+505', value: '505' },
				{ label: '+47', value: '47' },
				{ label: '+977', value: '977' },
				{ label: '+674', value: '674' },
				{ label: '+683', value: '683' },
				{ label: '+968', value: '968' },
				{ label: '+507', value: '507' },
				{ label: '+51', value: '51' },
				{ label: '+689', value: '689' },
				{ label: '+387', value: '387' },
				{ label: '+381', value: '381' },
				{ label: '+249', value: '249' },
				{ label: '+852', value: '852' },
				{ label: '+64', value: '64' },
				{ label: '+853', value: '853' },
				{ label: '+886', value: '886' },
				{ label: '+86', value: '86' },
				{ label: '+61', value: '61' },
				{ label: '+44', value: '44' },
				{ label: '+33', value: '33' },
				{ label: '+49', value: '49' },
				{ label: '+81', value: '81' },
				{ label: '+961', value: '961' },
				{ label: '+596', value: '596' },
				{ label: '+31', value: '31' },
				{ label: '+1787', value: '1787' },
				{ label: '+386', value: '386' },
				{ label: '+34', value: '34' },
				{ label: '+66', value: '66' },
				{ label: '+380', value: '380' },
				{ label: '+263', value: '263' }
			],
			countryList:[
        { value: 'AF', label: 'Afghanistan' },
        { value: 'AX', label: '√Öland Islands' },
        { value: 'AL', label: 'Albania' },
        { value: 'DZ', label: 'Algeria' },
        { value: 'AS', label: 'American Samoa' },
        { value: 'AD', label: 'Andorra' },
        { value: 'AO', label: 'Angola' },
        { value: 'AI', label: 'Anguilla' },
        { value: 'AQ', label: 'Antarctica' },
        { value: 'AG', label: 'Antigua and Barbuda' },
        { value: 'AR', label: 'Argentina' },
        { value: 'AM', label: 'Armenia' },
        { value: 'AW', label: 'Aruba' },
        { value: 'AU', label: 'Australia' },
        { value: 'AT', label: 'Austria' },
        { value: 'AZ', label: 'Azerbaijan' },
        { value: 'BS', label: 'Bahamas' },
        { value: 'BH', label: 'Bahrain' },
        { value: 'BD', label: 'Bangladesh' },
        { value: 'BB', label: 'Barbados' },
        { value: 'BY', label: 'Belarus' },
        { value: 'BE', label: 'Belgium' },
        { value: 'BZ', label: 'Belize' },
        { value: 'BJ', label: 'Benin' },
        { value: 'BM', label: 'Bermuda' },
        { value: 'BT', label: 'Bhutan' },
        { value: 'BO', label: 'Bolivia' },
        { value: 'BA', label: 'Bosnia and Herzegovina' },
        { value: 'BW', label: 'Botswana' },
        { value: 'BV', label: 'Bouvet Island' },
        { value: 'BR', label: 'Brazil' },
        { value: 'IO', label: 'British Indian Ocean Territory' },
        { value: 'BN', label: 'Brunei Darussalam' },
        { value: 'BG', label: 'Bulgaria' },
        { value: 'BF', label: 'Burkina Faso' },
        { value: 'BI', label: 'Burundi' },
        { value: 'KH', label: 'Cambodia' },
        { value: 'CM', label: 'Cameroon' },
        { value: 'CA', label: 'Canada' },
        { value: 'CV', label: 'Cape Verde' },
        { value: 'KY', label: 'Cayman Islands' },
        { value: 'CF', label: 'Central African Republic' },
        { value: 'TD', label: 'Chad' },
        { value: 'CL', label: 'Chile' },
        { value: 'CN', label: 'China' },
        { value: 'CX', label: 'Christmas Island' },
        { value: 'CC', label: 'Cocos (Keeling) Islands' },
        { value: 'CO', label: 'Colombia' },
        { value: 'KM', label: 'Comoros' },
        { value: 'CG', label: 'Congo (Congo-Brazzaville)' },
        { value: 'CD', label: 'Congo (Congo-Kinshasa)' },
        { value: 'CK', label: 'Cook Islands' },
        { value: 'CR', label: 'Costa Rica' },
        { value: 'CI', label: "Cote D'Ivoire" },
        { value: 'HR', label: 'Croatia' },
        { value: 'CU', label: 'Cuba' },
        { value: 'CY', label: 'Cyprus' },
        { value: 'CZ', label: 'Czech Republic' },
        { value: 'DK', label: 'Denmark' },
        { value: 'DJ', label: 'Djibouti' },
        { value: 'DM', label: 'Dominica' },
        { value: 'DO', label: 'Dominican Republic' },
        { value: 'EC', label: 'Ecuador' },
        { value: 'EG', label: 'Egypt' },
        { value: 'SV', label: 'El Salvador' },
        { value: 'GQ', label: 'Equatorial Guinea' },
        { value: 'ER', label: 'Eritrea' },
        { value: 'EE', label: 'Estonia' },
        { value: 'ET', label: 'Ethiopia' },
        { value: 'FK', label: 'Falkland Islands (Malvinas)' },
        { value: 'FO', label: 'Faroe Islands' },
        { value: 'FJ', label: 'Fiji' },
        { value: 'FI', label: 'Finland' },
        { value: 'FR', label: 'France' },
        { value: 'GF', label: 'French Guiana' },
        { value: 'PF', label: 'French Polynesia' },
        { value: 'TF', label: 'French Southern Territories' },
        { value: 'GA', label: 'Gabon' },
        { value: 'GM', label: 'Gambia' },
        { value: 'GE', label: 'Georgia' },
        { value: 'DE', label: 'Germany' },
        { value: 'GH', label: 'Ghana' },
        { value: 'GI', label: 'Gibraltar' },
        { value: 'GR', label: 'Greece' },
        { value: 'GL', label: 'Greenland' },
        { value: 'GD', label: 'Grenada' },
        { value: 'GP', label: 'Guadeloupe' },
        { value: 'GU', label: 'Guam' },
        { value: 'GT', label: 'Guatemala' },
        { value: 'GG', label: 'Guernsey' },
        { value: 'GN', label: 'Guinea' },
        { value: 'GW', label: 'Guinea-Bissau' },
        { value: 'GY', label: 'Guyana' },
        { value: 'HT', label: 'Haiti' },
        { value: 'HM', label: 'Heard Island and McDonald Islands' },
        { value: 'VA', label: 'Holy See (Vatican City State)' },
        { value: 'HN', label: 'Honduras' },
        { value: 'HK', label: 'Hong Kong' },
        { value: 'HU', label: 'Hungary' },
        { value: 'IS', label: 'Iceland' },
        { value: 'IN', label: 'India' },
        { value: 'ID', label: 'Indonesia' },
        { value: 'IR', label: 'Iran' },
        { value: 'IQ', label: 'Iraq' },
        { value: 'IE', label: 'Ireland' },
        { value: 'IM', label: 'Isle of Man' },
        { value: 'IL', label: 'Israel' },
        { value: 'IT', label: 'Italy' },
        { value: 'JM', label: 'Jamaica' },
        { value: 'JP', label: 'Japan' },
        { value: 'JE', label: 'Jersey' },
        { value: 'JO', label: 'Jordan' },
        { value: 'KZ', label: 'Kazakhstan' },
        { value: 'KE', label: 'Kenya' },
        { value: 'KI', label: 'Kiribati' },
        { value: 'KP', label: 'Korea, North' },
        { value: 'KR', label: 'Korea, South' },
        { value: 'KW', label: 'Kuwait' },
        { value: 'KG', label: 'Kyrgyzstan' },
        { value: 'LA', label: 'Lao People\'s Democratic Republic' },
        { value: 'LV', label: 'Latvia' },
        { value: 'LB', label: 'Lebanon' },
        { value: 'LS', label: 'Lesotho' },
        { value: 'LR', label: 'Liberia' },
        { value: 'LY', label: 'Libyan Arab Jamahiriya' },
        { value: 'LI', label: 'Liechtenstein' },
        { value: 'LT', label: 'Lithuania' },
        { value: 'LU', label: 'Luxembourg' },
        { value: 'MO', label: 'Macao' },
        { value: 'MK', label: 'Macedonia' },
        { value: 'MG', label: 'Madagascar' },
        { value: 'MW', label: 'Malawi' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'MV', label: 'Maldives' },
        { value: 'ML', label: 'Mali' },
        { value: 'MT', label: 'Malta' },
        { value: 'MH', label: 'Marshall Islands' },
        { value: 'MQ', label: 'Martinique' },
        { value: 'MR', label: 'Mauritania' },
        { value: 'MU', label: 'Mauritius' },
        { value: 'YT', label: 'Mayotte' },
        { value: 'MX', label: 'Mexico' },
        { value: 'FM', label: 'Micronesia' },
        { value: 'MD', label: 'Moldova' },
        { value: 'MC', label: 'Monaco' },
        { value: 'MN', label: 'Mongolia' },
        { value: 'MS', label: 'Montserrat' },
        { value: 'MA', label: 'Morocco' },
        { value: 'MZ', label: 'Mozambique' },
        { value: 'MM', label: 'Myanmar' },
        { value: 'NA', label: 'Namibia' },
        { value: 'NR', label: 'Nauru' },
        { value: 'NP', label: 'Nepal' },
        { value: 'NL', label: 'Netherlands' },
        { value: 'AN', label: 'Netherlands Antilles' },
        { value: 'NC', label: 'New Caledonia' },
        { value: 'NZ', label: 'New Zealand' },
        { value: 'NI', label: 'Nicaragua' },
        { value: 'NE', label: 'Niger' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'NU', label: 'Niue' },
        { value: 'NF', label: 'Norfolk Island' },
        { value: 'MP', label: 'Northern Mariana Islands' },
        { value: 'NO', label: 'Norway' },
        { value: 'OM', label: 'Oman' },
        { value: 'PK', label: 'Pakistan' },
        { value: 'PW', label: 'Palau' },
        { value: 'PS', label: 'Palestinian Territory, Occupied' },
        { value: 'PA', label: 'Panama' },
        { value: 'PG', label: 'Papua New Guinea' },
        { value: 'PY', label: 'Paraguay' },
        { value: 'PE', label: 'Peru' },
        { value: 'PH', label: 'Philippines' },
        { value: 'PN', label: 'Pitcairn' },
        { value: 'PL', label: 'Poland' },
        { value: 'PT', label: 'Portugal' },
        { value: 'PR', label: 'Puerto Rico' },
        { value: 'QA', label: 'Qatar' },
        { value: 'RE', label: 'Reunion' },
        { value: 'RO', label: 'Romania' },
        { value: 'RU', label: 'Russian Federation' },
        { value: 'RW', label: 'Rwanda' },
        { value: 'SH', label: 'Saint Helena' },
        { value: 'KN', label: 'Saint Kitts and Nevis' },
        { value: 'LC', label: 'Saint Lucia' },
        { value: 'PM', label: 'Saint Pierre and Miquelon' },
        { value: 'VC', label: 'Saint Vincent and the Grenadines' },
        { value: 'WS', label: 'Samoa' },
        { value: 'SM', label: 'San Marino' },
        { value: 'ST', label: 'Sao Tome and Principe' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'SN', label: 'Senegal' },
        { value: 'ME', label: 'Montenegro' },
        { value: 'SC', label: 'Seychelles' },
        { value: 'SL', label: 'Sierra Leone' },
        { value: 'SG', label: 'Singapore' },
        { value: 'SK', label: 'Slovakia' },
        { value: 'SI', label: 'Slovenia' },
        { value: 'SB', label: 'Solomon Islands' },
        { value: 'SO', label: 'Somalia' },
        { value: 'ZA', label: 'South Africa' },
        { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
        { value: 'ES', label: 'Spain' },
        { value: 'LK', label: 'Sri Lanka' },
        { value: 'SD', label: 'Sudan' },
        { value: 'SR', label: 'Suriname' },
        { value: 'SJ', label: 'Svalbard and Jan Mayen' },
        { value: 'SZ', label: 'Swaziland' },
        { value: 'SE', label: 'Sweden' },
        { value: 'CH', label: 'Switzerland' },
        { value: 'SY', label: 'Syrian Arab Republic' },
        { value: 'TW', label: 'Taiwan, Province of China' },
        { value: 'TJ', label: 'Tajikistan' },
        { value: 'TZ', label: 'Tanzania' },
        { value: 'TH', label: 'Thailand' },
        { value: 'TL', label: 'Timor-Leste' },
        { value: 'TG', label: 'Togo' },
        { value: 'TK', label: 'Tokelau' },
        { value: 'TO', label: 'Tonga' },
        { value: 'TT', label: 'Trinidad and Tobago' },
        { value: 'TN', label: 'Tunisia' },
        { value: 'TR', label: 'Turkey' },
        { value: 'TM', label: 'Turkmenistan' },
        { value: 'TC', label: 'Turks and Caicos Islands' },
        { value: 'TV', label: 'Tuvalu' },
        { value: 'UG', label: 'Uganda' },
        { value: 'UA', label: 'Ukraine' },
        { value: 'AE', label: 'United Arab Emirates' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'US', label: 'United States' },
        { value: 'UM', label: 'United States Minor Outlying Islands' },
        { value: 'UY', label: 'Uruguay' },
        { value: 'UZ', label: 'Uzbekistan' },
        { value: 'VU', label: 'Vanuatu' },
        { value: 'VE', label: 'Venezuela' },
        { value: 'VN', label: 'Viet Nam' },
        { value: 'VG', label: 'Virgin Islands, British' },
        { value: 'VI', label: 'Virgin Islands, U.S.' },
        { value: 'WF', label: 'Wallis and Futuna' },
        { value: 'EH', label: 'Western Sahara' },
        { value: 'YE', label: 'Yemen' },
        { value: 'ZM', label: 'Zambia' },
        { value: 'ZW', label: 'Zimbabwe' },
        { value: 'RS', label: 'Serbia' }
      ],
      buttonqh:3,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["merType"]),
    ...mapGetters(["isPopupVisible"]),
    ...mapGetters(['sidebar', 'device', 'name', 'merType', 'identity']),
  },
  methods: {
		// 对象转成指定字符串分隔
		listToString(list, separator) {
			if(!Array.isArray(list)){
				return list;
			}else{
				let strs = "";
				separator = separator || ",";
				for (let i in list) {
					strs += list[i] + separator;
				}
				return strs != "" ? strs.substr(0, strs.length - 1) : "";
			}
		},
		updateFileStr(data){
			this.form.idCard = data;
		},
    goToBack(){
      // this.$router.back();
      history.go(-1);

    },
    selectButton(index){
      this.buttonqh=index;
      this.form.type = index;
			if(this.buttonqh!==3){
				this.form.benediciary = 2;
			}
			if(this.buttonqh===5){
				this.form.country = "PE"
				this.form.currency = "PEN"
			}
			if(this.buttonqh===6){
				this.form.country = "MX"
				this.form.currency = "MXN"
			}
			if(this.buttonqh===4){
				this.form.currency = "BRL"
				this.form.country = ""
			}
			if(this.buttonqh===1 || this.buttonqh===3){
				this.form.country = ""
				this.form.currency = ""
			}
    },
    addMerbeneficiay(){
      this.loading = true;
			this.form.currency = this.listToString(this.form.currency)
			console.log(123,this.form);
			if(this.buttonqh ===3||this.buttonqh === 1){
				this.form.phoneNumber = this.phomeCode+"-"+this.phoneNum
			}

			if(this.buttonqh === 5){
				this.form.phoneNumber = "+"+this.phomeCode+this.form.phoneNum
			}
			addMerbeneficiary(this.form).then(res=>{
        if (res.status === 200) {
					this.$message({
						type: "success",
						message: res.msg
					});
          setTimeout(()=>{
						this.loading = false;
						history.go(-1);
          },500)

        }else{
          this.loading = false;
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      }).catch(e=>{
        this.loading = false;
        this.$message({
          type: "error",
          message: res.msg
        });
      })
    }
  }
};
</script>

<style>
.element {
  position: absolute;
  cursor: pointer;
  left: 121px;
  top: 17px;
}
.custom-form {
	margin: 20px auto;
	display: flex;
	width: 942px;
}
.custom-form1 {
	margin: 20px auto;
	display: flex;
	width: 942px;
}

.custom-form .el-input {
  border-radius: 4px;
}

.submit-button{
	margin:6% 42%;
	width: 180px;
	height: 40px;
	background: #7F8DFF;
	border-radius: 4px;
}
.button-border-radius{
  border-radius:12px;
}
.font-text{
  font-size: 14px;
  color: #526484;
}
.el-form-item__content {
  line-height: 20px;
}
.selected {
  color: #6576FF;
  border-color: #d1d6ff;
  background-color: #f0f1ff;
}
.content-way{
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 40px;
	text-align: left;
	font-style: normal;
}
.content-way1{
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 45px;
	text-align: left;
	font-style: normal;
}
</style>