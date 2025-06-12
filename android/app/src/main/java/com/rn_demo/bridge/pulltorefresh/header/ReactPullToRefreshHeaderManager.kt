package com.rn_demo.bridge.pulltorefresh.header

import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.LinearLayoutCompat
import com.airbnb.lottie.LottieAnimationView
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshHeaderManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshHeaderManagerInterface
import com.rn_demo.utils.XLogger
import kotlin.math.roundToInt

@ReactModule(name = ReactPullToRefreshHeaderManager.NAME)
class ReactPullToRefreshHeaderManager : ViewGroupManager<ReactPullToRefreshHeader>(), NativePullToRefreshHeaderManagerInterface<ReactPullToRefreshHeader> {
    companion object {
        const val NAME = "NativePullToRefreshHeader"
    }

    private val mDelegate: ViewManagerDelegate<ReactPullToRefreshHeader> = NativePullToRefreshHeaderManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<ReactPullToRefreshHeader> = mDelegate

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): ReactPullToRefreshHeader {
        val view = ReactPullToRefreshHeader(reactContext).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }
        return view
    }

//    override fun createShadowNodeInstance(): LayoutShadowNode {
//        return PullToRefreshHeaderShadowNode()
//    }
//
//    override fun getShadowNodeClass(): Class<out LayoutShadowNode?> {
//        return PullToRefreshHeaderShadowNode::class.java
//    }

    override fun setIsRefreshing(view: ReactPullToRefreshHeader?, value: Boolean) {
        view?.setIsRefreshing(value)
    }

    override fun addViews(parent: ReactPullToRefreshHeader, views: MutableList<View>) {
        super.addViews(parent, views)
        XLogger.d("添加  addViews :${views.size}")
    }

    override fun addView(parent: ReactPullToRefreshHeader, child: View, index: Int) {
        super.addView(parent, child, index)
        XLogger.d("添加的header:${child}")
        if (child is LottieAnimationView){
            val px = dpToPx(parent.context, 60f)
            val layoutParams = LinearLayoutCompat.LayoutParams(LinearLayoutCompat.LayoutParams.MATCH_PARENT, px)
            child.layoutParams = layoutParams
            child.invalidate()
        }
    }

    fun dpToPx(context: Context, dp: Float): Int {
        val density = context.resources.displayMetrics.density
        return (dp * density).roundToInt()
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> =
        mapOf(
            "onStateChange" to
                    mapOf(
                        "phasedRegistrationNames" to
                                mapOf(
                                    "bubbled" to "onStateChange",
                                )))
}