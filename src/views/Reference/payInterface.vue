<template>
	<div>
		<Hander />
		<div class="content">
			<!-- 内容 -->
			<div class="text-content">
				<div class="edition-wrap"><span>版本：v2.0,</span><span>修改日期：2021/8/11</span></div>
				<!-- 语术 -->
				<div id="1">
					<primary-title title="1 语术" :type="1" />
					<table-component :tableList="languageSkill" :type="1" />
				</div>
				<!-- 产品介绍 -->
				<div id="2">
					<primary-title title="2 产品介绍" :type="1" />
					<p>TAPXYZ系统(以下以本系统代称)外卡产品有两种对接模式：直连请求和网关跳转。</p>
					<!-- 直连模式 -->
					<div id="2.1">
						<primary-title title="2.1 直连模式" :type="2" />
						<p>
							直连请求要求商户系统具备金融系统的PCI
							DSS认证资质，商户可以在自己的网关或收银台上采集持卡人的卡号信息，通过后台Http请求上送给本系统进行付款。
						</p>
						<p>若交易返回了RetHtml 链接择标识该交易走的是3dS的流程交易，必须重定向到RetHtml页面完成付款。</p>
						<!-- 不参与3DS/DM时处理流程 -->
						<div id="2.1.1">
							<primary-title title="2.1.1 不参与3DS/DM时处理流程" :type="3" />
							<img-wrap :imgUrl="require('@/assets/text/imgs/payInterface1.png')" text="图一 直连模式非3DS时处理流程" />
							<div class="min-title">流程说明：</div>
							<p>1、商户系统发起支付；</p>
							<p>2、TAPXYZ系统接收到支付请求后，并与通道方交互，完成授权处理；</p>
							<p>3、TAPXYZ系统返回支付结果给商户系统。</p>
						</div>
						<!-- 参与3DS/DM时处理流程 -->
						<div id="2.1.2">
							<primary-title title="2.1.2 参与3DS/DM时处理流程" :type="3" />
							<img-wrap
								:imgUrl="require('@/assets/text/imgs/payInterface2.png')"
								text="图二 直连模式集成3DS调用时序图"
							/>
							<div class="min-title">流程说明：</div>
							<p>1、持卡人在商户系统发起授权交易；</p>
							<p>2、商户系统需重定至TAPXYZ系统返回的支付链接，即跳转至TAPXYZ收银台；</p>
							<p>3、TAPXYZ系统完成3ds/DM处理后与通道方交互，完成授权；</p>
							<p>
								4、TAPXYZ收银台在完成交易后自动跳转至回调地址指定的页面，如若商户未上送回调地址，则跳转至默认的支付完成页面；
							</p>
							<p>5、交易完成后，TAPXYZ系统异步推送通知到商户端系统。</p>
						</div>
					</div>
					<!-- 收银台模式 -->
					<div id="2.2">
						<primary-title title="2.2 收银台模式" :type="2" />
						<p>
							网关收银台模式，持卡人在商户网站下单，商户生成订单并将持卡人页面跳转到本系统的网关支付页面，持卡人在网关支付页面填写卡号等基本信息完成付款，支持成功后本系统会将支付结果异步通知商户。
						</p>
						<p>商户需要发送联机交易获取网关的URL，并用响应的payUrl地址跳转到支付页面。</p>
						<!-- 收银台模式下的处理流程 -->
						<div id="2.2.1">
							<primary-title title="2.2.1 收银台模式下的处理流程" :type="3" />
							<img-wrap :imgUrl="require('@/assets/text/imgs/payInterface3.png')" text="图三 收银台模式调用时序图" />
							<div class="min-title">流程说明：</div>
							<p>1、商户系统发起支付请求（交易类型必须指明为：消费-收银台网关）；</p>
							<p>2、商户系统重定向TAPXYZ系统返回的支付链接（收银台页面参见“图四 收银台示意图”）；</p>
							<p>3、持卡人在TAPXYZ系统收银台页面输入支付卡信息；</p>
							<p>4、TAPXYZ系统收银台页面完成收银台模式下的验证、授权处理；</p>
							<p>5、TAPXYZ系统收银台页面展示支付结果；</p>
							<p>6、TAPXYZ系统异步推送交易结果给商户系统。</p>
							<img-wrap :imgUrl="require('@/assets/text/imgs/payInterface4.png')" text="图四 收银台示意图" />
						</div>
					</div>
				</div>
				<!-- 直连接入说明 -->
				<div id="3">
					<primary-title title="3 直连接入说明" :type="1" />
					<p><b>请求方式：</b> Post</p>
					<p><b>数据格式：</b>使用标准编码格式，字符编码统一使用UTF-8。</p>
					<p><b>HTTP头：</b>application/x-www-form-urlencoded; charset=UTF-8</p>
					<p>
						<b>签名（signinfo）：</b
						>为了确保数据在传输过程中不被篡改，本系统要求您对支付订单数据进行签名，并将数据签名同交易一并上送支付服务器。生成签名的算法如下：
					</p>
					<p>
						<b>签名规则：</b>是经过md5函数对字符串：MerNo + OrderNo + Amount + CurrencyCode + CardNo + CardExpireYear +
						CardExpireMonth + CardSecurityCode + PrivateKey (其中各个参数的顺序不能颠倒)
						进行32位加密并把加密后的字符串转换为大写而来。
					</p>
					<p><b>异步通知：</b>3ds 异步 NotifyURL地址。</p>
					<p>
						<b>备注(Remark):</b>
						用于客户在购物时填写的一些备注。如果商户还需要一些其他的订单信息，可以通过此参数进行传递。
					</p>
					<p><b>GoodsList 样例 单个</b></p>
					<pre>
		&lt;Goods&gt;
			&lt;GoodsName&gt;Nike Bag&lt;/GoodsName&gt;
			&lt;Price&gt;59.88&lt;/Price&gt;
			&lt;Qty&gt;2&lt;/Qty&gt;
		&lt;/Goods&gt;
		多个商品
		&lt;GoodsList&gt;
			&lt;Goods&gt;
				&lt;GoodsName&gt;Nike Bag&lt;/GoodsName&gt;
				&lt;Price&gt;59.88&lt;/Price&gt;
				&lt;Qty&gt;2&lt;/Qty&gt;
			&lt;/Goods&gt;
		&lt;/GoodsList&gt;
					</pre
					>
					<p>
						<b>币种(CurrencyCode)：</b>其中美元:USD 英镑: GBP 欧元: EUR 澳元: AUD 加元: CAD 日元:
						JPY等,(可参考：国际标准化组织的ISO 4217国际标准是货币及基金代码之表示法[表示货币和资金的代码])。
					</p>
				</div>
				<!-- 支付接口 -->
				<div id="4">
					<primary-title title="4 支付接口" :type="1" />
					<p>请求地址：https://payment.tapxyz.com/Interface2party</p>
					<!-- 直连模式 -->
					<div id="4.1">
						<primary-title title="4.1 直连模式" :type="2" />
						<p>订单支付接口表单参数格式说明（参数名称大小写必须一致）</p>
						<table-component :tableList="directMode" :type="2" />
						<div class="min-title">参数规则：</div>
						<p>
							1、<b>密钥(PrivateKey)：</b>主要用于数据md5加密，无需传输到支付网关。可以在TAPXYZ商户后台进行查看和修改
							，为了安全，建议一段时间更改一次。当在商户后台进行了更改后，必须对网店中TAPXYZ支付接口中的PrivateKey也要做相应的修改。
						</p>
						<p>2、<b>商品信息(GoodsList)：</b>使用XML固定格式将购物车中的商品信息传递。</p>
						<pre>
		&lt;Goods&gt;
			&lt;GoodsName&gt;Nike Bag&lt;/GoodsName&gt;
			&lt;Price&gt;59.88&lt;/Price&gt;
			&lt;Qty&gt;2&lt;/Qty&gt;
		&lt;/Goods&gt;
		&lt;Goods&gt;
			&lt;GoodsName&gt;Nike shoes&lt;/GoodsName&gt;
			&lt;Price&gt;12.88&lt;/Price&gt;
			&lt;Qty&gt;1&lt;/Qty&gt;
		&lt;/Goods&gt;
						</pre
						>
						<p>
							3、<b>币种(CurrencyCode)：</b>其中美元:USD 英镑: GBP 欧元: EUR 澳元: AUD 加元: CAD 日元:
							JPY等,(可参考：国际标准化组织的ISO 4217国际标准是货币及基金代码之表示法[表示货币和资金的代码])。
						</p>
						<p>
							4、<b>SignInfo：</b>是经过md5函数对字符串：MerNo + OrderNo + Amount + CurrencyCode + CardNo +
							CardExpireYear + CardExpireMonth + CardSecurityCode + PrivateKey (其中各个参数的顺序不能颠倒)
							进行32位加密并把加密后的字符串转换为大写而来。
						</p>
						<div class="min-title">支付页面语言(LanguageCode): 英语:en。</div>
						<p>
							响应结果 （参数大小写必须一致） ，非 3DS时直接返回支付结果，3DS时需要跳转RetHtml
							通过异步或同步返回支付结果。 结果为xml格式
						</p>
						<table-component :tableList="payPageLanguage" :type="3" />
						<p><b>3ds 时返回 RetHtml 格式类型</b></p>
						<pre>
		&lt;RetHtml&gt;
			&lt;![CDATA[https://test.allinpayhk.com/pay-web- h5/cnp_pay/
			directCashier?accessC[ ]ode=85200015&mchtId=852999933540001&
			accessOrderId=16026 67857498&language=zh-hant]]&gt;
		&lt;/RetHtml&gt;
						</pre
						>
						<p><b>支付成功和支付失败同步通知到 ReturnURL 异步通知到 NotifyURL</b></p>
						<p>异步通知表单参数格式说明 （参数大小写必须一致）</p>
						<table-component :tableList="payPageLanguage1" :type="3" />
					</div>
					<!-- 4.2 收银台模式 -->
					<div id="4.2">
						<primary-title title="4.2 收银台模式" :type="2" />
						<p>接入说明 SignInfo 和 直连模式不同</p>
						<p><b>请求方式：</b>HTTP Post</p>
						<p><b>数据格式：</b>使用标准编码格式，字符编码统一使用UTF-8。</p>
						<p>
							<b>HTTP头：</b>application/x-www-form-urlencoded;
							charset=UTF-8签名（signinfo）：为了确保数据在传输过程中不被篡改，本系统要求您对支付订单数据进行签名，并将数据签名同交易一并上送支付服务器。生成签名的算法如下：
						</p>
						<p>
							<b>签名规则：</b>是经过md5函数对字符串：MerNo + OrderNo + Amount + CurrencyCode + ReturnURL + PrivateKey
							(其中各个参数的顺序不能颠倒)进行32位加密并把加密后的字符串转换为大写而来。
						</p>
						<p><b>异步通知：</b>NotifyURL地址</p>
						<p>
							<b>备注(Remark): </b
							>用于客户在购物时填写的一些备注。如果商户还需要一些其他的订单信息，可以通过此参数进行传递。
						</p>
						<p><b>GoodsList 样例 单个</b></p>
						<pre>
		&lt;Goods&gt;
			&lt;GoodsName&gt;Nike Bag&lt;/GoodsName&gt;
			&lt;Price&gt;59.88&lt;/Price&gt;
			&lt;Qty&gt;2&lt;/Qty&gt;
		&lt;/Goods&gt;
		多个商品
		&lt;GoodsList&gt;
			&lt;Goods&gt;
				&lt;GoodsName&gt;Nike Bag&lt;/GoodsName&gt;
				&lt;Price&gt;59.88&lt;/Price&gt;
				&lt;Qty&gt;2&lt;/Qty&gt;
			&lt;/Goods&gt;
		&lt;/GoodsList&gt;
						</pre
						>
						<p>
							<b>币种(CurrencyCode)：</b>其中美元:USD 英镑: GBP 欧元: EUR 澳元: AUD 加元: CAD 日元:
							JPY等,(可参考：国际标准化组织的ISO 4217国际标准是货币及基金代码之表示法[表示货币和资金的代码])。
						</p>
						<table-component :tableList="cashierMode" :type="2" />
						<p>支付返回</p>
						<p>支付返回收银台页面，填对应的卡号。</p>
						<p>支付交易返回表单参数格式说明 （参数大小写必须一致）</p>
						<table-component :tableList="payPageLanguage1" :type="3" />
					</div>
					<!-- 4.3 退款申请 -->
					<div id="4.3">
						<primary-title title="4.3 退款申请" :type="2" />
						<p>把退款信息以Form表单方式后台提交到TAPXYZ支付平台地址，即站内支付。其中：参数名大小写必须一致</p>
						<p>
							网关提交地址为：https://payment.tapxyz.com/GatewayAPI2如果以Form表单进行提交，建议采用Post隐藏域方式异步进行提交。
						</p>
						<p>订单退款接口表单参数格式说明（参数名称大小写必须一致）</p>
						<table-component :tableList="refundApplication" :type="3" />
						<p>
							退款申请 SignInfo：是经过md5函数对字符串：Merchant_Id + Order_No + Amount + Ref_TradeNo + Currency_Code +
							PrivateKey (其中各个参数的顺序不能颠倒) 进行32位加密并把加密后的字符串转换为大写而来。
						</p>
						<p>退款返回参数说明</p>
						<table-component :tableList="refundApplication1" :type="3" />
					</div>
					<!-- 4.4 退款查询 -->
					<div id="4.4">
						<primary-title title="4.4 退款查询" :type="2" />
						<p>网关提交地址为：https://payment.tapxyz.com/GatewayAPI2</p>
						<p>如果以Form表单进行提交，建议采用Post隐藏域方式异步进行提交。</p>
						<p>退款查询参数说明</p>
						<table-component :tableList="refundInquiry" :type="3" />
						<p>退款查询返回参数说明</p>
						<table-component :tableList="refundInquiry1" :type="3" />
					</div>
					<!-- 4.5 订单查询 -->
					<div id="4.5">
						<primary-title title="4.5 订单查询" :type="2" />
						<p>网关提交地址为：https://payment.tapxyz.com/GatewayAPI2</p>
						<p>如果以Form表单进行提交，建议采用Post隐藏域方式异步进行提交。</p>
						<table-component :tableList="orderQuery" :type="3" />
						<p>订单查询返回参数说明</p>
						<table-component :tableList="orderQuery1" :type="3" />
					</div>
				</div>
				<!-- 5 开发提示 -->
				<div id="5">
					<primary-title title="5 开发提示" :type="1" />
					<!-- 5.1 签名字符串 -->
					<div id="5.1">
						<primary-title title="5.1 签名字符串" :type="2" />
						<p>
							签名字符串通过对关键参数进行加密，以保障交易数据不被非法篡改，以保障交易数据的安全。请务必按照本文档中规则，对参数组串并进行加密。
						</p>
					</div>
					<!-- 5.2 通知付款结果 -->
					<div id="5.2">
						<primary-title title="5.2 通知付款结果" :type="2" />
						<p>
							商户提交请求时即与TAPXYZ服务器端建立会话，完成交易后，会即时将付款结果返回到商户。商户可以在提交请求的脚本文件中，获取到该交易的付款结果然后进行后续处理。
						</p>
					</div>
					<!-- 5.3 商户对付款订单的提交 -->
					<div id="5.3">
						<primary-title title="5.3 商户对付款订单的提交" :type="2" />
						<p>
							目前TAPXYZ仅支持每次提交一笔付款交易请求。TAPXYZ已经对付款订单重复做了限制，对于一些在 提交时自
							动生成订单号的商户，务必做好标记和判断，以保证每一收款账户不重复收到付款。
						</p>
					</div>
				</div>
			</div>
			<!-- 锚点 -->
			<anchorPoint :list="anchorPoint" />
		</div>
	</div>
</template>
<script>
import Hander from "./hander.vue";
import tableComponent from "./components/tableComponent.vue";
import primaryTitle from "./components/primaryTitle.vue";
import imgWrap from "./components/imgWrap.vue";
import anchorPoint from "./components/anchorPoint.vue";
import {
	anchorPointJson,
	languageSkillJson,
	directModeJson,
	payPageLanguageJson,
	payPageLanguageJson1,
	cashierModeJson,
	refundApplicationJson,
	refundApplicationJson1,
	refundInquiryJson,
	refundInquiryJson1,
	orderQueryJson,
	orderQueryJson1,
} from "../../assets/text/payInterface";
export default {
	components: {
		Hander,
		tableComponent,
		primaryTitle,
		imgWrap,
		anchorPoint,
	},
	data() {
		return {
			anchorPoint: anchorPointJson,
			languageSkill: languageSkillJson,
			directMode: directModeJson,
			payPageLanguage: payPageLanguageJson,
			payPageLanguage1: payPageLanguageJson1,
			cashierMode: cashierModeJson,
			refundApplication: refundApplicationJson,
			refundApplication1: refundApplicationJson1,
			refundInquiry: refundInquiryJson,
			refundInquiry1: refundInquiryJson1,
			orderQuery: orderQueryJson,
			orderQuery1: orderQueryJson1,
		};
	},
};
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>