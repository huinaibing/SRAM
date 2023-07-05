$(function () {
  // 逻辑功能实现==========================================
  // 定义数据
  var c = 0 // 进位
  var s = 0 //结果位
  var result = '' // 结果
  // 点击运行
  $('.run').on('click', function () {
    // 获取操作数
    a = $('.operand1>input').val().split('').reverse()
    b = $('.operand2>input').val().split('').reverse()
    // 检验数据格式
    aError = false
    bError = false
    for (i = 0; i < 4; i++) {
      if (a[i] != '0' && a[i] != '1') {
        aError = true
      }
    }
    for (i = 0; i < 4; i++) {
      if (b[i] != '0' && b[i] != '1') {
        bError = true
      }
    }
    if (a.length != 4 || aError) {
      tip(`操作数1异常！`)
      $('.operand1>input').addClass('animate__animated animate__flash error')
      setTimeout(function () {
        $('.operand1>input').removeClass('animate__flash')
      }, 1000)
      return
    } else {
      if (b.length != 4 || bError) {
        tip('操作数2异常！')
        $('.operand2>input').addClass('animate__animated animate__flash error')
        setTimeout(function () {
          $('.operand2>input').removeClass('animate__flash')
        }, 1000)
        return
      }
    }
    // 开始执行RCA逻辑
    
    // 处理输入的数据
    // if (xor(a[i], b[i]) == '1') {
    //   $(`.xor${i}`).css({
    //     'border-color': 'rgb(0, 255, 0)'
    //   })
    // } else {
    //   $(`.xor${i}`).css({
    //     'border-color': 'red'
    //   })
    // }
    // if (and(xor(a[i], b[i]), c) == 1) {
    //   $(`.and${i}`).css({
    //     'border-color': 'rgb(0, 255, 0)'
    //   })
    // } else {
    //   $(`.and${i}`).css({
    //     'border-color': 'red'
    //   })
    // }
    // if (and(a[i], b[i]) == '1') {
    //   $(`.and${i + 4}`).css({
    //     'border-color': 'rgb(0, 255, 0)'
    //   })
    // } else {
    //   $(`.and${i + 4}`).css({
    //     'border-color': 'red'
    //   })
    // }
    // if (xor(xor(a[i], b[i]), c) == '1') {
    //   $(`.xor${i + 4}`).css({
    //     'border-color': 'rgb(0, 255, 0)'
    //   })
    //   result += '1'
    // }
    // else {
    //   $(`.xor${i + 4}`).css({
    //     'border-color': 'red'
    //   })
    //   result += '0'
    // }
    // if (or(and(xor(a[i], b[i]), c), and(a[i], b[i])) == 1) {
    //   $(`.c${i + 1}`).css({
    //     'border-color': 'rgb(0, 255, 0)'
    //   })
    //   c = 1
    // } else {
    //   $(`.c${i + 1}`).css({
    //     'border-color': 'red'
    //   })
    //   c = 0
    // }
    for (i = 0; i < 4; i++) {
      if (a[i] == '1') {
        // set1lb(`a${i}`)
        $(`.a${i}`).css({
          'border-color': 'rgb(0, 255, 0)'
        })
      } else {
        // set0lb(`a${i}`)
        $(`.a${i}`).css({
          'border-color': 'red'
        })
      }
      if (b[i] == '1') {
        // set1lb(`b${i}`)
        $(`.b${i}`).css({
          'border-color': 'rgb(0, 255, 0)'
        })
      } else {
        // set0lb(`b${i}`)
        $(`.b${i}`).css({
          'border-color': 'red'
        })
      }
    } // for 循环处理四个全加器
  
   


    $('.result>div').text(result)
  }) // run.click

  $('input').on('input', function () {
    $(this).removeClass('error')
  })

  $('.reset').on('click', function () {
    tip("所有数据已重置！")
    c = 0;
    a = 0;
    b = 0;
    $('.inputA,.inputB,.carry,.xorOut,.andOut,.andOutLT').children().css({
      'border-color': 'black'
    })
    $('input').val('')
    $('.result>div').text('')
  })
  //定义基本逻辑
  var set_color = function(num, id) {
    if (num == 1) {
      $(`.${id}`).css({
        'border-color': 'rgb(0, 255, 0)'
      })
    }
    else{
      $(`.${id}`).css({
        'border-color': 'red'
      })
    }
  }

  var and = function (a1, a2) {
    return a1 * a2
  }
  var or = function (a1, a2) {
    return a1 + a2 >= 1 ? 1 : 0
  }
  var not = function (a1) {
    return a1 == 1 ? 0 : 1
  }
  var xor = function (a1, a2) {
    return a1 == a2 ? 0 : 1
  }
  // 设置线状态
  // var set1lb = function(e){
  //   $(`.${e}`).removeClass('zerolb').addClass('onelb')
  // }
  // var set0lb = function(e){
  //   $(`.${e}`).removeClass('onelb').addClass('zerolb')
  // }
  // var set1tr = function(e){
  //   $(`.${e}`).removeClass('zerotr').addClass('onetr')
  // }
  // var set0tr = function(e){
  //   $(`.${e}`).removeClass('onetr').addClass('zerotr')
  // }
  // 提示消息
  var tip = function (msg, dur = 2000) {
    $('.tip').text(msg)
    $('.tip').animate({
      top: '5%',
    })
    setTimeout(function () {
      $('.tip').animate({
        top: '-35%',
      })
    }, dur)
  } // tip
  // 样式设置==========================================
  // 开屏加载动画
  var gif = `<img src="./img/loading.gif" alt="">`
  $('.cover').append(gif)
  var coverFadeout = setTimeout(() => {
    $('.cover').addClass('animate__animated animate__rotateOutUpRight')
  }, 2300)
  // 背景的小圆点绘制
  for (i = 0; i < 40; i++) {
    for (j = 0; j < 80; j++) {
      dot = `<div class='bgDot' style='position:absolute;top:${i * 20}px;left:${j * 20}px;z-index:-1;'></div>`
      $(this.body).append(dot)
    }
  }
  
  for(i = 0; i < 4; i++)
  {
    for (j = 0; j <= 4; j++)
    {
      $(`.core${i}${j}`).css({
        top: `${i * 150 + 100}px`,
        left: `${j * 200 + 600}px`,
      })
    }
  }

  $(`.selector24_1`).css({
    top: '370px',
    left: '400px',
  }) // 在左上角的24selector
  
     
  $(`.selector24_2`).css({
    top: '700px',
    left: '400px',
  }) // 在左xia角的24selector


  $(`.selector24_3`).css({
    top: '700px',
    left: '1400px',
  }) // 在左xia角的24selector


  for(i = 1; i <= 8; i+=2)
  {
    $(`.driver${i}`).css({
      left: `${100 * i + 460}px`,
      top: '800px',
    }) 
    $(`.driver${i + 1}`).css({
      left: `${100 * i + 600}px`,
      top: '800px',
    }) 
  }

  for (i = 4; i <= 7; i++) {
    $(`.inputDins li:nth-child(${i})`).css({
      left: `${200 * i - 75}px`,
      top: '860px',
      height: '80px'
    })
  }

  for (i = 2; i <= 5; i++) {
    $(`.noOutputs li:nth-child(${i})`).css({
      left: `${200 * i + 185}px`,
      top: '860px',
      height: '40px'
    })
  }

  for(i = 1; i <= 10; i += 3)
  {
    $(`.selector24_1_outs li:nth-child(${i})`).css({
        left: '460px',
        top: `${360 + i * 10}px`,
        width: '80px'
    })
    if(i == 1 || i == 10)
    {
      $(`.selector24_1_outs li:nth-child(${i})`).css({
        left: '460px',
        top: `${360 + i * 10}px`,
        width: '60px'
      })
    }
  }
 
  $(`.no`).css({
    position: 'absolute',
    left: `460px`,
    top: '870px',
  })
  $(`.R1`).css({
    position: 'absolute',
    left: `260px`,
    top: '350px',
  }) 
  $(`.R0`).css({
    position: 'absolute',
    left: `260px`,
    top: '420px',
  }) 
  $(`.C0`).css({
    position: 'absolute',
    left: `260px`,
    top: '730px',
  }) 
  $(`.C1`).css({
    position: 'absolute',
    left: `260px`,
    top: '660px',
  }) 
  $(`.WE`).css({
    position: 'absolute',
    left: `260px`,
    top: '800px',
  }) 
  $(`.Din`).css({
    position: 'absolute',
    left: `260px`,
    top: '870px',
  }) 

 
})


function changeColor(button) {
  if (button.style.backgroundColor == 'red') {
    button.style.backgroundColor = 'green';
  } else {
    button.style.backgroundColor = 'red';
  }
}