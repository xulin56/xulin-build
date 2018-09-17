Pagnation组件用法
nextCb(currentPage,endPage) {
    console.log(currentPage,endPage)
}
preCb(currentPage,endPage) {
    console.log(currentPage,endPage)
}

<Pagnation total='100' pageSize='10' nextCb={(currentPage,endPage)=>this.nextCb(currentPage,endPage)} preCb={(currentPage,endPage)=>this.preCb(currentPage,endPage)}></Pagnation>


HButton Attributes

参数           说明                  类型               可选值                           默认值

total         总数据                 string                    

pageSize      显示的列数              string         

nextCb        点击下一页回调               

preCb         点击上一页回调               
