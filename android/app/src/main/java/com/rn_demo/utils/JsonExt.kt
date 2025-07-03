package com.rn_demo.utils

import com.google.gson.Gson

fun <T> T.toJSON(): String = Gson().toJson(this)

inline fun <reified T> String.toObject(): T = Gson().fromJson(this, T::class.java)
