package com.goodify.matrixtinz.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Access the underlying WebView and its settings
        WebSettings settings = this.getBridge().getWebView().getSettings();
        
        // Force the WebView to point its font aliases to the system defaults
        settings.setStandardFontFamily("sans-serif");
        settings.setSansSerifFontFamily("sans-serif");
        settings.setSerifFontFamily("serif");
        settings.setMonospaceFontFamily("monospace");
    }
}
