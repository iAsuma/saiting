// component/plate/plate.js
var words_len = 0
var old_idx = 0
var curr_value = { 'text': '苏'}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initPlate:{
      type:String,
      value:'苏',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    words: [],
    active:[],
  },
  attached:function(){
    var words = ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新','台'];
    this.setData({
      words: words
    })

    words_len = words.length;
    var _default = this.data.initPlate == "" ? '苏' : this.data.initPlate
    var active = []
    for(var i =0;i<words_len;i++){
      if (words[i] == _default){
        active[i] = 'active'
        old_idx = i;
      }else{
        active[i] = ''
      }
    }

    this.setData({
      active: active
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectCurrent:function(e){
      var curr_index = e.target.dataset.idx
      var curr_text = e.target.dataset.text

      this.setData({
        ['active[' + old_idx + ']']: ''
      })

      old_idx = curr_index //更新旧的index的值

      this.setData({
        ['active[' + curr_index + ']']: 'active'
      })

      curr_value = { 'idx': curr_index, 'text':curr_text } //设置当前选中的值
    },
    bindDonePlate:function(e){
      this.triggerEvent('doneplate', curr_value)
    },
    bindRemovePlate:function(){
      this.triggerEvent('cancelplate')
    }
  }
})
