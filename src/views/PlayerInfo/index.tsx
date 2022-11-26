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

    render() {
        const { gameData } = this.props.rootState! 
        const playerInfos = (gameData?.children || []) as Player[]
        return <div>
            {playerInfos.map(playerInfo => {
                return <div className="playerInfo">
                    <span>名字：{playerInfo.displayName}</span>
                    <span>血量：{playerInfo.healthPoint?.currentValue}</span>
                    <span>修为：{playerInfo.powerPoint?.level.displayName}</span>
                    <span>法力值：{playerInfo.powerPoint?.level.value}</span>
                    <span>魂力：{playerInfo.soul.healthPoint.currentValue}</span>
                </div>
            })}
        </div>;
    }
}
export default PlayerInfo; 