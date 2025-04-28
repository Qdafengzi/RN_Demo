package com.gemhub.bridge

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.CenteredTextManagerDelegate
import com.facebook.react.viewmanagers.CenteredTextManagerInterface
import com.gemhub.bridge.RTNCenteredTextManager
import com.gemhub.bridge.text.RTNCenteredTextView

@ReactModule(name = RTNCenteredTextManager.NAME)
class RTNCenteredTextManager : SimpleViewManager<RTNCenteredTextView>(),
    CenteredTextManagerInterface<RTNCenteredTextView?> {
    private val mDelegate: ViewManagerDelegate<RTNCenteredTextView> =
        CenteredTextManagerDelegate(this)

    override fun getName(): String {
        return NAME
    }

    public override fun getDelegate(): ViewManagerDelegate<RTNCenteredTextView>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RTNCenteredTextView {
        return RTNCenteredTextView(context)
    }

    @ReactProp(name = "text")
    override fun setText(view: RTNCenteredTextView, text: String?) {
        view.text = text
    }

    companion object {
        const val NAME: String = "CenteredText"
    }
}