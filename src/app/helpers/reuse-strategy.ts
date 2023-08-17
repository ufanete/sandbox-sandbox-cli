import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';


export class CustomReuseStrategy implements RouteReuseStrategy {
    routesToCache: string[] = ["dashboard"];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
   
    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
       return true;//this.routesToCache.indexOf(route.routeConfig.path) > -1;
    }
   
    //Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
       //this.storedRouteHandles.set(route.routeConfig.path, handle);
    }
   
   //Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
       return true;//this.storedRouteHandles.has(route.routeConfig.path);
    }
   
    //If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
       return true;//this.storedRouteHandles.get(route.routeConfig.path);
    }
   
    //Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
       return future.routeConfig === curr.routeConfig;
    }
   }