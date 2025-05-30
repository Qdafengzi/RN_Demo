package com.rn_demo.bridge.pulltorefresh

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.scwang.smart.refresh.layout.SmartRefreshLayout

class ReactPullToRefresh : SmartRefreshLayout {
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    private fun configureComponent() {
        setOnRefreshListener {
            onRefreshEvent()
        }
        setOnLoadMoreListener {
            onLoadMoreEvent()
        }
    }

    fun onRefreshEvent() {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload = Arguments.createMap()
        val event = PullToRefreshOnRefreshEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    fun onLoadMoreEvent() {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload = Arguments.createMap()
        val event = PullToRefreshOnLoadMoreEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }



    inner class PullToRefreshOnLoadMoreEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<PullToRefreshOnLoadMoreEvent>(surfaceId, viewId) {
        override fun getEventName() = "onLoadMore"
        override fun getEventData() = payload
    }

    inner class PullToRefreshOnRefreshEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<PullToRefreshOnRefreshEvent>(surfaceId, viewId) {
        override fun getEventName() = "onRefresh"
        override fun getEventData() = payload
    }
}