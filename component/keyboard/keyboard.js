// component/keyboard/keyboard.js
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
    keyNumber: '1234567890',
    keyEnInput1: 'QWERTYUIOP',
    keyEnInput2: 'ASDFGHJKL',
    keyEnInput3: 'ZXCVBNM'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    blankClick:function(){
      this.triggerEvent('blankclick',{})
    },
    inputCurrent:function(e){
      var value = e.target.dataset.value
      this.triggerEvent('listeninput', { value: value})
    },
    inputDelete:function(){
      this.triggerEvent('listendelete')
    },
    inputDone:function(){
      this.triggerEvent('listendone')
    }
  }
})
