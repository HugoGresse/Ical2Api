import { UserId } from './UserId'

export type OrganizationId = string

export interface Organization {
    id: OrganizationId
    name: string
    public: boolean
    owner: UserId
    members: UserId[]
}

export interface OrganizationPrivateData {
    id: string
    organizationId: string
    readToken: string
    writeToken: string
}
