//
//  ViewController.h
//  StatlexTower
//
//  Created by Pavel Sychykau on 7/5/14.
//  Copyright (c) 2014 Pavel Sychykau. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <iAd/iAd.h>

@interface ViewController : UIViewController
<ADBannerViewDelegate>
@property (strong, nonatomic) IBOutlet UIWebView *webView;

@property (strong, nonatomic) ADBannerView *bannerView;
@end
