/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Client } from '../../models/Client';
import { Angular_Loopback } from '../../models/Angular_Loopback';
import { People } from '../../models/People';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Client: Client,
    Angular_Loopback: Angular_Loopback,
    People: People,
    Post: Post,
    Comment: Comment,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
