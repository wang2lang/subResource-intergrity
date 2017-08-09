前端启用SRI策略
---------


Development
===========

#### 测试subressource integrity
```
$ npm i
$ npm run build
$ http-server dist/
```

#### 测试CDN资源不完整从源站下载代码
```
$ npm i
$ npm run build:sri
$ http-server dist/
```

#### 测试CDN资源不完整从源站下载代码,PreLoad资源，然后依顺序执行
```
$ npm i
$ npm run build:pre
$ http-server dist/
```
