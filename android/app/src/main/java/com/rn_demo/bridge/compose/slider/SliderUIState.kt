package com.rn_demo.bridge.compose.slider

import android.graphics.Bitmap

data class SliderUIState(
    val progress: Float,
    val text: String?,
    val min: Float = 0f,
    val max: Float = 100f,
    val thumbBitmap:Bitmap? = null,
    val thumbUri:String = "",
)