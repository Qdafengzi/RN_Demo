package com.rn_demo.bridge.compose.slider

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.SliderDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.bumptech.glide.integration.compose.ExperimentalGlideComposeApi
import com.bumptech.glide.integration.compose.GlideImage
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event


@OptIn(ExperimentalMaterial3Api::class, ExperimentalGlideComposeApi::class)
@Composable
fun ComposeSliderView(context: ReactContext, id: Int, viewModel: ComposeViewModel) {
    val uiState = viewModel.sliderStateValue.collectAsState().value
    Column(
        modifier = Modifier.fillMaxWidth()
//        .background(color = Color.Magenta)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 10.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(uiState.text ?: "")
            Text("${uiState.progress}")
        }
//        Slider(
//            value = uiState.progress,
//            valueRange = uiState.min..uiState.max,
//            onValueChange = {
//                viewModel.updateProgress(it)
//                emitOnProgress(context,id,it.toInt())
//            },
//            modifier = Modifier.fillMaxWidth().height(60.dp)
//                .padding(vertical = 10.dp),
//        )

        androidx.compose.material3.Slider(
            value = uiState.progress,
            valueRange = uiState.min..uiState.max,
            onValueChange = {
                viewModel.updateProgress(it)
                emitOnProgress(context, id, it.toInt())
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
                .padding(vertical = 10.dp),
            thumb = {
                if (uiState.thumbUri.isNotBlank()) {
                    GlideImage(
                        model = uiState.thumbUri, contentDescription = null,
                        modifier = Modifier.size(20.dp)
//                            .background(color = Color.Red)
                    )
                } else {
                    Box(
                        modifier = Modifier
                            .padding(0.dp)
                            .size(20.dp)
                            .background(color = Color.White, CircleShape)
                            .border(width = 2.dp, color = Color.Gray, shape = CircleShape),
                    )
                }
            },
            track = { sliderState ->
                SliderDefaults.Track(
                    modifier = Modifier
                        .height(2.dp)
                        .background(color = Color.Red, shape = RoundedCornerShape(1.dp)),
                    sliderState = sliderState,
                    thumbTrackGapSize = 0.dp,
                    drawStopIndicator = {},
                    colors = SliderDefaults.colors(
                        thumbColor = Color.Red, disabledThumbColor = Color.Blue,
                        activeTrackColor = Color.Magenta,
                        disabledActiveTrackColor = Color.DarkGray
                    )
                )
            },
        )
    }
}


private fun emitOnProgress(reactContext: ReactContext, id: Int, progress: Int) {
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