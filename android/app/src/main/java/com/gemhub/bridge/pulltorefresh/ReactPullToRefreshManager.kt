package com.gemhub.bridge.pulltorefresh

import android.view.ViewGroup
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PullToRefreshManagerDelegate
import com.facebook.react.viewmanagers.PullToRefreshManagerInterface
import com.gemhub.utils.XLogger
import com.scwang.smart.refresh.footer.ClassicsFooter
import com.scwang.smart.refresh.header.ClassicsHeader

@ReactModule(name = ReactPullToRefreshManager.NAME)
class ReactPullToRefreshManager : ViewGroupManager<ReactPullToRefresh>(), PullToRefreshManagerInterface<ReactPullToRefresh> {
    companion object {
        const val NAME = "PullToRefresh"
    }

    private val mDelegate: ViewManagerDelegate<ReactPullToRefresh> =
        PullToRefreshManagerDelegate(this)

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): ReactPullToRefresh {

        val view = ReactPullToRefresh(reactContext).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            setRefreshHeader(ClassicsHeader(reactContext))
            setRefreshFooter(ClassicsFooter(reactContext))
        }
        return view
    }

    override fun getDelegate(): ViewManagerDelegate<ReactPullToRefresh> = mDelegate

    override fun setIsRefreshing(view: ReactPullToRefresh?, value: Boolean) {
        XLogger.d("setIsRefreshing----------->${value}")
        if (!value){
            view?.finishRefresh()
        }
    }

    override fun setIsLoadMore(view: ReactPullToRefresh?, value: Boolean) {
        XLogger.d("setIsLoadMore----------->")
        if (!value){
            view?.finishLoadMore()
        }
    }

    override fun setNoMoreData(view: ReactPullToRefresh?, value: Boolean) {
        XLogger.d("setNoMoreData----------->")
        view?.setNoMoreData(value)
    }
}