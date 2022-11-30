import Character from "../Entities/Characters/Character";

export enum GrowthType {
  JIN = "金",
  MU = "木",
  SHUI = "水",
  HUO = "火",
  TU = "土",

  FEN = "风",
  LEI = "雷",
  DARK = "暗",
  LIGHT = "光",
  ICE = "冰",
}

export enum GrowthLevel {
  LOW = "下品",
  MID = "中品",
  TOP = "上品",
  BEST = "极品",
}
export class GrowthSystem {
  character: Character;
  constructor(character: Character) {
    this.character = character;
  }
  
}
