// component/plate/plate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    words: []
  },
  attached:function(){
    var words = ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新'];
    this.setData({
      words: words
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectCurrent:function(e){
      console.log(e)
    }
  }
})
