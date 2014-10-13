//
//  ViewController.m
//  LogicGame
//
//  Created by Pavel Sychykau on 8/13/14.
//  Copyright (c) 2014 Pavel Sychykau. All rights reserved.
//

#import "ViewController.h"

@interface ViewController (){

}
@end

@implementation ViewController


- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType {
    // This practically disables web navigation from the webView.
    if (navigationType == UIWebViewNavigationTypeLinkClicked) {
        [[UIApplication sharedApplication] openURL:[request URL]];
        return FALSE;
    }
    return TRUE;
}

- (void)loadGame
{
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"]];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [_webView loadRequest:request];
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    _webView.scalesPageToFit = YES;
    _webView.autoresizesSubviews = YES;
    _webView.autoresizingMask=(UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth);
    
    
    [self loadGame];
    _webView.userInteractionEnabled = YES;
    [self.view addSubview:_webView];
    _webView.delegate = (id)self;
    
    
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
