# 代码格式化插件 prettier


1. printWidth:120   
超过最大值换行

2. tabWidth:2  
tab缩进大小,默认为2

3. useTabs:true   
使用tab缩进，默认false

4. semi:true     
使用分号, 默认true

5. bracketSpacing:true  
在对象，数组括号与文字之间加空格 "{ foo: bar }"

6. disableLanguages: ["vue"]    
不格式化vue文件，vue文件的格式化单独设置

7. arrowParens:"avoid"  
(x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号

8. trailingComma: "es5"     
在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）

9. stylelintIntegration:false   
不让prettier使用stylelint的代码格式进行校验

10. tslintIntegration:false   
不让prettier使用tslint的代码格式进行校验

11. eslintIntegration:false   
不让prettier使用eslint的代码格式进行校验