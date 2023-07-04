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
    // c0恒为0
    $('.c0').css({
      'border-color': 'red'
    })
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
    result = (parseInt(a[3] + a[2] + a[1] + a[0], 2) + parseInt(b[3] + b[2] + b[1] + b[0], 2)).toString(2);
    
    // 输出的截断
    if (result.length > 4) {
      $(`.c4`).css({
        'border-color': 'rgb(0, 255, 0)'
      })
      result = result.substring(1)
    }else{
      set_color(0, "c4")
    }

    // 输出显示
    for (i = 7; i >= 4; i--) {
      if (result[7 - i] == '1') {
        $(`.xor${i}`).css({
          'border-color': 'rgb(0, 255, 0)'
        })
      }
      else {
        $(`.xor${i}`).css({
          'border-color': 'red'
        })
      }
    }

    // pi
    res_p = ''
    for (i = 0; i < 4; i++) {
      tmp = xor(a[i], b[i])
      res_p += tmp.toString()
      if (tmp == 1) {
        $(`.xor${i}`).css({
          'border-color': 'rgb(0, 255, 0)'
        })
      }
      else{
        $(`.xor${i}`).css({
          'border-color': 'red'
        })
      }
    }
   
    // end pi

    //Gi
    res_g = ''
    for (i = 0; i < 4; i++) {
      tmp = and(a[i], b[i])
      res_g += tmp.toString()
      if (tmp == 1) {
        $(`.and${i}`).css({
          'border-color': 'rgb(0, 255, 0)'
        })
      }
      else{
        $(`.and${i}`).css({
          'border-color': 'red'
        })
      }
    }
   
    //end gi



    // 十个与门
    
    
    res_and1 = and(res_g[2], res_p[3])
    set_color(res_and1, "and4")
    
    res_and2 = and(and(res_g[1], res_p[3]), res_p[2])
    set_color(res_and2, "and5")

    res_and3 = and(and(res_g[0], res_p[3]), and(res_p[2], res_p[1]))
    set_color(res_and3, "and6")

    c0 = 0
    res_and4 = and(and(and(res_p[3], res_p[2]), and(res_p[1], res_p[0])), c0)
    set_color(res_and4, "and7")

    res_and5 = and(res_g[1], res_p[2])
    set_color(res_and5, "and8")

    res_and6 = and(and(res_g[0], res_p[2]), res_p[1])
    set_color(res_and6, "and9")

    res_and7 = and(and(res_p[2], res_p[1]), and(res_p[0], c0))
    set_color(res_and7, "and10")

    res_and8 = and(res_g[0], res_p[1])
    set_color(res_and8, "and11")

    res_and9 = and(and(res_p[1], res_p[0]), c0)
    set_color(res_and9, "and12")

    res_and10 = and(c0, res_p[0])
    set_color(res_and10, "and13")

    // end

    // ci
    res_c1 = or(res_and10, res_g[0])
    set_color(res_c1, "c1")

    res_c2 = or(res_g[1], or(res_and8, res_and9))
    set_color(res_c2, "c2")

    res_c3 = or(or(res_g[2], res_and5), or(res_and6, res_and7))
    set_color(res_c3, "c3")

    //end ci


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

  
  
     
  


  










  

  

  $(`.carry>li:nth-child(${7})`).css({
    width: '170px',
    height: '0px',
    top: '370px',
    left: '400px',
  }) // c0 横着
  $(`.carry>li:nth-child(${8})`).css({
    width: '170px',
    height: '0px',
    top: '530px',
    left: '400px',
  }) // c0 倒数滴4个
  $(`.carry>li:nth-child(${9})`).css({
    width: '170px',
    height: '0px',
    top: '630px',
    left: '400px',
  }) // c0 倒数第二个

  $(`.carry>li:nth-child(${10})`).css({
    width: '0px',
    height: '50px',
    top: '680px',
    left: '400px',
  }) // c0 拐弯1
  $(`.carry>li:nth-child(${11})`).css({
    width: '470px',
    height: '0px',
    top: '730px',
    left: '400px',
  }) // c0 拐弯2
  $(`.carry>li:nth-child(${12})`).css({
    width: '0px',
    height: '103px',
    top: '630px',
    left: '870px',
  }) // c0 拐弯3  

  // $(`.carry>li:nth-child(${2})`).css({
  //   width: '0px',
  //   height: '40px',
  //   top: '492px',
  //   left: '860px',
  // }) // c1 

  // $(`.carry>li:nth-child(${3})`).css({
  //   width: '0px',
  //   height: '40px',
  //   top: '362px',
  //   left: '860px',
  // }) // c2
  // $(`.carry>li:nth-child(${4})`).css({
  //   width: '0px',
  //   height: '40px',
  //   top: '232px',
  //   left: '860px',
  // }) // c3

  

})
