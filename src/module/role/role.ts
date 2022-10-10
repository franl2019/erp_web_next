export interface IRole {
    roleId: number
    roleName: string
    printid: number
    useflag: number
    useflagDate: Date | null
    creater: string
    createdAt: Date
    updater: string
    updatedAt: Date | null
    level1Review: number
    level1Name: string
    level1Date: Date | null
    level2Review: number
    level2Name: string
    level2Date: Date | null
    del_uuid: number
    deleter: string
    deletedAt: Date | null
}