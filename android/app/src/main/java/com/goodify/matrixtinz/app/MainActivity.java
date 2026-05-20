package com.goodify.matrixtinz.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // Using your original, perfectly correct bridge method!
    WebSettings settings = this.getBridge().getWebView().getSettings();
    
    // Force the WebView to point its font aliases to the system defaults
    settings.setStandardFontFamily("sans-serif");
    settings.setSansSerifFontFamily("sans-serif");
    settings.setSerifFontFamily("serif");
    
    // THE FIX: Android uses "Fixed" instead of "Monospace" for this method
    settings.setFixedFontFamily("monospace");
  }
}
