package com.rn_demo.bridge.pulltorefresh


interface OnRefreshChangeListener {
    fun onRefresh()

    fun onOffsetChange(offset: Int)

    fun onStateChanged(state: PullToRefreshState?)
}
