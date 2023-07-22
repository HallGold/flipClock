import React, { Component } from "react";
import Flipper from "./Flipper";
import "./flipClock.css";

class FlipClock extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.flipObjs = [];
  }

  render() {
    return (
      <div className="FlipClock">
        <Flipper ref={ref => this.flipObjs[0] = ref} />
        <Flipper ref={ref => this.flipObjs[1] = ref} />
        <em>:</em>
        <Flipper ref={ref => this.flipObjs[2] = ref} />
        <Flipper ref={ref => this.flipObjs[3] = ref} />
        <em>:</em>
        <Flipper ref={ref => this.flipObjs[4] = ref} />
        <Flipper ref={ref => this.flipObjs[5] = ref} />
      </div>
    );
  }

  componentDidMount() {
    this.init();
    this.run();
  }

  // 初始化数字
  init() {
    const now = new Date();
    const nowTimeStr = this.formatDate(new Date(now.getTime()), "hhiiss");
    for (let i = 0; i < this.flipObjs.length; i++) {
      this.flipObjs[i].setFront(nowTimeStr[i]);
    }
  }

  // 开始计时
  run() {
    this.timer = setInterval(() => {
      // 获取当前时间
      const now = new Date();
      const nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), "hhiiss");
      const nextTimeStr = this.formatDate(now, "hhiiss");
      for (let i = 0; i < this.flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue;
        }
        this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
      }
    }, 1000);
  }

  // 正则格式化日期
  formatDate(date, dateFormat) {
    if (/(y+)/.test(dateFormat)) {
      dateFormat = dateFormat.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }
    const o = {
      "m+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "i+": date.getMinutes(),
      "s+": date.getSeconds(),
    };
    for (let k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k)) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          const str = o[k].toString();
          dateFormat = dateFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? str.padStart(2, "0") : str);
        }
      }
    }
    return dateFormat;
  }
}

export default FlipClock;
