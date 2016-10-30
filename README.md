# Deliverance

An improved version of the menu / order system of [http://deliverance.co.uk](http://deliverance.co.uk).

**Note**: deliverance.co.uk shut down, the actual version is using a cached set of data dumped from the original website. To see the final version of the service check the [last version](https://github.com/sirLisko/deliverance/releases/tag/v1.0.0) of the website.

### BackEnd API

	GET /v1/menu				Return the content of all the menu
	GET /v1/menu/:name			Return the content of the :name menu
	GET /v1/menulist			Return the list of menus
