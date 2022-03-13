import { Manufacturer } from "src/manufacturer/manufacturer.entity";

export enum CarOwnerType {
    PRIVATE = 'private',
    LEASING = 'leasing',
    RENTAL = 'rental'
}

export enum EngineType {
    DIESEL = 'diesel',
    GASOLINE = 'gasoline'
}

export class SearchOptions {
    manufacturers: Manufacturer[]
}