package com.kidgames.shapes;

import java.io.File;
import android.os.Bundle;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebStorage;
public class MainActivity extends Activity {
	
	private WebView myWebView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
		setContentView(R.layout.activity_main);
		myWebView = (WebView) findViewById(R.id.webview);
		myWebView.setWebChromeClient(new WebChromeClient() {
		    @Override
		    public void onExceededDatabaseQuota(String url, String databaseIdentifier, long currentQuota, long estimatedSize,
		        long totalUsedQuota, WebStorage.QuotaUpdater quotaUpdater) {
		        quotaUpdater.updateQuota(estimatedSize * 3);
		    }
		});
		/*myWebView.setWebChromeClient(new WebChromeClient() {
			  public boolean onConsoleMessage(ConsoleMessage cm) {
			    Log.d("MyApplication", cm.message() + " -- From line "
			                         + cm.lineNumber() + " of "
			                         + cm.sourceId() );
			    return true;
			  }
			});*/
		WebSettings webSettings = myWebView.getSettings();
		webSettings.setJavaScriptEnabled(true);		
		webSettings.setDatabaseEnabled(true);
		webSettings.setDomStorageEnabled(true);
		webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
		webSettings.setAppCacheEnabled(true);
		webSettings.setAppCachePath(getApplicationContext().getCacheDir().getAbsolutePath());
		webSettings.setAllowFileAccess(true);
		
		//webSettings.setAllowUniversalAccessFromFileURLs(true);
		//webSettings.setAllowFileAccessFromFileURLs(true);
		webSettings.setAllowContentAccess(true);
//		webSettings.setLoadsImagesAutomatically(true);
//    	webSettings.setLightTouchEnabled(true);
//		webSettings.setLoadWithOverviewMode(true);
		//File sharedDir = this.getDir("database", Context.MODE_PRIVATE);
		//myWebView.getSettings().setDatabasePath("/data/data/" + myWebView.getContext().getPackageName() + "/databases/");
		//myWebView.getSettings().setDatabasePath(sharedDir.getPath());
		//webSettings.setDatabasePath("/data/data/"+this.getPackageName()+"/databases/");
		
		webSettings.setDatabasePath(this.getApplicationContext().getDir("databases", Context.MODE_PRIVATE).getPath());
		
		
		
		myWebView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
		myWebView.loadUrl("file:///android_asset/www/index.html");
		
	}

	@Override
	public void onBackPressed() {
		new AlertDialog.Builder(this).setIcon(android.R.drawable.ic_dialog_alert).setTitle("Exit the game?")
				.setMessage("Are you sure you want to exit?").setPositiveButton("Yes", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						finish();
					}
				}).setNegativeButton("No", null).show();
	}
	
	  
}
