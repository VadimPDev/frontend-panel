export interface ILocation {
    id:number;
    l_name:string;
    l_cores:number;
    l_ram:number;
    l_port:number;
    l_ip:string;
    l_status:number;
}

export enum LocationStatus {
    'Неактивна' = 0,
    'Активна' = 1
}