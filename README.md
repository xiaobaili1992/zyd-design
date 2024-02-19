### 本地开发公共库
```
yarn global add yalc
```
#### 在公共库中使用
```
yarn build // 公共库打包
yalc public
```
### 在实际项目中使用
```
yalc add <package name>
```

### 或者在公共库中使用
```
yarn link
```
### 在实际项目中使用
```
yarn link <package name>
```