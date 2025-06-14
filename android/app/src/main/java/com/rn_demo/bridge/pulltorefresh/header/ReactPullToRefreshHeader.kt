package com.rn_demo.bridge.pulltorefresh.header

import android.annotation.SuppressLint
import android.content.Context
import android.util.AttributeSet
import android.view.Gravity
import android.view.View
import androidx.appcompat.widget.LinearLayoutCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.rn_demo.utils.XLogger
import com.scwang.smart.refresh.layout.api.RefreshHeader
import com.scwang.smart.refresh.layout.api.RefreshKernel
import com.scwang.smart.refresh.layout.api.RefreshLayout
import com.scwang.smart.refresh.layout.constant.RefreshState
import com.scwang.smart.refresh.layout.constant.SpinnerStyle



class ReactPullToRefreshHeader : LinearLayoutCompat, RefreshHeader {
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    private fun configureComponent() {
        gravity = Gravity.CENTER_HORIZONTAL
        orientation = VERTICAL

        viewTreeObserver.addOnGlobalLayoutListener {
            XLogger.d("view大小:${this.height}")
        }
    }

    @SuppressLint("RestrictedApi")
    override fun onStateChanged(refreshLayout: RefreshLayout,
        oldState: RefreshState,
        newState: RefreshState) {
        XLogger.d("onStateChanged:${newState}")
        when (newState) {
            RefreshState.None -> {}
            RefreshState.PullDownToRefresh -> {
                onStateChangedEvent("PullDownToRefresh")
            }

            RefreshState.PullUpToLoad -> {}
            RefreshState.PullDownCanceled -> {}
            RefreshState.PullUpCanceled -> {}
            RefreshState.ReleaseToRefresh -> {
                onStateChangedEvent("ReleaseToRefresh")
            }

            RefreshState.ReleaseToLoad -> {}
            RefreshState.ReleaseToTwoLevel -> {}
            RefreshState.TwoLevelReleased -> {}
            RefreshState.RefreshReleased -> {
                onStateChangedEvent("RefreshReleased")
            }
            RefreshState.LoadReleased -> {}
            RefreshState.Refreshing -> {
                onStateChangedEvent("Refreshing")
            }

            RefreshState.Loading -> {}
            RefreshState.TwoLevel -> {}
            RefreshState.RefreshFinish -> {
                onStateChangedEvent("RefreshFinish")
            }
            RefreshState.LoadFinish -> {}
            RefreshState.TwoLevelFinish -> {}
        }
    }


    override fun getView(): View {
        return this
    }

    override fun getSpinnerStyle(): SpinnerStyle = SpinnerStyle.Translate

    @SuppressLint("RestrictedApi")
    override fun setPrimaryColors(vararg colors: Int) {

    }

    private var mRefreshKernel: RefreshKernel? = null
    private var mIsRefreshing: Boolean = false

    fun setIsRefreshing(refreshing: Boolean) {
        mIsRefreshing = refreshing
    }

    @SuppressLint("RestrictedApi")
    override fun onInitialized(kernel: RefreshKernel, height: Int, maxDragHeight: Int) {
        mRefreshKernel = kernel
    }

    @SuppressLint("RestrictedApi")
    override fun onMoving(isDragging: Boolean,
        percent: Float,
        offset: Int,
        height: Int,
        maxDragHeight: Int) {

    }

    @SuppressLint("RestrictedApi")
    override fun onReleased(refreshLayout: RefreshLayout, height: Int, maxDragHeight: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun onStartAnimator(refreshLayout: RefreshLayout, height: Int, maxDragHeight: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun onFinish(refreshLayout: RefreshLayout, success: Boolean): Int {
        return 500
    }

    @SuppressLint("RestrictedApi")
    override fun onHorizontalDrag(percentX: Float, offsetX: Int, offsetMax: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun isSupportHorizontalDrag(): Boolean {
        return false
    }

    @SuppressLint("RestrictedApi")
    override fun autoOpen(duration: Int, dragRate: Float, animationOnly: Boolean): Boolean {
        return true
    }

    private fun onStateChangedEvent(state: String) {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload = Arguments.createMap()
        payload.putString("state", state)
        val event = HeaderStateEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    inner class HeaderStateEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<HeaderStateEvent>(surfaceId, viewId) {
        override fun getEventName() = "onStateChange"
        override fun getEventData() = payload
    }
}