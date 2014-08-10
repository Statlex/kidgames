package com.statlex.kidmath;

//import com.google.android.gms.ads.*;
import java.util.Map;
import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.media.AudioManager;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebStorage;
import android.webkit.WebView;
import com.inmobi.commons.InMobi;
import com.inmobi.commons.InMobi.LOG_LEVEL;
import com.inmobi.monetization.IMBanner;
import com.inmobi.monetization.IMBannerListener;
import com.inmobi.monetization.IMErrorCode;

public class MainActivity extends Activity {

	private WebView mWebView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		InMobi.initialize(this, "f4d76a4e5652469eb5d3295ef59f96f5");
		setContentView(R.layout.activity_main);

		mWebView = (WebView) findViewById(R.id.webview);
		mWebView.addJavascriptInterface(new AudioInterface(this), "AndAud");
		WebSettings settings = mWebView.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setDomStorageEnabled(true);
		settings.setDatabaseEnabled(true);
		String dbPath = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
		settings.setDatabasePath(dbPath);
		setVolumeControlStream(AudioManager.STREAM_MUSIC);
		mWebView.setWebChromeClient(new WebChromeClient() {
			public void onConsoleMessage(String message, int lineNumber, String sourceID) {
				Log.d("MyApplication", message + " -- From line " + lineNumber + " of " + sourceID);
			}

			@Override
			public void onExceededDatabaseQuota(String url, String databaseIdentifier, long currentQuota, long estimatedSize,
					long totalUsedQuota, WebStorage.QuotaUpdater quotaUpdater) {
				quotaUpdater.updateQuota(estimatedSize * 2);
			}

		});
		InMobi.setLogLevel(LOG_LEVEL.DEBUG);
		mWebView.loadUrl("file:///android_asset/www/index.html");
		IMBanner banner = (IMBanner) findViewById(R.id.banner);
		banner.setIMBannerListener(new IMBannerListener() {
			@Override
			public void onShowBannerScreen(IMBanner arg0) {
				Log.d("KidGames", "onShowBannerScreen");
			}

			@Override
			public void onLeaveApplication(IMBanner arg0) {
				Log.d("KidGames", "onLeaveApplication");
			}

			@Override
			public void onDismissBannerScreen(IMBanner arg0) {
				Log.d("KidGames", "onDismissBannerScreen");
			}

			@Override
			public void onBannerRequestSucceeded(IMBanner arg0) {
				Log.d("KidGames", "onBannerRequestSucceeded");
			}

			@Override
			public void onBannerRequestFailed(IMBanner arg0, IMErrorCode arg1) {
				Log.d("KidGames", "onBannerRequestFailed");
			}

			@Override
			public void onBannerInteraction(IMBanner arg0, Map<String, String> arg1) {
				Log.d("KidGames", "onBannerRequestFailed");
			}
		});

		banner.loadBanner();

	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
	}

	@Override
	public void onBackPressed() {

		mWebView.loadUrl("javascript:onBackButton();");

		/*
		 * if (mWebView.canGoBack()) {
		 * mWebView.goBack();
		 * } else {
		 * super.onBackPressed();
		 * }
		 */

	}

}
