callbackOnAction = (data) => {
  if(data.command === 'drag_drop'){
    window.ReactNativeWebView.postMessage(
      JSON.stringify({Command: data.command, Action: data.Action.id, Target: data.Target.innerHTML})
    );
  }else if(data.command === 'fetch_stat'){
    window.ReactNativeWebView.postMessage(
      JSON.stringify({Command: data.command, Action: data.Action.id, Target: data.Target.innerHTML})
    );
  }
  console.log(data)
}
