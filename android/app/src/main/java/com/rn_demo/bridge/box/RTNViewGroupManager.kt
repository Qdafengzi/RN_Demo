package com.rn_demo.bridge.box

import android.graphics.Color
import android.view.ViewGroup
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import androidx.core.graphics.toColorInt
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RTNViewGroupManagerDelegate
import com.facebook.react.viewmanagers.RTNViewGroupManagerInterface
import com.rn_demo.utils.XLogger

@ReactModule(name = RTNViewGroupManager.NAME)
class RTNViewGroupManager : ViewGroupManager<ReactViewGroupBox>(), RTNViewGroupManagerInterface<ReactViewGroupBox> {
    companion object {
        const val NAME = "RTNViewGroup"
    }

    private val mDelegate: ViewManagerDelegate<ReactViewGroupBox> = RTNViewGroupManagerDelegate(this)
    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): ReactViewGroupBox {
        return ReactViewGroupBox(reactContext).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }
    }

    override fun getDelegate(): ViewManagerDelegate<ReactViewGroupBox> = mDelegate



    @ReactProp(name = "color")
    override fun setColor(view: ReactViewGroupBox?, value: String?) {
        XLogger.d("setColor:${value} ${Thread.currentThread().name}" )
        view?.setBackgroundColor(value?.toColorInt()?:Color.RED)
        view?.invalidate()
    }

}