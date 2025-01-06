import { Injectable } from '@angular/core';
import SecureLS from 'secure-ls';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  private ls: SecureLS = new SecureLS({ encodingType: 'aes' });
  private prefix: string = 'recipes_';

  // clear(): void {
  //   this.ls.removeAll();
  // }

  remove(key: string): void {
    this.ls.remove(this.prefix + key);
  }

  set(key: string, value: User): void {
    this.ls.set(this.prefix + key, value);
  }

  get(key: string): User {
    const obj = this.ls.get(this.prefix + key);
    return obj;
  }
}
