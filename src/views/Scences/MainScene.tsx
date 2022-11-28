import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { RootStateManager } from "../../StateManager";
import { gameManager } from "../../App/GameManager";
import styles from './index.module.scss'
interface Props extends RootStateManager {
}

@inject("rootState")
@observer
class Scene extends Component<Partial<Props>>{
  private canvasRef = React.createRef<HTMLDivElement>()
  componentDidMount(): void {
    if (this.canvasRef.current && !gameManager.pixiAPP) {
      gameManager.initPixiApp(this.canvasRef.current);
      gameManager.addTimer(() => {
        this.props.rootState!.setFPS(Number(gameManager.fps.toFixed(2)))
      }, 0.5)
      this.props.rootState!.setGameManager(gameManager)
      gameManager.start();
    }

  }

  render() {
    const { FPS } = this.props.rootState!
    return (
      <div id="container" ref={this.canvasRef} className={styles.container}>
        <span className="fps">FPS: {FPS}</span>
      </div>
    );
  }
}
export default Scene; 