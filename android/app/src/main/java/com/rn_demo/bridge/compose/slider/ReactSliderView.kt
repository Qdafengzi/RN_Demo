package com.rn_demo.bridge.compose.slider

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material.Text
import androidx.compose.material.Slider
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event


@Composable
fun ComposeSliderView(context :ReactContext,id:Int,viewModel: ComposeViewModel){
    val uiState = viewModel.sliderStateValue.collectAsState().value
    Column(modifier = Modifier.fillMaxWidth()
//        .background(color = Color.Magenta)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth()
                .padding(vertical=10.dp)
            ,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(uiState.text ?: "")
            Text("${uiState.progress}")
        }
        Slider(
            value = uiState.progress,
            valueRange = uiState.min..uiState.max,
            onValueChange = {
                viewModel.updateProgress(it)
                emitOnProgress(context,id,it.toInt())
            },
            modifier = Modifier.fillMaxWidth().height(60.dp)
                .padding(vertical = 10.dp),
        )
    }
}


private fun emitOnProgress(reactContext: ReactContext,id:Int ,progress: Int) {
    val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
    val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
    val payload = Arguments.createMap().apply {
        putInt("progress", progress)
    }
    val event = SlideComposeChangedEvent(surfaceId, id, payload)
    eventDispatcher?.dispatchEvent(event)
}

class SlideComposeChangedEvent(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<SlideComposeChangedEvent>(surfaceId, viewId) {
    override fun getEventName() = "onProgress"
    override fun getEventData() = payload
}