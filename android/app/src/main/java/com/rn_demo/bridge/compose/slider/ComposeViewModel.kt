package com.rn_demo.bridge.compose.slider

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class ComposeViewModel : ViewModel() {
    private val _sliderStateValue: MutableStateFlow<SliderUIState> = MutableStateFlow(SliderUIState(0f, text = ""))
    val sliderStateValue = _sliderStateValue.asStateFlow()


    fun updateProgress(progress: Float) {
        _sliderStateValue.update { it.copy(progress = progress) }
    }

    fun updateText(text: String?) {
        _sliderStateValue.update { it.copy(text = text) }
    }

    fun updateMin(min: Float) {
        _sliderStateValue.update { it.copy(min = min) }
    }

    fun updateMax(max: Float) {
        _sliderStateValue.update { it.copy(max = max) }
    }


}