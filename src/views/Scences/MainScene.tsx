import { Component } from "react";
import { AppManager } from "../../App/Application";
import { inject, observer } from 'mobx-react';
import { RootStateManager } from "../../StateManager";

interface Props extends RootStateManager {

}

@inject("rootState")
@observer
class Scene extends Component<Partial<Props>>{

  componentDidMount(): void {
    AppManager.init();
    AppManager.play(); 
  }

  render() {
    const { FPS } = this.props.rootState! 
    return <div>
      <span>FPS: {FPS}</span>
    </div>;
  }
}
export default Scene; 