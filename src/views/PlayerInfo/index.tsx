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
        console.log(gameData, 111);
        const playerInfo = gameData.gameData as Player
        return <div className="playerInfo">
            <span>名字：{playerInfo.displayName}</span>
            <span>血量：{playerInfo.healthPoint.currentValue}</span>
            
        </div>;
    }
}
export default PlayerInfo; 