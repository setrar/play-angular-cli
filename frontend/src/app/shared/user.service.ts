declare var _;
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {Genre} from '../common/interfaces/genre.interface';

@Injectable()
export class UserService {
  private headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
  private artistNumber: string;
  private userData = {
    profile: {},
    biography: {},
    social: {}
  };
  private newUserData = {};
  private SocialLinksList = [];

  constructor(private http: Http) {
    this.artistNumber = "";
  }

  setArtistNumber(number: string) {
    this.artistNumber = number;
  }

  updateUserData(type: string) {
    var updateData: any = null;
    switch (type) {
      case 'profile':
        updateData = this.setUserProfile();
        break;
      case 'biography':
        updateData = JSON.stringify(this.newUserData['biography']);
        break;
      case 'social':
        updateData = JSON.stringify(this.newUserData['social']);
        break;
    }

    return this
      .http
      .post('api/artists/' + this.artistNumber.toString() + '/' + type, updateData, {
        headers: this.headers
      })
      .map(this.responseHandler)
      .catch((err:any) => Observable.throw(err));
  }

  setUserProfile() {
    return '';
  }

  getUserProfile() {
    return this.http.get('api/artists/' + this.artistNumber + '/profile')
      .map((res:any) => {
        this.userData.profile = this.responseHandler(res);
        return this.userData.profile;
      })
      .catch((err:any) => Observable.throw(err));
  }

  getUserBiography() {
    return this.http.get("api/artists/" + this.artistNumber + "/biography")
      .map((res:any) => {
        this.userData.biography = this.responseHandler(res);
        return this.userData.biography;
      })
      .catch((err:any) => Observable.throw(err));
  }

  getUserSocial() {
    return this.http.get('api/artists/' + this.artistNumber + '/social')
      .map((res:any) => {
        this.SocialLinksList = this.responseHandler(res);
        return this.SocialLinksList;
      })
      .catch((err:any) => Observable.throw(err));
  }

  getUserData() {
    return Observable.create((observer:any) => {

      return Observable.forkJoin(
        this.getUserProfile(),
        this.getUserBiography(),
        this.getUserSocial()
      ).subscribe((data:Array<any>) => {
        let userData:User = {
          profile: data[0],
          biography: data[1],
          social: data[2]
        }
        observer.next(userData);
        observer.complete();
      });
    }).share();

  }

  updateUserProfile(userProfile: any) {
    return this
      .http
      .post('api/artists/' + this.artistNumber + '/profile', JSON.stringify(userProfile), {
        headers: this.headers
      })
      .map((res: any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  removePhotoUserProfile() {
    return this
      .http
      .delete('api/artists/' + this.artistNumber + '/pic')
      .map((res: any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  updateUserBiography(userBio: any) {
    return this
      .http
      .post('api/artists/' + this.artistNumber + '/biography', JSON.stringify(userBio), {
        headers: this.headers
      })
      .map((res:any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  updateUserSocial(dataModel:any) {
    var postData = [];
    _.each(dataModel, (value, key) => {
      postData.push({
        url: value,
        social: this.getSocialKeyFromSocialName(key),
        artistNumber: this.artistNumber
      });
    })
    return this
      .http
      .post('api/artists/' + this.artistNumber + '/social', JSON.stringify(postData), {
        headers: this.headers
      })
      .map((res:any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  updateUserEmail(userEmail: any) {
    return this
      .http
      .post('api/profile/updateemail', JSON.stringify(userEmail), {
        headers: this.headers
      })
      .map((res: any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  checkExistingEmail(email: string) {
    return this.http.get("api/profile/checkemail/" + email)
      .map((res: any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  changePassword(passwordData) {
    return Observable.of(true);
  }

  getPaymentHistory() {
    return this.http.get('api/artists/' + this.artistNumber + '/paymenthistory')
      .map((res: any) => res.json())
      .catch((err:any) => Observable.throw(err));
  }

  private getSocialKeyFromSocialName(key) {
    switch (key) {
      case 'facebook':
        return 1;
      case 'twitter':
        return 2;
      case 'soundcloud':
        return 3;
      case 'reverbnation':
        return 4;
      case 'bandcamp':
        return 5;
      case 'bandpage':
        return 6;
      default:
        return 0;
    }
  }


  private responseHandler(data:any) {
    try {
      return JSON.parse(data._body);
    } catch (e) {
      console.log("Error while parse JSON", data._body);
      return null;
    }
  }




}