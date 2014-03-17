//
//  ViewController.h
//  Painting
//
//  Created by Pavel Sychykau on 3/1/14.
//  Copyright (c) 2014 Pavel Sychykau. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <iAd/iAd.h>

@interface ViewController : UIViewController
<ADBannerViewDelegate>
@property IBOutlet UIWebView *webView;
@property(nonatomic, strong) UIImageView *loadingImageView;
@property (strong, nonatomic) ADBannerView *bannerView;
@end


