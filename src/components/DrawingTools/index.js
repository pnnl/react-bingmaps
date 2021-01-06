import DrawingManager, {
  DrawingManagerContext,
} from './DrawingManager'
import _DrawingTools, {
  DrawingToolsContext,
} from './DrawingTools'

const DrawingTools = {
  DrawingManager,
  DrawingManagerContext,
  DrawingTools: _DrawingTools,
  DrawingToolsContext,
}

export default DrawingTools
