import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {URLSearchParams, Http, HTTP_PROVIDERS} from 'angular2/http';
import {GifListPage} from './pages/gifs/gif-list/gif-list';

@App({
  templateUrl: 'build/app.html',
  config: {}
})
class MyApp {
  rootPage: any = GifListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Unicorns', component: GifListPage }
    ];

    this.rootPage = GifListPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
