
import { RootState } from "./RootState";

export class RootStateManager {
    public rootState: RootState
    constructor() {
        this.rootState = new RootState();
    }

}
const rootStateManager = new RootStateManager()
export default rootStateManager