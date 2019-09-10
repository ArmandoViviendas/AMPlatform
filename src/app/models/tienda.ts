export interface TiendaInterface{
    idT?: string;
    sucursal?: string;
    calle?: string;
    colonia?: string;
    cp?: number;
    activo?: string;
    latitud?: number;
    longitud?: number;

    idCorporativo?: string;
    corporativodsc?: string;
    idcliente?: string;
    clientedsc?: string;

    idcanal?: string;
    canaldsc?: string;
    
    idcadena?: string;
    cadenadsc?: string;
    idformato?: string;
    formatodsc?: string;

    idciudad?: string;
    ciudaddsc?: string;
    idestado?: string;
    estadodsc?: string;

    idregion?: string;
    regiondsc?: string;
}