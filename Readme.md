Решение проблемы 
```
Execution failed for task ':app:generatePackageList'.
> argument type mismatch
```
перейти в дирректорию android и переключиться не gradle версии 6.9
```./gradlew wrapper --gradle-version 6.9```


[Debug on device](https://reactnative.dev/docs/running-on-device)


release - ./gradlew app:assembleRelease -x bundleReleaseJsAndAssets
