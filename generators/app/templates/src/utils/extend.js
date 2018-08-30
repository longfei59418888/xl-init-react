/*
* Number处理
* */

// 金额格式化(千分符)
export function formatMoney(Number, n) {
  const _this = parseFloat(Number);
  const dot = n === 0;
  n = n > 0 && n <= 20 ? n : 2;
  const formatMoneyDate = `${parseFloat(`${_this}`.replace(/[^\d.-]/g, '')).toFixed(n)}`;
  const l = formatMoneyDate
    .split('.')[0]
    .split('')
    .reverse();
  const r = formatMoneyDate.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i += 1) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
  }
  return (
    t
      .split('')
      .reverse()
      .join('') + (dot ? '' : `.${r}`)
  );
}
// 浮点数相加
export function addFloat(number1, number2) {
  return (
    (parseFloat(number1) * 10000000000 + parseFloat(number2) * 10000000000) / 10000000000
  );
}
// 距离格式化
export function distanceFormat(distance) {
  distance = parseFloat(distance);
  if (!distance) return '';
  return distance > 999 ? `${(distance / 1000).toFixed(2)}km` : `${distance}m`;
}

/*
* 时间格式化
* */
export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return fmt;
}
// 得到某天的前天，后天
export function getCountDate(date, num) {
  return new Date(date.setDate(date.getDate() + num)).format('yyyy-MM-dd');
}
// 某月最后一天
export function getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1).toJSON().substring(0, 10);
}
// 某月多少天
export function getMonthDate(date) {
  const curMonth = date.getMonth();
  date.setMonth(curMonth + 1);
  date.setDate(0);
  return date.getDate();
}
// 某日是某年的第几周
export function getTheWeek(now) {
  let totalDays = 0;
  let years = now.getFullYear();
  if (years < 1000) years += 1900;
  const days = new Array(12);
  days[0] = 31;
  days[2] = 31;
  days[3] = 30;
  days[4] = 31;
  days[5] = 30;
  days[6] = 31;
  days[7] = 31;
  days[8] = 30;
  days[9] = 31;
  days[10] = 30;
  days[11] = 31;

  // 判断是否为闰年，针对2月的天数进行计算
  if (Math.round(now.getYear() / 4) === now.getYear() / 4) {
    days[1] = 29;
  } else {
    days[1] = 28;
  }

  if (now.getMonth() === 0) {
    totalDays += now.getDate();
  } else {
    const curMonth = now.getMonth();
    for (let count = 1; count <= curMonth; count += 1) {
      totalDays += days[count - 1];
    }
    totalDays += now.getDate();
  }
  // 得到第几周
  const week = Math.ceil(totalDays / 7);
  return week;
}

/*
* String 处理
* */
// 字符串超出点
export function formatEllipsis(obj, length) {
  if (!obj) return '';
  return obj.length > length ? obj.slice(length) : obj;
}
// 去敏处理
export function formatBankFour(str) {
  // 银行卡后四位
  return str.substr(str.length - 4);
}
export function formatBankSensitive(str) {
  // 银行卡
  return str.substr(0, 4) + '*'.repeat(str.length - 8) + str.substr(str.length - 4);
}
export function formatPhoneSensitive(str) {
  return str.substr(0, 3) + '*'.repeat(str.length - 7) + str.substr(str.length - 4);
}
// 添加百分号
export function formatNumberPercent(str) {
  return `${(str * 1000000000) / 10000000}%`;
}
// 名字掩码
export function formatName(str) {
  return str.substr(0, 1) + '*'.repeat(str.length - 1);
}
// 银行卡格式化
export function formatBankShow(card) {
  card = String(card);
  if (card.length < 1) return '';
  if (card.length > 0 && card.length < 5) return card;
  if (card.length > 4) {
    return `${card.slice(0, 4)} ${formatBankCard(card.slice(4))}`;
  }
  return '';
}

/*
* 类型判断
* */
const _ARRAY_NAME = '[object Array]';
const _OBJECT_NAME = '[object Object]';
const _FUNCTION_NAME = '[object Function]';
// 得到对象类型
function _isType(obj) {
  return Object.prototype.toString.call(obj);
}
export function isFunction(obj) {
  return _isType(obj) === _FUNCTION_NAME;
}
export function isObject(obj) {
  return _isType(obj) === _OBJECT_NAME;
}
export function isArray(obj) {
  return _isType(obj) === _ARRAY_NAME;
}
export function isEmptyObject(obj) {
  // 是否是空对象
  for (const t in obj) {
    return false;
  }
  return true;
}

/*
* Input 输入限制
* */

// 处理金额限制
export function formatMoneyInput(value, n) {
  n = n || 2;
  if (value.match(/^0\d/)) value = value.slice(1);
  if (n === 0) value = value.replace(/\./g, '');
  if (value.match(/[^\d.]/g)) return value.replace(/[^\d.]/g, '');
  if (value.match(/^\./)) return '0.';
  const values = value.split('.');
  if ((values.length === 2 && values[1].length > 2) || values.length === 3)
    return `${values[0]}.${values[1].substr(0, 2)}`;
  return value;
}

// 手机号限制
export function formatPhoneInput(value) {
  value = value.replace(/^\d/g, '');
  // Iphone联系人复制出现问题
  const val = value.split('');
  value = val.filter(item => {
    if (item && item !== '') {
      return item;
    }
    return false;
  });
  return value;
}

// 移除表情
// value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'');

// 银行卡限制
export function formatBankCardInput(card) {
  card = card.replace(/[^\d\w]/g, '');
  card = String(card);
  if (card.length < 1) return '';
  if (card.length > 0 && card.length < 5) return card;
  if (card.length > 4) {
    return `${card.slice(0, 4)} ${formatBankCardInput(card.slice(4))}`;
  }
}

/*
* HTML 属性
* */
// 获取当前css浏览器前缀
export function getVendorPrefix() {
  const body = document.body || document.documentElement;

  const styles = body.style;

  const vendor = ['webkit', 'khtml', 'moz', 'ms', 'o'];

  let i = 0;
  while (i < vendor.length) {
    if (typeof styles[`${vendor[i]}Transition`] === 'string') {
      return vendor[i];
    }
    i += 1;
  }
}

// 获取 translate 坐标
export function getTranslateInfo(t) {
  const reg = /translate\((.+)px?,(.+)px?\)/;
  const rst = reg.exec(t);
  if (rst) {
    return {
      x: parseFloat(rst[1]),
      y: parseFloat(rst[2])
    };
  }
  return {
    x: 0,
    y: 0
  };
}

// 获取查询字段
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 深扩展
function _extend(target, source) {
  if (_isType(source) === _ARRAY_NAME) {
    for (let i = 0; i < source.length; i += 1) {
      if (_isType(source[i]) === _ARRAY_NAME) {
        target[i] = source[i].concat(target[i] ? target[i] : []);
        _extend(target[i], source[i]);
      } else if (_isType(source[i]) === _OBJECT_NAME) {
        target[i] = target[i] ? target[i] : {};
        _extend(target[i], source[i]);
      } else {
        target[i] = source[i];
      }
    }
  } else {
    for (const v in source) {
      if (_isType(source[v]) === _ARRAY_NAME) {
        target[v] = source[v].concat(target[v] ? target[v] : []);
        _extend(target[v], source[v]);
      } else if (_isType(source[v]) === _OBJECT_NAME) {
        target[v] = target[v] ? target[v] : {};
        _extend(target[v], source[v]);
      } else {
        target[v] = source[v];
      }
    }
  }
  return target;
}
export function extend(target) {
  let targets;
  const arg = Array.from(arguments).slice(1, arguments.length);
  if (arg.length > 0) {
    targets = _extend(target, arg[0]);
  }
  if (arg.length > 1) {
    return extend(targets, arg[1]);
  }
  return targets;
}

function _convertBase64UrlToBlob(urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n] = bstr.charCodeAt(n);
    n -= 1;
  }
  return new Blob([u8arr], { type: mime });
}
function _rotateImg(img, direction, canvas) {
  // Alert(img);
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  const minStep = 0;
  const maxStep = 3;
  // Var img = document.getElementById(pid);
  if (img == null) return;
  // Img的高度和宽度不能在img元素隐藏后获取，否则会出错
  const { height, width } = img;
  // Var step = img.getAttribute('step');
  let step = 2;
  if (step == null) {
    step = minStep;
  }
  if (direction === 'right') {
    step += 1;
    // 旋转到原位置，即超过最大值
    if (step > maxStep) {
      step = minStep;
    }
  } else {
    step -= 1;
    if (step < minStep) {
      step = maxStep;
    }
  }
  // Img.setAttribute('step', step);
  /* var canvas = document.getElementById('pic_' + pid);
    if (canvas == null) {
        img.style.display = 'none';
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'pic_' + pid);
        img.parentNode.appendChild(canvas);
    }  */
  // 旋转角度以弧度值为参数
  const degree = (step * 90 * Math.PI) / 180;
  const ctx = canvas.getContext('2d');
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
    default:
      return '';
  }
}
/*
* 图片压缩返回blob对象
* */
export function photoCompress(file, objDiv) {
  let Orientation;
  function _canvasDataURL(path, data, callback) {
    const img = new Image();
    img.src = path;
    img.onload = function() {
      const that = this;
      // 默认按比例压缩
      let w = that.width;

      let h = that.height;

      const scale = w / h;
      // W = obj.width || w;
      // h = obj.height || (w / scale);
      if (w > 1440 || h > 1440) {
        if (w > h) {
          w = 1440;
          h = w / scale;
        } else {
          h = 1440;
          w = h * scale;
        }
      } else {
        callback(data);
        return;
      }
      const quality = 0.8; // 默认图片质量为0.7
      // 生成canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 创建属性节点
      const anw = document.createAttribute('width');
      anw.nodeValue = w;
      const anh = document.createAttribute('height');
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      // quality值越小，所绘制出的图像越模糊
      // var base64 = canvas.toDataURL('image/jpeg', quality);

      let base64 = null;
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:
            _rotateImg(this, 'left', canvas);
            break;
          case 8:
            _rotateImg(this, 'right', canvas);
            break;
          case 3:
            // TODO 未生效
            _rotateImg(this, 'right', canvas);
            _rotateImg(this, 'right', canvas);
            break;
          default:
            return '';
        }
      }
      base64 = canvas.toDataURL('image/jpeg', quality);

      // 回调函数返回base64的值
      callback(_convertBase64UrlToBlob(base64));
    };
  }
  EXIF.getData(file, function() {
    EXIF.getAllTags(this);
    Orientation = EXIF.getTag(this, 'Orientation');
  });

  const ready = new FileReader();
  /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值
    会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容. */
  ready.readAsDataURL(file);
  ready.onload = function() {
    const re = this.result;
    _canvasDataURL(re, file, objDiv);
  };
}
