package com.rn_demo.bridge.pulltorefresh

import android.content.Context
import android.graphics.Canvas
import android.graphics.Rect
import android.util.AttributeSet
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.rn_demo.bridge.pulltorefresh.header.ReactPullToRefreshHeader
import com.scwang.smart.refresh.footer.ClassicsFooter
import com.scwang.smart.refresh.layout.SmartRefreshLayout
import com.scwang.smart.refresh.layout.api.RefreshKernel

class ReactPullToRefresh : SmartRefreshLayout {

    private var mRect: Rect? = null
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    private fun configureComponent() {
        mRect = Rect()

        setRefreshHeader(ReactPullToRefreshHeader(context))
        setRefreshFooter(ClassicsFooter(context))
        setEnableHeaderTranslationContent(true)
        setEnableFooterTranslationContent(true)

        setEnableOverScrollBounce(false)


        setOnRefreshListener {
            onRefreshEvent()
        }
        setOnLoadMoreListener {
            onLoadMoreEvent()
        }
    }

    private fun onRefreshEvent() {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload = Arguments.createMap()
        val event = PullToRefreshOnRefreshEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    private fun onLoadMoreEvent() {
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


    fun getRefreshKernel(): RefreshKernel {
        return mKernel
    }

    override fun dispatchDraw(canvas: Canvas) {
        getDrawingRect(mRect)
        mRect?.let {
            canvas.clipRect(it)
        }
        super.dispatchDraw(canvas)
    }
}