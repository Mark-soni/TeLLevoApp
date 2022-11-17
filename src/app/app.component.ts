import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private platform: Platform,private translateService: TranslateService) {
    this.translateService.setDefaultLang('english');
	  this.translateService.addLangs(['español','french', 'english','português','日本']);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then( () => {
      this.router.navigateByUrl('splashscreen');
    });
  }
  
}


