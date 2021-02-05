import { AfterViewInit, Component, ViewContainerRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import LiferayParams, { UserAccountContactInformation , SiteBrief , RoleBrief ,Redirection, RootObject} from '../types/LiferayParams'
declare const Liferay: any;

import { ChangeDetectorRef } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/Role-Based-Redirection/app/app.component.html'
})
export class AppComponent implements AfterViewInit{
	params: LiferayParams;
	labels: any;
	redirectionsList : Array<Redirection>;
	public isLoading : boolean = false;
	constructor(public Http: HttpClient, private cdRef: ChangeDetectorRef) {
		this.labels = {        
			
			configuration: Liferay.Language.get('configuration'),
			portletNamespace: Liferay.Language.get('portlet-namespace'),
        	contextPath: Liferay.Language.get('context-path'),
			portletElementId: Liferay.Language.get('portlet-element-id'),
		}
		this.redirectionsList = new Array<Redirection>();
	}
	ngAfterViewInit(): void {
		if(!this.isActive || this.isEditMode)
			return;
		this.loadRedirections();
		console.log(JSON.stringify(this.redirectionsList));
		if(this.isSignedIn)
		{
			this.isLoading = true;
			console.log("Signed in user");
			this.loadAccountInformation();
		}
		else
		{
			console.log("Not signed in user");
		}
		
	}
	loadRedirections()
	{
		var redirectionCongValue = this.Redirections;
		var redirectionArray:Array<string> = redirectionCongValue.split(";");
		for(var index = 0 ; index < redirectionArray.length ; index++)
		{
			var redirectionValueParts : Array<string> = redirectionArray[index].split(":");
			var redirectionEntry : Redirection = {
				RedirectionURL : redirectionValueParts[1],
				RoleID : parseFloat(redirectionValueParts[0])
			};
			this.redirectionsList.push(redirectionEntry);
		}
	}
	public get isEditMode()
	{
		return window.location.search.indexOf("p_l_mode=edit") != -1;
	}
	get Redirections() {
		return this.params.configuration.system.Redirections;
	}
	public get isSignedIn()
	{
		return Liferay.ThemeDisplay.isSignedIn() as boolean;
	}
	public get isActive()
	{
		return this.params.configuration.system.Active as boolean;
	}
	public get Headless_AccountInformation() {
		return `${Liferay.ThemeDisplay.getPortalURL()}/o/headless-admin-user/v1.0/my-user-account?p_auth=${Liferay.authToken}`;
	}
	public loadAccountInformation()
	{
		this.Http.get(this.Headless_AccountInformation).subscribe(accountInfo=>{
			var info:RootObject = accountInfo as RootObject;
			for (let index = 0; index < info.roleBriefs.length; index++) {
				var roles = this.redirectionsList
				.filter(redirection => redirection.RoleID === info.roleBriefs[index].id);
				if(roles && roles.length > 0)
				{
					console.log(roles[0]);
					window.location.href = roles[0].RedirectionURL;
					break;
				}
			}
		});
	}
	get configurationJSON() {
		return JSON.stringify(this.params.configuration, null, 2);
	}
}
