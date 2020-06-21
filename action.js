callbackOnAction = (data) => {
  window.ReactNativeWebView.postMessage(
    `{
      Action: ` + data.Action.id + `,
      Target: ` + data.Target.innerHTML + `},
     }`
  );
  console.log(data)
}
