package com.goodify.matrixtinz.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // 2. Access the underlying WebView safely
    WebView webView = (WebView) this.bridge.getWebView();
    WebSettings settings = webView.getSettings();
    
    // 3. Force the WebView to point its font aliases to the system defaults
    settings.setStandardFontFamily("sans-serif");
    settings.setSansSerifFontFamily("sans-serif");
    settings.setSerifFontFamily("serif");
    settings.setMonospaceFontFamily("monospace");
  }
}
