Tabs组件用法

state = {
  nav : [
    {
      label : '当前订单',
      icon : 'A-2'
    },
    {
      label : '历史订单',
    }
  ]
}
tab(index) {
  console.log(index)
}
<Tabs labels={nav} tabClick={this.tab} tabIndex={1}>
  <TabsItem>2322323</TabsItem>
  <TabsItem>3343343</TabsItem>
</Tabs>
