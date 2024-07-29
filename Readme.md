Решение проблемы 
```
Execution failed for task ':app:generatePackageList'.
> argument type mismatch
```
перейти в дирректорию android и переключиться не gradle версии 6.9
```./gradlew wrapper --gradle-version 6.9```


[Debug on device](https://reactnative.dev/docs/running-on-device)


release AAB:
```
    bash
    export NODE_OPTIONS=--openssl-legacy-provider
    nvm use 18
    cd android
    ./gradlew app:bundleRelease -x bundleReleaseJsAndAssets -Dorg.gradle.java.home=/usr/lib64/jvm/java-8-openjdk/
```