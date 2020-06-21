callbackOnAction = (data) => {
  window.ReactNativeWebView.postMessage(
    `{
      Action: ` + data.Action + `,
      Target: ` + data.Target + `},
     }`
  );
  console.log(data)
}
