import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { AppDataService } from "../app.data.service";
import { Inject } from "@angular/core";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class ExitGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(@Inject(AppDataService) private appData: AppDataService) {}
  canDeactivate(   component: ComponentCanDeactivate  ): Observable<boolean> | boolean {
    // return component.canDeactivate ? component.canDeactivate() : true;
    if (this.appData.approve) return true;
    return confirm(
      "Не сохранённые данные будут потеряны. Для сохранения данных нажмите 'Далее'. Вы хотите покинуть страницу?"
    );
  }
}
