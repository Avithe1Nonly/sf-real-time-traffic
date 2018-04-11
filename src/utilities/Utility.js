import { geoMercator, geoPath } from "d3-geo";

export const projectionFunc = (width=800, height=450) => geoMercator()
                                        .center([-122.433701, 37.767683])
                                        .scale(300000)
                                        .translate([width / 1.95, height / 1.65]);

export const generatePathFuc = (width, height) => geoPath().projection(projectionFunc(width, height));

const baseURL = "http://webservices.nextbus.com/service/publicJSONFeed";

export const routeListURL = `${baseURL}?command=routeList&a=sf-muni`;
export const routeConfigFunc = (route) => (`${baseURL}?command=routeConfig&a=sf-muni&r=${route}`);
export const vehicleLocFunc = (route, time) => (`${baseURL}?command=vehicleLocations&a=sf-muni&r=${route}&t=${time}`);

export const getRandomHexColor = () =>  '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

export const refreshTime = 15000;
