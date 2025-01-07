export const APP_SERVICE = 'APP_SERVICE';
export interface IAppService {
  getHello(): Promise<any>;
}
