import { LocationChangeEvent } from "@angular/common";

/**
 * This is the structure of the parameters passed by Liferay to the JS module.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent 
 * information on the structure of this type.
 */
export default interface LiferayParams {
	portletElementId: string;
	contextPath: string;
	portletNamespace: string;
	configuration: {
		system: any,
		portletInstance: any
	}
}
export interface RoleBrief {
	id: number;
	name: string;
}

export interface SiteBrief {
	id: number;
	name: string;
}

export interface UserAccountContactInformation {
	emailAddresses: any[];
	facebook: string;
	jabber: string;
	postalAddresses: any[];
	skype: string;
	sms: string;
	telephones: any[];
	twitter: string;
	webUrls: any[];
}
export interface Redirection
{
	RoleID:number;
	RedirectionURL : string;
}
export interface RootObject {
	additionalName: string;
	alternateName: string;
	birthDate: Date;
	customFields: any[];
	dashboardURL: string;
	dateCreated: Date;
	dateModified: Date;
	emailAddress: string;
	familyName: string;
	givenName: string;
	honorificPrefix: string;
	honorificSuffix: string;
	id: number;
	jobTitle: string;
	keywords: any[];
	name: string;
	organizationBriefs: any[];
	profileURL: string;
	roleBriefs: RoleBrief[];
	siteBriefs: SiteBrief[];
	userAccountContactInformation: UserAccountContactInformation;
}

