if (!window.MockScript) {
  window.MockScript = {};
} else {
  window.MockScript.doubleLoad = true;
  console.log('ERR mock script loaded twice');
}
