package com.rn_demo.bridge.pulltorefresh.header

import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.NativeViewHierarchyOptimizer
import com.facebook.yoga.YogaEdge
import com.facebook.yoga.YogaPositionType

class PullToRefreshHeaderShadowNode : LayoutShadowNode() {
    override fun setLocalData(data: Any) {
        super.setLocalData(data)
        if (data is PullToRefreshHeaderLocalData) {
            setStyleHeight((data.viewRect.bottom - data.viewRect.top).toFloat())
        }
    }

    override fun onBeforeLayout(nativeViewHierarchyOptimizer: NativeViewHierarchyOptimizer) {
        setPositionType(YogaPositionType.ABSOLUTE)
        setPosition(YogaEdge.LEFT.intValue(), 0f)
        setPosition(YogaEdge.RIGHT.intValue(), 0f)
        setPosition(YogaEdge.TOP.intValue(), -layoutHeight)
    }
}
