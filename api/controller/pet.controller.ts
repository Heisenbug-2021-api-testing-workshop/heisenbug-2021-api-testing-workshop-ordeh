import {URLSearchParams} from 'url'
import type { definitions } from '../../.temp/types'
import { BaseController } from './base.controller'
import { JsonRequestWithValidation } from '../request'

export class PetController extends BaseController {

    async getById(id: string | number){
        return (
            await new JsonRequestWithValidation()
            .prefixUrl(this.params.prefixUrl)
            .url(`pet/${id}`)
            .headers({token: this.params.token})
            .cookieJar(this.params.cookies)
            .send<definitions['Pet']>()
            ).body 
    }

    async findByTags(tags: string | string[]){
        return (
            await new JsonRequestWithValidation()
            .prefixUrl(this.params.prefixUrl)
            .url("pet/findByTags")
            .headers({token: this.params.token})
            .cookieJar(this.params.cookies)
            .searchParams( new URLSearchParams({ tags }) )
            .send<definitions['Pet'][]>()
            ).body 
    }

    async addNew(petToCreate: Omit<definitions['Pet'], 'id' >) {
        return (
            await new JsonRequestWithValidation()
            .prefixUrl(this.params.prefixUrl)
            .url("pet")
            .method('POST')
            .headers({token: this.params.token})
            .cookieJar(this.params.cookies)
            .body(petToCreate)
            .send<definitions['Pet']>()
            ).body 
    }
    

}