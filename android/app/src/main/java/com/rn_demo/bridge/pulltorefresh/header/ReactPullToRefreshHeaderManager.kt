package com.rn_demo.bridge.pulltorefresh.header

import android.view.View
import android.view.ViewGroup
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshHeaderManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshHeaderManagerInterface

@ReactModule(name = ReactPullToRefreshHeaderManager.NAME)
class ReactPullToRefreshHeaderManager : ViewGroupManager<ReactPullToRefreshHeader>(), NativePullToRefreshHeaderManagerInterface<ReactPullToRefreshHeader> {
    companion object {
        const val NAME = "NativePullToRefreshHeader"
    }

    private val mDelegate: ViewManagerDelegate<ReactPullToRefreshHeader> = NativePullToRefreshHeaderManagerDelegate(this)

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

    override fun getDelegate(): ViewManagerDelegate<ReactPullToRefreshHeader> = mDelegate


    override fun setIsRefreshing(view: ReactPullToRefreshHeader?, value: Boolean) {
        view?.setIsRefreshing(value)
    }

    override fun addViews(parent: ReactPullToRefreshHeader, views: MutableList<View>) {
        super.addViews(parent, views)
    }

    override fun addView(parent: ReactPullToRefreshHeader, child: View, index: Int) {
        super.addView(parent, child, index)

    }
}