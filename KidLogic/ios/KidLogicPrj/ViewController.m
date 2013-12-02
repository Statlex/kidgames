//
//  ViewController.m
//  KidLogic
//
//  Created by Pavel Sychykau on 10/29/13.
//  Copyright (c) 2013 Pavel Sychykau. All rights reserved.
//

#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    self.webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    self.webview.scalesPageToFit = YES;
    self.webview.autoresizesSubviews = YES;
    self.webview.autoresizingMask=(UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth);
    [self loadGame];
    [self.view addSubview:self.webview];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)loadGame
{
    //NSURL *url = [NSURL URLWithString:@"http://statlex.com/a/math"];
    //NSURLRequest *request = [NSURLRequest requestWithURL:url];
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"]];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webview loadRequest:request];
}




@end
