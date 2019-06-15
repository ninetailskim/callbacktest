//index.js
//获取应用实例
import WxValidate from "../../utils/WxValidate.js"

const app = getApp()

var currentStatu = 'close';
var tmpfn = '';
var tmppt = '';
var tmtl = [];

Page({
  data: {
    tasks_doing:[],
    fileName:'No file',
    rightFileType:false,
  },

  onLoad: function (options){
    this.initValidate();
  },

  initValidate(){
    const rules ={
      phonecolumn:{
        required:true,
      },
      namecolumn:{
        required:true,
      },
      sheetcolumn:{
        required:true,
      }
    }

    const messages = {
      phonecolumn:{
        required:"",
      },
      namecolumn:{
        required:"",
      },
      sheetcolumn:{
        required:"",
      }
    }

    this.WxValidate = new WxValidate(rules, messages);
  },

  //事件处理函数
  enterdetail: function() {
    console.log("enterdetail");
  },

  uploadfile: function(){
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success:function(res){
        console.log('yes');
        console.log(res);
        console.log(res.tempFiles[0].name);
        var tmpfilename = res.tempFiles[0].name.split('.');
        tmpfn = res.tempFiles[0].name;
        tmppt = res.tempFiles[0].path;
        if (tmpfilename[tmpfilename.length - 1] == 'xls' || tmpfilename[tmpfilename.length - 1] == 'xlsx'){
          that.setData({
            fileName: res.tempFiles[0].name,
            rightFileType:true,
          });
        }else{
          rightFileType: false,
          tmpfn = '';
          tmppt = '';
          that.setData({
            fileName: '错误的文件格式',
          });
        }
      },
    })
  },

  powerDrawer:function(){
    var that = this;
    if(currentStatu == 'close'){
      currentStatu = 'open';
    }else{
      currentStatu = 'close';
    }

    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData({
            showModalStatus: false
          });
      }
    }.bind(this), 200)
    // 显示
    if (currentStatu == "open") {
      this.setData({
          showModalStatus: true
        });
    }
    console.log(currentStatu);
    that.setData({
      fileName: 'No file',
      rightFileType: false,
    });
  },

  addtaskbutton:function(e){
    const params = e.detail.value;
    if(!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0];
      console.log(error)
      return false;
    }
    console.log(params);
    wx.showToast({
      title: '创建成功！！！',
    })
    var that = this;
    var obj = {}
    obj.title = tmpfn;
    obj.path = tmppt;
    let tasks_doing = that.data.tasks_doing;
    tasks_doing.splice(0,0,obj);
    that.setData({
      tasks_doing,
      fileName: 'No file',
      rightFileType: false,
    });
    if (currentStatu == 'close') {
      currentStatu = 'open';
    } else {
      currentStatu = 'close';
    }
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData({
            showModalStatus: false
          });
      }
    }.bind(this), 200)
    // 显示
    if (currentStatu == "open") {
      this.setData({
          showModalStatus: true
        });
    }
    console.log(currentStatu);
  },
})
