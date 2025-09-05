pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    includeBuild("../node_modules/@react-native/gradle-plugin")
}

plugins {
    id("com.facebook.react.settings")
}

configure<com.facebook.react.ReactSettingsExtension> {
    autolinkLibrariesFromCommand()
}

rootProject.name = "RN_Demo"

include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")