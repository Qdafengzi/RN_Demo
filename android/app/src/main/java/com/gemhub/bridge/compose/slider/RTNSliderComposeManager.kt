package com.gemhub.bridge.slider

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RTNSliderManagerInterface
import com.facebook.react.viewmanagers.RTNSliderManagerDelegate

@ReactModule(name = RTNSliderManager.NAME)
class RTNSliderManager : SimpleViewManager<RTNSliderView>(), RTNSliderManagerInterface<RTNSliderView> {
    companion object {
        const val NAME = "RTNSlider"
    }

    private val mDelegate: ViewManagerDelegate<RTNSliderView> = RTNSliderManagerDelegate(this)

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RTNSliderView {
        return RTNSliderView(reactContext)
    }

    override fun getDelegate(): ViewManagerDelegate<RTNSliderView> = mDelegate

    @ReactProp(name = "text")
    override fun setText(view: RTNSliderView, text: String?) {
        view.setText(text)
    }

    @ReactProp(name = "min")
    override fun setMin(view: RTNSliderView, min: Int) {
        view.setMin(min)
    }

    @ReactProp(name = "max")
    override fun setMax(view: RTNSliderView, max: Int) {
        view.setMax(max)
    }

    @ReactProp(name = "value")
    override fun setValue(view: RTNSliderView, value: Int) {
        view.setValue(value)
    }
}