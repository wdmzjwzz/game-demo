import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { RootStateManager } from "../../StateManager";
import { Player } from "../../App/Models/Player";
import { Button } from "@nextui-org/react";
import { ActionType, eventHandler } from "../../App/EventHandler";
import { StatusState } from "../../App/Entities/Characters/Status";

interface Props extends RootStateManager {

}

@inject("rootState")
@observer
class PlayerInfo extends Component<Partial<Props>>{

    componentDidMount(): void {

    }
    train(player: Player) {
        eventHandler.dispatch({
            type: ActionType.training,
            param: player
        })
    }
    render() {
        const { gameData } = this.props.rootState!
        const playerInfos = (gameData?.children || []) as Player[]

        return <div className="playerInfo">
            {playerInfos.map(playerInfo => {
                return <div className="player" key={playerInfo.id}>
                    <span>名字：{playerInfo.displayName}</span>
                    <span>血量：{playerInfo.healthPoint?.currentValue}</span>
                    <span>修为：{playerInfo.powerPoint.level}</span>
                    <span>天赋：{playerInfo.attributes.map(att => {
                        return att.type + "/" + att.level
                    })}</span>
                    <span>法力值：{playerInfo.powerPoint.currentValue}/{playerInfo.powerPoint.maxValue}</span>

                    <span>攻击力：{playerInfo.aggressivity}</span>
                    <span>防御力：{playerInfo.defensive}</span>
                    <Button
                        size={"md"}
                        onClick={() => {
                            this.train(playerInfo)
                        }}
                        style={{
                            marginBottom: 14
                        }}>
                        修炼
                    </Button>
                    {playerInfo.status.state === StatusState.TRAINING && <Button onClick={() => {
                        eventHandler.dispatch({
                            type: ActionType.abortTrain,
                            param: playerInfo
                        })
                    }}>停止修炼</Button>}

                    {playerInfo.status.state === StatusState.BREAKING && <Button onClick={() => {
                        eventHandler.dispatch({
                            type: ActionType.levelUp,
                            param: playerInfo
                        })
                    }}>突破</Button>}
                    {
                        playerInfo.skills.map(skill => {
                            return <Button
                                size={"md"}
                                key={skill.id}
                                onPress={() => {
                                    playerInfo.attack(skill, playerInfos.find(player => player.id !== playerInfo.id)!)
                                }}
                                style={{
                                    marginBottom: 14
                                }}>
                                {skill.name}
                            </Button>
                        })
                    }

                    <h3>灵魂信息</h3> 
                    <span>修为：{playerInfo.soul.powerPoint.level}</span>
                    <span>魂力：{playerInfo.soul.powerPoint.currentValue}/{playerInfo.soul.powerPoint.maxValue}</span>

                    <span>攻击力：{playerInfo.soul.aggressivity}</span>
                    <span>防御力：{playerInfo.soul.defensive}</span>
                    <Button
                        size={"md"}
                        onClick={() => {
                            eventHandler.dispatch({
                                type: ActionType.training,
                                param: playerInfo.soul
                            })
                        }}
                        style={{
                            marginBottom: 14
                        }}>
                        修炼
                    </Button>
                    {playerInfo.soul.status.state === StatusState.TRAINING && <Button onClick={() => {
                        eventHandler.dispatch({
                            type: ActionType.abortTrain,
                            param: playerInfo.soul
                        })
                    }}>停止修炼</Button>}

                    {playerInfo.soul.status.state === StatusState.BREAKING && <Button onClick={() => {
                        eventHandler.dispatch({
                            type: ActionType.levelUp,
                            param: playerInfo.soul
                        })
                    }}>突破</Button>}

                </div>
            })}
        </div>;
    }
}
export default PlayerInfo; 