export enum StatusState{
    IDLE = "IDLE",
    ACTIVE = "ACTIVE",
    VERTIGO = "VERTIGO", //眩晕
    IMPRISON = "IMPRISON" //禁锢
}
export class Status { 
  public state = StatusState.IDLE;
  setState(state:StatusState) {
    this.state = state;
  }
}
