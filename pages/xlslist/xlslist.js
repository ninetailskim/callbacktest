// pages/xlslist/xlslist.js

import XLSX from "../../utils/xlsx"

var app;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName:'',
    tabelitem:[],
    havetable:[],
    failtable:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (parames) {
    app = getApp();
    var that = this;
    console.log("onLoad xlslist");
    console.log(parames);
    console.log(parames.path);
    that.setData({
      taskName:parames.title
    });
    const FSM = wx.getFileSystemManager();
    FSM.readFile({
      filePath:parames.path,
      success:function(res){
        var data = new Uint8Array(res.data);
        console.log(data)
        var workbook = XLSX.read(data, {type:'array'});
        var persons = [];
        var fromTo = '';
        for(var sheet in workbook.Sheets){
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref'];
            console.log(fromTo);
            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            break; // 如果只取第一张表，就取消注释这行
          }
        }
        console.log(persons);
        console.log(persons[0]);
        console.log(typeof persons[0]);
        console.log(persons[0].name);
        // console.log(typeof persons);
        // console.log(typeof JSON.stringify(persons));
        // var tmitemt = JSON.stringify(persons);
        // console.log(tmitemt);
        // console.log(typeof tmitemt);
        // console.log(JSON.parse(tmitemt));
        // console.log(typeof JSON.parse(tmitemt));
        // for (var tmitem in tmitemt){
        //   var obj = {};
        //   //console.log(tmitem);
        //   //console.log(tmitem['111']);
        //   obj.name = tmitem['111'];
        //   obj.title = tmitem['222'];
        //   obj.phone = tmitem['333'];
        //   let tabelitem = that.data.tabelitem;
        //   tabelitem.push(obj);
        // }
        that.setData({
          tabelitem:persons,
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  letcall: function(){
    
  },
})