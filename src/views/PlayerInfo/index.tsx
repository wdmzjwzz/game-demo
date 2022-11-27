import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { RootStateManager } from "../../StateManager";
import { GameManager } from "../../App/GameManager";
import { Player } from "../../App/Models/Player";

interface Props extends RootStateManager {

}

@inject("rootState")
@observer
class PlayerInfo extends Component<Partial<Props>>{

    componentDidMount(): void {

    }
    train(player: Player) {
        this.props.rootState?.gameManager?.addTimer(() => {
            const addedPower = player.powerPoint.baseGrowthValue * player.getGrowthSpeed()
            player.powerPoint.compute(addedPower)
        }, 1)
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

                    <button onClick={() => {
                        this.train(playerInfo)
                    }}>修炼</button>
                </div>
            })}
        </div>;
    }
}
export default PlayerInfo; 