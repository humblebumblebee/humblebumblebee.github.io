callbackOnAction = (data) => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({Action: data.Action.id, Target: data.Target.innerHTML})
  );
  console.log(data)
}
