static-yandex-map
=================

Generate URLs to show Yandex maps as jpeg/png images.


Example
==================


```javascript

    var stym=require('static-yandex-map');
    var s=new stym(37.620070,55.753630)
    //Creating map object - setting coordinates of map center -
    //http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/map_center.xml

    //getting API key is not mandatory
    //   .setKey('key') //You can get it here - http://api.yandex.ru/maps/form.xml
    //but you will have some limitations without it

         .setType('satellite')//one of 'map','satellite','hybrid','traffic'

         .setSize(650,450)
         //image size in pixels - max size is 650x450 -
         //http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/map_size.xml

         .setZ(13)
         //Setting map scale 0-17(highest)
         //http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/map_scale.xml

         //.setSpan(0.02,0.02)
         //Set viewport span in degrees - analogous to setZ
         //http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/map_viewport.xml

         .setLang('en-US')
                //select one of 'ru-RU','tr-TR', 'en-US', 'uk-UA'

    //Placing points on map
    //details here : http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/markers.xml
         .addPoint(37.620070,55.753630,'pm','wt','m',1)
         .addPoint(37.64,55.76363,'pm','wt','m',99);

    console.log(s.getUrl());
    // -> http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=sat&lang=en-US&size=450,450&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99
```

This is example of map:

![Example of map](http://static-maps.yandex.ru/1.x/?ll=37.62007,55.75363&l=sat&lang=en-US&size=450,450&z=13&pt=37.62007,55.75363,pmwtm1~37.64,55.76363,pmwtm99)

Options
==================
On *nix machines Yandex Map api key can be set as enviroment variable:

    $ export yandexMapApiKey='ALTJHk8BAAAAREWTEg=='; node app.js

You can get this key from this page: [http://api.yandex.ru/maps/getkey.xml](http://api.yandex.ru/maps/getkey.xml)

Links
==================

Link to full documentation on Yandex.Maps API
[http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/input_params.xml](http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/input_params.xml)


Tests
==================

Install vows and test as usual

    $ npm install vows
    $ npm test

[![Build Status](https://travis-ci.org/vodolaz095/static-yandex-map.png)](https://travis-ci.org/vodolaz095/static-yandex-map)

Credits
==================

  - [Ostroumov Anatolij](https://github.com/vodolaz095)

License
==================

[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2011-2013 Ostroumov Anatolij [http://teksi.ru/resume/](http://teksi.ru/resume/)

Before using this plugin, please, read the terms of use and restrictions for Yandex.Maps API:

The Yandex.Maps API can be freely used by any users who follow the requirements in the following Agreements:

[User Agreement for the "Yandex.Maps API" service](http://legal.yandex.com/maps_api/)

[Terms of Use for the “Yandex.Maps” service](http://legal.yandex.com/maps_termsofuse/)

[User Agreement for Yandex Services](http://company.yandex.ru/legal/rules/)

Please note that the Yandex.Maps API cannot be used for fee-based cartographic services or services that restrict third-party access in any other way.
Requiring user registration is not considered as restricting access.



