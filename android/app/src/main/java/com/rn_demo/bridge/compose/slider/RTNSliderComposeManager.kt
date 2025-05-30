//package com.gemhub.bridge.compose.slider
//
//import com.facebook.react.module.annotations.ReactModule
//import com.facebook.react.uimanager.SimpleViewManager
//import com.facebook.react.uimanager.ThemedReactContext
//import com.facebook.react.uimanager.ViewManagerDelegate
//import com.facebook.react.uimanager.annotations.ReactProp
//import com.facebook.react.viewmanagers.RTNSliderComposeManagerDelegate
//import com.facebook.react.viewmanagers.RTNSliderComposeManagerInterface
//
//@ReactModule(name = RTNSliderComposeManager.NAME)
//class RTNSliderComposeManager : SimpleViewManager<RTNSliderComposeView>(), RTNSliderComposeManagerInterface<RTNSliderComposeView> {
//    companion object {
//        const val NAME = "RTNSliderCompose"
//    }
//
//    private val mDelegate: ViewManagerDelegate<RTNSliderComposeView> = RTNSliderComposeManagerDelegate(this)
//
//    override fun getName(): String = NAME
//
//    override fun createViewInstance(reactContext: ThemedReactContext): RTNSliderComposeView {
//        return RTNSliderComposeView(reactContext)
//    }
//
//    override fun getDelegate(): ViewManagerDelegate<RTNSliderComposeView> = mDelegate
//
//    @ReactProp(name = "text")
//    override fun setText(view: RTNSliderComposeView, text: String?) {
//        view.setText(text)
//    }
//
//    @ReactProp(name = "min")
//    override fun setMin(view: RTNSliderComposeView, min: Int) {
//        view.setMin(min)
//    }
//
//    @ReactProp(name = "max")
//    override fun setMax(view: RTNSliderComposeView, max: Int) {
//        view.setMax(max)
//    }
//
//    @ReactProp(name = "value")
//    override fun setValue(view: RTNSliderComposeView, value: Int) {
//        view.setValue(value)
//    }
//}