package com.gemhub.bridge.compose.slider

data class SliderUIState(
    val progress: Float,
    val text: String?,
    val min: Float = 0f,
    val max: Float = 100f,
)