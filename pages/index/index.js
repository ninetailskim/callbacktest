//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tasks_doing:[
      "123\n456\n3333333333333333",
      "456",
      "789",
      "123",
      "456",
      "789",
    ]
  },
  //事件处理函数
  enterdetail: function() {
    console.log("enterdetail");
  },
  addtaskbutton: function () {
    console.log("addtaskbutton");
  }
})
