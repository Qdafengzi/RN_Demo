package com.gemhub.bridge.text

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.CenteredTextManagerDelegate
import com.facebook.react.viewmanagers.CenteredTextManagerInterface

@ReactModule(name = RTNCenteredTextManager.NAME)
class RTNCenteredTextManager(context: ReactApplicationContext) : SimpleViewManager<RTNCenteredTextView>(), CenteredTextManagerInterface<RTNCenteredTextView> {

    private val mDelegate: CenteredTextManagerDelegate<RTNCenteredTextView, RTNCenteredTextManager> = CenteredTextManagerDelegate(this)

    public override fun getDelegate(): ViewManagerDelegate<RTNCenteredTextView> = mDelegate

    override fun getName() = NAME


    public override fun createViewInstance(context: ThemedReactContext) = RTNCenteredTextView(context)

    companion object {
        const val NAME: String = "CenteredText"
    }


    @ReactProp(name = "text")
    override fun setText(view: RTNCenteredTextView?, value: String?) {
        view?.text = value
    }
}