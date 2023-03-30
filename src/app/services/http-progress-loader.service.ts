import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs'; 

interface HttpLoaderMap {
  url: string,
  isLoading: boolean
};

@Injectable({
  providedIn: 'root'
})

export class HttpProgressLoaderService {
  progressValue: number = 0;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaderMap: HttpLoaderMap[] = []; 

  constructor() {
    this.progressValue = 0;
    this.isLoading.next(false);
  }

  setLoaderMap(thisURL: string, flagValue: boolean): void { 
    const checkURL = (value : HttpLoaderMap) => value.url == thisURL; 
    const thisIndex : number = this.loaderMap.findIndex(checkURL); 

    if (!flagValue) {     
      this.loaderMap.splice(thisIndex, 1); 
    } else if (flagValue && thisIndex == -1) {
      this.loaderMap.push({url: thisURL, isLoading: flagValue}); 
    }

    if (this.loaderMap.length == 0) { 
      this.setCompleted();
    }  

    console.log(this.loaderMap);
 
  };

  setProgressValue(value: number): void {
    this.progressValue += value;
  }

  getProgressValue(): number {
    let value: number = this.progressValue; //this.loaderMap.length;
    return value > 0 ? Math.floor(100 / value) : 100;
  };

  setCompleted(): void {
    this.isLoading.next(false);   
    this.isLoading.complete();   
  }
}
