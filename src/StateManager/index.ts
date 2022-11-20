
import { RootState } from "./RootState";

export class RootStateManager {
    public rootState: RootState
    constructor() {
        this.rootState = new RootState()
        console.log(this.rootState);

    }

}
const rootStateManager = new RootStateManager()
export default rootStateManager