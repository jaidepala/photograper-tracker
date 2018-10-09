/* tslint:disable */

declare var Object: any;
export interface PeopleInterface {
  "accessTokens"?: string;
  "firstname"?: string;
  "lastname"?: string;
  "gender"?: string;
  "email": string;
  "personType": string;
  "phone": string;
  "location"?: string;
  "id"?: number;
}

export class People implements PeopleInterface {
  "accessTokens": string;
  "firstname": string;
  "lastname": string;
  "gender": string;
  "email": string;
  "personType": string;
  "phone": string;
  "location": string;
  "id": number;
  constructor(data?: PeopleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `People`.
   */
  public static getModelName() {
    return "People";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of People for dynamic purposes.
  **/
  public static factory(data: PeopleInterface): People{
    return new People(data);
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
      name: 'People',
      plural: 'peoples',
      path: 'peoples',
      idName: 'id',
      properties: {
        "accessTokens": {
          name: 'accessTokens',
          type: 'string'
        },
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "personType": {
          name: 'personType',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'string'
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
