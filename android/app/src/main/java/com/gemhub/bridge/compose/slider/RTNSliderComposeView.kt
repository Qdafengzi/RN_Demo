//package com.gemhub.bridge.compose.slider
//
//import android.content.Context
//import android.widget.FrameLayout
//import androidx.compose.foundation.layout.Arrangement
//import androidx.compose.foundation.layout.Row
//import androidx.compose.foundation.layout.fillMaxWidth
//import androidx.compose.material3.Slider
//import androidx.compose.material3.Text
//import androidx.compose.runtime.collectAsState
//import androidx.compose.ui.Modifier
//import androidx.compose.ui.platform.ComposeView
//import com.facebook.react.bridge.Arguments
//import com.facebook.react.bridge.ReactContext
//import com.facebook.react.bridge.WritableMap
//import com.facebook.react.uimanager.UIManagerHelper
//import com.facebook.react.uimanager.events.Event
//
//
//class RTNSliderComposeView(context: Context) : FrameLayout(context) {
//    companion object {
//        const val NAME: String = "RTNSliderCompose"
//    }
//
//    private val viewModel: ComposeViewModel = ComposeViewModel()
//    private val composeView: ComposeView
//
//    init {
//        // 创建 SeekBar
//        composeView = ComposeView(context).apply {
//            layoutParams = LayoutParams(
//                LayoutParams.MATCH_PARENT,
//                LayoutParams.WRAP_CONTENT
//            )
//
//            setContent {
//                val uiState = viewModel.sliderStateValue.collectAsState().value
//                Row(
//                    modifier = Modifier.fillMaxWidth(),
//                    horizontalArrangement = Arrangement.SpaceBetween
//                ) {
//                    Text(uiState.text ?: "")
//                    Text("${uiState.progress}")
//                }
//                Slider(
//                    value = uiState.progress,
//                    valueRange = uiState.min..uiState.max,
//                    onValueChange = {
//                        viewModel.updateProgress(it)
//                        emitOnProgress(it.toInt())
//                    }, modifier = Modifier.fillMaxWidth()
//                )
//            }
//        }
//
//        addView(composeView)
//    }
//
//    fun setText(text: String?) {
//        viewModel.updateText(text)
//    }
//
//    fun setMin(min: Int) {
//        viewModel.updateMin(min.toFloat())
//    }
//
//    fun setMax(max: Int) {
//        viewModel.updateMax(max.toFloat())
//    }
//
//    fun setValue(value: Int) {
//        viewModel.updateProgress(value.toFloat())
//    }
//
//
//    private fun emitOnProgress(progress: Int) {
//        val reactContext = context as ReactContext
//        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
//        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
//        val payload = Arguments.createMap().apply {
//            putInt("progress", progress)
//        }
//        val event = OnProgressEvent(surfaceId, id, payload)
//        eventDispatcher?.dispatchEvent(event)
//    }
//
//    inner class OnProgressEvent(
//        surfaceId: Int,
//        viewId: Int,
//        private val payload: WritableMap
//    ) : Event<OnProgressEvent>(surfaceId, viewId) {
//        override fun getEventName() = "onProgress"
//        override fun getEventData() = payload
//    }
//}