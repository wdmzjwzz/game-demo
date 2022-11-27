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
        return <div>

            {playerInfos.map(playerInfo => {
                return <div className="playerInfo" key={playerInfo.id}>
                    <span>名字：{playerInfo.displayName}</span>
                    <span>血量：{playerInfo.healthPoint?.currentValue}</span>
                    <span>修为：{playerInfo.powerPoint.level}</span>
                    <span>法力值：{playerInfo.powerPoint.currentValue}/{playerInfo.powerPoint.maxValue}</span>
                    <span>魂力：{playerInfo.soul.healthPoint.currentValue}</span>

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
                </div>
            })}
        </div>;
    }
}
export default PlayerInfo; 