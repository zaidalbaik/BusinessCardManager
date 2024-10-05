import { Routes } from '@angular/router';
import { PathsNames } from './PathsNames';
import { Error404Component } from './Pages/error404/error404.component';
import { HomeComponent } from './Pages/home/home.component';
import { BusinessCardsComponent } from './Pages/business-cards/business-cards.component';
import { AddBusinessCardComponent } from './Pages/add-business-card/add-business-card.component';
import { addBusinessCardGuard } from './Guards/add-business-card.guard';

export const routes: Routes = [
  { path: "", redirectTo: `/${PathsNames.home}`, pathMatch: "full" },
  {
    path: PathsNames.home,
    component: HomeComponent,
    children: [
      { path: "", redirectTo: PathsNames.BusinessCards, pathMatch: "full" },
      { path: PathsNames.BusinessCards, component: BusinessCardsComponent, title: "Business Cards" },
      { path: PathsNames.AddBusinessCard, component: AddBusinessCardComponent, title: "Add Business Card", canActivate: [addBusinessCardGuard] },
    ]
  },
  { path: PathsNames.error, component: Error404Component, title: "Page Not Found" },
  { path: "**", component: Error404Component, title: "Page Not Found" }
];

export const routingComponents = [
  HomeComponent,
  Error404Component,
  BusinessCardsComponent,
  AddBusinessCardComponent
]
