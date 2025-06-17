package com.rn_demo.bridge.pulltorefresh.footer

import android.annotation.SuppressLint
import android.content.Context
import android.util.AttributeSet
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.LinearLayoutCompat
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.core.view.forEach
import com.airbnb.lottie.LottieAnimationView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.rn_demo.bridge.pulltorefresh.ReactPullToRefresh
import com.rn_demo.utils.XLogger
import com.scwang.smart.refresh.layout.api.RefreshFooter
import com.scwang.smart.refresh.layout.api.RefreshKernel
import com.scwang.smart.refresh.layout.api.RefreshLayout
import com.scwang.smart.refresh.layout.constant.RefreshState
import com.scwang.smart.refresh.layout.constant.SpinnerStyle
import com.scwang.smart.refresh.layout.util.SmartUtil.dp2px


class ReactPullToRefreshFooter : LinearLayoutCompat, RefreshFooter {
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    private var mRefreshKernel: RefreshKernel? = null
    private var mNoMoreData: Boolean = false

    private fun configureComponent() {
        gravity = Gravity.CENTER_HORIZONTAL
        orientation = HORIZONTAL

        viewTreeObserver.addOnGlobalLayoutListener {
            XLogger.d("view大小:${this.height}")
        }

        setBackgroundColor(Color.Red.toArgb())
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val measureMode= MeasureSpec.getMode(heightMeasureSpec)
        var  hSpec = heightMeasureSpec
        if (measureMode==MeasureSpec.AT_MOST){
            hSpec = MeasureSpec.makeMeasureSpec(measuredHeight,MeasureSpec.EXACTLY)
        }
        super.onMeasure(widthMeasureSpec, hSpec)
        if (parent is ReactPullToRefresh && mRefreshKernel==null){
            this.forEach {
                if (it is LottieAnimationView){
                    val la = it.layoutParams
                    la.width = dp2px(60f)
                    la.height = dp2px(60f)
                    it.layoutParams = la
                    gravity = Gravity.CENTER_HORIZONTAL
                    orientation = HORIZONTAL
                }
                XLogger.d("view:${it}")
            }
        }
    }


    val density = android.content.res.Resources.getSystem().displayMetrics.density

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     * @param dpValue 虚拟像素
     * @return 像素
     */
    private fun dp2px(dpValue: Float): Int {
        return (0.5f + dpValue * density).toInt()
    }

    @SuppressLint("RestrictedApi")
    override fun setNoMoreData(noMoreData: Boolean): Boolean {
        mNoMoreData = noMoreData
        if (mRefreshKernel != null) {
            mRefreshKernel?.refreshLayout?.setNoMoreData(noMoreData)
            return noMoreData
        }
        return false
    }

    @SuppressLint("RestrictedApi")
    override fun onStateChanged(refreshLayout: RefreshLayout,
        oldState: RefreshState,
        newState: RefreshState) {
        XLogger.d("onStateChanged:${newState}")
        when (newState) {
            RefreshState.None -> {}
            RefreshState.PullDownCanceled -> {}

            RefreshState.PullUpToLoad -> {
                onStateChangedEvent("PullUpToLoad")
            }

            RefreshState.PullUpCanceled -> {
                onStateChangedEvent("PullUpCanceled")
            }

            RefreshState.LoadReleased -> {
                onStateChangedEvent("LoadReleased")
            }

            RefreshState.Loading -> {
                onStateChangedEvent("Loading")
            }

            RefreshState.LoadFinish -> {
                onStateChangedEvent("LoadFinish")
            }

            RefreshState.ReleaseToRefresh -> {

            }

            RefreshState.ReleaseToLoad -> {}
            RefreshState.ReleaseToTwoLevel -> {}
            RefreshState.TwoLevelReleased -> {}
            RefreshState.RefreshReleased -> {
            }

            RefreshState.Refreshing -> {
            }

            RefreshState.TwoLevel -> {}
            RefreshState.RefreshFinish -> {
            }

            RefreshState.TwoLevelFinish -> {}
            else -> {}
        }
    }


    override fun getView(): View {
        return this
    }

    override fun getSpinnerStyle(): SpinnerStyle = SpinnerStyle.Translate

    @SuppressLint("RestrictedApi")
    override fun setPrimaryColors(vararg colors: Int) {

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
        val event = FooterStateEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    inner class FooterStateEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<FooterStateEvent>(surfaceId, viewId) {
        override fun getEventName() = "onStateChange"
        override fun getEventData() = payload
    }
}