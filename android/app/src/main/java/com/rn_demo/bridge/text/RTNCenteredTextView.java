package com.rn_demo.bridge.text;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;

import androidx.appcompat.widget.AppCompatTextView;

public class RTNCenteredTextView extends AppCompatTextView {

  public RTNCenteredTextView(Context context) {
    super(context);
    this.setTextAlignment(TEXT_ALIGNMENT_CENTER);
    this.setTextColor(Color.BLACK);
  }

  public RTNCenteredTextView(Context context, AttributeSet attrs) {
    super(context, attrs);
    this.setTextAlignment(TEXT_ALIGNMENT_CENTER);
    this.setTextColor(Color.BLACK);
  }

  public RTNCenteredTextView(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    this.setTextAlignment(TEXT_ALIGNMENT_CENTER);
    this.setTextColor(Color.BLACK);
  }
}