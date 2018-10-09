/* tslint:disable */

declare var Object: any;
export interface CommentInterface {
  "poster": string;
  "postId": string;
  "posterId": string;
  "likes"?: any;
  "published": string;
  "comment": string;
  "id"?: number;
}

export class Comment implements CommentInterface {
  "poster": string;
  "postId": string;
  "posterId": string;
  "likes": any;
  "published": string;
  "comment": string;
  "id": number;
  constructor(data?: CommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Comment`.
   */
  public static getModelName() {
    return "Comment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Comment for dynamic purposes.
  **/
  public static factory(data: CommentInterface): Comment{
    return new Comment(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Comment',
      plural: 'comments',
      path: 'comments',
      idName: 'id',
      properties: {
        "poster": {
          name: 'poster',
          type: 'string'
        },
        "postId": {
          name: 'postId',
          type: 'string'
        },
        "posterId": {
          name: 'posterId',
          type: 'string'
        },
        "likes": {
          name: 'likes',
          type: 'any',
          default: <any>null
        },
        "published": {
          name: 'published',
          type: 'string'
        },
        "comment": {
          name: 'comment',
          type: 'string',
          default: ''
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
