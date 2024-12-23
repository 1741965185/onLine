<template>
    <div>
        <div class="top-title-bar flex_l_r">
            <h3 class="page-title">查看邮件</h3>
            <el-button class="go-back-btn ">
              <svg-icon icon-class="arrow-left"/>
                <span>后退</span>
            </el-button>
        </div>
        <div class="border ">
           <div class="bg-F8F9FC padding">
               <span>Dear &nbsp;</span>
               <span>000014@qq.com:</span>
           </div>
           <div class="padding">
               <div class="btm_dashed"><p class="red line-height">You have an order rejected, please check</p> </div>
               <div class="btm_dashed"><p class="line-height">The order details are as follows:</p> </div>
               <div class="cont_padding btm_dashed">
                   <p class="cont_line-height">Order No.: 150275870</p>
                   <p class="cont_line-height">Payment No.: SN2105190451410728</p>
                   <p class="cont_line-height">Payment Date&Time: 2021-05-19 04:51</p>
                   <p class="cont_line-height">Payment Amount: 28.36 USD</p>
                   <p class="cont_line-height">Refuse to pay Date&Time: 2021-06-07 10:46</p>
                   <p class="cont_line-height">Refuse Amount: 28.36 USD</p>
                   <p class="cont_line-height">Reasons for dishonor: Fraud </p>
               </div>
           </div>
           <div class="padding">
               <div>
                   <span>▪</span>
                   <span class="red cont_line-height">Should you require any assistance regarding to this transaction,
                        please don't hesitate to contact our transaction services department at:
                    </span>
               </div>
               <div>
                   <span>▪</span>
                   <span>E-mail: services@eqomore.com</span>
               </div>
           </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'checkEmail',

    components: {  },

    directives: {  },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.flex_l_r{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.border{
    border: #DBDFEA solid 1px;
}
.bg-F8F9FC{
    background: #F8F9FC;
}
.padding{
    padding:12px 24px ;
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
</style>