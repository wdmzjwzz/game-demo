import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { RootStateManager } from "../../StateManager";
import { GameManager } from "../../App/GameManager";

interface Props extends RootStateManager {

}

@inject("rootState")
@observer
class Scene extends Component<Partial<Props>>{
  private canvasRef = React.createRef<HTMLCanvasElement>()
  componentDidMount(): void {
    if (this.canvasRef.current) {
      const app = new GameManager(this.canvasRef.current);
      app.addTimer(() => {
        this.props.rootState!.setFPS(Number(app.fps.toFixed(2)))
      }, 0.5)
      app.start()
    }

  }

  render() {
    const { FPS } = this.props.rootState!
    return <div>
      <span className="fps">FPS: {FPS}</span>
      <canvas ref={this.canvasRef} />
    </div>;
  }
}
export default Scene; 