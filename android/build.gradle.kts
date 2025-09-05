buildscript {
    val buildToolsVersion by extra("35.0.0")
    val minSdkVersion by extra(28)
    val compileSdkVersion by extra(35)
    val targetSdkVersion by extra(35)
    val ndkVersion by extra("26.1.10909125")
    val kotlinVersion by extra("1.9.24")
    val agpVersion by extra("8.11.0")
    val agp_version by extra("8.11.0")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:$agp_version")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
//        classpath("org.jetbrains.kotlin:compose-compiler-gradle-plugin:$kotlinVersion")
    }
}

apply(plugin = "com.facebook.react.rootproject")