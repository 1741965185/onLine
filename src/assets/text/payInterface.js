// 目录
export const anchorPointJson = [{
        title: '语术',
        id: '1',
    },
    {
        title: '产品介绍',
        id: '2',
        children: [{
                title: '直连模式',
                id: '2.1',
            },
            {
                title: '收银台模式',
                id: '2.2',
            }
        ]
    },
    {
        title: '直连接入说明',
        id: '3',
    },
    {
        title: '支付接口',
        id: '4',
        children: [{
                title: '直连模式',
                id: '4.1'
            },
            {
                title: '收银台模式',
                id: '4.2',
            },
            {
                title: '退款申请',
                id: '4.3',
            },
            {
                title: '退款查询',
                id: '4.4',
            },
            {
                title: '订单查询',
                id: '4.5',
            },
        ]
    },
    {
        title: '开发提示',
        id: '5',
        children: [{
                title: '签名字符串',
                id: '5.1'
            },
            {
                title: '通知付款结果',
                id: '5.2'
            },
            {
                title: '商户对付款订单的提交',
                id: '5.3'
            },
        ]
    },
    // {
    //     title: '常见问题',
    //     id: '6',
    //     children: [{
    //         title: '如何获取或修改网关 PrivateKey',
    //         id: '6.1'
    //     }]
    // }
]

export const languageSkillJson = [{
        title: 'TAPXYZ系统',
        text: '提供TAPXYZ支付服务的系统，以下均指本系统'
    },
    {
        title: '直连模式',
        text: '在线上业务中，支付信息都由商户系统来获取，以后台模式来完成付款。需注意的是，直连支持3ds时，需跳转一个中间页面，完成3ds处理。'
    },
    {
        title: '收银台模式',
        text: '在线上业务支付过程中，需跳转到TAPXYZ系统收银台，持卡人需在TAPXYZ系统的收银台上输入卡片信息完成付款'
    },
    {
        title: '商户号',
        text: '商户在TAPXYZ系统入网后，由TAPXYZ系统为商户分配的编号，此编号系统内唯一'
    },
    {
        title: '商户订单号',
        text: '指商户发起订单的请求号，在商户系统应保持唯一'
    }
]

export const directModeJson = [
    // 订单信息
    {
        title: '订单信息',
        name: 'MerNo',
        length: '12位',
        varName: '商户编码',
        flag: '必填',
        bz: '注册TAPXYZ时，由TAPXYZ支付平台分配给商户的唯一标识'
    },
    {
        title: '订单信息',
        name: 'AccountMerNo',
        length: '12位',
        varName: '子商户编号',
        flag: '可选',
        bz: '商户新增的子商户编号'
    },
    {
        title: '订单信息',
        name: 'PrivateKey',
        length: '64位',
        varName: '密钥(私钥)',
        flag: '必填',
        bz: '用于支付加密，不可传递，具体请参照:参数规则-1'
    },
    {
        title: '订单信息',
        name: 'OrderNo',
        length: '50位',
        varName: '订单编号',
        flag: '必填',
        bz: '可以是数字和字母的组合。同一个网店中不可以出现相同的订单号'
    },
    {
        title: '订单信息',
        name: 'GoodsList',
        length: '3000位',
        varName: '货物列表',
        flag: '可选',
        bz: '订单中商品信息：GoodsName：订单中货物的名称。Price：订单中货物的单价，小数点后最多可以保留2位，不能带货币符号。Qty：订单中货物的数量，只能为非零的正整数。'
    },
    {
        title: '订单信息',
        name: 'Freight',
        length: '10位',
        varName: '运费',
        flag: '必填',
        bz: '小数点后最多可以保留2位，如果没有运费，可以设为 0，但不能为空'
    },
    {
        title: '订单信息',
        name: 'Amount',
        length: '10位',
        varName: '金额',
        flag: '必填',
        bz: '订单总金额。包括货物金额，运费和其他任何费用的总和。最多只能为小数点后两位'
    },
    {
        title: '订单信息',
        name: 'CurrencyCode',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '购物下订单时的币种。该币种必须跟订单总金额对应。'
    },
    // 信用卡信息
    {
        title: '信用卡信息',
        name: 'CardNo',
        length: '16位',
        varName: '卡号',
        flag: '必填',
        bz: 'Visa、MasterCard、Jcb信用卡卡号'
    },
    {
        title: '信用卡信息',
        name: 'CardExpireMonth',
        length: '2位',
        varName: '卡有效期月',
        flag: '必填',
        bz: '信用卡卡号有效期月'
    },
    {
        title: '信用卡信息',
        name: 'CardExpireYear',
        length: '4位',
        varName: '卡有效期年',
        flag: '必填',
        bz: '信用卡卡号有效期年'
    },
    {
        title: '信用卡信息',
        name: 'CardSecurityCode',
        length: '3位',
        varName: 'CVV2',
        flag: '必填',
        bz: '信用卡CVV2/CSC'
    },
    {
        title: '信用卡信息',
        name: 'IssuingBank',
        length: '50位',
        varName: '发卡行',
        flag: '可选',
        bz: '信用卡发卡行'
    },
    // 持卡人信息和账单信息
    {
        title: '持卡人信息和账单信息',
        name: 'BillFirstName',
        length: '50位',
        varName: '名',
        flag: '必填',
        bz: '名'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillLastName',
        length: '50位',
        varName: '姓',
        flag: '必填',
        bz: '姓'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillAddress',
        length: '200位',
        varName: '联系地址',
        flag: '必填',
        bz: '详细联系地址(账单)'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillCity',
        length: '50位',
        varName: '城市',
        flag: '必填',
        bz: '所在的城市(账单)'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillState',
        length: '50位',
        varName: '省份/州',
        flag: '必填',
        bz: '所在州名称(账单)'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillCountry',
        length: '2位',
        varName: '国家',
        flag: '必填',
        bz: '账单国家(2位简称)，具体请参照:国际ISO国家简称'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillZip',
        length: '10位',
        varName: '邮政编码',
        flag: '必填',
        bz: '邮政编码'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillEmail',
        length: '50位',
        varName: '邮箱',
        flag: '必填',
        bz: '用于接收支付的结果（success或fail）'
    },
    {
        title: '持卡人信息和账单信息',
        name: 'BillPhone',
        length: '30位',
        varName: '电话',
        flag: '必填',
        bz: '联系电话'
    },
    // 收货信息
    {
        title: '收货信息',
        name: 'ShipFirstName',
        length: '50位',
        varName: '收货人名',
        flag: '必填',
        bz: '收货人名'
    },
    {
        title: '收货信息',
        name: 'ShipLastName',
        length: '50位',
        varName: '收货人姓',
        flag: '必填',
        bz: '收货人姓'
    },
    {
        title: '收货信息',
        name: 'ShipAddress',
        length: '200位',
        varName: '详细地址',
        flag: '必填',
        bz: '收货详细地址'
    },
    {
        title: '收货信息',
        name: 'ShipCity',
        length: '50位',
        varName: '收货城市',
        flag: '必填',
        bz: '收货城市'
    },
    {
        title: '收货信息',
        name: 'ShipState',
        length: '50位',
        varName: '收货省份/州',
        flag: '必填',
        bz: '收货省份/州'
    },
    {
        title: '收货信息',
        name: 'ShipCountry',
        length: '2位',
        varName: '收货国家',
        flag: '必填',
        bz: '收货国家'
    },
    {
        title: '收货信息',
        name: 'ShipZip',
        length: '10位',
        varName: '收货邮编',
        flag: '必填',
        bz: '收货人邮编'
    },
    {
        title: '收货信息',
        name: 'ShipEmail',
        length: '50位',
        varName: '收货人邮箱',
        flag: '必填',
        bz: '收货人邮箱'
    },
    {
        title: '收货信息',
        name: 'ShipPhone',
        length: '50位',
        varName: '收货人电话',
        flag: '必填',
        bz: '收货人电话'
    },
    // 加 密 信 息
    {
        title: '加密信息',
        name: 'SignInfo',
        length: '32位',
        varName: 'MD5 签名',
        flag: '必填',
        bz: '对表单参数进行加密运算，防止表单数据被篡改. 具体请参照：签名规则'
    },
    // 通 道 参 数
    {
        title: '通道参数',
        name: 'IPAddress',
        length: '15位',
        varName: 'IP地址',
        flag: '必填',
        bz: '获取客户真实地址'
    },
    {
        title: '通道参数',
        name: 'LanguageCode',
        length: '3位',
        varName: '支付页面语言',
        flag: '可选',
        bz: '默认为英文.具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'ReturnURL',
        length: '255位',
        varName: '支付完成后返回网店的URL',
        flag: '必填',
        bz: '通过在此页面获取支付返回参数. 具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'NotifyURL',
        length: '255位',
        varName: '支付完成后异步通知',
        flag: '可选',
        bz: '3DS时该参数为必传，通过在此页面获取支付返回参 数.具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'Version',
        length: '6位',
        varName: '版本',
        flag: '必填',
        bz: '因支付接口的不能满足业务需求而升级，用来区分接口。本版本号为：2.0'
    },
    {
        title: '通道参数',
        name: 'Remark',
        length: '1000位',
        varName: '备注',
        flag: '可选',
        bz: '客户在网店中填写的备注. 具体请参照:参数规则-6'
    },
    {
        title: '通道参数',
        name: 'DynamicDescriptor',
        length: '512位',
        varName: '账单名字',
        flag: '可选',
        bz: '增加动态账单地址'
    },
]

export const payPageLanguageJson = [{
        name: 'MerNo',
        length: '12位',
        varName: '商户编码',
        flag: '否',
        bz: '注册TAPXYZ时，由TAPXYZ支付平台分配给商户的唯一标识'
    },
    {
        name: 'TradeNo',
        length: '50位',
        varName: '交易流水号',
        flag: '否',
        bz: '每笔订单支付后产生的流水号码(唯一标示)'
    },
    {
        name: 'OrderNo',
        length: '50位',
        varName: '订单编号',
        flag: '否',
        bz: '对应订单提交参数的[订单编号-OrderNo]参数'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '订单总金额',
        flag: '否',
        bz: '对应订单提交参数的[订单金额-Amount]参数'
    },
    {
        name: 'CurrencyCode',
        length: '3位',
        varName: '币种',
        flag: '否',
        bz: '对应订单提交参数的[订单币种-CurrencyCode]参数'
    },
    {
        name: 'ResultCode',
        length: '1位',
        varName: '支付结果',
        flag: '否',
        bz: '其中：0表示支付失败，1表示支付成功， 2表示待处理'
    },
    {
        name: 'ResultMessage',
        length: '255位',
        varName: '支付结果说明',
        flag: '可选',
        bz: '主要为了解释失败原因。'
    },
    {
        name: 'ReSignInfo',
        length: '32位',
        varName: '数字签名信息',
        flag: '否',
        bz: '对返回信息进行加密运算，用于数据校验，防止支付返回数据被篡改'
    },
    {
        name: 'RetHtml',
        length: '500位',
        varName: 'html链接',
        flag: '可选',
        bz: '3d卡支付提交到银行返回的html连接'
    },
    {
        name: 'Abbreviations',
        length: '255位',
        varName: '账单地址',
        flag: '否',
        bz: '账单地址'
    },
]

export const payPageLanguageJson1 = [{
        name: 'MerNo',
        length: '12位',
        varName: '商户编码',
        flag: '否',
        bz: '注册TAPXYZ时，由TAPXYZ支付平台分配给商户的唯一标识'
    },
    {
        name: 'TradeNo',
        length: '50位',
        varName: '交易流水号',
        flag: '否',
        bz: '每笔订单支付后产生的流水号码(唯一标示)'
    },
    {
        name: 'OrderNo',
        length: '50位',
        varName: '订单编号',
        flag: '否',
        bz: '对应订单提交参数的[订单编号-OrderNo]参数'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '订单总金额',
        flag: '否',
        bz: '对应订单提交参数的[订单金额-Amount]参数'
    },
    {
        name: 'CurrencyCode',
        length: '3位',
        varName: '币种',
        flag: '否',
        bz: '对应订单提交参数的[订单币种-CurrencyCode]参数'
    },
    {
        name: 'ResultCode',
        length: '1位',
        varName: '支付结果',
        flag: '否',
        bz: '其中：0表示支付失败，1表示支付成功， 2表示待处理'
    },
    {
        name: 'ResultMessage',
        length: '255位',
        varName: '支付结果说明',
        flag: '可选',
        bz: '主要为了解释失败原因。'
    },
    {
        name: 'ReSignInfo',
        length: '32位',
        varName: '数字签名信息',
        flag: '否',
        bz: '对返回信息进行加密运算，用于数据校验，防止支付返回数据被篡改'
    },
]

export const cashierModeJson = [
    // 订单信息
    {
        title: '订单信息',
        name: 'MerNo',
        length: '12位',
        varName: '商户编码',
        flag: '必填',
        bz: '注册TAPXYZ时，由TAPXYZ支付平台分配给商户的唯一标识'
    },
    {
        title: '订单信息',
        name: 'AccountMerNo',
        length: '12位',
        varName: '子商户编号',
        flag: '可选',
        bz: '商户新增的子商户编号'
    },
    {
        title: '订单信息',
        name: 'PrivateKey',
        length: '64位',
        varName: '密钥(私钥)',
        flag: '必填',
        bz: '用于支付加密，不可传递，具体请参照:参数规则-1'
    },
    {
        title: '订单信息',
        name: 'OrderNo',
        length: '50位',
        varName: '订单编号',
        flag: '必填',
        bz: '可以是数字和字母的组合。同一个网店中不可以出现相同的订单号'
    },
    {
        title: '订单信息',
        name: 'GoodsList',
        length: '3000位',
        varName: '货物列表',
        flag: '可选',
        bz: '订单中商品信息：GoodsName：订单中货物的名称。Price：订单中货物的单价，小数点后最多可以保留2位，不能带货币符号。Qty：订单中货物的数量，只能为非零的正整数。'
    },
    {
        title: '订单信息',
        name: 'Freight',
        length: '10位',
        varName: '运费',
        flag: '必填',
        bz: '小数点后最多可以保留2位，如果没有运费，可以设为 0，但不能为空'
    },
    {
        title: '订单信息',
        name: 'Amount',
        length: '10位',
        varName: '金额',
        flag: '必填',
        bz: '订单总金额。包括货物金额，运费和其他任何费用的总和。最多只能为小数点后两位'
    },
    {
        title: '订单信息',
        name: 'CurrencyCode',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '购物下订单时的币种。该币种必须跟订单总金额对应。'
    },
    // 收货信息
    {
        title: '收货信息',
        name: 'ShipFirstName',
        length: '50位',
        varName: '收货人名',
        flag: '必填',
        bz: '收货人名'
    },
    {
        title: '收货信息',
        name: 'ShipLastName',
        length: '50位',
        varName: '收货人姓',
        flag: '必填',
        bz: '收货人姓'
    },
    {
        title: '收货信息',
        name: 'ShipAddress',
        length: '200位',
        varName: '详细地址',
        flag: '必填',
        bz: '收货详细地址'
    },
    {
        title: '收货信息',
        name: 'ShipCity',
        length: '50位',
        varName: '收货城市',
        flag: '必填',
        bz: '收货城市'
    },
    {
        title: '收货信息',
        name: 'ShipState',
        length: '50位',
        varName: '收货省份/州',
        flag: '必填',
        bz: '收货省份/州'
    },
    {
        title: '收货信息',
        name: 'ShipCountry',
        length: '2位',
        varName: '收货国家',
        flag: '必填',
        bz: '收货国家'
    },
    {
        title: '收货信息',
        name: 'ShipZip',
        length: '10位',
        varName: '收货邮编',
        flag: '必填',
        bz: '收货人邮编'
    },
    {
        title: '收货信息',
        name: 'ShipEmail',
        length: '50位',
        varName: '收货人邮箱',
        flag: '必填',
        bz: '收货人邮箱'
    },
    {
        title: '收货信息',
        name: 'ShipPhone',
        length: '50位',
        varName: '收货人电话',
        flag: '必填',
        bz: '收货人电话'
    },
    // 加 密 信 息
    {
        title: '加密信息',
        name: 'SignInfo',
        length: '32位',
        varName: 'MD5 签名',
        flag: '必填',
        bz: '对表单参数进行加密运算，防止表单数据被篡改. 具体请参照：签名规则'
    },
    // 通 道 参 数
    {
        title: '通道参数',
        name: 'LanguageCode',
        length: '3位',
        varName: '支付页面语言',
        flag: '可选',
        bz: '默认为英文.具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'ReturnURL',
        length: '255位',
        varName: '支付完成后返回网店的URL',
        flag: '必填',
        bz: '通过在此页面获取支付返回参数. 具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'NotifyURL',
        length: '255位',
        varName: '支付完成后异步通知',
        flag: '可选',
        bz: '3DS时该参数为必传，通过在此页面获取支付返回参 数.具体请参照：参数规则-5'
    },
    {
        title: '通道参数',
        name: 'Version',
        length: '6位',
        varName: '版本',
        flag: '必填',
        bz: '因支付接口的不能满足业务需求而升级，用来区分接口。本版本号为：2.0'
    },
    {
        title: '通道参数',
        name: 'Remark',
        length: '1000位',
        varName: '备注',
        flag: '可选',
        bz: '客户在网店中填写的备注. 具体请参照:参数规则-6'
    },
]

export const refundApplicationJson = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '退款类型 refund'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '退款金额',
        flag: '必填',
        bz: '对应订单提交参数的[退款金额-Amount]参数'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '对应订单提交参数的[订单币种-Currency_Code] 参数'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    },
    {
        name: 'SignInfo',
        length: '32位',
        varName: 'MD5 签名',
        flag: '必填',
        bz: '对表单参数进行加密运算，防止表单数据被篡改. 具体请参照：规则 8'
    },
    {
        name: 'Remark',
        length: '255位',
        varName: '备注',
        flag: '可选',
        bz: '备注'
    },
]

export const refundApplicationJson1 = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '退款类型 refund'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '退款金额',
        flag: '必填',
        bz: '对应订单提交参数的[退款金额-Amount]参数'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '对应订单提交参数的[订单币种-Currency_Code] 参数'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    },
    {
        name: 'Ref_RefundNo',
        length: '50位',
        varName: '退款号',
        flag: '必填',
        bz: '商户请求申请退款是生成为一退款号'
    },
    {
        name: 'Status',
        length: '255位',
        varName: '状态',
        flag: '必填',
        bz: 'Status "4", "退款处理中" "5", "退款失败" "6", "退款成功"'
    },
    {
        name: 'Response_Code',
        length: '50位',
        varName: '执行结果',
        flag: '必填',
        bz: '0000 执行成功'
    },
    {
        name: 'Response_Message',
        length: '255位',
        varName: '执行结果描述',
        flag: '必填',
        bz: 'Response_Message : Apply For Succeed'
    },
    {
        name: 'Response_Time',
        length: '50位',
        varName: '结果返回的时间',
        flag: '必填',
        bz: '返回的时间戳'
    },
]

export const refundInquiryJson = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '交易类型 enquire'
    },
    {
        name: 'Query_Type',
        length: '50位',
        varName: '查询类型',
        flag: '必填',
        bz: '查询类型 退款:Refund'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '商对应订单提交参数的[订单币种-Currency_Code] 参数户的唯一标识'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    },
    {
        name: 'Ref_RefundNo',
        length: '50位',
        varName: '退款号',
        flag: '必填',
        bz: '商户申请退款后返回的唯一号'
    },
]

export const refundInquiryJson1 = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '退款类型 enquire'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '退款金额',
        flag: '必填',
        bz: '对应订单提交参数的[退款金额-Amount]参数'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '对应订单提交参数的[订单币种-Currency_Code] 参数'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    },
    {
        name: 'Ref_RefundNo',
        length: '50位',
        varName: '退款号',
        flag: '必填',
        bz: '商户请求申请退款是生成为一退款号'
    },
    {
        name: 'Status',
        length: '255位',
        varName: '状态',
        flag: '必填',
        bz: 'Status "4", "退款处理中" "5", "退款失败" "6", "退款成功"'
    },
    {
        name: 'Response_Code',
        length: '50位',
        varName: '执行结果',
        flag: '必填',
        bz: '0000 执行成功'
    },
    {
        name: 'Response_Message',
        length: '255位',
        varName: '执行结果描述',
        flag: '必填',
        bz: 'Response_Message : Apply For Succeed'
    },
    {
        name: 'Response_Time',
        length: '50位',
        varName: '结果返回的时间',
        flag: '必填',
        bz: '返回的时间戳'
    },
]

export const orderQueryJson = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '交易类型 enquire'
    },
    {
        name: 'Query_Type',
        length: '50位',
        varName: '查询类型',
        flag: '必填',
        bz: '查询类型 退款sales'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '商对应订单提交参数的[订单币种-Currency_Code] 参数户的唯一标识'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    }
]

export const orderQueryJson1 = [
    {
        name: 'Version',
        length: '3位',
        varName: '版本',
        flag: '必填',
        bz: '本版本号为：2.0'
    },
    {
        name: 'Transaction_Type',
        length: '50位',
        varName: '交易类型',
        flag: '必填',
        bz: '退款类型 enquire'
    },
    {
        name: 'Merchant_Id',
        length: '50位',
        varName: '商户号',
        flag: '必填',
        bz: '商户的唯一标识'
    },
    {
        name: 'Order_No',
        length: '50位',
        varName: '商户订单号',
        flag: '必填',
        bz: '商户支付时的订单号 例 AbcXXXXXX'
    },
    {
        name: 'Amount',
        length: '10位',
        varName: '退款金额',
        flag: '必填',
        bz: '对应订单提交参数的[退款金额-Amount]参数'
    },
    {
        name: 'Currency_Code',
        length: '3位',
        varName: '币种',
        flag: '必填',
        bz: '对应订单提交参数的[订单币种-Currency_Code] 参数'
    },
    {
        name: 'Ref_TradeNo',
        length: '50位',
        varName: '平台订单号',
        flag: '必填',
        bz: '商户支付时平台生成的订单号例：SNXXXXXXXXXXXX'
    },
    {
        name: 'Status',
        length: '255位',
        varName: '状态',
        flag: '必填',
        bz: 'Status "1", "交易处理中""2", "交易失败","3", "交易成功",'
    },
    {
        name: 'Message',
        length: '255位',
        varName: '支付的描述',
        flag: '必填',
        bz: '返回失败的原因'
    },
    {
        name: 'Response_Code',
        length: '50位',
        varName: '执行结果',
        flag: '必填',
        bz: '0000 执行成功'
    },
    {
        name: 'Response_Message',
        length: '255位',
        varName: '执行结果描述',
        flag: '必填',
        bz: 'Response_Message : Query order status success'
    },
    {
        name: 'Response_Time',
        length: '50位',
        varName: '结果返回的时间',
        flag: '必填',
        bz: '返回的时间戳'
    },
]