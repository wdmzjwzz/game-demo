export enum StatusState{
    IDLE = "IDLE",
    TRAINING = "TRAINING",
    VERTIGO = "VERTIGO", //眩晕
    IMPRISON = "IMPRISON" //禁锢
}
export class Status { 
  public state = StatusState.IDLE;
  setState(state:StatusState) {
    this.state = state;
  }
}
