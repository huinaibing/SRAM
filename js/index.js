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
  // 八个异或门位置
  for (i = 1; i <= 8; i++) {
    if (i <= 4) {
      $(`.xor:nth-child(${i})`).css({
        left: `270px`,
        top: `${i * 130}px`,
      })
    } else {
      $(`.xor:nth-child(${i})`).css({
        left: `870px`,
        top: `${(i - 4) * 130}px`,
      })
    }
  }
  // 14个与门位置
  for (i = 1; i <= 14; i++) {
    if (i <= 10) {
      $(`.and:nth-child(${i})`).css({
        left: `570px`,
        top: `${i * 50 + 150}px`,
      })
    } else {
      $(`.and:nth-child(${i})`).css({
        left: `270px`,
        top: `${(i - 10) * 130 + 110}px`,
      })
    }
  }
  // 4个或门位置
  for (i = 1; i <= 4; i++) {
    $(`.or:nth-child(${i})`).css({
      left: `800px`,
      top: `${i * 130}px`,
    })
  }
  // 导线连接
  // 输入A
  for (i = 1; i <= 8; i += 2) {
    $(`.inputA>li:nth-child(${i})`).css({
      width: '80px',
      height: '80px',
      left: '190px',
      top: `${(i / 2) * 130 + 65}px`,
    })
    $(`.inputA>li:nth-child(${i + 1})`).css({
      width: '60px',
      height: '40px',
      left: '210px',
      top: `${(i / 2) * 130 + 145}px`,
    })
  }
  // 输入B
  for (i = 1; i <= 8; i += 2) {
    $(`.inputB>li:nth-child(${i})`).css({
      width: '100px',
      height: '60px',
      left: '170px',
      top: `${(i / 2) * 130 + 105}px`,
    })
    $(`.inputB>li:nth-child(${i + 1})`).css({
      width: '45px',
      height: '40px',
      left: '225px',
      top: `${(i / 2) * 130 + 165}px`,
    })
  }























  // 8个异或门输出线
  // 27根



  $(`.xorOut>li:nth-child(${1})`).css({
    width: '20px',
    height: '0px',
    top: '610px',
    left: '320px',
  })
  // P0 at left 4 xor and the 4th up2dowm

  $(`.xorOut>li:nth-child(${7})`).css({
    width: '20px',
    height: '0px',
    top: '480px',
    left: '320px',
  }) // p1 left 3th 

  $(`.xorOut>li:nth-child(${14})`).css({
    width: '20px',
    height: '0px',
    top: '350px',
    left: '320px',
  }) // p2 left 2nd

  $(`.xorOut>li:nth-child(${20})`).css({
    width: '20px',
    height: '0px',
    top: '220px',
    left: '320px',
  }) // p3 left 1st






  ////////////////////////////// p0
  $(`.xorOut>li:nth-child(${2})`).css({
    width: '20px',
    height: '0px',
    top: '660px',
    left: '550px',
  }) // 倒数第1个

  $(`.xorOut>li:nth-child(${3})`).css({
    width: '20px',
    height: '0px',
    top: '620px',
    left: '550px',
  }) // 倒数第二个

  $(`.xorOut>li:nth-child(${4})`).css({
    width: '20px',
    height: '0px',
    top: '520px',
    left: '550px',
  })//倒数第4个

  $(`.xorOut>li:nth-child(${5})`).css({
    width: '20px',
    height: '0px',
    top: '600px',
    left: '850px',
  }) // 右边的异或门的

  $(`.xorOut>li:nth-child(${6})`).css({
    width: '20px',
    height: '0px',
    top: '385px',
    left: '550px',
  }) // 正数第四个
  //////////////////////////////////end p0

  /////////////////////////////////p1

  $(`.xorOut>li:nth-child(${28})`).css({
    width: '20px',
    height: '0px',
    top: '470px',
    left: '850px',
  }) // 右边的异或门的漏掉的

  $(`.xorOut>li:nth-child(${8})`).css({
    width: '20px',
    height: '0px',
    top: '600px',
    left: '550px',
  }) // 倒数第二个

  $(`.xorOut>li:nth-child(${9})`).css({
    width: '20px',
    height: '0px',
    top: '580px',
    left: '550px',
  }) // 倒数第三个

  $(`.xorOut>li:nth-child(${10})`).css({
    width: '40px',
    height: '0px',
    top: '510px',
    left: '530px',
  }) // 倒数第四个

  $(`.xorOut>li:nth-child(${11})`).css({
    width: '20px',
    height: '0px',
    top: '480px',
    left: '550px',
  }) // 倒数第五个

  $(`.xorOut>li:nth-child(${12})`).css({
    width: '40px',
    height: '0px',
    top: '375px',
    left: '530px',
  }) // 正数第四个

  $(`.xorOut>li:nth-child(${13})`).css({
    width: '20px',
    height: '0px',
    top: '340px',
    left: '550px',
  }) // 正数第三个

  /////////////////////////////////end p1

  ////////////////////////////////p2

  $(`.xorOut>li:nth-child(${29})`).css({
    width: '20px',
    height: '0px',
    top: '340px',
    left: '850px',
  }) // 右边的异或门的漏掉的

  $(`.xorOut>li:nth-child(${31})`).css({
    width: '20px',
    height: '0px',
    top: '280px',
    left: '550px',
  }) // 2th & 漏掉的

  $(`.xorOut>li:nth-child(${15})`).css({
    width: '60px',
    height: '0px',
    top: '500px',
    left: '510px',
  }) // 倒数第四个

  $(`.xorOut>li:nth-child(${16})`).css({
    width: '40px',
    height: '0px',
    top: '465px',
    left: '530px',
  }) // 倒数第五个

  $(`.xorOut>li:nth-child(${17})`).css({
    width: '20px',
    height: '0px',
    top: '430px',
    left: '550px',
  }) // 倒数第六个

  $(`.xorOut>li:nth-child(${18})`).css({
    width: '60px',
    height: '0px',
    top: '360px',
    left: '510px',
  })// 正数第四个

  $(`.xorOut>li:nth-child(${19})`).css({
    width: '40px',
    height: '0px',
    top: '330px',
    left: '530px',
  }) // 正数第三个

  ////////////////////////////////end p2

  ///////////////////////////////p3
  $(`.xorOut>li:nth-child(${32})`).css({
    width: '40px',
    height: '0px',
    top: '270px',
    left: '530px',
  }) // 2th & 漏掉的

  $(`.xorOut>li:nth-child(${30})`).css({
    width: '20px',
    height: '0px',
    top: '210px',
    left: '850px',
  }) // 右边的异或门的漏掉的

  $(`.xorOut>li:nth-child(${21})`).css({
    width: '80px',
    height: '0px',
    top: '350px',
    left: '490px',
  }) // 正数第四个

  $(`.xorOut>li:nth-child(${22})`).css({
    width: '60px',
    height: '0px',
    top: '310px',
    left: '510px',
  }) // 正数第三个

  $(`.xorOut>li:nth-child(${23})`).css({
    width: '20px',
    height: '0px',
    top: '230px',
    left: '550px',
  }) // 第一个
  //////////////////////////////end p3

  ////////////////////////////output
  for (i = 24; i <= 27; i++) {
    $(`.xorOut>li:nth-child(${i})`).css({
      width: '50px',
      height: '0px',
      top: `${(i - 23) * 130 + 90}px`,
      left: '920px',
    })
  }
  ////////////////////////////end output

  $(`.xorOut>li:nth-child(${33})`).css({
    width: '0px',
    height: '30px',
    top: "490px",
    left: '830px',
  })

  $(`.xorOut>li:nth-child(${34})`).css({
    width: '40px',
    height: '0px',
    top: "490px",
    left: '830px',
  })


  $(`.xorOut>li:nth-child(${35})`).css({
    width: '0px',
    height: '30px',
    top: "360px",
    left: '830px',
  })

  $(`.xorOut>li:nth-child(${36})`).css({
    width: '40px',
    height: '0px',
    top: "360px",
    left: '830px',
  })


  $(`.xorOut>li:nth-child(${37})`).css({
    width: '0px',
    height: '30px',
    top: "230px",
    left: '830px',
  })

  $(`.xorOut>li:nth-child(${38})`).css({
    width: '40px',
    height: '0px',
    top: "230px",
    left: '830px',
  })





  // 14个与门的输出

  ////////////////////////////G0

  $(`.andOut>li:nth-child(${1})`).css({
    width: '20px',
    height: '0px',
    top: '650px',
    left: '320px',
  }) // left 4 down 1th

  $(`.andOut>li:nth-child(${2})`).css({
    width: '20px',
    height: '0px',
    top: '550px',
    left: '550px',
  }) // right down 3th 

  $(`.andOut>li:nth-child(${3})`).css({
    width: '60px',
    height: '0px',
    top: '450px',
    left: '510px',
  }) // R D 5th 

  $(`.andOut>li:nth-child(${4})`).css({
    width: '80px',
    height: '0px',
    top: '300px',
    left: '490px',
  }) // R 3th

  $(`.andOut>li:nth-child(${5})`).css({
    width: '20px',
    height: '0px',
    top: '530px',
    left: '780px',
  }) // R >=1 gate

  ///////////////////////////end G0

  //////////////////////////G1
  $(`.andOut>li:nth-child(${6})`).css({
    width: '20px',
    height: '0px',
    top: '520px',
    left: '320px',
  }) // L 3th

  $(`.andOut>li:nth-child(${7})`).css({
    width: '20px',
    height: '0px',
    top: '410px',
    left: '550px',
  }) // r 5th

  $(`.andOut>li:nth-child(${8})`).css({
    width: '60px',
    height: '0px',
    top: '260px',
    left: '510px',
  }) // r 2th

  $(`.andOut>li:nth-child(${9})`).css({
    width: '20px',
    height: '0px',
    top: '400px',
    left: '780px',
  }) // r >=1 d 2th

  /////////////////////////end G1

  ////////////////////////G2
  $(`.andOut>li:nth-child(${10})`).css({
    width: '20px',
    height: '0px',
    top: '390px',
    left: '320px',
  }) // L 2

  $(`.andOut>li:nth-child(${11})`).css({
    width: '20px',
    height: '0px',
    top: '210px',
    left: '550px',
  }) // r 1st

  $(`.andOut>li:nth-child(${12})`).css({
    width: '20px',
    height: '0px',
    top: '260px',
    left: '780px',
  }) // r >=1  2th 
  ///////////////////////end G2

  ///////////////////////G3
  $(`.andOut>li:nth-child(${13})`).css({
    width: '20px',
    height: '0px',
    top: '260px',
    left: '320px',
  }) // left 1st

  $(`.andOut>li:nth-child(${14})`).css({
    width: '40px',
    height: '0px',
    top: '130px',
    left: '760px',
  }) // right >=1 1st
  //////////////////////end G3









  /////////////////////与门没有标号的输出线 使用andoutLB

  /********************************************** *
  *第一个与门与最上面的或门连线
  ************************************************ */

  $(`.andOutLT>li:nth-child(${1})`).css({
    width: '160px',
    height: '75px',
    top: '140px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${2})`).css({
    width: '20px',
    height: '0px',
    top: '140px',
    left: '780px',
  }) // 不拐弯的

  /**end第一个与门与最上面的或门连线************** */




  /********************************************* *
  *  第二个与门和第一个或门
  ********************************************* */
  $(`.andOutLT>li:nth-child(${3})`).css({
    width: '150px',
    height: '120px',
    top: '150px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${4})`).css({
    width: '30px',
    height: '0px',
    top: '150px',
    left: '770px',
  }) // 不拐弯的

  /********end 第二个与门和第一个或门 *************/






  /********************************************* *
  *  第三个与门和第一个或门
  ********************************************* */

  $(`.andOutLT>li:nth-child(${5})`).css({
    width: '140px',
    height: '160px',
    top: '160px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${6})`).css({
    width: '40px',
    height: '0px',
    top: '160px',
    left: '760px',
  }) // 不拐弯的


  /********end 第三个与门和第一个或门 *************/







  /********************************************* *
    *  第4个与门和第一个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${7})`).css({
    width: '130px',
    height: '200px',
    top: '170px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${8})`).css({
    width: '50px',
    height: '0px',
    top: '170px',
    left: '750px',
  }) // 不拐弯的


  /********end 第4个与门和第一个或门 *************/







  /********************************************* *
    *  第5个与门和第2个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${9})`).css({
    width: '120px',
    height: '140px',
    top: '280px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${10})`).css({
    width: '60px',
    height: '0px',
    top: '280px',
    left: '740px',
  }) // 不拐弯的


  /********end 第5个与门和第2个或门 *************/




  /********************************************* *
    *  第6个与门和第2个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${11})`).css({
    width: '110px',
    height: '180px',
    top: '290px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${12})`).css({
    width: '70px',
    height: '0px',
    top: '290px',
    left: '730px',
  }) // 不拐弯的


  /********end 第6个与门和第2个或门 *************/




  /********************************************* *
    *  第7个与门和第2个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${13})`).css({
    width: '100px',
    height: '220px',
    top: '300px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${14})`).css({
    width: '80px',
    height: '0px',
    top: '300px',
    left: '720px',
  }) // 不拐弯的


  /********end 第7个与门和第2个或门 *************/






  /********************************************* *
    *  第8个与门和第3个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${15})`).css({
    width: '90px',
    height: '160px',
    top: '410px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${16})`).css({
    width: '90px',
    height: '0px',
    top: '410px',
    left: '710px',
  }) // 不拐弯的


  /********end 第8个与门和第3个或门 *************/





  /********************************************* *
    *  第9个与门和第3个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${17})`).css({
    width: '80px',
    height: '190px',
    top: '430px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${18})`).css({
    width: '100px',
    height: '0px',
    top: '430px',
    left: '700px',
  }) // 不拐弯的


  /********end 第9个与门和第3个或门 *************/







  /********************************************* *
    *  第10个与门和第4个或门
    ********************************************* */

  $(`.andOutLT>li:nth-child(${19})`).css({
    width: '70px',
    height: '120px',
    top: '550px',
    left: '620px',
  }) // 拐弯的

  $(`.andOutLT>li:nth-child(${20})`).css({
    width: '110px',
    height: '0px',
    top: '550px',
    left: '690px',
  }) // 不拐弯的


  /********end 第10个与门和第4个或门 *************/


  ////////////////////end 未标号
















  // for (i = 1; i <= 16; i += 4) {
  //   $(`.andOut>li:nth-child(${i})`).css({
  //     width: '10px',
  //     height: '23px',
  //     top: '390px',
  //     left: `${(i / 4) * 270 + 332}px`,
  //   })
  //   $(`.andOut>li:nth-child(${i + 1})`).css({
  //     width: '11px',
  //     height: '23px',
  //     top: '411px',
  //     left: `${(i / 4) * 270 + 342}px`,
  //   })
  //   $(`.andOut>li:nth-child(${i + 2})`).css({
  //     width: '10px',
  //     height: '23px',
  //     top: '430px',
  //     left: `${(i / 4) * 270 + 332}px`,
  //   })
  //   $(`.andOut>li:nth-child(${i + 3})`).css({
  //     width: '11px',
  //     height: '23px',
  //     top: '430px',
  //     left: `${(i / 4) * 270 + 342}px`,
  //   })
  // }
  // 进位线，三个一组







  $(`.carry>li:nth-child(${1})`).css({
    width: '200px',
    height: '0px',
    top: '680px',
    left: '370px',
  }) // c0
  $(`.carry>li:nth-child(${6})`).css({
    width: '0px',
    height: '310px',
    top: '370px',
    left: '400px',
  }) // c0 竖着
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

  $(`.carry>li:nth-child(${5})`).css({
    width: '49px',
    height: '0px',
    top: '150px',
    left: '850px',
  }) // c4

})
