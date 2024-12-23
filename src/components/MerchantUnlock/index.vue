<template>
    <div>
        <div class="top-title-bar margin_t_b" v-show="toggleHeade">
            <h4 class="page-title">
				<span class="margin_r">
					<span>商户</span>
					<span>/</span>
					<span class="color">1193</span>
				</span>
				<el-button >已解锁</el-button>
			</h4>
			<div class="margin_t">
				<span class="font_color">状态：</span>
				<el-select v-model="active_value" placeholder="" class="state margin_r">
					<el-option  v-for="item in activeForm"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
				</el-select>
				<el-button >解锁申请</el-button>
			</div>
        </div>
        <div class="top-title-bar margin_t_b" v-show="hidetoggleHeade">
            <h4 class="page-title " >
				<span class="margin_r">
					<span>商户</span>
					<span>/</span>
					<span class="color">1193</span>
				</span>
			</h4>
            <div class="flex_l_r font_color flex_center">
                <div class="">
                    <span>支付币种：</span>
                    <span>USD，CNY，GBP，EUR，JPY，AUD，CAD</span>
                    <span class="pointer">
                        <i class="el-icon-edit margin pointer"></i>
                    </span> 
                </div>
                <div >
                    <span>支持币种：</span>
                    <span>
                        <input type="text" value="USD，CNY，GBP，EUR，JPY，AUD，CAD">
                    </span>
                    <el-button>更新</el-button>
                </div>
            </div>
        </div>
        <el-tabs>
            <!-- 个人信息 -->
            <el-tab-pane>
                <span slot="label"><i class="el-icon-user"></i>  {{$t('editMerchant.personalInfo')}}</span>
                <div class="font_color padding">
                    <div class="flex_l_r">
                        <el-form :model="UnlockFormLeft" ref="UnlockFormLeft" class=" W_half">
                            <div class="flex_l_r line_height">
                                <div>商户名</div>
                                <span class="margin_empty">
                                    <input type="text" v-model="UnlockFormLeft.name">
                                </span>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>联系电话</div>
                                <span class="margin_empty">
                                    <input type="text" v-model="UnlockFormLeft.phone">
                                </span>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>邮箱</div>
                                <div>
                                    <span class="margin_r">
                                        <input type="text" v-model="UnlockFormLeft.email">
                                    </span>
                                    <span>
                                        <el-switch v-model="switch_value1" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch>    
                                    </span>
                                </div>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>所在地</div>
                                <div class="margin_empty">
                                    <el-select v-model="city_value" placeholder="" class="state">
                                        <el-option  v-for="item in addressForm"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </div> 
                            </div>
                            <div class="flex_l_r line_height">
                                <div>所属行业</div>
                                <div class="margin_empty">
                                    <el-select v-model="industry_value" placeholder="" class="state">
                                        <el-option  v-for="item in industryForm"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </div> 
                            </div>
                            <div class="flex_l_r line_height">
                                <div>网址</div>
                                <span class="margin_empty">
                                    <input type="text" v-model="UnlockFormLeft.url">
                                </span>
                            </div>
                        </el-form>

                        <!-- 右边 -->
                        <el-form :model="UnlockFormRight" ref="UnlockFormRight" class=" W_half">
                            <div class="flex_l_r line_height">
                                <div>PrivateKey</div>
                                <span class="">
                                    <input type="text" v-model="UnlockFormRight.PrivateKey">
                                </span>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>注册日期</div>
                                <span class="">
                                    <input type="text" v-model="UnlockFormRight.date">
                                </span>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>类型</div>
                                <div class="">
                                    <el-select v-model="type_value" placeholder="" class="state">
                                        <el-option  v-for="item in typeForm"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </div> 
                            </div>
                            <div class="flex_l_r line_height">
                                <div>开户名称</div>
                                <div>
                                    <span class="">
                                        <input type="text" v-model="UnlockFormRight.accountName">
                                    </span>
                                </div>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>开户银行</div>
                                <span class="">
                                    <input type="text" v-model="UnlockFormRight.depositBank">
                                </span>
                            </div>
                            <div class="flex_l_r line_height">
                                <div>开户账户</div>
                                <span class="">
                                    <input type="text" v-model="UnlockFormRight.bankAccount">
                                </span>
                            </div>
                        </el-form>
                    </div>
                    <div class="border_t ">
                        <h3 class="padding_t_b">卡外通道</h3>
                        <div class="flex">
                            <div class="switch_more flex">
                                <div class="lable_l">开通外卡</div>
                                <div>
                                    <el-switch v-model="switch_value2" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch> 
                                </div>
                            </div>
                            <div class="switch_more flex">
                                <div class="lable_l">试用</div>
                                <div>
                                    <el-switch v-model="switch_value3" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch> 
                                </div>
                            </div>
                            <div class="switch_more flex flex">
                                <div class="lable_l">快捷支付</div>
                                <div>
                                    <el-switch v-model="switch_value4" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch> 
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="switch_more flex">
                                <div class="lable_l">虚拟产品</div>
                                <div>
                                    <el-switch v-model="switch_value5" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch> 
                                </div>
                            </div>
                            <div class="switch_more flex">
                                <div class="lable_l">风控白名单</div>
                                <div>
                                    <el-switch v-model="switch_value6" active-color="#7F8DFF" inactive-color="#E5E9F2"></el-switch> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <!-- 交易设置 -->
              <el-tab-pane>
                <span slot="label" @click="deal_head" class="w_h_max">
                    <i class="el-icon-refresh"></i> 
                    交易设置
                </span>
                <div class="font_color">
                    <div class="flex_l_r">
                        <h3 class="padding ">交易金额限定</h3>
                        <span class="padding">
                            <el-button class="bg_8693FF color_white el-icon-plus add_btn" ></el-button>
                        </span>
                    </div>
                    
                    <el-table
                        :data="RTAdata"
                        style="width: 100%">
                        <el-table-column
                            prop="aisle_value"
                            label="通道"
                            required=""
                            min-width="135">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.aisle_value" placeholder="请选择" >
                                    <el-option v-for="item in scope.row.aisleForm " 
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="限定类型"
                            min-width="135">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.astrictType" placeholder="请选择" >
                                    <el-option v-for="item in scope.row.astrictTypeForm " 
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            label="金额"
                            min-width="135">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                            
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="修改时间"
                            min-width="160">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label=""
                            width="100">
                            <el-popover
                                placement="left"
                                width="40">
                                <div>
                                    <i class="el-icon-edit margin pointer"></i>
                                    <span class="pointer" >&nbsp;编辑</span> 
                                </div>
                                <div>
                                    <i class="el-icon-delete margin pointer"></i><span class="pointer">&nbsp;移除</span> 
                                </div>
                                <template #reference>
                                    <a href="#" class="icon-hover-effect" @click="visible = true">
                                        <em class="el-icon-more"></em>
                                    </a>
                                </template>
                            </el-popover>
                        </el-table-column>
                    </el-table>
                </div>
                
                <div class="font_color">
                    <div class="flex_l_r">
                        <h3 class="padding ">扣率管理</h3>
                        <span class="padding">
                            <el-button class="bg_8693FF color_white el-icon-plus add_btn" ></el-button>
                        </span>
                    </div>
                    
                    <el-table
                        :data="deductData"
                        style="width: 100%">
                        <el-table-column
                            prop="card_value"
                            label="卡种类别"
                            required=""
                            min-width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.card_value" placeholder="请选择" >
                                    <el-option v-for="item in scope.row.cardForm " 
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="currency"
                            label="币种"
                            min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="deduc"
                            label="扣率"
                            min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="money_deduct"
                            label="保证金扣率"
                            min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="effectiveDate"
                            label="生效时间"
                            min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="changedate"
                            label="修改时间"
                            min-width="160">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label=""
                            width="100">
                            <el-popover
                                placement="left"
                                width="40">
                                <div>
                                    <i class="el-icon-edit margin pointer"></i>
                                    <span class="pointer" >&nbsp;编辑</span> 
                                </div>
                                <div>
                                    <i class="el-icon-delete margin pointer"></i><span class="pointer">&nbsp;移除</span> 
                                </div>
                                <template #reference>
                                    <a href="#" class="icon-hover-effect" @click="visible = true">
                                        <em class="el-icon-more"></em>
                                    </a>
                                </template>
                            </el-popover>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>

<script>
export default {
    name: 'MerchantUnlock',

    components: {  },

    directives: {  },

    data() {
        return {
            toggleHeade:'true',
            hidetoggleHeade:'',
            UnlockFormLeft:{
                name:'王四',
                phone:'13988995678',
                email:'info@softio.com',
                url:'http://www.domain.com'
            },
            UnlockFormRight:{
                PrivateKey:'XeJrYpPrbb',
                date:'2020-03-10 12:12:12',
                accountName:'pierresong',
                depositBank:'招行莆田分行',
                bankAccount:'9999 9999 9999 9999'
            },
            activeForm:[
                {
                    value:'选项1',
                    label:'已激活'
                },
                {
                    value:'选项2',
                    label:'未激活'
                },
            ],
            active_value:'',// 已激活 未激活 动态值
            addressForm:[
                {
                    value:'选项1',
                    label:'上海'
                },
                {
                    value:'选项2',
                    label:'下海'
                },
            ],
            city_value:'',//城市 动态值
            switch_value1:true,//开关
            switch_value2:true,
            switch_value3:false,
            switch_value4:true,
            switch_value5:false,
            switch_value6:false,
            industryForm:[
                {
                    value:'选项1',
                    label:'电子商务'
                },
                {
                    value:'选项2',
                    label:'手机'
                },
            ],
            industry_value:'',
            typeForm:[
                {
                    value:'选项1',
                    label:'对公'
                },
                {
                    value:'选项2',
                    label:'对个人'
                },
            ],
            type_value:'',
            RTAdata:[
                {
                    aisle_value:'',
                    aisleForm:[
                        {
                            value:'选项1',
                            label:'通道1',
                        },
                        {
                            value:'选项2',
                            label:'通道2'
                        },
                    ],
                    astrictType:'',
                    astrictTypeForm:[
                        {
                            value:'选项1',
                            label:'笔',
                        },
                        {
                            value:'选项2',
                            label:'批'
                        },
                    ],
                    money:'',
                    date:'2021-10-12 12:23:43',
                },
                {
                    aisle_value:'',
                    aisleForm:[
                        {
                            value:'选项1',
                            label:'通道1',
                        },
                        {
                            value:'选项2',
                            label:'通道2'
                        },
                    ],
                    astrictType:'',
                    astrictTypeForm:[
                        {
                            value:'选项1',
                            label:'笔',
                        },
                        {
                            value:'选项2',
                            label:'批'
                        },
                    ],
                    money:'',
                    date:'2021-10-12 12:23:43',
                },
                {
                    aisle_value:'',
                    aisleForm:[
                        {
                            value:'选项1',
                            label:'通道1',
                        },
                        {
                            value:'选项2',
                            label:'通道2'
                        },
                    ],
                    astrictType:'',
                    astrictTypeForm:[
                        {
                            value:'选项1',
                            label:'笔',
                        },
                        {
                            value:'选项2',
                            label:'批'
                        },
                    ],
                    money:'',
                    date:'2021-10-12 12:23:43',
                },
            ],
            deductData:[
                {
                    card_value:'',//卡种类别的值
                    cardForm:[ //卡种类别的选项
                        {
                            value:'选项1',
                            label:'卡1',
                        },
                        {
                            value:'选项2',
                            label:'卡2'
                        },
                    ],
                    currency:'',//币种的值
                    deduc:'',//扣率的值
                    money_deduct:'',//保证金扣率的值
                    effectiveDate:'',//生效时间的值
                    changedate:'2021-10-12 12:23:43',//修改时间的值
                },
               {
                    card_value:'',//卡种类别的值
                    cardForm:[ //卡种类别的选项
                        {
                            value:'选项1',
                            label:'卡1',
                        },
                        {
                            value:'选项2',
                            label:'卡2'
                        },
                    ],
                    currency:'',//币种的值
                    deduc:'',//扣率的值
                    money_deduct:'',//保证金扣率的值
                    effectiveDate:'',//生效时间的值
                    changedate:'2021-10-12 12:23:43',//修改时间的值
                },
                {
                    card_value:'',//卡种类别的值
                    cardForm:[ //卡种类别的选项
                        {
                            value:'选项1',
                            label:'卡1',
                        },
                        {
                            value:'选项2',
                            label:'卡2'
                        },
                    ],
                    currency:'',//币种的值
                    deduc:'',//扣率的值
                    money_deduct:'',//保证金扣率的值
                    effectiveDate:'',//生效时间的值
                    changedate:'2021-10-12 12:23:43',//修改时间的值
                },
            ]
        };
    },
    created(){
        
    },
    mounted() {
        deal_head();
        personInfo_head();
    },

    methods: {
        deal_head(){
            this.toggleHeade=false;
            this.hidetoggleHeade=true;
        },
        personInfo_head(){
            this.toggleHeade=true;
            this.hidetoggleHeade=false;
        }
    },
};
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
}
.margin_t_b{
    margin: 30px 0;
}
.padding_t_b{
    padding: 24px 0;
    box-sizing: border-box;
}
.font_color{
    color: #364A63;
}
.padding{
    box-sizing: border-box;
}
.W_half{
    width: 50%;
    padding-right: 24px;
}
.flex_l_r{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.line_height{
    height: 40px;
}
.margin_r{
    margin-right: 20px;
}
.margin_empty{
    margin-right: 60px;
}
.lable_l{
    width: 100px;
    text-align: left;
    height:50px ;
}
.color{
    color:#8693FF ;
}
.state{
    width: 90px;
    height: 30px;
    text-align: center;
}
.margin_t{
    margin-top: 20px;
}
.select_w{
    width: 100px;
}
.border{
    border: #DBDFEA solid 1px;
    border-radius: 5px;
}
.border_t{
    border-top: solid 1px #dcdde2;
}
.bg-F8F9FC{
    background: #F8F9FC;
}
.padding{
    padding:24px ;
    box-sizing: border-box;
}
.btm_dashed{
    border-bottom:#75839D 1px dashed;
}
.line-height{
    line-height: 45px;
}
.red{
    color: red;
}
.cont_padding{
    padding: 10px 0 20px 0;
}
.cont_line-height{
    line-height: 30px;
}
.switch_more{
    width: 33%;
}
.bg_8693FF{
    background: #8693FF;
}
.color_white{
    color: white;
}

.margin{
	margin: 0 10px;
}
.pointer{
	cursor:pointer;
}
input{
    width: 300px;
    border: 1px solid #dcdde2;
    padding: 11px 7px;
    border-radius: 3px;
    color: #75839D;
    margin-right: 8px;
}
.flex_center{
    display: flex;
    align-items: center;
}
.w_h_max{
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>