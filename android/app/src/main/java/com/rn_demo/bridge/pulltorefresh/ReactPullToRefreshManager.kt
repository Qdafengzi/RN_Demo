package com.rn_demo.bridge.pulltorefresh

import android.view.View
import android.view.ViewGroup
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.NativePullToRefreshManagerInterface
import com.facebook.react.viewmanagers.NativePullToRefreshManagerDelegate
import com.rn_demo.bridge.pulltorefresh.header.ReactPullToRefreshHeader
import com.rn_demo.utils.XLogger

@ReactModule(name = ReactPullToRefreshManager.NAME)
class ReactPullToRefreshManager : ViewGroupManager<ReactPullToRefresh>(), NativePullToRefreshManagerInterface<ReactPullToRefresh> {
    companion object {
        const val NAME = "NativePullToRefresh"
    }

    private val mDelegate: ViewManagerDelegate<ReactPullToRefresh> =
        NativePullToRefreshManagerDelegate(this)

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): ReactPullToRefresh {
        val view = ReactPullToRefresh(reactContext).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            setEnableOverScrollBounce(false)
            setEnableOverScrollDrag(true)
        }
        return view
    }

    private val reactChildMap = HashMap<Int, View>()

    override fun addView(parent: ReactPullToRefresh, child: View, index: Int) {
        XLogger.d("addView :${child}")
        if (child is ReactPullToRefreshHeader) {
            parent.setEnableRefresh(true)
            parent.setRefreshHeader(child)
            if (parent.isLaidOut) {
                child.onInitialized(parent.getRefreshKernel(), 0, 0)
            }
        } else {
            parent.setRefreshContent(child)
        }
        reactChildMap[index] = child
    }

    override fun removeViewAt(parent: ReactPullToRefresh, index: Int) {
        reactChildMap.forEach { t, u ->
            if (u is ReactPullToRefreshHeader){
                parent.setEnableRefresh(false)
                //parent.setOnRefreshListener(null)//
            }else{

            }
            super.removeViewAt(parent, index)
        }

        reactChildMap.remove(index)
    }
    override fun getDelegate(): ViewManagerDelegate<ReactPullToRefresh> = mDelegate

    override fun setIsRefreshing(view: ReactPullToRefresh?, value: Boolean) {
        XLogger.d("setIsRefreshing----------->${value}")
        if (!value){
            view?.finishRefresh(true)
        }
    }

    override fun setIsLoadMore(view: ReactPullToRefresh?, value: Boolean) {
        XLogger.d("setIsLoadMore----------->")
        if (!value){
            view?.finishLoadMore(true)
        }
    }

    override fun setNoMoreData(view: ReactPullToRefresh?, value: Boolean) {
        view?.setNoMoreData(value)
    }

    override fun setEnableLoadMore(view: ReactPullToRefresh?, value: Boolean) {
        view?.setEnableLoadMore(value)
    }

    override fun setEnableRefresh(view: ReactPullToRefresh?, value: Boolean) {
        view?.setEnableRefresh(value)
    }
}