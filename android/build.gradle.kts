
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.androidLib) apply false
}


buildscript {
    val buildToolsVersion by extra("36.0.0")
    val minSdkVersion by extra(libs.versions.min.sdk.get().toInt())
    val compileSdkVersion by extra(libs.versions.compile.sdk.get().toInt())
    val targetSdkVersion by extra(libs.versions.targetSdk.get().toInt())
    val ndkVersion by extra(libs.versions.ndkVersion.get())
    val kotlinVersion by extra(libs.versions.kotlin.get())
    val agpVersion by extra("8.11.0")
    val agp_version by extra("8.11.0")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    dependencies {
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
}

apply(plugin = "com.facebook.react.rootproject")