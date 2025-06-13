package com.rn_demo.bridge.pulltorefresh.footer

import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.LinearLayoutCompat
import com.airbnb.lottie.LottieAnimationView
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshFooterManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshFooterManagerInterface
import com.rn_demo.utils.XLogger
import kotlin.math.roundToInt

@ReactModule(name = ReactPullToRefreshFooterManager.NAME)
class ReactPullToRefreshFooterManager : ViewGroupManager<ReactPullToRefreshFooter>(), NativePullToRefreshFooterManagerInterface<ReactPullToRefreshFooter> {
    companion object {
        const val NAME = "NativePullToRefreshFooter"
    }

    private val mDelegate: ViewManagerDelegate<ReactPullToRefreshFooter> = NativePullToRefreshFooterManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<ReactPullToRefreshFooter> = mDelegate

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): ReactPullToRefreshFooter {
        val view = ReactPullToRefreshFooter(reactContext).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }
        return view
    }

    override fun setIsLoadingMore(view: ReactPullToRefreshFooter?, value: Boolean) {

    }

    override fun addViews(parent: ReactPullToRefreshFooter, views: MutableList<View>) {
        super.addViews(parent, views)
        XLogger.d("添加  addViews :${views.size}")
    }

    override fun addView(parent: ReactPullToRefreshFooter, child: View, index: Int) {
        super.addView(parent, child, index)
        XLogger.d("添加的header:${child}")
        if (child is LottieAnimationView){
            val px = dpToPx(parent.context, 60f)
//            val layoutParams = LinearLayoutCompat.LayoutParams(LinearLayoutCompat.LayoutParams.MATCH_PARENT, px)
//            child.layoutParams = layoutParams
            child.minimumHeight =px
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