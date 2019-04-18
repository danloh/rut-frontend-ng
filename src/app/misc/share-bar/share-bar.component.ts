import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-bar',
  templateUrl: './share-bar.component.html',
  styleUrls: ['./share-bar.component.css']
})
export class ShareBarComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  
  page_url: string;

  ngOnInit() {
    this.route.url.subscribe(res => { 
      const curUrl = res.toString().replace(',', '/');
      //console.log(curUrl);
      this.page_url = `https://ruthub.com/${curUrl}`;
      //console.log(this.page_url);
    });
  }

  title () {
    try {
      if (document) return  document.title;
    } 
    catch (err) { return 'RutHub' }
  }

  shareWindow (to: string) {
    let share_url: string;
    const curTitle = this.title();
    switch (to) {
      case 'tw':
        share_url = `https://twitter.com/share?text=${curTitle}&url=${this.page_url}`;
        break
      case 'fb':
        share_url = `https://www.facebook.com/sharer/sharer.php?u=${this.page_url}`;
        break
    }
    const url = encodeURI(share_url);
    //console.log(url)
    const winName = 'newWin';
    const awidth = screen.availWidth / 2;
    const aheight = screen.availHeight / 5 * 2;
    const atop = (screen.availHeight - aheight) / 2;
    const aleft = (screen.availWidth - awidth) / 2;
    const param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0';
    const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${param0}`;
    const win = window.open(url, winName, params);
    win.focus();
  }

}
