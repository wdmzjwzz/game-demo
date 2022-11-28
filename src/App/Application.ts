/* eslint-disable */

import { Application } from "pixi.js";
import GameHelpTools from "../lib/GameHelpTools";

// 回调函数类型别名
// 回调函数需要第三方实现和设置，所有导出该回调函数
export type TimerCallback = (id: number, data: any) => void;

// 纯数据类
// 我们不需要导出Timer类，因为只是作为内部类使用
class Timer {
  public id: number = -1; // 计时器的id号

  // 标记当前计时器是否有效，很重要的一个变量，具体看后续代码
  public enabled: boolean = false;

  public callback: TimerCallback; // 回调函数，到时间会自动调用
  public callbackData: any = undefined; // 用作回调函数的参数

  public countdown: number = 0; // 倒计时器，每次update时会倒计时
  public timeout: number = 0; //
  public onlyOnce: boolean = false;

  constructor(callback: TimerCallback) {
    this.callback = callback;
  }
}

export class GApplication {
  public timers: Timer[] = [];

  private _timeId: number = -1;

  private _fps: number = 0;

  public isFlipYCoord: boolean = true;

  public canvas: HTMLCanvasElement | null = null;

  public isSupportMouseMove: boolean;

  protected _isRightMouseDown: boolean = false; // 为了支持鼠标按下drag事件

  protected _start: boolean = false;

  protected _requestId: number = -1;

  // 由于计算当前更新与上一次更新之间的时间差
  // 用于基于时间的物理更新
  protected _lastTime!: number;
  protected _startTime!: number;

  // 声明每帧回调函数
  public frameCallback: ((app: GApplication) => void) | null;
  
  public constructor() {
    // 默认状态下，不支持mousemove事件
    this.isSupportMouseMove = false;
    this.frameCallback = null; 
    document.oncontextmenu = function () {
      return false;
    }; // 禁止右键上下文菜单
  }

  public isRunning(): boolean {
    return this._start;
  }


  public get fps() {
    return this._fps;
  }


  public start(): void {
    if (this._start === false) {
      this._start = true;

      this._lastTime = -1;
      this._startTime = -1;

      this._requestId = requestAnimationFrame((msec: number): void => {
        this.step(msec);
      });
    }
  }

  protected step(timeStamp: number): void {

    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;

    let elapsedMsec = timeStamp - this._startTime;

    let intervalSec = timeStamp - this._lastTime;

    // 第一帧的时候,intervalSec为0,防止0作分母
    if (intervalSec !== 0) {
      // 计算fps
      this._fps = 1000.0 / intervalSec;
    }

    // 我们update使用的是秒为单位，因此转换为秒表示
    intervalSec /= 1000.0;

    //记录上一次的时间戳
    this._lastTime = timeStamp;

    this._handleTimers(intervalSec);

    // 先更新
    this.update(elapsedMsec, intervalSec);
    // 后渲染
    this.render();

    if (this.frameCallback !== null) {
      this.frameCallback(this);
    }
    // 递归调用，形成周而复始的前进
    this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
      this.step(elapsedMsec);
    });
  }

  // 停止动画循环
  public stop(): void {
    if (this._start) {
      cancelAnimationFrame(this._requestId);
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  public update(elapsedMsec: number, intervalSec: number): void { }

  //虚方法，子类能覆写（override），用于渲染
  public render(): void { }


  public clearCanvas() { }

  // 初始化时，timers是空列表
  // 为了减少内存析构，我们在removeTimer时，并不从timers中删除掉timer，而是设置enabled为false
  // 这样让内存使用量和析构达到相对平衡状态
  // 每次添加一个计时器时，先查看timers列表中是否有没有时候用的timer，有的话，返回该timer的id号
  // 如果没有可用的timer，就重新new一个timer，并设置其id号以及其他属性
  public addTimer(
    callback: TimerCallback,
    timeout: number = 1.0,
    onlyOnce: boolean = false,
    data: any = undefined
  ): number {
    let timer: Timer;
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i];
      if (timer.enabled === false) {
        timer.callback = callback;
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true;
        timer.onlyOnce = onlyOnce;
        return timer.id;
      }
    }

    // 不存在，就新创建一个Timer对象
    timer = new Timer(callback);
    timer.callbackData = data;
    timer.timeout = timeout;
    timer.countdown = timeout;
    timer.enabled = true;
    timer.id = ++this._timeId; // 由于初始化时id为-1,所以前++
    timer.onlyOnce = onlyOnce; //设置是否是一次回调还是重复回调
    // 添加到timers列表中去
    this.timers.push(timer);
    // 返回新添加的timer的id号
    return timer.id;
  }


  public removeTimer(id: number): boolean {
    let found: boolean = false;
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].id === id) {
        let timer: Timer = this.timers[i];
        timer.enabled = false; // 只是enabled设置为false，并没有从数组中删除掉
        found = true;
        break;
      }
    }
    return found;
  }

  private _handleTimers(intervalSec: number): void {
    // 遍历整个timers列表
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i];

      // 如果当前timer enabled为false，那么继续循环
      if (timer.enabled === false) {
        continue;
      }
      timer.countdown -= intervalSec;
      if (timer.countdown < 0.0) {
        // 调用回调函数
        timer.callback(timer.id, timer.callbackData);
        if (timer.onlyOnce === false) {
          timer.countdown = timer.timeout;
        } else {
          this.removeTimer(timer.id);
        }
      }
    }
  }
}
