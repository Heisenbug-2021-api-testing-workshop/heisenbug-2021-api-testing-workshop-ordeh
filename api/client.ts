import { CookieJar } from 'tough-cookie'
import { PetController } from "./controller/pet.controller";
import { UserController } from "./controller/user.controller";
import { CONFIG } from "../config/npmConfig";

export class ApiClient {

    public readonly pet: PetController
    public readonly user: UserController

    constructor(params?: {token?: string, prefixUrl?: string, cookies?: CookieJar } ){
        const defaultParams = {
            prefixUrl: CONFIG.get('petstore_url'),
            cookies: new CookieJar(), 
            token: undefined
        }

        const mergedParams = {

            ...defaultParams,
            ...params

        }

        this.user = new UserController(mergedParams)
        this.pet = new PetController(mergedParams)
    }

    static async loginAs(credentials: { username: string, password: string } ){
        return new ApiClient({

            token: await new ApiClient().user.login(credentials)

        })
    }


}