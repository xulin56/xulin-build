HInput组件用法

<PullScroll dataList={dataList} upPull={(dataHeight,scrollHeight,screenHeight)=>this.upPull(dataHeight,scrollHeight,screenHeight)} downPull={()=>this.downPull()} isFoot={isFoot}></PullScroll>



HInput Attributes

参数           说明                  类型               可选值                 默认值

dataList      列表数据                array                                 ['列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表']



isFoot        是否显示底部提示          boolean                                 true


HInput Methods

方法名         说明                                   

upPull        上拉回调                         

downPull      下拉回调                                                    
