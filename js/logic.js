function changeOtherColor(otherName, goalvalue) {
    var elements = document.getElementsByClassName(otherName);
    for (i = 0; i < elements.length; i++) {
        elements[i].style.borderColor = (goalvalue == 1) ? 'red' : 'green';
    }
}
class inputData {
    constructor(name, value) {
      this.name = name
      this.value = value
    }
    
    getValue() {
        return this.value
    }
    whileclick() {
      this.value = (this.value == 1) ? 0: 1
      this.changeSelfColor()
    }
    changeSelfColor() {
      if (this.value == 1) {
        document.querySelector(`.${this.name}`).style.backgroundColor = 'red'
      } else {
        document.querySelector(`.${this.name}`).style.backgroundColor = 'green'
      }
    }
  }
  
class R0class extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputR0', this.value)
      }
}
class R1class extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputR1', this.value)
      }
}
class C0class extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputC0', this.value)
      }
}
class C1class extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputC1', this.value)
      }
}
class WEclass extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputWE', this.value)
        datas[R1op.getValue() * 2 + R0op.getValue()][C1op.getValue() * 2 + C0op.getValue()].store(Dinop.getValue())
      }
}
class Dinclass extends inputData {
    whileclick() {
        this.value = (this.value == 1) ? 0: 1
        this.changeSelfColor()
        changeOtherColor('inputDin', this.value)
        changeOtherColor('noOutput', !this.value)
      }
}


class selector24 {
    constructor(name, outputArr, needControl) {
        this.name = name
        this.outputArr = outputArr
        this.needControl = needControl
    }

    changeOutput(in1, in2, ctrl) {
        for (var i = 0; i < 4; i ++) {
            changeOtherColor(this.outputArr[i], 0)
        }
        if (this.needControl == 0 || ctrl == 1) {
            changeOtherColor(this.outputArr[in1 * 2 + in2], 1)
        }
    }
}

class driver {
    constructor(name, outputName) {
        this.name = name
        this.outputName = outputName
    }

    changeOutput(ctrl, input) {
        if (ctrl == 1) {
            changeOtherColor(this.outputName, input)
        }
    }
}

class selector42 {
    constructor(name, inputArr) {
        this.name = name
        this.inputArr = inputArr
    }

    output() {
        changeOtherColor('out', datas[R1op.getValue() * 2 + R0op.getValue()][C1op.getValue() * 2 + C0op.getValue()].getValue())
    }
}

class dataStore extends inputData{
    store(data) {
        this.value = data
        document.querySelector(`.${this.name}`).style.backgroundColor = (data == 1) ? 'red' : 'green'
    }
}

let m = 4,n = 4;
let datas= Array.from(Array(m),() => Array(n));
for (var i = 0; i < 4; i ++) {
    for(var j = 0; j < 4; j ++) {
        datas[i][j] = new dataStore(`core${i}${j}`, 0)
    }
}

R0op = new R0class('R0', 0)
R1op = new R1class('R1', 0)
C0op = new C0class('C0', 0)
C1op = new C1class('C1', 0)
WEop = new WEclass('WE', 0)
Dinop = new Dinclass('Din', 0)
selector24_1op = new selector24("selector24_1", ["selector24_1_00", "selector24_1_01", "selector24_1_10", "selector24_1_11"], 0)
selector24_2op = new selector24("selector24_2", ["selector24_2_00", "selector24_2_01", "selector24_2_10", "selector24_2_11"], 1)
selector42op = new selector42('selector24_3', ["driver2_out", "driver4_out", "driver6_out", "driver8_out"])
driver1op = new driver('driver1', 'driver1_out')
driver2op = new driver('driver2', 'driver2_out')
driver3op = new driver('driver3', 'driver3_out')
driver4op = new driver('driver4', 'driver4_out')
driver5op = new driver('driver5', 'driver5_out')
driver6op = new driver('driver6', 'driver6_out')
driver7op = new driver('driver7', 'driver7_out')
driver8op = new driver('driver8', 'driver8_out')

function whileclick(btname) {
    switch (btname) {
        case 'R0':
            R0op.whileclick()
            break;

        case 'R1':
            R1op.whileclick()
            break;

        case 'C0':
            C0op.whileclick()
            break;

        case 'C1':
            C1op.whileclick()
            break;

        case 'WE':
            WEop.whileclick()
            break;  
            
        case 'Din':
            Dinop.whileclick()
            break;

        default:
            changeOtherColor('noOutput', 1)
            break;
    }
    
    selector24_1op.changeOutput(R1op.getValue(), R0op.getValue(), 0)
    selector24_2op.changeOutput(C1op.getValue(), C0op.getValue(), WEop.getValue())

    for (var i = 0; i < 4; i++) {
        var row = R1op.getValue() * 2 + R0op.getValue()
        if (datas[row][i].getValue() == 0) {
            document.querySelector(`.driver${i * 2 + 1}_out`).style.borderColor = 'orange'
            var elements = document.getElementsByClassName(`driver${i * 2 + 2}_out`);
            for (var j = 0; j < elements.length; j++) {
                elements[j].style.borderColor = 'orange'
            }
        } else {
            document.querySelector(`.driver${i * 2 + 1}_out`).style.borderColor = 'green'
            var elements = document.getElementsByClassName(`driver${i * 2 + 2}_out`);
            for (var j = 0; j < elements.length; j++) {
                elements[j].style.borderColor = 'red'
            }
        }
    }
    driver1op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 0&&WEop.getValue()?1:0, !Dinop.getValue())
    driver2op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 0&&WEop.getValue()?1:0, Dinop.getValue())
    driver3op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 1&&WEop.getValue()?1:0, !Dinop.getValue())
    driver4op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 1&&WEop.getValue()?1:0, Dinop.getValue())
    driver5op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 2&&WEop.getValue()?1:0, !Dinop.getValue())
    driver6op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 2&&WEop.getValue()?1:0, Dinop.getValue())
    driver7op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 3&&WEop.getValue()?1:0, !Dinop.getValue())
    driver8op.changeOutput((C1op.getValue() * 2 + C0op.getValue()) == 3&&WEop.getValue()?1:0, Dinop.getValue())

    
    selector42op.output()
}