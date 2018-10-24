# Street Closures for the People

### Doesn't it suck when you're route to work is broken up by an out-of-the-blue road closure? It happened to me twice. 

### And it sucked.

There should be an easy way for governments to communicate this information to its residents of the closures in their municipality. The City of Charlotte already had a system, but it wasn't really working, discoverable or modern. In fact it kinda was a drag. So I put the ole noggin' to work and built this fella over the weekend!

# Here are the bones

The application was originally built as a fully open-source solution, but once some people at my job got into it, they wanted to integrated the application out of MariaDB and into SQL. The current components are:
* A boostrap front-end;
* Mapping support through the Esri JS API 4.9;
* Usage of the awesome FooTable plugin;
* A NodeJS backend / middleware; and
* ArcGIS for Server Map Services; 

## How To Make it Work For You

Fork it / Clone it / Download it! Then let's get it goin'

Here are the moving parts you need to update in order to deploy this application yourself:
1. After you've got your local copy of this handsome fella', the first thing you'll want to do is run 'npm install' or 'npm rebuild' in the directory. This will download the appropriate node_modules.
2. Before making any changes, I'd say just spin the app up and get familiar with what its doing. Click around. Interact with the app. Really get on a second-date level with this app -- it will help later.
3. There are several changes you'll have to make to get this app in proper condition. First thing first, you'll want to see if your City / Town / etc. already has this data stored somewhere. If it does (and they should), then you'll want to expose those data as Map Services. I am using the Esri stack, but feel free to go open-source with some WMS or WMTS layers! You could also check out some of my other repos where I construct GeoJSON objects from relational databases directly.
4. Once you have the services out there, then you'll want to configure the FooTable, the closures page and the Web Map to use those sevices and the appropriate fields.

I'll be posting a video to my YouTube channel showing you how to deploy this on your own later, so if you're a better 'show me' type learner, I gotcha covered.

Feel free to reach out for help or question!

Cheers,
A
