export interface ISearchOption {
    name: string;
    country: string;
    lat: number;
    lon: number;
}

export interface IForecast {
    name: string;
    main: IMain;
}

export interface IMain {
    temp: number;
}
