# Role-Based-Redirection

Role based redirection can be useful for a sales engineer who is willing to have different sites and redirect the user to the right site based on the role the user is assigned to.

This widget has been developed using angular, and it depends on the system level setting where you will be able to define your redirections and map it to the role.

Once you deploy the module, you will have the following configurations “Global Menu -> Control Panel -> System Settings -> Role Based Redirection”:
- Redirections “String”: this key is responsible for mapping the role to the landing page where the user should be redirected based on his role.
- Redirections should be passed in the following format:
RoleID:RedirectionURL;RoleID:RedirectionURL;*N
Enable “Boolean”: Activate or deactivate the redirection

# Hint 
once the widget is placed on a page, and the configuration key Enable has been set to  true, it will be hard to edit the page directly, so you have two options, either to go to Site Builder -> Pages and select the page and click on edit from the context menu or you can set Enable to false and edit the page
